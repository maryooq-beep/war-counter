"use client";

import type { PointerEvent, ReactNode } from "react";

export default function DonatePanel({ children }: { children: ReactNode }) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;

    event.currentTarget.style.setProperty("--donate-bg-x", `${x}px`);
    event.currentTarget.style.setProperty("--donate-bg-y", `${y}px`);
  }

  function resetMotion(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--donate-bg-x", "0px");
    event.currentTarget.style.setProperty("--donate-bg-y", "0px");
  }

  return (
    <div
      className="donate-panel"
      onPointerLeave={resetMotion}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
