"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  currentRole?: string
  experienceLevel: "beginner" | "intermediate" | "advanced"
  programType: "mentorship" | "bootcamp"
  areasOfInterest?: string
  schedulePreference?: "weekdays" | "evenings" | "weekends" | "flexible"
  goalsExpectations?: string
  termsAccepted: boolean
}

export function useRegistration() {
  const [isLoading, setIsLoading] = useState(false)

  const submitRegistration = async (data: RegistrationData) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      toast({
        title: "Registration Successful!",
        description: result.message,
      })

      return { success: true, data: result.data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      })

      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submitRegistration,
    isLoading,
  }
}
