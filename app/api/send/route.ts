import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing from environment variables");
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();

    const { name, email, message, serviceTitle, servicePrice } = body;

    const data = await resend.emails.send({
      from: "Portfolio Orders <onboarding@resend.dev>",
      to: ["elanaspww@gmail.com"], // <-- ΑΥΤΟ ΕΙΝΑΙ ΤΟ EMAIL ΤΟΥ RESEND ACCOUNT ΣΟΥ!
      replyTo: email ? String(email) : undefined,
      subject: `Νέα Παραγγελία: ${serviceTitle || "Υπηρεσία"} - ${name || "Πελάτης"}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #0284c7; margin-top: 0;">Νέα Αίτηση Πακέτου / Υπηρεσίας</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <p><strong>Όνομα Πελάτη:</strong> ${name || "Δεν ορίστηκε"}</p>
          <p><strong>Email Πελάτη:</strong> <a href="mailto:${email}">${email || "Δεν ορίστηκε"}</a></p>
          <p><strong>Πακέτο / Υπηρεσία:</strong> ${serviceTitle || "N/A"}</p>
          <p><strong>Τιμή:</strong> ${servicePrice || "N/A"}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <h3 style="margin-bottom: 5px;">Σημειώσεις / Μήνυμα:</h3>
          <p style="white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 14px;">${message || "Κανένα επιπλέον μήνυμα."}</p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
