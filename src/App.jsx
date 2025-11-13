import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- Автостарт музыки по тапу (айфон фикс) ---
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      const hint = document.getElementById("tapHint");
      if (hint) hint.style.display = "none";
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // --- Конфетти каждые 2.5 секунды ---
    const fireConfetti = () => {
      const end = Date.now() + 900;
      const colors = ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400", "#00c3ff"];
      (function frame() {
        confetti({
          particleCount: 12,
          spread: 80,
          origin: { x: Math.random(), y: Math.random() * 0.3 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    };
    const confettiInterval = setInterval(fireConfetti, 2500);

    // --- Фон, реагирующий на звук ---
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg =
        dataArray.reduce((sum, v) => sum + v, 0) /
        (dataArray.length || 1) /
        255;

      ctx.fillStyle = "rgba(0,0,25,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.3
      );
      grad.addColorStop(
        0,
        `rgba(${130 + avg * 120}, 50, 255, ${0.9 - avg * 0.3})`
      );
      grad.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(confettiInterval);
      window.removeEventListener("resize", resize);
      audioCtx.close();
    };
  }, []);

  // --- Летающие клоуны 🤡 ---
  const flyingClowns = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 32 + 30,
    xStart: Math.random() * 100,
    duration: Math.random() * 16 + 12,
    delay: Math.random() * 7,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "'Orbitron', system-ui, sans-serif",
        position: "relative",
        padding: "0 10px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      {/* Музыка */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Фон */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Летающие клоуны */}
      {flyingClowns.map((clown) => (
        <motion.div
          key={clown.id}
          initial={{ y: "110vh", x: `${clown.xStart}vw`, rotate: 0 }}
          animate={{
            y: "-20vh",
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: clown.duration,
            repeat: Infinity,
            delay: clown.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: clown.size,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          🤡
        </motion.div>
      ))}

      {/* Заголовок — эмодзи отдельно, текст с градиентом */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          zIndex: 3,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "clamp(2.3rem, 6vw, 4rem)" }}>🎉🤡</span>

        <h1
          style={{
            fontSize: "clamp(2.3rem, 6vw, 4rem)",
            fontWeight: 700,
            margin: 0,
            background:
              "linear-gradient(90deg, #ff00ff, #00eaff, #ffea00, #ff00ff)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "titleColorShift 6s ease-in-out infinite",
            textShadow: "0 0 18px rgba(255,255,255,0.4)",
          }}
        >
          С Днём Рождения, Дима!
        </h1>

        <span style={{ fontSize: "clamp(2.3rem, 6vw, 4rem)" }}>🤡🎉</span>
      </motion.div>

      {/* Текст пожелания */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.3rem)",
          textAlign: "center",
          marginTop: 18,
          maxWidth: 720,
          lineHeight: 1.7,
          textShadow: "0 0 18px rgba(255,255,255,0.7)",
          zIndex: 3,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀, настроение всегда на 100%,
        а удача будет рядом каждый день! От братишки Исмаила 😎🔥
      </motion.p>

      {/* Фотки — адаптивная сетка, две рядом даже на телефоне */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "700px",
          padding: "20px",
          marginTop: "35px",
          zIndex: 3,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.2 }}
            style={{
              padding: "10px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 25px rgba(255, 0, 255, 0.35)",
              border: "2px solid rgba(255,255,255,0.25)",
              animation: "float 4s ease-in-out infinite",
              animationDelay: `${i * 1.2}s`,
            }}
          >
            <img
              src={`/dima${n}.jpg`}
              alt={`Дима ${n}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "18px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Подсказка про музыку */}
      <div
        id="tapHint"
        style={{
          position: "fixed",
          bottom: 18,
          width: "100%",
          textAlign: "center",
          color: "#ddd",
          zIndex: 5,
          fontSize: "0.9rem",
          textShadow: "0 0 10px rgba(0,0,0,0.8)",
          animation: "pulse 2s infinite",
        }}
      >
        🎵 Нажми на экран, чтобы включить музыку
      </div>

      {/* Ключевые анимации */}
      <style>
        {`
        @keyframes titleColorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        `}
      </style>
    </div>
  );
}
