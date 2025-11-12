import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    // автозапуск музыки при первом клике
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // конфетти + фейерверки каждые 2.5 секунды
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#ff5edb", "#8ef9f3", "#ffe45e", "#9b5de5"],
      });
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#00f5d4", "#f15bb5", "#fee440"],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#9b5de5", "#f15bb5", "#fee440"],
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* музыка */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* анимированный градиентный фон */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(-45deg, #000000, #390099, #9e0059, #ff0054, #ff5400)",
          backgroundSize: "400% 400%",
          zIndex: 0,
        }}
      />

      {/* текст */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "3.5rem",
          textAlign: "center",
          color: "#ff9efc",
          textShadow: "0 0 20px #ff5edb",
          zIndex: 2,
        }}
      >
        🎉 С Днём Рождения, Дима! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          fontSize: "1.3rem",
          textAlign: "center",
          maxWidth: "650px",
          marginTop: "15px",
          lineHeight: "1.6em",
          zIndex: 2,
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀 <br />
        а настроение будет, как после пятничного кофе ☕ <br />
        от твоего братишки Исмаила 😎
      </motion.p>

      {/* блок с фотками */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "40px",
          perspective: "800px",
          zIndex: 2,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={`Дима ${n}`}
            whileHover={{
              rotateY: i === 0 ? 10 : -10,
              scale: 1.05,
              boxShadow: "0 0 40px #ff5edb",
            }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "20px",
              border: "3px solid #ff9efc",
              boxShadow: "0 0 20px rgba(255, 94, 219, 0.6)",
              cursor: "pointer",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
