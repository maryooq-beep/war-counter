import { NextResponse } from "next/server";
import { Resend } from "resend";

const DEFAULT_RECEIVER_EMAIL = "mariaparakhina.studio@gmail.com";
const resend = new Resend(process.env.RESEND_API_KEY);

type SubscribePayload = {
  email?: unknown;
  createdAt?: unknown;
  page?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY is missing" },
      { status: 500 }
    );
  }

  const receiverEmail = process.env.IDEA_RECEIVER_EMAIL || DEFAULT_RECEIVER_EMAIL;
  const createdAt =
    typeof payload.createdAt === "string" ? payload.createdAt : new Date().toISOString();
  const page = payload.page === "war-counter" ? "war-counter" : "war-counter";

  try {
    const result = await resend.emails.send({
      from: "War Counter <onboarding@resend.dev>",
      to: receiverEmail,
      subject: "New email signup on War Counter",
      text: [
        "New email signup on War Counter",
        "",
        `Email: ${email}`,
        `Created at: ${createdAt}`,
        `Page: ${page}`,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend subscription email error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Email provider returned an error." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("Resend subscription email error:", error);
    return NextResponse.json(
      { ok: false, error: "Email sending failed." },
      { status: 502 }
    );
  }
}
