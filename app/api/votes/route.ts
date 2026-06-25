import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VOTE_OPTIONS = ["recycling", "social", "civic"] as const;
type VoteOption = (typeof VOTE_OPTIONS)[number];
type VoteTotals = Record<VoteOption, number>;

const VOTE_KEY_PREFIX = "war-counter:votes";

function emptyVoteTotals(): VoteTotals {
  return {
    recycling: 0,
    social: 0,
    civic: 0,
  };
}

function isVoteOption(value: unknown): value is VoteOption {
  return typeof value === "string" && VOTE_OPTIONS.includes(value as VoteOption);
}

function getVoteStorageConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  return {
    token,
    url: url.replace(/\/$/, ""),
  };
}

function voteKey(option: VoteOption) {
  return `${VOTE_KEY_PREFIX}:${option}`;
}

async function redisCommand<T>(command: Array<string | number>): Promise<T> {
  const config = getVoteStorageConfig();

  if (!config) {
    throw new Error("Missing vote storage configuration");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Vote storage request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { error?: string; result?: T };

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result as T;
}

function parseStoredCount(value: unknown) {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : 0;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

async function getVoteTotals() {
  const totals = emptyVoteTotals();

  await Promise.all(
    VOTE_OPTIONS.map(async (option) => {
      const value = await redisCommand<string | number | null>(["GET", voteKey(option)]);
      totals[option] = parseStoredCount(value);
    })
  );

  return totals;
}

function missingStorageResponse() {
  return NextResponse.json(
    {
      error:
        "Missing vote storage configuration. Set KV_REST_API_URL and KV_REST_API_TOKEN.",
    },
    { status: 500 }
  );
}

export async function GET() {
  if (!getVoteStorageConfig()) return missingStorageResponse();

  try {
    return NextResponse.json({ totals: await getVoteTotals() });
  } catch (error) {
    console.error("Vote totals read failed:", error);
    return NextResponse.json(
      { error: "Vote totals could not be loaded." },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  if (!getVoteStorageConfig()) return missingStorageResponse();

  let payload: { option?: unknown };

  try {
    payload = (await request.json()) as { option?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!isVoteOption(payload.option)) {
    return NextResponse.json({ error: "Invalid vote option." }, { status: 400 });
  }

  try {
    await redisCommand<number>(["INCR", voteKey(payload.option)]);
    return NextResponse.json({ totals: await getVoteTotals() });
  } catch (error) {
    console.error("Vote total update failed:", error);
    return NextResponse.json(
      { error: "Vote could not be saved." },
      { status: 502 }
    );
  }
}
