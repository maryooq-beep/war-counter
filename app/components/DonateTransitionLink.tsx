"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const FLIP_DURATION = 560;
const DARK_HOLD_DURATION = 220;
const REDUCED_MOTION_DURATION = 180;

export default function DonateTransitionLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("donate-flip-transitioning");
      overlayRef.current?.remove();
      overlayRef.current = null;
    };
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (isTransitioning) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const audioFadeDuration = reduceMotion ? REDUCED_MOTION_DURATION : FLIP_DURATION;
    const navigationDelay = reduceMotion
      ? REDUCED_MOTION_DURATION
      : FLIP_DURATION + DARK_HOLD_DURATION;

    setIsTransitioning(true);
    document.documentElement.classList.add("donate-flip-transitioning");
    overlayRef.current = document.createElement("div");
    overlayRef.current.className = "donate-route-transition";
    overlayRef.current.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlayRef.current);

    window.sessionStorage.setItem("donate-transition", "true");
    window.dispatchEvent(
      new CustomEvent("war-counter:fade-audio-out", {
        detail: { duration: audioFadeDuration },
      })
    );

    window.setTimeout(() => {
      router.push("/donate");
    }, navigationDelay);
  }

  return (
    <>
      <a className={className} href="/donate" onClick={handleClick}>
        {children}
      </a>
    </>
  );
}
