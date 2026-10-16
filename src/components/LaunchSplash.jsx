import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { school } from "../config/app";

const CONFETTI_COLORS = ["#c4a35a", "#a6853d", "#ead7a5", "#3d9b72", "#4caf7d", "#4f8df7", "#8b74e8", "#16324f"];

function createParticle(x, y, mode) {
  const angle = mode === "up"
    ? -Math.PI / 2 + (Math.random() - 0.5) * 1.15
    : Math.random() * Math.PI * 2;
  const speed = mode === "up" ? 8 + Math.random() * 7 : 3.5 + Math.random() * 8.5;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed * (0.55 + Math.random() * 0.7),
    vy: Math.sin(angle) * speed,
    gravity: 0.15 + Math.random() * 0.07,
    size: 5 + Math.random() * 7,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.28,
    life: 1,
    decay: 0.006 + Math.random() * 0.006,
    shape: Math.random(),
  };
}

function startConfetti(canvas) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  let running = true;
  let frame = 0;
  let startedAt = 0;
  let nextBurst = 0;
  const particles = [];
  const bursts = [
    { at: 0, mode: "ring", x: 0.5, y: 0.48, count: 90 },
    { at: 240, mode: "up", x: 0.2, y: 0.7, count: 40 },
    { at: 240, mode: "up", x: 0.8, y: 0.7, count: 40 },
    { at: 520, mode: "ring", x: 0.5, y: 0.32, count: 60 },
  ];

  const draw = (now) => {
    if (!running) return;
    if (!startedAt) startedAt = now;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const pixelWidth = Math.max(1, Math.floor(width * dpr));
    const pixelHeight = Math.max(1, Math.floor(height * dpr));

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const elapsed = now - startedAt;
    const density = width < 700 ? 0.62 : 1;

    while (nextBurst < bursts.length && elapsed >= bursts[nextBurst].at) {
      const burst = bursts[nextBurst];
      const count = Math.round(burst.count * density);
      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle(width * burst.x, height * burst.y, burst.mode));
      }
      nextBurst += 1;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    let alive = false;
    for (const particle of particles) {
      particle.vy += particle.gravity;
      particle.vx *= 0.99;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.spin;
      particle.life -= particle.decay;
      if (particle.life <= 0) continue;

      alive = true;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = Math.max(particle.life, 0);
      context.fillStyle = particle.color;

      if (particle.shape > 0.72) {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.36, 0, Math.PI * 2);
        context.fill();
      } else if (particle.shape > 0.38) {
        context.fillRect(-particle.size / 2, -particle.size * 0.2, particle.size, particle.size * 0.42);
      } else {
        context.fillRect(-particle.size * 0.2, -particle.size / 2, particle.size * 0.4, particle.size);
      }
      context.restore();
    }

    if (elapsed < 2300 && (alive || nextBurst < bursts.length)) {
      frame = requestAnimationFrame(draw);
    }
  };

  frame = requestAnimationFrame(draw);
  return () => {
    running = false;
    cancelAnimationFrame(frame);
  };
}

export default function LaunchSplash({ onDone }) {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const revealTimer = useRef(0);
  const doneTimer = useRef(0);
  const stopConfetti = useRef(() => {});
  const started = useRef(false);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(revealTimer.current);
      window.clearTimeout(doneTimer.current);
      stopConfetti.current();
    };
  }, []);

  const launch = () => {
    if (started.current || phase !== "idle") return;
    started.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("celebrate");

    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }

    if (!reducedMotion && canvasRef.current) {
      stopConfetti.current = startConfetti(canvasRef.current);
    }

    revealTimer.current = window.setTimeout(() => {
      setPhase("reveal");
    }, reducedMotion ? 40 : 820);

    doneTimer.current = window.setTimeout(() => {
      onDone();
    }, reducedMotion ? 320 : 2050);
  };

  const splashClass = [
    "launch-splash",
    phase === "celebrate" ? "is-celebrate" : "",
    phase === "reveal" ? "is-reveal" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={splashClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-lead"
    >
      <div className="launch-panel launch-panel-top" aria-hidden="true" />
      <div className="launch-panel launch-panel-bottom" aria-hidden="true" />

      <div className="launch-motes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="launch-stage">
        <img className="launch-logo" src={school.logoSrc} alt="" />
        <p className="launch-kicker">رحلة التحصيلي</p>

        <div className="launch-copy">
          <p id="launch-lead" className="launch-lead">
            نبدأ اليوم رحلةً نحو التميز، ونفتح أبوابًا جديدة للطموح والإنجاز.
          </p>
          <p className="launch-step">كل إنجاز عظيم يبدأ بخطوة…</p>
          <p className="launch-close">وهذه خطوتنا الأولى نحو التميز.</p>
        </div>

        <span className="launch-rule" aria-hidden="true" />

        <button
          ref={buttonRef}
          type="button"
          className="launch-cta"
          onClick={launch}
          disabled={phase !== "idle"}
        >
          اضغطي للانطلاق
        </button>
      </div>

      <canvas ref={canvasRef} className="launch-confetti" aria-hidden="true" />
    </div>
  );
}
