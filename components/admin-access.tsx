"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface AdminAccessProps {
  children: React.ReactNode
}

export function AdminAccess({ children }: AdminAccessProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    setShowTooltip(true)

    if (newCount >= 5) {
      router.push("/admin")
      setClickCount(0)
      setShowTooltip(false)
    } else {
      setTimeout(() => setShowTooltip(false), 2000)
    }

    // Reset count after 5 seconds of inactivity
    setTimeout(() => {
      if (newCount < 5) {
        setClickCount(0)
      }
    }, 5000)
  }

  return (
    <div className="relative">
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {showTooltip && clickCount < 5 && (
        <div className="absolute top-full left-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
          {5 - clickCount} more clicks for admin access
        </div>
      )}
    </div>
  )
}
