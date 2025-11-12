import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const audioRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const rotateX = useTransform(bgY, [-100, 100], [15, -15]);
  const rotateY = useTransform(bgX, [-100, 100], [-15, 15]);

  useEffect(() => {
    // запуск музыки
    const handleClick = () => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);

    // фейерверки
    const interval = setInterval(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff5edb", "#8ef9f3", "#ffe45e", "#9b5de5"],
      });
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 90,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 90,
        origin: { x: 1 },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // параллакс эффект
  const handleMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    bgX.set(x / 20);
    bgY.set(y / 20);
    setMouse({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        perspective: "1000px",
      }}
    >
      {/* 🎵 музыка */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🌈 фон с переливом и вспышками */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          filter: [
            "brightness(1)",
            "brightness(1.2)",
            "brightness(1)",
            "brightness(0.8)",
            "brightness(1)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* 📸 фотки */}
      <motion.div
        style={{
          display: "flex",
          gap: "60px",
          marginTop: "50px",
          zIndex: 2,
        }}
      >
        {[1, 2].map((n, i) => (
          <motion.img
            key={n}
            src={`/dima${n}.jpg`}
            alt={`Дима ${n}`}
            animate={{
              y: [0, -10, 0, 10, 0],
              rotateZ: i === 0 ? [0, 2, -2, 0] : [0, -2, 2, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px #ff5edb",
            }}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "25px",
              border: "3px solid #ff9efc",
              boxShadow: "0 0 25px rgba(255, 94, 219, 0.7)",
              cursor: "pointer",
              transformStyle: "preserve-3d",
            }}
          />
        ))}
      </motion.div>

      {/* параллакс наклон */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "center",
          rotateX,
          rotateY,
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}
