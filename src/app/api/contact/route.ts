import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (!scriptUrl) {
      // For demo purposes, we'll just log and return success if no URL is present
      console.log("No GOOGLE_SCRIPT_URL found. Mocking spreadsheet save.")
      console.log({ name, email, message })
      return NextResponse.json({ success: true, mocked: true })
    }

    // Send data to Google Apps Script Web App
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("message", message)
    // Send current date/time
    formData.append("date", new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }))

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to save to spreadsheet")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Spreadsheet error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
