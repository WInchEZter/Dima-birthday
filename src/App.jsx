import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    // запуск музыки по клику
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // фейерверки
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 160,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.7 },
        colors: ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400"],
      });
    }, 3000);

    // аудио-анализ для эффекта под бит
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

    // кометы и визуализация фона
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let comets = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const spawnComet = () => {
      comets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 3 + 2,
        hue: Math.random() * 360,
      });
    };

    // рисуем фон + кометы
    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;

      ctx.fillStyle = `rgba(0, 0, 20, 0.3)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // неоновые волны (пульс под бит)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.2
      );
      gradient.addColorStop(
        0,
        `rgba(${100 + avg * 200},${20 + avg * 200},${255 - avg * 200},0.9)`
      );
      gradient.addColorStop(1, `rgba(0,0,0,0.6)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // кометы
      if (Math.random() < 0.02) spawnComet();
      comets.forEach((c, i) => {
        c.x += c.speed;
        c.y += Math.sin(c.x / 50) * 2;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${c.hue},100%,70%)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${c.hue},100%,70%)`;
        ctx.fill();
        if (c.x > canvas.width + 50) comets.splice(i, 1);
      });

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
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* музыка */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* неоновый фон */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* текст */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "4rem",
          textAlign: "center",
          color: "#ff9efc",
          textShadow: "0 0 30px #ff5edb, 0 0 60px #ff5edb",
          zIndex: 3,
        }}
      >
        🎉 С Днём Рождения, Дима! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          maxWidth: "700px",
          marginTop: "20px",
          lineHeight: "1.7em",
          textShadow: "0 0 15px rgba(255,255,255,0.7)",
          zIndex: 3,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀 <br />
        а настроение будет, как после пятничного кофе ☕ <br />
        от твоего братишки Исмаила 😎
      </motion.p>

      {/* фотки */}
      <motion.div
        style={{
          display: "flex",
          gap: "80px",
          marginTop: "60px",
          zIndex: 3,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={`Дима ${n}`}
            animate={{
              y: [0, -25, 0, 25, 0],
              rotateY: [0, 10, -10, 0],
              rotateZ: [0, 2, -2, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            whileHover={{
              scale: 1.12,
              boxShadow: "0 0 60px #ff5edb",
            }}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "40px",
              border: "4px solid #ff9efc",
              boxShadow: "0 0 50px rgba(255, 94, 219, 0.8)",
              cursor: "pointer",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
