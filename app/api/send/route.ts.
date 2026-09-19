import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, serviceTitle, servicePrice } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["elanaspww@gmail.com"],
      replyTo: email,
      subject: `New Service Request: ${serviceTitle}`,
      html: `
        <h2>New Order Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Package:</strong> ${serviceTitle} (${servicePrice})</p>
        <hr />
        <h3>Details / Notes:</h3>
        <p>${message || "No additional notes provided."}</p>
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json({ error: data.error.message || "Failed to send email." }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 });
  }
}
