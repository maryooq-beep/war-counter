"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ru" | "ua";

type Alternative = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  unitLabel: string;
  unitCostUsd: number;
  beforeLabel: string;
  afterLabel: string;
  variant: "waste" | "social" | "civic" | "health" | "school" | "housing";
};

const CONFIG = {
  baseAmountUsd: 602_620_000_000,
  baseDateIso: "2026-06-22T22:00:00.000Z",
  estimatedUsdPerSecond: 7_250,
  deathsEstimate: 280_155,
  launchedEstimate: 18_547,
  schoolEquivalentCost: 24_730_000,
};

const COPY = {
  en: {
    project: "THE PRICE OF WAR",
    kicker: "PUBLIC ESTIMATE COUNTER",
    title: "The Price of Russian War",
    subtitle:
      "Tracking Russia’s estimated spending on the war in Ukraine — and what could have been built instead.",
    totalLabel: "TOTAL SPENT ON WAR",
    updated: "Updated visually in real time",
    deaths: "DEATHS",
    people: "people",
    builtInstead: "BUILT INSTEAD",
    builtUnit: "schools, hospitals, and more",
    launched: "DRONES / ROCKETS",
    launchedUnit: "launched",
    mainQuestion: "Where could this money go instead?",
    mainQuestionSub:
      "Every dollar spent on war could have built a better, freer, and more humane future.",
    choose: "Choose one alternative to support.",
    selectOne: "Please select only one option above. Your vote helps show what matters most.",
    ideaTitle: "What would you like to build instead?",
    ideaSub: "Share your idea for what Russia could build instead of paying for war.",
    placeholder: "Write your idea here...",
    publishNote: "Your idea will be saved locally now. Later it can be connected to moderation and public voting.",
    submit: "SUBMIT YOUR IDEA",
    voted: "Your vote has been saved.",
    thankYou: "Your idea has been saved.",
    support: "SUPPORT THE CHANGE",
    supportText:
      "Help build a better future. Your support helps amplify ideas, data, and voices for peace and accountability.",
    donate: "DONATE",
    donateNote: "Donation system can be connected later.",
    about: "ABOUT THE PROJECT",
    aboutText:
      "We track the estimated cost of war and show what Russia could build instead — for people, not for war.",
    methodology: "SOURCES & METHODOLOGY",
    methodologyText:
      "Every number should link back to open sources, transparent calculations, and verified research.",
    informed: "STAY INFORMED",
    informedText:
      "Get updates on spending and what could have been built instead.",
    email: "Your email address",
    noSpam: "No spam. Unsubscribe anytime.",
    learnMore: "Learn more",
    sources: "See sources",
    mission: "Our mission & values",
    accuracy: "Data updates & accuracy",
  },
  ru: {
    project: "ЦЕНА ВОЙНЫ",
    kicker: "ПУБЛИЧНЫЙ СЧЁТЧИК",
    title: "Цена российской войны",
    subtitle:
      "Оценка расходов России на войну в Украине — и того, что могло быть построено вместо этого.",
    totalLabel: "ПОТРАЧЕНО НА ВОЙНУ",
    updated: "Визуально обновляется в реальном времени",
    deaths: "ПОГИБШИЕ",
    people: "человек",
    builtInstead: "МОЖНО БЫЛО ПОСТРОИТЬ",
    builtUnit: "школы, больницы и другое",
    launched: "ДРОНЫ / РАКЕТЫ",
    launchedUnit: "запущено",
    mainQuestion: "Куда могли бы пойти эти деньги?",
    mainQuestionSub:
      "Каждый доллар, потраченный на войну, мог бы строить более свободное и человеческое будущее.",
    choose: "Выберите одну альтернативу.",
    selectOne: "Пожалуйста, выберите только один вариант. Ваш голос показывает, что важнее всего.",
    ideaTitle: "Что бы вы хотели построить вместо этого?",
    ideaSub: "Поделитесь идеей, что можно было бы построить вместо оплаты войны.",
    placeholder: "Напишите вашу идею...",
    publishNote: "Сейчас идея сохранится локально. Позже можно подключить модерацию и публичное голосование.",
    submit: "ОТПРАВИТЬ ИДЕЮ",
    voted: "Ваш голос сохранён.",
    thankYou: "Ваша идея сохранена.",
    support: "ПОДДЕРЖАТЬ ИЗМЕНЕНИЕ",
    supportText:
      "Помогите строить лучшее будущее. Поддержка помогает развивать идеи, данные и голоса за мир.",
    donate: "DONATE",
    donateNote: "Систему донатов можно подключить позже.",
    about: "О ПРОЕКТЕ",
    aboutText:
      "Мы показываем оценочную цену войны и то, что Россия могла бы строить вместо войны.",
    methodology: "ИСТОЧНИКИ И МЕТОДОЛОГИЯ",
    methodologyText:
      "Каждая цифра должна вести к открытым источникам, прозрачным расчётам и проверяемым данным.",
    informed: "ОСТАВАТЬСЯ В КУРСЕ",
    informedText:
      "Получайте обновления о расходах на войну и альтернативах.",
    email: "Ваш email",
    noSpam: "Без спама. Можно отписаться.",
    learnMore: "Подробнее",
    sources: "Источники",
    mission: "Миссия и ценности",
    accuracy: "Обновления и точность",
  },
  ua: {
    project: "ЦІНА ВІЙНИ",
    kicker: "ПУБЛІЧНИЙ ЛІЧИЛЬНИК",
    title: "Ціна російської війни",
    subtitle:
      "Оцінка витрат Росії на війну в Україні — і того, що могло бути збудовано натомість.",
    totalLabel: "ВИТРАЧЕНО НА ВІЙНУ",
    updated: "Візуально оновлюється в реальному часі",
    deaths: "ЗАГИБЛІ",
    people: "людей",
    builtInstead: "МОЖНА БУЛО ЗБУДУВАТИ",
    builtUnit: "школи, лікарні та інше",
    launched: "ДРОНИ / РАКЕТИ",
    launchedUnit: "запущено",
    mainQuestion: "Куди могли б піти ці гроші?",
    mainQuestionSub:
      "Кожен долар, витрачений на війну, міг би будувати вільніше і людяніше майбутнє.",
    choose: "Оберіть одну альтернативу.",
    selectOne: "Будь ласка, оберіть лише один варіант. Ваш голос показує, що найважливіше.",
    ideaTitle: "Що б ви хотіли збудувати натомість?",
    ideaSub: "Поділіться ідеєю, що можна було б збудувати замість оплати війни.",
    placeholder: "Напишіть вашу ідею...",
    publishNote: "Зараз ідея збережеться локально. Пізніше можна підключити модерацію і публічне голосування.",
    submit: "НАДІСЛАТИ ІДЕЮ",
    voted: "Ваш голос збережено.",
    thankYou: "Вашу ідею збережено.",
    support: "ПІДТРИМАТИ ЗМІНИ",
    supportText:
      "Допоможіть будувати краще майбутнє. Підтримка допомагає розвивати ідеї, дані та голоси за мир.",
    donate: "DONATE",
    donateNote: "Систему донатів можна підключити пізніше.",
    about: "ПРО ПРОЄКТ",
    aboutText:
      "Ми показуємо оціночну ціну війни і те, що Росія могла б будувати замість війни.",
    methodology: "ДЖЕРЕЛА І МЕТОДОЛОГІЯ",
    methodologyText:
      "Кожна цифра має вести до відкритих джерел, прозорих розрахунків і перевірених даних.",
    informed: "БУТИ В КУРСІ",
    informedText:
      "Отримуйте оновлення про витрати на війну та альтернативи.",
    email: "Ваш email",
    noSpam: "Без спаму. Можна відписатися.",
    learnMore: "Детальніше",
    sources: "Джерела",
    mission: "Місія і цінності",
    accuracy: "Оновлення і точність",
  },
};

