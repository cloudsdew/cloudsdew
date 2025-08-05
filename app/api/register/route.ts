import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { z } from "zod"

// Validation schema for registration
const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(1, "Phone number is required").max(20),
  currentRole: z.string().max(200).optional().or(z.literal("")),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  programType: z.enum(["mentorship", "bootcamp"]),
  areasOfInterest: z.string().max(500).optional().or(z.literal("")),
  schedulePreference: z.enum(["weekdays", "evenings", "weekends", "flexible"]).optional().or(z.literal("")),
  goalsExpectations: z.string().optional().or(z.literal("")),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received registration data:", body)

    // Validate the request body
    const validatedData = registrationSchema.parse(body)
    console.log("Validated data:", validatedData)

    // Check if email already exists
    const { data: existingRegistration, error: checkError } = await supabase
      .from("registrations")
      .select("id")
      .eq("email", validatedData.email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing registration:", checkError)
      return NextResponse.json({ error: "Database error while checking email" }, { status: 500 })
    }

    if (existingRegistration) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Prepare data for insertion
    const insertData = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      current_role_title: validatedData.currentRole || null,
      experience_level: validatedData.experienceLevel,
      program_type: validatedData.programType,
      areas_of_interest: validatedData.areasOfInterest || null,
      schedule_preference: validatedData.schedulePreference || null,
      goals_expectations: validatedData.goalsExpectations || null,
      terms_accepted: validatedData.termsAccepted,
      status: "pending" as const,
    }

    console.log("Inserting data:", insertData)

    // Insert the registration
    const { data, error } = await supabase.from("registrations").insert(insertData).select().single()

    if (error) {
      console.error("Supabase insertion error:", error)
      return NextResponse.json(
        {
          error: "Failed to register. Please try again.",
          details: error.message,
        },
        { status: 500 },
      )
    }

    console.log("Registration successful:", data)

    return NextResponse.json({
      success: true,
      message: "Registration successful! We will contact you soon.",
      data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
