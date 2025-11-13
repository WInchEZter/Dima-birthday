import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    // Музыка запускается по клику (iPhone fix)
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      const hint = document.getElementById("tapHint");
      if (hint) hint.style.display = "none";
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // Конфетти каждые 2.5 секунды
    const fireConfetti = () => {
      const end = Date.now() + 1000;
      const colors = ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400", "#00c3ff"];
      (function frame() {
        confetti({
          particleCount: 12,
          spread: 75,
          origin: { x: Math.random(), y: Math.random() * 0.3 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    };
    const confettiInterval = setInterval(fireConfetti, 2500);

    // Аудио-анализатор
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
        canvas.width / 1.3
      );

      grad.addColorStop(0, `rgba(${150 + avg * 100}, 50, 255, 0.8)`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0.6)");

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

      {/* 🌈 Заголовок с цветной анимацией + клоуны 🤡 */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
          fontWeight: 700,
          textAlign: "center",
          background:
            "linear-gradient(90deg, #ff00ff, #00eaff, #ffea00, #ff00ff)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "titleColorShift 6s ease-in-out infinite",
          textShadow: "0 0 25px rgba(255,255,255,0.4)",
          zIndex: 3,
        }}
      >
        🎉🤡 С Днём Рождения, Дима! 🤡🎊
      </motion.h1>

      {/* Текст пожеланий */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          fontSize: "clamp(1rem, 4vw, 1.4rem)",
          textAlign: "center",
          marginTop: 20,
          maxWidth: 700,
          lineHeight: 1.7,
          textShadow: "0 0 20px rgba(255,255,255,0.6)",
          zIndex: 3,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀  
        настроение будет всегда на 100%  
        а удача будет рядом каждый день!  
        От братишки Исмаила 😎🔥
      </motion.p>

      {/* Фото Димы */}
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 30,
          marginTop: 40,
          zIndex: 3,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={n}
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
            style={{
              width: "min(80vw, 300px)",
              height: "min(80vw, 300px)",
              objectFit: "cover",
              borderRadius: 30,
              border: "3px solid #ff9efc",
              boxShadow: "0 0 50px rgba(255, 94, 219, 0.8)",
              cursor: "pointer",
            }}
          />
        ))}
      </motion.div>

      {/* Подсказка для iPhone */}
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

      {/* Анимация смены цвета заголовка */}
      <style>
        {`
        @keyframes titleColorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </div>
  );
}
