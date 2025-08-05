"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const colors = [
      "from-blue-400 to-blue-600",
      "from-emerald-400 to-emerald-600",
      "from-teal-400 to-teal-600",
      "from-cyan-300 to-blue-500",
    ]

    const createParticles = () => {
      const newParticles: Particle[] = []
      // Reduce particle count on mobile for better performance
      const particleCount = isMobile ? 30 : 80

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * (isMobile ? 4 : 6) + 2,
          speedX: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
          speedY: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setParticles(newParticles)
    }

    createParticles()
    window.addEventListener("resize", createParticles)

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          if (newX > window.innerWidth) newX = 0
          if (newX < 0) newX = window.innerWidth
          if (newY > window.innerHeight) newY = 0
          if (newY < 0) newY = window.innerHeight

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    // Reduce animation frequency on mobile
    const interval = setInterval(animateParticles, isMobile ? 32 : 16)

    return () => {
      window.removeEventListener("resize", createParticles)
      window.removeEventListener("resize", checkMobile)
      clearInterval(interval)
    }
  }, [isMobile])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-r ${particle.color} animate-pulse`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: "blur(1px)",
            boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.3)`,
          }}
        />
      ))}
    </div>
  )
}
