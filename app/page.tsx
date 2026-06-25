"use client";

import type { FormEvent, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import DonateTransitionLink from "./components/DonateTransitionLink";
import {
  ALTERNATIVE_TEXT,
  COPY as I18N_COPY,
  DEATHS_SOURCE_NOTE as I18N_DEATHS_SOURCE_NOTE,
  LANG_STORAGE_KEY,
  SOURCE_SLIDES_BY_LANG,
  type Alternative,
  type Lang,
} from "./i18n";

const CONFIG = {
  // Sources calculation:
  // - SIPRI estimated Russia's 2022 military expenditure at $86.4B.
  // - Since the full-scale invasion started on 24 Feb 2022, only 311/365 of 2022 is counted: about $73.6B.
  // - 2023: $109B.
  // - 2024: $149B.
  // - 2025: $190B.
  // - 2026 estimate: SIPRI 14.9 trillion RUB planned military expenditure.
  // - Converted using Bank of Russia official USD/RUB rate 74.6200 on 24.06.2026.
  // - 14.9T RUB / 74.6200 = about $199.68B per year.
  // - $199.68B / 365 / 24 / 60 / 60 = $6,331.76 per second.
  // - Base total at 2026-06-23T00:00:00Z = about $616.26B.
  baseAmountUsd: 616_259_611_181,
  baseDateIso: "2026-06-23T00:00:00Z",
  estimatedUsdPerSecond: 6_331.76,
  visualUpdateMs: 1250,
  deathsBaseEstimate: 471_418,
  deathsBaseDateIso: "2026-06-23T00:00:00Z",
  estimatedDeathsPerDay: 600,
  deathsVisualUpdateMs: 10_000,
  launchesBaseEstimate: 102_760,
  launchesBaseDateIso: "2026-06-23T00:00:00Z",
  estimatedLaunchesPerDay: 286,
  launchesVisualUpdateMs: 10_000,
  schoolEquivalentCost: 24_730_000,
};

const USD_TO_RUB = 74.62;
const AVERAGE_PUBLIC_FACILITY_RUB = 1_447_283_333;
const CITY_PUBLIC_INFRASTRUCTURE_BUNDLE_RUB = 30_818_500_000;

// Conservative model assumptions for the alternatives cards.
// These are editable placeholders and can be replaced with sourced values later.
const RECYCLING_SYSTEM_RUB = 45_000_000 * USD_TO_RUB;
const CHILD_EDUCATION_AND_LEISURE_ACCESS_RUB = 12_000_000 * USD_TO_RUB;
const CIVIC_LIFE_INFRASTRUCTURE_RUB = 2_500_000 * USD_TO_RUB;

// Average public facility cost is an arithmetic mean of a large regional school,
// a 500-visits-per-shift clinic, and a small municipal children’s/cultural centre,
// based on recent Voronezh and Irkutsk regional construction examples.
//
// City infrastructure bundle is a simplified model for one medium Russian city:
// 10 schools, 2 medical facilities, and 10 local children’s/cultural centres.
// It is used as an illustrative public-infrastructure equivalent, not as an official planning norm.

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.floor(value));
}

function getEstimatedDeaths() {
  const baseTime = new Date(CONFIG.deathsBaseDateIso).getTime();
  const elapsedMs = Math.max(0, Date.now() - baseTime);
  const elapsedDays = elapsedMs / 86_400_000;

  return (
    CONFIG.deathsBaseEstimate +
    Math.floor(elapsedDays * CONFIG.estimatedDeathsPerDay)
  );
}

