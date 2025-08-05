import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { z } from "zod"

// Validation schema for contact messages
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(300).optional(),
  message: z.string().min(1, "Message is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Insert the contact message
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
      data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
