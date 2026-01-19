'use client'
import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }))

    function animate() {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`
        ctx.fill()

        star.alpha += star.speed
        if (star.alpha <= 0.2 || star.alpha >= 1) {
          star.speed *= -1
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-100 pointer-events-none"
        
    />
  )
}