function getEstimatedLaunches() {
  const baseTime = new Date(CONFIG.launchesBaseDateIso).getTime();
  const elapsedMs = Math.max(0, Date.now() - baseTime);
  const elapsedDays = elapsedMs / 86_400_000;

  return (
    CONFIG.launchesBaseEstimate +
    Math.floor(elapsedDays * CONFIG.estimatedLaunchesPerDay)
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [view, setView] = useState<"home" | "sources">("home");
  const [amount, setAmount] = useState(CONFIG.baseAmountUsd);
  const [deathCount, setDeathCount] = useState(CONFIG.deathsBaseEstimate);
  const [launchCount, setLaunchCount] = useState(CONFIG.launchesBaseEstimate);
  const [sourcesSlide, setSourcesSlide] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDraggingSources, setIsDraggingSources] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [idea, setIdea] = useState("");
  const [ideaSaved, setIdeaSaved] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubscriptionState, setFooterSubscriptionState] =
    useState<"idle" | "submitting" | "success">("idle");
  const [voteStats, setVoteStats] = useState<Record<string, number>>({
    recycling: 42,
    social: 61,
    civic: 21,
  });
  const [mounted, setMounted] = useState(false);
  const [activeAttributionId, setActiveAttributionId] = useState<string | null>(null);
  const attributionTimeoutRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const transitionRef = useRef<HTMLElement | null>(null);

  const t = I18N_COPY[lang];
  const sourceSlides = SOURCE_SLIDES_BY_LANG[lang];
  const alternatives = useMemo<Alternative[]>(() => {
    return ALTERNATIVE_TEXT[lang].map((item) => {
      if (item.id === "recycling") {
        return {
          ...item,
          unitCostRub: RECYCLING_SYSTEM_RUB,
          leftImage: "/images/waste.PNG",
          rightImage: "/images/recycling.PNG",
        };
      }

      if (item.id === "social") {
        return {
          ...item,
          unitCostRub: CHILD_EDUCATION_AND_LEISURE_ACCESS_RUB,
          leftImage: "/images/neglect.jpg",
          rightImage: "/images/care.PNG",
        };
      }

      return {
        ...item,
        unitCostRub: CIVIC_LIFE_INFRASTRUCTURE_RUB,
        leftImage: "/images/control.PNG",
        rightImage: "/images/community.PNG",
      };
    });
  }, [lang]);
  const isSourcesView = view === "sources";

  useEffect(() => {
    const savedLang = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (savedLang === "en" || savedLang === "ru" || savedLang === "ua") {
      setLang(savedLang);
    }

    setMounted(true);

    const savedVote = window.localStorage.getItem("war-counter-vote");
    if (savedVote) setSelected(savedVote);

    const savedVoteStats = window.localStorage.getItem("war-counter-vote-stats");
    if (savedVoteStats) {
      try {
        const parsed = JSON.parse(savedVoteStats) as Record<string, number>;
        setVoteStats((current) => ({
          ...current,
          ...parsed,
        }));
      } catch {
        // Keep the seeded local mock tally if parsing fails.
      }
    }

    if (!mounted) return;

    const tick = () => {
      const baseTime = Date.parse(CONFIG.baseDateIso);
      const secondsPassed = Math.max(0, (Date.now() - baseTime) / 1000);
      setAmount(
        CONFIG.baseAmountUsd + secondsPassed * CONFIG.estimatedUsdPerSecond
      );
    };

    tick();
    const intervalId = window.setInterval(tick, CONFIG.visualUpdateMs);

    return () => window.clearInterval(intervalId);
  }, [mounted]);

  useEffect(() => {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
    document.title = t.pageTitle;

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.content = t.pageDescription;
    }
  }, [lang, t.pageDescription, t.pageTitle]);

  useEffect(() => {
    return () => {
      if (attributionTimeoutRef.current !== null) {
        window.clearTimeout(attributionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      setDeathCount(getEstimatedDeaths());
    };

    tick();
    const intervalId = window.setInterval(tick, CONFIG.deathsVisualUpdateMs);

    return () => window.clearInterval(intervalId);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      setLaunchCount(getEstimatedLaunches());
    };

    tick();
    const intervalId = window.setInterval(tick, CONFIG.launchesVisualUpdateMs);

    return () => window.clearInterval(intervalId);
  }, [mounted]);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const updateProgress = () => {
      const viewportHeight = window.innerHeight;
      const transitionTop = transitionRef.current?.offsetTop ?? viewportHeight;
      const scrollY = window.scrollY;
      const start = Math.max(0, transitionTop - viewportHeight * 0.8);
      const end = transitionTop + viewportHeight * 0.55;
      const raw = (scrollY - start) / (end - start);
      const progress = clamp(raw, 0, 1);

      document.documentElement.style.setProperty("--bg-progress", `${progress}`);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      if (heroRef.current && !reduceMotion) {
        const rect = heroRef.current.getBoundingClientRect();
        const heroScrollable = Math.max(1, rect.height - viewportHeight);
        const heroProgress = clamp((0 - rect.top) / heroScrollable, 0, 1);
        const heroMoveY = -42 * heroProgress;
        const heroScale = 1.02 + heroProgress * 0.025;

        document.documentElement.style.setProperty("--hero-bg-y", `${heroMoveY}px`);
        document.documentElement.style.setProperty("--hero-bg-scale", `${heroScale}`);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.documentElement.style.removeProperty("--bg-progress");
      document.documentElement.style.removeProperty("--hero-bg-y");
      document.documentElement.style.removeProperty("--hero-bg-scale");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const TARGET_VOLUME = 0.01125;
    const FADE_DURATION = 8800;
    const FADE_STEPS = 110;

    const audio = new Audio("/audio/background.mp3");
    audio.volume = 0;
    audio.loop = true;
    audio.preload = "auto";

    let started = false;
    let starting = false;
    let fadeInterval: number | null = null;
    let fadeOutFrame: number | null = null;

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("scroll", startAudio);
    };

    const fadeInAudio = () => {
      if (fadeInterval) window.clearInterval(fadeInterval);
      if (fadeOutFrame) window.cancelAnimationFrame(fadeOutFrame);

      audio.volume = 0;

      const stepTime = FADE_DURATION / FADE_STEPS;
      const volumeStep = TARGET_VOLUME / FADE_STEPS;
      let currentStep = 0;

      fadeInterval = window.setInterval(() => {
        currentStep += 1;
        audio.volume = Math.min(TARGET_VOLUME, volumeStep * currentStep);

        if (currentStep >= FADE_STEPS && fadeInterval) {
          window.clearInterval(fadeInterval);
          fadeInterval = null;
          audio.volume = TARGET_VOLUME;
        }
      }, stepTime);
    };

    const fadeOutAudio = (duration = 1900) => {
      if (audio.paused || audio.volume <= 0) return;
      if (fadeInterval) {
        window.clearInterval(fadeInterval);
        fadeInterval = null;
      }
      if (fadeOutFrame) {
        window.cancelAnimationFrame(fadeOutFrame);
      }

      const startVolume = audio.volume;
      const startTime = window.performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 2);

        audio.volume = Math.max(0, startVolume * (1 - eased));

        if (progress < 1) {
          fadeOutFrame = window.requestAnimationFrame(tick);
          return;
        }

        audio.volume = 0;
        audio.pause();
        fadeOutFrame = null;
      };

      fadeOutFrame = window.requestAnimationFrame(tick);
    };

    const handleDonateTransitionAudio = (event: Event) => {
      const duration =
        event instanceof CustomEvent && typeof event.detail?.duration === "number"
          ? event.detail.duration
          : 1900;

      fadeOutAudio(duration);
    };

    async function startAudio() {
      if (started || starting) return;
      starting = true;
      try {
        audio.volume = 0;
        await audio.play();
        started = true;
        fadeInAudio();
        cleanupListeners();
      } catch (error) {
        starting = false;
        console.warn("[audio] play failed:", error);
      }
    }

    audio.addEventListener("error", () => {
      console.error("[audio] file load error", {
        error: audio.error,
        src: audio.src,
        networkState: audio.networkState,
      });
    });

    window.addEventListener("pointerdown", startAudio);
    window.addEventListener("click", startAudio);
    window.addEventListener("keydown", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("scroll", startAudio, { passive: true });
    window.addEventListener("war-counter:fade-audio-out", handleDonateTransitionAudio);

    audio.load();

    return () => {
      cleanupListeners();
      window.removeEventListener("war-counter:fade-audio-out", handleDonateTransitionAudio);
      audio.pause();
      if (fadeInterval) window.clearInterval(fadeInterval);
      if (fadeOutFrame) window.cancelAnimationFrame(fadeOutFrame);
    };
  }, []);

  const builtInsteadFacilities = useMemo(() => {
    return Math.floor((amount * USD_TO_RUB) / AVERAGE_PUBLIC_FACILITY_RUB);
  }, [amount]);

  const citiesEquipped = useMemo(() => {
    return Math.floor((amount * USD_TO_RUB) / CITY_PUBLIC_INFRASTRUCTURE_BUNDLE_RUB);
  }, [amount]);

  const facilitiesPerDay = Math.floor(
    ((CONFIG.estimatedUsdPerSecond * USD_TO_RUB) * 86_400) / AVERAGE_PUBLIC_FACILITY_RUB
  );

  const citiesEquippedPerDay =
    ((CONFIG.estimatedUsdPerSecond * USD_TO_RUB) * 86_400) /
    CITY_PUBLIC_INFRASTRUCTURE_BUNDLE_RUB;

  const selectedAlternative = useMemo(() => {
    return alternatives.find((item) => item.id === selected) ?? null;
  }, [selected]);

  const selectedEquivalent = useMemo(() => {
    if (!selectedAlternative) return null;
    return Math.floor((amount * USD_TO_RUB) / selectedAlternative.unitCostRub);
  }, [amount, selectedAlternative]);

  const recyclingSystems = useMemo(() => {
    return Math.floor((amount * USD_TO_RUB) / RECYCLING_SYSTEM_RUB);
  }, [amount]);

  const childrenSupported = useMemo(() => {
    return Math.floor((amount * USD_TO_RUB) / CHILD_EDUCATION_AND_LEISURE_ACCESS_RUB);
  }, [amount]);

  const civicSpaces = useMemo(() => {
    return Math.floor((amount * USD_TO_RUB) / CIVIC_LIFE_INFRASTRUCTURE_RUB);
  }, [amount]);

  const voteSummary = useMemo(() => {
    const totalVotes = alternatives.reduce(
      (sum, item) => sum + (voteStats[item.id] ?? 0),
      0
    );
    const percentages = alternatives.map((item) => {
      const count = voteStats[item.id] ?? 0;
      const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
      return { id: item.id, count, percent };
    });

    return { totalVotes, percentages };
  }, [voteStats]);

  function handleVote(id: string) {
    if (selected === id) return;

    setVoteStats((current) => {
      const previous = selected;
      const next = {
        recycling: current.recycling ?? 0,
        social: current.social ?? 0,
        civic: current.civic ?? 0,
      };

      if (previous && previous !== id) {
        next[previous as keyof typeof next] = Math.max(0, (next[previous as keyof typeof next] ?? 0) - 1);
      }

      next[id as keyof typeof next] = (next[id as keyof typeof next] ?? 0) + 1;
      window.localStorage.setItem("war-counter-vote-stats", JSON.stringify(next));
      return next;
    });
    setSelected(id);
    window.localStorage.setItem("war-counter-vote", id);
  }

  function activateAttribution(id: string) {
    setActiveAttributionId(id);

    if (attributionTimeoutRef.current !== null) {
      window.clearTimeout(attributionTimeoutRef.current);
    }

    attributionTimeoutRef.current = window.setTimeout(() => {
      setActiveAttributionId((current) => (current === id ? null : current));
      attributionTimeoutRef.current = null;
    }, 4000);
  }

  function openSources() {
    setView("sources");
    window.requestAnimationFrame(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function closeSources() {
    setView("home");
    window.requestAnimationFrame(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleSourcesPointerDown(event: PointerEvent<HTMLDivElement>) {
    setDragStartX(event.clientX);
    setDragOffsetX(0);
    setIsDraggingSources(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleSourcesPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX === null) return;
    setDragOffsetX(event.clientX - dragStartX);
  }

  function finishSourcesDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX === null) return;

    const threshold = 90;

    if (Math.abs(dragOffsetX) > threshold) {
      setSourcesSlide((current) => {
        if (dragOffsetX < 0) return (current + 1) % sourceSlides.length;
        return (current - 1 + sourceSlides.length) % sourceSlides.length;
      });
    }

    setDragStartX(null);
    setDragOffsetX(0);
    setIsDraggingSources(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState !== "idle") return;

    const trimmedIdea = idea.trim();
    if (trimmedIdea.length < 3) return;

    const existing = JSON.parse(
      window.localStorage.getItem("war-counter-ideas") ?? "[]"
    ) as string[];

    window.localStorage.setItem(
      "war-counter-ideas",
      JSON.stringify([trimmedIdea, ...existing])
    );

    setIdeaSaved(true);
    setSubmitState("success");
    setIdea("");

    void fetch("/api/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea: trimmedIdea,
        selectedVote: selected ?? undefined,
        createdAt: new Date().toISOString(),
        page: "war-counter",
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.warn("Idea submission email could not be sent:", await response.text());
        }
      })
      .catch((error) => {
        console.warn("Idea submission email could not be sent:", error);
      });
  }

  async function handleFooterSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (footerSubscriptionState !== "idle") return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const email = footerEmail.trim();
    setFooterSubscriptionState("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          createdAt: new Date().toISOString(),
          page: "war-counter",
        }),
      });

      if (!response.ok) {
        console.warn("Footer email subscription could not be sent:", await response.text());
        setFooterSubscriptionState("idle");
        return;
      }

      setFooterSubscriptionState("success");
      setFooterEmail("");
    } catch (error) {
      console.warn("Footer email subscription could not be sent:", error);
      setFooterSubscriptionState("idle");
    }
  }

  return (
    <main className="site-shell">
      <div className="dissolve-background" aria-hidden="true" />

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-noise" />
        <header className="topbar">
          <a
            className="brand brand-home-link"
            href="#top"
            aria-label={t.project}
            onClick={(event) => {
              event.preventDefault();
              setView("home");
              setSourcesSlide(0);
              heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <img src="/images/main page.png" alt={t.brokenEagleAlt} className="brand-eagle" />
            <span>{t.project}</span>
          </a>

          <nav className="language-switcher" aria-label="Language switcher">
            {(["en", "ru", "ua"] as Lang[]).map((key) => (
              <button
                key={key}
                className={lang === key ? "active" : ""}
                onClick={() => {
                  setLang(key);
                  window.localStorage.setItem(LANG_STORAGE_KEY, key);
                  setSourcesSlide(0);
                }}
                type="button"
              >
                {key.toUpperCase()}
              </button>
            ))}
          </nav>
        </header>

        <div className="hero-inner">
          <p className="kicker">{t.kicker}</p>
          <h1>{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>

          <div className={`home-view-content ${isSourcesView ? "is-hidden" : ""}`}>
            <div className="hero-ledger">
              <div className="stat-grid">
                <article className="stat-card stat-card-deaths">
                  <span className="stat-icon stat-icon-image deaths-candle-image">
                    <img src="/images/death-candle-card.png" alt={t.deathsCandleAlt} />
                  </span>
                  <div>
                    <h2>
                      {t.deathsTitleLine1}
                      <span>{t.deathsTitleLine2}</span>
                    </h2>
                    <strong>{formatNumber(deathCount)}+</strong>
                    <p>
                      {t.people}{" "}
                      <span className="info-dot" title={I18N_DEATHS_SOURCE_NOTE[lang]}>
                        i
                      </span>
                    </p>
                  </div>
                </article>

                <article className="stat-card stat-card-launched">
                  <span className="stat-icon stat-icon-image launched-drone-image">
                    <img src="/images/dron.png" alt={t.launchedWeaponsAlt} />
                  </span>
                  <div>
                    <h2>
                      {t.launchedTitleLine1}
                      <span>{t.launchedTitleLine2}</span>
                    </h2>
                    <strong>{formatNumber(launchCount)}+</strong>
                    <p>
                      {t.launchedUnit} <span className="info-dot">i</span>
                    </p>
                  </div>
                </article>
              </div>

              <article className="main-counter" aria-label={t.mainCounterAria}>
                <div className="counter-label">
                  <span>{t.totalLabel}</span>
                  <span className="info-dot" title={t.moneyInfo}>
                    i
                  </span>
                </div>
                <div className="counter-value">${formatNumber(amount)}+</div>
                <div className="counter-meta">
                  <span>USD</span>
                  <span className="dot" />
                  <span>{t.updated}</span>
                </div>
              </article>

              <article className="stat-card stat-card-built">
                <div className="built-card">
                  <div className="built-number-column">
                    <h2 className="built-label">{t.builtInstead}</h2>
                    <strong className="built-number">{formatNumber(builtInsteadFacilities)}+</strong>
                  </div>
                  <div className="built-thesis-column">
                    <p className="built-thesis-line">{t.builtLine1}</p>
                    <p className="built-thesis-line built-thesis-strong">≈ {formatNumber(facilitiesPerDay)} {t.builtFacilitiesEveryDay}</p>
                    <p className="built-thesis-line">
                      {t.builtCitiesLineStart} <span className="built-highlight built-highlight-cities">1,117</span> {t.builtCitiesLineEnd}
                    </p>
                    <p className="built-thesis-line built-thesis-strong">
                      {t.builtBundlesLineStart}{" "}
                      <span className="built-highlight built-highlight-bundles">{formatNumber(citiesEquipped)}</span> {t.builtBundlesLineEnd}
                    </p>
                    <p className="built-thesis-line built-thesis-strong">{t.builtMoreBundles}</p>
                    <p className="built-footnote">{t.builtFootnote} <span className="info-dot built-thesis-dot">i</span></p>
                  </div>
                  <span className="built-home-wrap">
                    <img src="/images/home.png" alt={t.builtInsteadAlt} className="built-home-img" />
                  </span>
                </div>
              </article>
            </div>

            <a className="scroll-cue" href="#alternatives" aria-label={t.scrollDown}>
              <span />
            </a>
          </div>

          <section
            className={`sources-screen ${isSourcesView ? "is-active" : ""}`}
            aria-hidden={!isSourcesView}
          >
            <div className="sources-panel">
              <button className="sources-back" type="button" onClick={closeSources}>
                <span aria-hidden="true">←</span>
                {t.backToCounter}
              </button>
              <h2>{t.methodology}</h2>

              <div
                className={`sources-carousel ${isDraggingSources ? "is-dragging" : ""}`}
                onPointerDown={handleSourcesPointerDown}
                onPointerMove={handleSourcesPointerMove}
                onPointerUp={finishSourcesDrag}
                onPointerCancel={finishSourcesDrag}
              >
                <div
                  className="sources-track"
                  style={{
                    transform: `translateX(calc(${-sourcesSlide * 100}% + ${dragOffsetX}px))`,
                  }}
                >
                  {sourceSlides.map((slide) => (
                    <article
                      className="sources-sheet"
                      key={slide.title}
                      style={{
                        opacity: isDraggingSources
                          ? Math.max(0.82, 1 - Math.abs(dragOffsetX) / 900)
                          : 1,
                      }}
                    >
                      <p className="sources-kicker">{slide.eyebrow}</p>
                      <h3>{slide.title}</h3>
                      <p className="sources-subtitle">{slide.subtitle}</p>

                      <div className="source-list">
                        {slide.rows.map((source, index) => (
                          <a
                            href={source.url}
                            key={source.text}
                            className="source-item source-item-link"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span>{index + 1}.</span>
                            <p>{source.text}</p>
                          </a>
                        ))}
                      </div>

                      <strong className="sources-warning">
                        {slide.warning}
                      </strong>

                      <div>
                        <h4>{t.currentCounterModel}</h4>
                        {slide.model.map((modelRow) => (
                          <p key={modelRow}>{modelRow}</p>
                        ))}
                      </div>

                      <p className="sources-methodology">
                        {slide.methodology}
                      </p>

                      {slide.calculation && (
                        <div>
                          <h4>{t.calculationBlock}</h4>
                          {slide.calculation.map((calculationRow) => (
                            <p key={calculationRow}>{calculationRow}</p>
                          ))}
                        </div>
                      )}

                      {slide.tick && (
                        <div>
                          <h4>{t.tickCalculation}</h4>
                          {slide.tick.map((tickRow) => (
                            <p key={tickRow}>{tickRow}</p>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>

              <div className="sources-dots" aria-label={t.sourcePagesAria}>
                {sourceSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    className={sourcesSlide === index ? "active" : ""}
                    type="button"
                    aria-label={`${t.showSourcePage} ${slide.title}`}
                    onClick={() => setSourcesSlide(index)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className={`home-main-content ${isSourcesView ? "is-hidden" : ""}`}>
        <section
          ref={transitionRef}
          className="transition-content-section"
        >
          <section className="alternatives-section" id="alternatives">
          <div className="section-heading">
            <h2>{t.mainQuestion}</h2>
            <p>{t.mainQuestionSub}</p>
            <p>{t.choose}</p>
          </div>

          <div className="alternatives-grid">
            {alternatives.map((item) => {
              const isSelected = selected === item.id;
              const equivalent =
                item.id === "recycling"
                  ? recyclingSystems
                  : item.id === "social"
                    ? childrenSupported
                    : civicSpaces;

              return (
                <article
                  key={item.id}
                  className={`alternative-card ${isSelected ? "selected" : ""} ${
                    activeAttributionId === item.id ? "attribution-active" : ""
                  }`}
                  onClick={() => handleVote(item.id)}
                >
                  <div className="alternative-top">
                    <span className="alternative-number">{item.number}</span>
                    <span className="alternative-category">{item.category}</span>
                  </div>

                  <div className="split-visual">
                    <div className="photo-attribution" aria-hidden="true">
                      <span>{item.attribution}</span>
                    </div>
                    <div className="visual-half before">
                      <img
                        className="visual-image"
                        src={item.leftImage}
                        alt=""
                        aria-hidden="true"
                        onClick={() => activateAttribution(item.id)}
                      />
                    </div>
                    <div className="visual-half after">
                      <img
                        className="visual-image"
                        src={item.rightImage}
                        alt=""
                        aria-hidden="true"
                        onClick={() => activateAttribution(item.id)}
                      />
                    </div>
                    <span className="compare-button">»</span>
                  </div>

                  <div className="alternative-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className="equivalent">
                      <strong>{formatNumber(equivalent)}+</strong>
                      <span>{item.unitLabel}</span>
                      <span className="equivalent-ticker" aria-hidden="true">
                        <span>{item.tickerMessage}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    className="radio-button"
                    type="button"
                    aria-label={
                      item.id === "recycling"
                        ? `${t.voteFor} ${t.recyclingVoteLabel}`
                        : item.id === "social"
                          ? `${t.voteFor} ${t.socialVoteLabel}`
                          : `${t.voteFor} ${t.civicVoteLabel}`
                    }
                    aria-pressed={isSelected}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleVote(item.id);
                    }}
                  >
                    <span className="vote-dot" />
                    <span className="vote-check" />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="vote-note">
            <span className="lock-icon" aria-hidden="true" />
            <span>{t.selectOne}</span>
            <span className="vote-privacy">{t.votePrivacy}</span>
          </div>

          {selectedAlternative && selectedEquivalent !== null && (
            <div className="vote-result">
              <strong>{t.voted}</strong>{" "}
              <span>
                {formatNumber(selectedEquivalent)}+ {selectedAlternative.unitLabel}
              </span>
            </div>
          )}

          <div className="vote-stats" aria-label={t.voteStatsAria}>
            <p>
              {formatNumber(voteSummary.totalVotes)} {t.peopleVoted}
            </p>
            <p>
              {t.recyclingVoteLabel} {formatNumber(voteStats.recycling ?? 0)} · {t.socialVoteLabel}{" "}
              {formatNumber(voteStats.social ?? 0)} · {t.civicVoteLabel} {formatNumber(voteStats.civic ?? 0)}
            </p>
            <p>
              {t.recyclingVoteLabel} {voteSummary.percentages[0]?.percent ?? 0}% · {t.socialVoteLabel}{" "}
              {voteSummary.percentages[1]?.percent ?? 0}% · {t.civicVoteLabel} {voteSummary.percentages[2]?.percent ?? 0}%
            </p>
          </div>
          </section>
        </section>

        <section className="idea-section">
          <div className="section-heading compact">
            <h2>{t.ideaTitle}</h2>
            <p>{t.ideaSub}</p>
          </div>

          <form
            className={`idea-form idea-form-${submitState}`}
            onSubmit={handleSubmit}
          >
            <input
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              disabled={submitState !== "idle"}
            />
            <button
              className={`idea-submit-button ${submitState}`}
              type="submit"
              disabled={submitState !== "idle"}
            >
              <span className="idea-submit-label">
                {t.submit}
                <span aria-hidden="true">→</span>
              </span>
              <span className="idea-success-message">
                {t.ideaSuccessMessage}
              </span>
            </button>
          </form>

          <p className="publish-note">
            <span className="person-icon" aria-hidden="true" />
            {ideaSaved ? t.thankYou : t.publishNote}
          </p>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-grid">
          <section>
            <h2>{t.support}</h2>
            <p>{t.supportText}</p>
            <DonateTransitionLink className="donate-button">
              <span className="donate-button__content">
                <span className="donate-button__heart donate-heart" aria-hidden="true">♥</span>
                <span className="donate-button__label">{t.donate}</span>
              </span>
            </DonateTransitionLink>
          </section>

          <section>
            <h2>{t.about}</h2>
            <p>{t.aboutText}</p>
            <a className="footer-link footer-contact-link" href="mailto:mariaparakhina.studio@gmail.com">
              <span className="footer-contact-symbol" aria-hidden="true">@</span>
              <span className="footer-contact-text">{t.contact}</span>
            </a>
          </section>

          <section>
            <h2>{t.methodology}</h2>
            <p>{t.methodologyText}</p>
            <button className="footer-link footer-link-lower" type="button" onClick={openSources}>
              {t.sources} <span aria-hidden="true">→</span>
            </button>
          </section>

          <section>
            <h2>{t.informed}</h2>
            <p>{t.informedText}</p>
            <form className="subscribe-form" onSubmit={handleFooterSubscribe}>
              <input
                type="email"
                value={footerEmail}
                onChange={(event) => setFooterEmail(event.target.value)}
                placeholder={t.email}
                aria-label={t.email}
                required
                disabled={footerSubscriptionState === "success"}
              />
              <button
                type="submit"
                aria-label={t.submitEmailAria}
                className={footerSubscriptionState === "success" ? "is-sent" : ""}
                disabled={footerSubscriptionState !== "idle"}
              >
                {footerSubscriptionState === "success" ? "✓" : "→"}
              </button>
            </form>
          </section>
        </div>

        <div className="footer-bottom">
          <span>{t.copyright}</span>
        </div>
      </footer>
    </main>
  );
}
