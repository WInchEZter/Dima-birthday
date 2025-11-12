import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // запуск музыки при клике
    const handleClick = () => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // фейерверки и конфетти каждые 2 секунды
    const interval = setInterval(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.7 },
        colors: ["#ff00ff", "#00f5d4", "#f9c80e", "#ff5400"],
      });
    }, 2000);

    return () => clearInterval(interval);
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

      {/* 🌈 фон с мягким дыханием и переливом */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(-45deg, #000000, #5f00ba, #9e0059, #ff0054, #ff5400)",
          backgroundSize: "400% 400%",
          zIndex: 0,
        }}
      />

      {/* 🎉 главный текст */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "4rem",
          textAlign: "center",
          color: "#ff9efc",
          textShadow: "0 0 25px #ff5edb",
          zIndex: 2,
        }}
      >
        🎉 С Днём Рождения, Дима! 🎉
      </motion.h1>

      {/* пожелание */}
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
          textShadow: "0 0 15px rgba(255,255,255,0.6)",
          zIndex: 2,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀 <br />
        а настроение будет, как после пятничного кофе ☕ <br />
        от твоего братишки Исмаила 😎
      </motion.p>

      {/* 📸 фотки — крупные, с 3D-эффектом */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          display: "flex",
          gap: "60px",
          marginTop: "60px",
          zIndex: 2,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={`Дима ${n}`}
            animate={{
              y: [0, -15, 0, 15, 0],
              rotateZ: i === 0 ? [0, 2, -2, 0] : [0, -2, 2, 0],
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 50px #ff5edb",
            }}
            style={{
              width: "260px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "30px",
              border: "3px solid #ff9efc",
              boxShadow: "0 0 40px rgba(255, 94, 219, 0.8)",
              cursor: "pointer",
              background: "#111",
            }}
          />
        ))}
      </motion.div>

      {/* 🔄 вращающаяся неоновая подпись */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          marginTop: "80px",
          fontSize: "1.4rem",
          color: "#00f5d4",
          textShadow:
            "0 0 20px #00f5d4, 0 0 40px #00f5d4, 0 0 80px #00f5d4",
          zIndex: 2,
        }}
      >
        💫 От Исмаила с любовью 💫
      </motion.div>
    </div>
  );
}
