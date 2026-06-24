"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

export default function DonatePageShell({ children }: { children: ReactNode }) {
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const arrivedFromTransition =
      window.sessionStorage.getItem("donate-transition") === "true";

    if (!arrivedFromTransition) return;

    window.sessionStorage.removeItem("donate-transition");
    setIsRevealing(true);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;

    event.currentTarget.style.setProperty("--donate-page-bg-x", `${x}px`);
    event.currentTarget.style.setProperty("--donate-page-bg-y", `${y}px`);
  }

  function resetMotion(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--donate-page-bg-x", "0px");
    event.currentTarget.style.setProperty("--donate-page-bg-y", "0px");
  }

  return (
    <main
      className={`donate-page ${isRevealing ? "is-revealing" : ""}`}
      onPointerLeave={resetMotion}
      onPointerMove={handlePointerMove}
    >
      {children}
    </main>
  );
}
