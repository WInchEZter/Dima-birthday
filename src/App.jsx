import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    // музыка по клику (iPhone friendly)
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      const hint = document.getElementById("tapHint");
      if (hint) hint.style.display = "none";
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // улучшенные конфетти (по всему экрану)
    const fireConfetti = () => {
      const end = Date.now() + 1000;
      const colors = ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400", "#00c3ff"];
      (function frame() {
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 75,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 75,
          origin: { x: 1 },
          colors,
        });
        confetti({
          particleCount: 8,
          angle: 90,
          spread: 120,
          origin: { x: Math.random(), y: Math.random() * 0.6 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    };
    const confettiInterval = setInterval(fireConfetti, 2500);

    // аудио-анализатор для визуализации
    const audio = audioRef.current;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    // фон-анимация (реагирует на звук)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;

      ctx.fillStyle = `rgba(0,0,20,0.3)`;
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
        `rgba(${100 + avg * 155}, 50, ${255 - avg * 155}, 0.9)`
      );
      grad.addColorStop(1, "rgba(0,0,0,0.6)");
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

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Orbitron', sans-serif",
        boxSizing: "border-box",
        padding: "0 10px",
      }}
    >
      {/* 🎵 музыка */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* 🌌 фон */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* 🎉 текст */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          textAlign: "center",
          color: "#ff9efc",
          textShadow: "0 0 40px #ff5edb, 0 0 80px #ff5edb",
          zIndex: 3,
          letterSpacing: "2px",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        🎉 С Днём Рождения, Дима! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.4rem)",
          textAlign: "center",
          maxWidth: "700px",
          marginTop: "20px",
          lineHeight: "1.7em",
          textShadow: "0 0 20px rgba(255,255,255,0.8)",
          zIndex: 3,
          filter: "brightness(1.1) contrast(1.2)",
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀 <br />
        а настроение будет, как после пятничного кофе ☕ <br />
        от твоего братишки Исмаила 😎
      </motion.p>

      {/* 📸 фотки */}
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          marginTop: "40px",
          zIndex: 3,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={`Дима ${n}`}
            animate={{
              y: [0, -20, 0, 20, 0],
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
            whileHover={{
              scale: 1.12,
              boxShadow: "0 0 80px #ff5edb",
            }}
            style={{
              width: "min(80vw, 300px)",
              height: "min(80vw, 300px)",
              objectFit: "cover",
              borderRadius: "30px",
              border: "3px solid #ff9efc",
              boxShadow: "0 0 60px rgba(255, 94, 219, 0.8)",
              cursor: "pointer",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
        ))}
      </motion.div>

      {/* 👆 подсказка для iPhone */}
      <div
        id="tapHint"
        style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          color: "#ccc",
          fontSize: "0.9rem",
          zIndex: 5,
          animation: "pulse 2s infinite",
        }}
      >
        🎵 Нажми на экран, чтобы начать праздник
      </div>
    </div>
  );
}
