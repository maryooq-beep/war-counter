import { existsSync } from "node:fs";
import path from "node:path";
import DonateContent from "./DonateContent";
import DonatePageShell from "./DonatePageShell";

function getPortraitSrc() {
  // HEIC is not used directly because browser support is unreliable; use JPG or PNG for the portrait.
  const candidates = [
    "/images/maria.jpg",
    "/images/maria.png",
  ];

  return (
    candidates.find((candidate) =>
      existsSync(path.join(process.cwd(), "public", candidate.slice(1)))
    ) ?? "/images/maria.jpg"
  );
}

export default function DonatePage() {
  const portraitSrc = getPortraitSrc();

  return (
    <DonatePageShell>
      <div className="donate-atmosphere" aria-hidden="true" />
      <DonateContent portraitSrc={portraitSrc} />
    </DonatePageShell>
  );
}
