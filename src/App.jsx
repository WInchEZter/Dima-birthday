import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  useEffect(() => {
    // запуск анимаций каждые 3 секунды
    const interval = setInterval(() => {
      // конфетти
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });

      // небольшой "фейерверк"
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });
    }, 3000);

    // очистка при размонтировании
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
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "3rem", color: "#ff5edb", textAlign: "center" }}
      >
        🎉 С Днём Рождения, Дима! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          fontSize: "1.4rem",
          maxWidth: "700px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Пусть зарплата в Сокаре растёт как ракета 🚀  
        а настроение будет, как после пятничного кофе ☕  
        от твоего братишки Исмаила 😎
      </motion.p>
    </div>
  );
}
