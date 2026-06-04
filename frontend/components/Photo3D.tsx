'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Photo3D() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for a fluid 3D effect
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.3)] border-4 border-cyan-500/20 cursor-pointer overflow-hidden group"
    >
      <div 
        className="absolute inset-x-0 bottom-0 h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: "url('https://github.com/davange-rushikesh.png')",
          transform: "translateZ(40px)",
        }}
      />
      {/* Glossy overlay effect for the 3D depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none"
        style={{ transform: "translateZ(60px)" }}
      />
    </motion.div>
  )
}
