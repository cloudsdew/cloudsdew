import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { z } from "zod"

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = newsletterSchema.parse(body)

    // Insert or update the newsletter subscription
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .upsert({
        email: validatedData.email,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
