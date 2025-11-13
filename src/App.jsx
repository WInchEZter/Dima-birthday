import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    // Музыка по клику (iPhone-friendly autoplay)
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      const hint = document.getElementById("tapHint");
      if (hint) hint.style.display = "none";
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // Конфетти
    const fireConfetti = () => {
      const end = Date.now() + 900;
      const colors = ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400", "#00c3ff"];
      (function frame() {
        confetti({
          particleCount: 10,
          spread: 80,
          origin: { x: Math.random(), y: Math.random() * 0.3 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    };
    const confettiInterval = setInterval(fireConfetti, 2500);

    // Аудио-анализатор (фон реагирует по басам)
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

    // Фон-анимация
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

      ctx.fillStyle = "rgba(0,0,20,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.4
      );

      grad.addColorStop(0, `rgba(${150 + avg * 100}, 50, 255, 0.9)`);
      grad.addColorStop(1, "rgba(0,0,0,0.5)");

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

  // Летающие клоуны 🤡
  const flyingClowns = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 35,
    xStart: Math.random() * 100,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 7,
  }));

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "'Orbitron', sans-serif",
        position: "relative",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      {/* Летающие клоуны 🤡 */}
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

      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "clamp(2.2rem, 7vw, 4.3rem)",
          textAlign: "center",
          margin: "25px 0",
          zIndex: 3,
          fontWeight: 700,
          background:
            "linear-gradient(90deg, #ff00ff, #00eaff, #ffea00, #ff00ff)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "titleColorShift 6s ease-in-out infinite",
          textShadow: "0 0 20px rgba(255,255,255,0.5)",
        }}
      >
        🎉🤡 С Днём Рождения, Дима! 🤡🎉
      </motion.h1>

      {/* Пожелание */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.4rem)",
          textAlign: "center",
          marginTop: 10,
          maxWidth: 700,
          lineHeight: 1.7,
          textShadow: "0 0 20px rgba(255,255,255,0.7)",
          zIndex: 3,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀  
        настроение всегда на 100%  
        а удача рядом каждый день!  
        От братишки Исмаила 😎🔥
      </motion.p>

      {/* 📸 Фото (исправленные!) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          width: "100%",
          maxWidth: "950px",
          padding: "20px",
          marginTop: "40px",
          zIndex: 3,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            style={{
              padding: "12px",
              borderRadius: "25px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 30px rgba(255, 0, 255, 0.35)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
            className="floating"
          >
            <img
              src={`/dima${n}.jpg`}
              alt={n}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Подсказка */}
      <div
        id="tapHint"
        style={{
          position: "fixed",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          color: "#ccc",
          zIndex: 5,
          animation: "pulse 2s infinite",
        }}
      >
        🎵 Нажми на экран, чтобы включить музыку
      </div>

      {/* Анимация цвета для заголовка */}
      <style>
        {`
        @keyframes titleColorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .floating {
          animation: float 4s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
