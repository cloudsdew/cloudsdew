"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface ContactData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export function useContact() {
  const [isLoading, setIsLoading] = useState(false)

  const submitContact = async (data: ContactData) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: "Message Sent!",
        description: result.message,
      })

      return { success: true, data: result.data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message"

      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      })

      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submitContact,
    isLoading,
  }
}