const alternatives: Alternative[] = [
  {
    id: "recycling",
    number: "01",
    category: "Waste / Recycling",
    title: "Modern recycling infrastructure",
    description:
      "Invest in modern waste processing and recycling infrastructure to protect the environment and create sustainable jobs.",
    unitLabel: "modern recycling centres",
    unitCostUsd: 45_000_000,
    beforeLabel: "waste",
    afterLabel: "recycling",
    variant: "waste",
  },
  {
    id: "social",
    number: "02",
    category: "Investment in Social Infrastructure",
    title: "Children and social support",
    description:
      "Invest in education, social support, children’s development, and care systems that give every child a chance to grow.",
    unitLabel: "children’s centres",
    unitCostUsd: 12_000_000,
    beforeLabel: "neglect",
    afterLabel: "care",
    variant: "social",
  },
  {
    id: "civic",
    number: "03",
    category: "Investment in Civic Infrastructure",
    title: "Public spaces and civic life",
    description:
      "Invest in civic life, public spaces, culture, dialogue, and communities that build a free society.",
    unitLabel: "civic spaces",
    unitCostUsd: 2_500_000,
    beforeLabel: "control",
    afterLabel: "community",
    variant: "civic",
  },
  {
    id: "healthcare",
    number: "04",
    category: "Healthcare",
    title: "Hospitals and local clinics",
    description:
      "Build modern hospitals, local clinics, emergency care, mental health support, and accessible medicine.",
    unitLabel: "regional hospitals",
    unitCostUsd: 85_000_000,
    beforeLabel: "ruins",
    afterLabel: "care",
    variant: "health",
  },
  {
    id: "schools",
    number: "05",
    category: "Education",
    title: "Schools, libraries and universities",
    description:
      "Fund schools, libraries, research, scholarships, art education, and places where the next generation can think freely.",
    unitLabel: "schools",
    unitCostUsd: CONFIG.schoolEquivalentCost,
    beforeLabel: "silence",
    afterLabel: "learning",
    variant: "school",
  },
  {
    id: "housing",
    number: "06",
    category: "Housing",
    title: "Homes instead of destruction",
    description:
      "Create safe housing, repair old buildings, and support people who need a stable home instead of propaganda and violence.",
    unitLabel: "affordable homes",
    unitCostUsd: 95_000,
    beforeLabel: "loss",
    afterLabel: "home",
    variant: "housing",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.floor(value));
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [amount, setAmount] = useState(CONFIG.baseAmountUsd);
  const [selected, setSelected] = useState<string | null>(null);
  const [idea, setIdea] = useState("");
  const [ideaSaved, setIdeaSaved] = useState(false);

  const t = COPY[lang];

  useEffect(() => {
    const savedVote = window.localStorage.getItem("war-counter-vote");
    if (savedVote) setSelected(savedVote);

    let animationFrame = 0;

    const tick = () => {
      const baseTime = new Date(CONFIG.baseDateIso).getTime();
      const secondsPassed = Math.max(0, (Date.now() - baseTime) / 1000);
      setAmount(
        CONFIG.baseAmountUsd + secondsPassed * CONFIG.estimatedUsdPerSecond
      );
      animationFrame = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const builtInstead = useMemo(() => {
    return Math.floor(amount / CONFIG.schoolEquivalentCost);
  }, [amount]);

  const selectedAlternative = useMemo(() => {
    return alternatives.find((item) => item.id === selected) ?? null;
  }, [selected]);

  const selectedEquivalent = useMemo(() => {
    if (!selectedAlternative) return null;
    return Math.floor(amount / selectedAlternative.unitCostUsd);
  }, [amount, selectedAlternative]);

  function handleVote(id: string) {
    setSelected(id);
    window.localStorage.setItem("war-counter-vote", id);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedIdea = idea.trim();
    if (trimmedIdea.length < 3) return;

    const existing = JSON.parse(
      window.localStorage.getItem("war-counter-ideas") ?? "[]"
    ) as string[];

    window.localStorage.setItem(
      "war-counter-ideas",
      JSON.stringify([trimmedIdea, ...existing])
    );

    setIdea("");
    setIdeaSaved(true);

    window.setTimeout(() => setIdeaSaved(false), 3000);
  }

  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero-noise" />
        <header className="topbar">
          <a className="brand" href="#top" aria-label="The Price of War">
            <span className="brand-mark" aria-hidden="true" />
            <span>{t.project}</span>
          </a>

          <nav className="language-switcher" aria-label="Language switcher">
            {(["en", "ru", "ua"] as Lang[]).map((key) => (
              <button
                key={key}
                className={lang === key ? "active" : ""}
                onClick={() => setLang(key)}
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

          <article className="main-counter" aria-label="Total spent on war">
            <div className="counter-label">
              <span>{t.totalLabel}</span>
              <span className="info-dot" title="Connect this number to methodology and sources later.">
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

          <div className="stat-grid">
            <article className="stat-card">
              <div className="stat-icon candle" aria-hidden="true" />
              <div>
                <h2>{t.deaths}</h2>
                <strong>{formatNumber(CONFIG.deathsEstimate)}+</strong>
                <p>
                  {t.people} <span className="info-dot">i</span>
                </p>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon building" aria-hidden="true" />
              <div>
                <h2>{t.builtInstead}</h2>
                <strong>{formatNumber(builtInstead)}+</strong>
                <p>
                  {t.builtUnit} <span className="info-dot">i</span>
                </p>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon rocket" aria-hidden="true" />
              <div>
                <h2>{t.launched}</h2>
                <strong>{formatNumber(CONFIG.launchedEstimate)}+</strong>
                <p>
                  {t.launchedUnit} <span className="info-dot">i</span>
                </p>
              </div>
            </article>
          </div>

          <a className="scroll-cue" href="#alternatives" aria-label="Scroll down">
            <span />
          </a>
        </div>

        <div className="war-objects" aria-hidden="true">
          <span className="object object-rocket" />
          <span className="object object-bear" />
          <span className="object object-sign">NO<br />WAR</span>
          <span className="object object-candles" />
          <span className="object object-helmet" />
          <span className="object object-hand" />
          <span className="object object-money" />
          <span className="object object-grenade" />
        </div>
      </section>

      <section className="alternatives-section" id="alternatives">
        <div className="section-heading">
          <h2>{t.mainQuestion}</h2>
          <p>{t.mainQuestionSub}</p>
          <p>{t.choose}</p>
        </div>

        <div className="alternatives-grid">
          {alternatives.map((item) => {
            const isSelected = selected === item.id;
            const equivalent = Math.floor(amount / item.unitCostUsd);

            return (
              <article
                key={item.id}
                className={`alternative-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleVote(item.id)}
              >
                <div className="alternative-top">
                  <span className="alternative-number">{item.number}</span>
                  <span className="alternative-category">{item.category}</span>
                </div>

                <div className="split-visual">
                  <div className={`visual-half ${item.variant} before`}>
                    <span>{item.beforeLabel}</span>
                  </div>
                  <div className={`visual-half ${item.variant} after`}>
                    <span>{item.afterLabel}</span>
                  </div>
                  <span className="compare-button">»</span>
                </div>

                <div className="alternative-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="equivalent">
                    <strong>{formatNumber(equivalent)}+</strong>
                    <span>{item.unitLabel}</span>
                  </div>
                </div>

                <button
                  className="radio-button"
                  type="button"
                  aria-label={`Select ${item.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleVote(item.id);
                  }}
                >
                  <span />
                </button>
              </article>
            );
          })}
        </div>

        <div className="vote-note">
          <span className="lock-icon" aria-hidden="true" />
          <span>{t.selectOne}</span>
        </div>

        {selectedAlternative && selectedEquivalent !== null && (
          <div className="vote-result">
            <strong>{t.voted}</strong>{" "}
            <span>
              {formatNumber(selectedEquivalent)}+ {selectedAlternative.unitLabel}
            </span>
          </div>
        )}
      </section>

      <section className="idea-section">
        <div className="section-heading compact">
          <h2>{t.ideaTitle}</h2>
          <p>{t.ideaSub}</p>
        </div>

        <form className="idea-form" onSubmit={handleSubmit}>
          <input
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
          />
          <button type="submit">
            {t.submit}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="publish-note">
          <span className="person-icon" aria-hidden="true" />
          {ideaSaved ? t.thankYou : t.publishNote}
        </p>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <section>
            <h2>{t.support}</h2>
            <p>{t.supportText}</p>
            <button className="donate-button" type="button">
              <span aria-hidden="true">♥</span>
              {t.donate}
            </button>
            <small>{t.donateNote}</small>
          </section>

          <section>
            <h2>{t.about}</h2>
            <p>{t.aboutText}</p>
            <a href="#top">{t.learnMore} →</a>
            <a href="#top">{t.mission} →</a>
          </section>

          <section>
            <h2>{t.methodology}</h2>
            <p>{t.methodologyText}</p>
            <a href="#top">{t.sources} →</a>
            <a href="#top">{t.accuracy} →</a>
          </section>

          <section>
            <h2>{t.informed}</h2>
            <p>{t.informedText}</p>
            <form className="subscribe-form">
              <input placeholder={t.email} aria-label={t.email} />
              <button type="button" aria-label="Submit email">
                →
              </button>
            </form>
            <small>{t.noSpam}</small>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© 2026 The Price of Russian War</span>
          <div className="socials" aria-label="Social links">
            <a href="#top">𝕏</a>
            <a href="#top">f</a>
            <a href="#top">◎</a>
            <a href="#top">▶</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
