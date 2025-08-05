import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Registration fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    const { data, error } = await supabase
      .from("registrations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Registration update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
