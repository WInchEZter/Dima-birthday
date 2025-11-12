import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // 🎵 Автовоспроизведение музыки (по клику на экран)
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // 🎇 Повторяющаяся анимация
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: "url('/dima1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Музыка */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Полупрозрачный слой */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      ></div>

      {/* Контент */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1, textAlign: "center" }}
      >
        <h1 style={{ fontSize: "3rem", color: "#ff5edb" }}>
          🎉 С Днём Рождения, Дима! 🎉
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            marginTop: "1rem",
            maxWidth: "700px",
            marginInline: "auto",
          }}
        >
          Пусть зарплата в Сокаре растёт как ракета 🚀 <br />
          а настроение будет, как после пятничного кофе ☕ <br />
          от твоего братишки Исмаила 😎
        </p>

        <img
          src="/dima2.jpg"
          alt="Дима"
          style={{
            marginTop: "2rem",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "4px solid #ff5edb",
            boxShadow: "0 0 25px #ff5edb",
          }}
        />
      </motion.div>
    </div>
  );
}
