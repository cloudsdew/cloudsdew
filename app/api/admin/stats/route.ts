import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Get total registrations
    const { count: totalRegistrations } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })

    // Get pending registrations
    const { count: pendingRegistrations } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    // Get total messages
    const { count: totalMessages } = await supabase.from("contact_messages").select("*", { count: "exact", head: true })

    // Get unread messages
    const { count: unreadMessages } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false)

    return NextResponse.json({
      totalRegistrations: totalRegistrations || 0,
      pendingRegistrations: pendingRegistrations || 0,
      totalMessages: totalMessages || 0,
      unreadMessages: unreadMessages || 0,
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
