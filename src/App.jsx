import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // музыка при клике
    const handleClick = () => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // фейерверки каждые 2 секунды
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 180,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.7 },
        colors: ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400"],
      });
    }, 2000);

    // частицы (искры)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(confettiInterval);
      window.removeEventListener("resize", resize);
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
      {/* 🎵 музыка */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🌌 фон (анимированный неон) */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, #1b0033, #000000 70%)",
          zIndex: 0,
        }}
      />

      {/* ✨ искры */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      {/* текст */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "4.2rem",
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

      {/* 📸 фотки — крупные и динамичные */}
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
              y: [0, -30, 0, 30, 0],
              rotateY: [0, 15, -15, 0],
              rotateZ: [0, 3, -3, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 60px #ff5edb",
              rotateY: 0,
            }}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "40px",
              border: "4px solid #ff9efc",
              boxShadow: "0 0 50px rgba(255, 94, 219, 0.8)",
              cursor: "pointer",
              background: "#111",
              transformStyle: "preserve-3d",
            }}
          />
        ))}
      </motion.div>

      {/* 💫 вращающаяся неоновая подпись */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          marginTop: "90px",
          fontSize: "1.6rem",
          color: "#00f5d4",
          textShadow:
            "0 0 25px #00f5d4, 0 0 50px #00f5d4, 0 0 80px #00f5d4",
          zIndex: 3,
        }}
      >
        💫 От Исмаила с любовью 💫
      </motion.div>
    </div>
  );
}
