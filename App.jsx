import React, {useRef} from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function App(){
  const audioRef = useRef(null)

  const burst = () => {
    const count = 180
    const defaults = { spread: 70, startVelocity: 28, ticks: 200 }
    confetti(Object.assign({ origin: { x: 0 } }, defaults, { particleCount: count }))
    confetti(Object.assign({ origin: { x: 1 } }, defaults, { particleCount: count }))
  }

  const fireworks = () => {
    const end = Date.now() + 1500
    ;(function frame(){
      confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  const balloons = () => {
    // emoji rain
    const emojis = ['🎈','🎈','🤡','🎉','✨','🎪','🎵']
    for (let i=0;i<18;i++){
      const span = document.createElement('span')
      span.style.position = 'fixed'
      span.style.left = (Math.random()*100)+'vw'
      span.style.top = '-30px'
      span.style.fontSize = (20 + Math.random()*24) + 'px'
      span.textContent = emojis[(Math.random()*emojis.length)|0]
      span.style.transition = 'transform 5s linear, opacity 5s linear'
      document.body.appendChild(span)
      requestAnimationFrame(()=>{
        span.style.transform = `translateY(${110}vh)`
        span.style.opacity = '0.9'
      })
      setTimeout(()=> span.remove(), 5200)
    }
  }

  const startShow = async () => {
    // music.mp3 должен лежать в /public/music.mp3
    try { await audioRef.current.play() } catch(e){}
    burst(); fireworks(); balloons()
  }

  return (
    <div className="container">
      <div className="card">
        <div className="glow" aria-hidden />
        <div className="badge">Сегодня твой день 🎂</div>
        <motion.h1 className="title"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .7, ease: 'easeOut' }}
        >
          С Днём Рождения, <span className="accent">Дима</span>! 🎉
        </motion.h1>
        <motion.p className="subtitle"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: .1 }}}
        >
          От Исмаила — цирковое неоновое шоу. Высоких зарплат в Сокаре, больших побед и много смеха! 💸
        </motion.p>

        <div className="row">
          <button onClick={startShow}>Запустить шоу</button>
          <button onClick={fireworks}>Фейерверк ✨</button>
          <button onClick={burst}>Конфетти 🎊</button>
          <button onClick={balloons}>Эмодзи 🎈</button>
        </div>

        <motion.div className="gallery"
          initial="hidden" animate="show"
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:.08 } } }}
        >
          <motion.img variants={{ hidden:{scale:.95, opacity:0}, show:{scale:1, opacity:1}}} src="/dima1.jpg" alt="dima 1" className="photo"/>
          <motion.img variants={{ hidden:{scale:.95, opacity:0}, show:{scale:1, opacity:1}}} src="/dima2.jpg" alt="dima 2" className="photo"/>
        </motion.div>

        <div className="footer">Подпись: от Исмаила 😎</div>

        {/* Пользователь добавит файл в /public/music.mp3 */}
        <audio ref={audioRef} src="/music.mp3" preload="auto" />
      </div>
    </div>
  )
}
