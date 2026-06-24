import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_IDEA_LENGTH = 2000;
const DEFAULT_RECEIVER_EMAIL = "mariaparakhina.studio@gmail.com";
const resend = new Resend(process.env.RESEND_API_KEY);

type IdeaPayload = {
  idea?: unknown;
  selectedVote?: unknown;
  createdAt?: unknown;
  page?: unknown;
};

export async function POST(request: Request) {
  let payload: IdeaPayload;

  try {
    payload = (await request.json()) as IdeaPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const idea = typeof payload.idea === "string" ? payload.idea.trim() : "";

  if (!idea) {
    return NextResponse.json({ error: "Idea is required." }, { status: 400 });
  }

  if (idea.length > MAX_IDEA_LENGTH) {
    return NextResponse.json(
      { error: `Idea must be ${MAX_IDEA_LENGTH} characters or fewer.` },
      { status: 400 }
    );
  }

  const receiverEmail = process.env.IDEA_RECEIVER_EMAIL || DEFAULT_RECEIVER_EMAIL;
  const submission = {
    idea,
    selectedVote:
      typeof payload.selectedVote === "string" ? payload.selectedVote : null,
    createdAt: typeof payload.createdAt === "string" ? payload.createdAt : new Date().toISOString(),
    page: payload.page === "war-counter" ? "war-counter" : "war-counter",
    receiver: receiverEmail,
  };

  // TODO: Add real email provider credentials in .env.local
  // IDEA_RECEIVER_EMAIL=mariaparakhina.studio@gmail.com
  // RESEND_API_KEY=re_...
  console.log("Idea submission received:", submission);
  console.log("RESEND_API_KEY exists:", Boolean(process.env.RESEND_API_KEY));

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY is missing" },
      { status: 500 }
    );
  }

  console.log("Sending idea email to:", receiverEmail);

  try {
    const result = await resend.emails.send({
      from: "War Counter <onboarding@resend.dev>",
      to: receiverEmail,
      subject: "New idea submitted on War Counter",
      text: [
        "New idea submitted on War Counter",
        "",
        `Idea: ${submission.idea}`,
        `Selected vote: ${submission.selectedVote ?? "none"}`,
        `Created at: ${submission.createdAt}`,
        `Page: ${submission.page}`,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend email error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Email provider returned an error." },
        { status: 502 }
      );
    }

    console.log("Resend email sent:", result);
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("Resend email error:", error);
    return NextResponse.json(
      { ok: false, error: "Email sending failed." },
      { status: 502 }
    );
  }
}
