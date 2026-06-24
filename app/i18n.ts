export type Lang = "en" | "ru" | "ua";

export const LANG_STORAGE_KEY = "war-counter-language";

export type Alternative = {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  unitLabel: string;
  unitCostRub: number;
  leftImage: string;
  rightImage: string;
  tickerMessage: string;
  attribution: string;
};

export type AlternativeText = Omit<
  Alternative,
  "unitCostRub" | "leftImage" | "rightImage"
>;

export type SourceSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  rows: { text: string; url: string }[];
  warning: string;
  model: string[];
  methodology: string;
  calculation?: string[];
  tick?: string[];
};

export type HomeCopy = {
  project: string;
  kicker: string;
  title: string;
  subtitle: string;
  totalLabel: string;
  updated: string;
  deathsTitleLine1: string;
  deathsTitleLine2: string;
  people: string;
  builtInstead: string;
  builtLine1: string;
  builtFacilitiesEveryDay: string;
  builtCitiesLineStart: string;
  builtCitiesLineEnd: string;
  builtBundlesLineStart: string;
  builtBundlesLineEnd: string;
  builtMoreBundles: string;
  builtFootnote: string;
  launchedTitleLine1: string;
  launchedTitleLine2: string;
  launchedUnit: string;
  mainQuestion: string;
  mainQuestionSub: string;
  choose: string;
  selectOne: string;
  votePrivacy: string;
  voteStatsAria: string;
  peopleVoted: string;
  recyclingVoteLabel: string;
  socialVoteLabel: string;
  civicVoteLabel: string;
  ideaTitle: string;
  ideaSub: string;
  placeholder: string;
  publishNote: string;
  submit: string;
  ideaSuccessMessage: string;
  voted: string;
  voteFor: string;
  thankYou: string;
  support: string;
  supportText: string;
  donate: string;
  about: string;
  aboutText: string;
  contact: string;
  methodology: string;
  methodologyText: string;
  informed: string;
  informedText: string;
  email: string;
  sources: string;
  currentCounterModel: string;
  calculationBlock: string;
  tickCalculation: string;
  backToCounter: string;
  sourcePagesAria: string;
  showSourcePage: string;
  scrollDown: string;
  mainCounterAria: string;
  moneyInfo: string;
  submitEmailAria: string;
  copyright: string;
  pageTitle: string;
  pageDescription: string;
};

export type DonateCopy = {
  pageTitle: string;
  pageDescription: string;
  back: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  contactIntro: string;
  donationLinksAria: string;
  monobankText: string;
  paypalText: string;
  paypalQrLabel: string;
  paypalQrTitle: string;
  paypalQrSubtitle: string;
  paypalQrInstruction: string;
  paypalQrOpen: string;
  paypalQrClose: string;
  paypalQrAlt: string;
  paypalFallback: string;
  portraitAria: string;
  portraitAlt: string;
};

export const COPY: Record<Lang, HomeCopy> = {
  en: {
    project: "THE PRICE OF WAR",
    kicker: "PUBLIC ESTIMATE COUNTER",
    title: "The Price of Russian War",
    subtitle:
      "Tracking Russia’s estimated spending on the war in Ukraine — and what could have been built instead.",
    totalLabel: "TOTAL SPENT ON WAR",
    updated: "Updated visually in real time",
    deathsTitleLine1: "Deaths on both sides",
    deathsTitleLine2: "civilians and military",
    people: "people",
    builtInstead: "BUILT INSTEAD",
    builtLine1: "Average public facilities Russia could have built instead.",
    builtFacilitiesEveryDay: "facilities every day.",
    builtCitiesLineStart: "Russia has only",
    builtCitiesLineEnd: "cities.",
    builtBundlesLineStart: "This money could fund",
    builtBundlesLineEnd: "city-infrastructure bundles.",
    builtMoreBundles: "More bundles than Russia has cities.",
    builtFootnote:
      "Based on average public-facility cost estimates and official city-count data.",
    launchedTitleLine1: "Drones and missiles",
    launchedTitleLine2: "launched at Ukraine",
    launchedUnit: "launched",
    mainQuestion: "Where would you invest your taxes?",
    mainQuestionSub:
      "Every dollar spent on war could have built a better, freer, and more humane future.",
    choose: "Choose one alternative to support.",
    selectOne:
      "Please select only one option above. Your vote helps show what matters most.",
    votePrivacy: "Your vote is anonymous.",
    voteStatsAria: "Vote statistics",
    peopleVoted: "people voted anonymously",
    recyclingVoteLabel: "Recycling",
    socialVoteLabel: "Children and social support",
    civicVoteLabel: "Civic infrastructure",
    ideaTitle: "What would you like to build instead?",
    ideaSub: "Share your idea for what Russia could build instead of paying for war.",
    placeholder: "Write your idea here...",
    publishNote:
      "Your ideas will be published confidentially. We do not collect user information.",
    submit: "SUBMIT YOUR IDEA",
    ideaSuccessMessage: "Your proposal will be illustrated on a new card",
    voted: "Your vote has been saved.",
    voteFor: "Vote for",
    thankYou: "Your idea has been saved.",
    support: "SUPPORT THE CHANGE",
    supportText:
      "Help build a better future. Your support helps amplify ideas, data, and voices for peace and accountability.",
    donate: "DONATE",
    about: "ABOUT THE PROJECT",
    aboutText:
      "We track the estimated cost of war and show what Russia could build instead — for people, not for war.",
    contact: "Contact us",
    methodology: "SOURCES & METHODOLOGY",
    methodologyText:
      "Every number should link back to open sources, transparent calculations, and verified research.",
    informed: "STAY INFORMED",
    informedText: "We will send an update when new cards are published. No spam.",
    email: "Your email address",
    sources: "See sources",
    currentCounterModel: "Current counter model:",
    calculationBlock: "Calculation block:",
    tickCalculation: "Tick calculation:",
    backToCounter: "Back to counter",
    sourcePagesAria: "Sources pages",
    showSourcePage: "Show",
    scrollDown: "Scroll down",
    mainCounterAria: "Total spent on war",
    moneyInfo: "Connect this number to methodology and sources later.",
    submitEmailAria: "Submit email",
    copyright: "© 2026 The Price of Russian War",
    pageTitle: "The Price of Russian War",
    pageDescription:
      "Tracking Russia's estimated war spending and showing what could have been built instead.",
  },
  ru: {
    project: "ЦЕНА ВОЙНЫ",
    kicker: "ПУБЛИЧНАЯ ОЦЕНКА",
    title: "ЦЕНА РОССИЙСКОЙ ВОЙНЫ",
    subtitle:
      "Счётчик приблизительных расходов России на войну в Украине — и того, что могло быть построено вместо неё.",
    totalLabel: "ПОТРАЧЕНО НА ВОЙНУ",
    updated: "Визуально обновляется в реальном времени",
    deathsTitleLine1: "Погибшие с обеих сторон",
    deathsTitleLine2: "мирные жители и военные",
    people: "человек",
    builtInstead: "МОЖНО БЫЛО ПОСТРОИТЬ",
    builtLine1: "Средние общественные объекты, которые Россия могла бы построить вместо войны.",
    builtFacilitiesEveryDay: "таких объектов каждый день.",
    builtCitiesLineStart: "В России всего",
    builtCitiesLineEnd: "городов.",
    builtBundlesLineStart: "Эти деньги могли бы оплатить",
    builtBundlesLineEnd: "городских инфраструктурных пакета.",
    builtMoreBundles: "Пакетов больше, чем городов в России.",
    builtFootnote:
      "На основе средних оценок стоимости общественных объектов и официальных данных о числе городов.",
    launchedTitleLine1: "Дроны и ракеты",
    launchedTitleLine2: "запущенные по Украине",
    launchedUnit: "запущено",
    mainQuestion: "Куда бы вы вложили свои налоги?",
    mainQuestionSub:
      "Каждый доллар, сожжённый войной, мог бы строить более свободное, честное и человеческое будущее.",
    choose: "Выберите одну альтернативу.",
    selectOne:
      "Пожалуйста, выберите только один вариант. Ваш голос помогает увидеть, что действительно важно.",
    votePrivacy: "Ваш голос анонимен.",
    voteStatsAria: "Статистика голосования",
    peopleVoted: "человек проголосовали анонимно",
    recyclingVoteLabel: "Переработка отходов",
    socialVoteLabel: "Дети и социальная поддержка",
    civicVoteLabel: "Гражданская инфраструктура",
    ideaTitle: "Что бы вы хотели построить вместо этого?",
    ideaSub:
      "Предложите, что Россия могла бы создать вместо того, чтобы оплачивать войну.",
    placeholder: "Напишите вашу идею...",
    publishNote:
      "Ваши идеи будут опубликованы конфиденциально. Мы не собираем информацию о пользователях.",
    submit: "ОТПРАВИТЬ ИДЕЮ",
    ideaSuccessMessage: "Ваше предложение будет изображено на новой карточке",
    voted: "Ваш голос сохранён.",
    voteFor: "Голосовать за",
    thankYou: "Ваша идея сохранена.",
    support: "ПОДДЕРЖАТЬ ПРОЕКТ",
    supportText:
      "Помогите этому пространству звучать громче: за память, ответственность и право на мирное будущее.",
    donate: "ПОДДЕРЖАТЬ",
    about: "О ПРОЕКТЕ",
    aboutText:
      "Мы показываем оценочную цену войны и то, что Россия могла бы строить вместо неё — для людей, а не против людей.",
    contact: "Связаться",
    methodology: "ИСТОЧНИКИ И МЕТОДОЛОГИЯ",
    methodologyText:
      "Каждая цифра должна вести к открытым источникам, прозрачным расчётам и проверяемым данным.",
    informed: "ОСТАВАТЬСЯ В КУРСЕ",
    informedText: "Мы пришлём обновление, когда появятся новые карточки. Без спама.",
    email: "Ваш email",
    sources: "Смотреть источники",
    currentCounterModel: "Текущая модель счётчика:",
    calculationBlock: "Блок расчёта:",
    tickCalculation: "Расчёт шага счётчика:",
    backToCounter: "Вернуться к счётчику",
    sourcePagesAria: "Страницы источников",
    showSourcePage: "Показать",
    scrollDown: "Прокрутить вниз",
    mainCounterAria: "Всего потрачено на войну",
    moneyInfo: "Позже эта цифра будет связана с методологией и источниками.",
    submitEmailAria: "Отправить email",
    copyright: "© 2026 Цена российской войны",
    pageTitle: "Цена российской войны",
    pageDescription:
      "Оценка российских расходов на войну и того, что могло быть построено вместо неё.",
  },
  ua: {
    project: "ЦІНА ВІЙНИ",
    kicker: "ПУБЛІЧНА ОЦІНКА",
    title: "ЦІНА РОСІЙСЬКОЇ ВІЙНИ",
    subtitle:
      "Лічильник орієнтовних витрат Росії на війну в Україні — і того, що могло бути збудовано натомість.",
    totalLabel: "ВИТРАЧЕНО НА ВІЙНУ",
    updated: "Візуально оновлюється в реальному часі",
    deathsTitleLine1: "Загиблі з обох боків",
    deathsTitleLine2: "цивільні й військові",
    people: "людей",
    builtInstead: "МОЖНА БУЛО ЗБУДУВАТИ",
    builtLine1: "Середні громадські об’єкти, які Росія могла б збудувати замість війни.",
    builtFacilitiesEveryDay: "таких об’єктів щодня.",
    builtCitiesLineStart: "У Росії лише",
    builtCitiesLineEnd: "міст.",
    builtBundlesLineStart: "Ці гроші могли б профінансувати",
    builtBundlesLineEnd: "міських інфраструктурних пакетів.",
    builtMoreBundles: "Пакетів більше, ніж міст у Росії.",
    builtFootnote:
      "На основі середніх оцінок вартості громадських об’єктів та офіційних даних про кількість міст.",
    launchedTitleLine1: "Дрони й ракети",
    launchedTitleLine2: "запущені по Україні",
    launchedUnit: "запущено",
    mainQuestion: "Куди б ви вклали свої податки?",
    mainQuestionSub:
      "Кожен долар, спалений війною, міг би будувати вільніше, справедливіше й людяніше майбутнє.",
    choose: "Оберіть одну альтернативу.",
    selectOne:
      "Будь ласка, оберіть лише один варіант. Ваш голос допомагає побачити, що справді важливо.",
    votePrivacy: "Ваш голос анонімний.",
    voteStatsAria: "Статистика голосування",
    peopleVoted: "людей проголосували анонімно",
    recyclingVoteLabel: "Переробка відходів",
    socialVoteLabel: "Діти й соціальна підтримка",
    civicVoteLabel: "Громадянська інфраструктура",
    ideaTitle: "Що б ви хотіли збудувати натомість?",
    ideaSub:
      "Запропонуйте, що Росія могла б створити замість того, щоб оплачувати війну.",
    placeholder: "Напишіть вашу ідею...",
    publishNote:
      "Ваші ідеї будуть опубліковані конфіденційно. Ми не збираємо інформацію про користувачів.",
    submit: "НАДІСЛАТИ ІДЕЮ",
    ideaSuccessMessage: "Вашу пропозицію буде зображено на новій картці",
    voted: "Ваш голос збережено.",
    voteFor: "Голосувати за",
    thankYou: "Вашу ідею збережено.",
    support: "ПІДТРИМАТИ ПРОЄКТ",
    supportText:
      "Допоможіть цьому простору звучати гучніше: за пам’ять, відповідальність і право на мирне майбутнє.",
    donate: "ПІДТРИМАТИ",
    about: "ПРО ПРОЄКТ",
    aboutText:
      "Ми показуємо орієнтовну ціну війни й те, що Росія могла б будувати замість неї — для людей, а не проти людей.",
    contact: "Зв’язатися",
    methodology: "ДЖЕРЕЛА І МЕТОДОЛОГІЯ",
    methodologyText:
      "Кожна цифра має вести до відкритих джерел, прозорих розрахунків і перевірених даних.",
    informed: "БУТИ В КУРСІ",
    informedText: "Ми надішлемо оновлення, коли з’являться нові картки. Без спаму.",
    email: "Ваш email",
    sources: "Переглянути джерела",
    currentCounterModel: "Поточна модель лічильника:",
    calculationBlock: "Блок розрахунку:",
    tickCalculation: "Розрахунок кроку лічильника:",
    backToCounter: "Повернутися до лічильника",
    sourcePagesAria: "Сторінки джерел",
    showSourcePage: "Показати",
    scrollDown: "Прокрутити вниз",
    mainCounterAria: "Загалом витрачено на війну",
    moneyInfo: "Пізніше ця цифра буде пов’язана з методологією та джерелами.",
    submitEmailAria: "Надіслати email",
    copyright: "© 2026 Ціна російської війни",
    pageTitle: "Ціна російської війни",
    pageDescription:
      "Оцінка російських витрат на війну й того, що могло бути збудовано натомість.",
  },
};

export const DEATHS_SOURCE_NOTE: Record<Lang, string> = {
  en: "Public estimate based on confirmed and independently estimated deaths: Russian military deaths from Mediazona/BBC Russian/Meduza; Ukrainian military documented dead from UALosses; civilian deaths from UN OHCHR/HRMMU. The real number is likely higher.",
  ru: "Публичная оценка на основе подтверждённых и независимо рассчитанных смертей: погибшие российские военные по данным Mediazona/BBC Russian/Meduza; документированные погибшие украинские военные по UALosses; гражданские жертвы по UN OHCHR/HRMMU. Реальное число, вероятно, выше.",
  ua: "Публічна оцінка на основі підтверджених і незалежно розрахованих смертей: загиблі російські військові за даними Mediazona/BBC Russian/Meduza; документовані загиблі українські військові за UALosses; цивільні жертви за UN OHCHR/HRMMU. Реальне число, ймовірно, вище.",
};

export const ALTERNATIVE_TEXT: Record<Lang, AlternativeText[]> = {
  en: [
    {
      id: "recycling",
      number: "01",
      category: "Waste / Recycling",
      title: "Modern recycling infrastructure",
      description:
        "Invest in modern waste processing and recycling infrastructure to protect the environment and create sustainable jobs.",
      unitLabel: "modern recycling centres",
      tickerMessage:
        "At this scale, Russia could equip every city with modern waste sorting and recycling infrastructure.",
      attribution: "Photo · Norilsk · Alexander Gronsky",
    },
    {
      id: "social",
      number: "02",
      category: "Investment in Social Infrastructure",
      title: "Children and social support",
      description:
        "Invest in education, social support, children’s development, and care systems that give every child a chance to grow.",
      unitLabel: "children’s centres",
      tickerMessage:
        "At this scale, every child could have access to better education, development, and safe after-school activities.",
      attribution: "Photo · Pskov · dcim.ru",
    },
    {
      id: "civic",
      number: "03",
      category: "Investment in Civic Infrastructure",
      title: "Public spaces and civic life",
      description:
        "Invest in civic life, public spaces, culture, dialogue, and communities that build a free society.",
      unitLabel: "civic spaces",
      tickerMessage:
        "At this scale, every Russian city could become more livable, open, and creative.",
      attribution: "Photo · Kirov · Evgeny Feldman",
    },
  ],
  ru: [
    {
      id: "recycling",
      number: "01",
      category: "Отходы / переработка",
      title: "Современная инфраструктура переработки",
      description:
        "Вложить деньги в переработку отходов и раздельный сбор — в среду, здоровье и работу, которая не разрушает.",
      unitLabel: "современных центров переработки",
      tickerMessage:
        "В таком масштабе Россия могла бы обеспечить каждый город современной системой сортировки и переработки отходов.",
      attribution: "Фото · Норильск · Alexander Gronsky",
    },
    {
      id: "social",
      number: "02",
      category: "Социальная инфраструктура",
      title: "Дети и социальная поддержка",
      description:
        "Вложить деньги в образование, развитие, заботу и безопасные пространства, где у ребёнка появляется шанс расти.",
      unitLabel: "детских центров",
      tickerMessage:
        "В таком масштабе каждый ребёнок мог бы получить доступ к лучшему образованию, развитию и безопасным занятиям после школы.",
      attribution: "Фото · Псков · dcim.ru",
    },
    {
      id: "civic",
      number: "03",
      category: "Гражданская инфраструктура",
      title: "Общественные пространства и гражданская жизнь",
      description:
        "Вложить деньги в культуру, диалог, открытые городские пространства и сообщества, из которых рождается свободное общество.",
      unitLabel: "общественных пространств",
      tickerMessage:
        "В таком масштабе каждый российский город мог бы стать более живым, открытым и пригодным для достойной жизни.",
      attribution: "Фото · Киров · Evgeny Feldman",
    },
  ],
  ua: [
    {
      id: "recycling",
      number: "01",
      category: "Відходи / переробка",
      title: "Сучасна інфраструктура переробки",
      description:
        "Вкласти кошти у переробку відходів і роздільний збір — у довкілля, здоров’я та працю, що не руйнує.",
      unitLabel: "сучасних центрів переробки",
      tickerMessage:
        "У такому масштабі Росія могла б забезпечити кожне місто сучасною системою сортування й переробки відходів.",
      attribution: "Фото · Норильськ · Alexander Gronsky",
    },
    {
      id: "social",
      number: "02",
      category: "Соціальна інфраструктура",
      title: "Діти й соціальна підтримка",
      description:
        "Вкласти кошти в освіту, розвиток, турботу й безпечні простори, де дитина має шанс зростати.",
      unitLabel: "дитячих центрів",
      tickerMessage:
        "У такому масштабі кожна дитина могла б мати доступ до кращої освіти, розвитку й безпечних занять після школи.",
      attribution: "Фото · Псков · dcim.ru",
    },
    {
      id: "civic",
      number: "03",
      category: "Громадянська інфраструктура",
      title: "Публічні простори й громадянське життя",
      description:
        "Вкласти кошти в культуру, діалог, відкриті міські простори й спільноти, з яких постає вільне суспільство.",
      unitLabel: "громадських просторів",
      tickerMessage:
        "У такому масштабі кожне російське місто могло б стати живішим, відкритішим і придатнішим для гідного життя.",
      attribution: "Фото · Кіров · Evgeny Feldman",
    },
  ],
};

export const SOURCE_SLIDES_BY_LANG: Record<Lang, SourceSlide[]> = {
  en: [
    {
      eyebrow: "Sources & Methodology",
      title: "Sources & Methodology",
      subtitle: "This counter is a public estimate, not an exact real-time death count.",
      rows: [
        {
          text: "Mediazona / BBC Russian / Meduza — Russian military deaths estimate based on open-source name verification and Probate Registry statistical modelling.",
          url: "https://en.zona.media/article/2026/05/09/losses",
        },
        {
          text: "UALosses — documented Ukrainian military deaths and missing persons database based on publicly available records.",
          url: "https://ualosses.org/",
        },
        {
          text: "UN OHCHR / HRMMU — verified civilian casualties in Ukraine; this is a confirmed minimum, not the full real number.",
          url: "https://ukraine.ohchr.org/en/reports",
        },
        {
          text: "CSIS — analytical estimates and casualty ranges used to sanity-check the broader forecast.",
          url: "https://www.csis.org/analysis/russias-grinding-war-ukraine",
        },
        {
          text: "Russia Matters — aggregator of public casualty estimates from different institutions and officials.",
          url: "https://www.russiamatters.org/news/russia-ukraine-war-report-card/russia-ukraine-war-report-card-june-3-2026",
        },
      ],
      warning:
        "This figure is a minimum public estimate. The real number may be significantly higher — possibly up to twice as high — because many deaths are unconfirmed, delayed, hidden, or impossible to verify in occupied and frontline areas.",
      model: [
        "Base estimate: 471,418 deaths",
        "Base date: 23 June 2026",
        "Estimated increase: 600 deaths per day",
        "Displayed as: public estimate +",
      ],
      methodology:
        "The counter combines independently estimated Russian military deaths, documented Ukrainian military deaths, and verified civilian deaths. Because all available datasets are incomplete during an active war, the number is intentionally presented as an estimate rather than a confirmed total.",
    },
    {
      eyebrow: "DRONES AND MISSILES COUNTER",
      title: "Drones & Missiles Sources",
      subtitle:
        "This counter estimates Russian drones, decoys, and missiles launched at Ukraine.",
      rows: [
        {
          text: "Ukrainian Air Force daily reports — primary public source for daily Russian drone, decoy, and missile launches against Ukraine.",
          url: "https://t.me/kpszsu",
        },
        {
          text: "Institute for Science and International Security — monthly analysis of Russian Shahed-type UAV deployment against Ukraine, including 2025 and 2026 launch totals.",
          url: "https://isis-online.org/isis-reports/monthly-analysis-of-russian-shahed-136-deployment-against-ukraine",
        },
        {
          text: "CSIS Russian Firepower Strike Tracker — long-term missile strike dataset for Russian missile launches against Ukraine.",
          url: "https://www.csis.org/programs/futures-lab/projects/russian-firepower-strike-tracker-analyzing-missile-attacks-ukraine",
        },
        {
          text: "Ukraine Ministry of Defence summaries — additional public summaries of air-defence interceptions and recorded aerial attacks.",
          url: "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
        },
        {
          text: "Open-source news confirmations — used only as secondary context when they quote Ukrainian Air Force or official Ukrainian data.",
          url: "https://www.reuters.com/world/europe/ukraine/",
        },
      ],
      warning:
        "This figure is a conservative public estimate. The real number may be higher because the model does not fully include every missile after September 2024, every drone launch before 2025, and attacks that may be reported differently across sources.",
      model: [
        "Base estimate: 102,760 launched objects",
        "Rounded display: 103,000+",
        "Base date: 23 June 2026",
        "Estimated increase: 286 launches per day",
        "Average tick rate: +1 every 302 seconds",
        "Displayed as: public estimate +",
      ],
      methodology:
        "The model combines public Shahed-type UAV launch totals, estimated June 2026 launches using the recent daily average, and the CSIS missile launch dataset. It includes drones, decoys, and missiles launched at Ukraine, and is intentionally presented as a conservative public estimate rather than a confirmed total.",
      calculation: [
        "2025 Shahed-type UAVs: 54,538",
        "January–May 2026 Shahed-type UAVs: 30,707",
        "Estimated 1–23 June 2026 UAVs: 6,049",
        "Missiles, September 2022–September 2024: 11,466",
        "Total: 102,760",
        "Rounded display: 103,000+",
      ],
      tick: [
        "286 launches per day",
        "86,400 seconds per day / 286 = 302 seconds",
        "Counter tick: +1 approximately every 302 seconds",
      ],
    },
    {
      eyebrow: "MONEY COUNTER METHODOLOGY",
      title: "Money Counter Methodology",
      subtitle:
        "This counter is an estimate of Russia’s military expenditure since the start of the full-scale invasion of Ukraine on 24 February 2022. It is not an official Kremlin invoice for the war. Russia’s wartime budget is increasingly opaque, and large parts of military and security spending are classified or placed outside the narrow “National Defence” budget line. For that reason, this project uses broader military expenditure estimates rather than the lowest official budget line.",
      rows: [
        {
          text: "SIPRI — Trends in World Military Expenditure, 2022. Used for Russia’s 2022 military expenditure: $86.4B.",
          url: "https://www.sipri.org/media/press-release/2023/world-military-expenditure-reaches-new-record-high-european-spending-surges",
        },
        {
          text: "Reuters / SIPRI — Global military spending climbed 7% in 2023. Used for Russia’s 2023 military expenditure: $109B.",
          url: "https://www.reuters.com/world/growth-global-military-spending-accelerated-2023-think-tank-sipri-says-2024-04-22/",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2024. Used for Russia’s 2024 military expenditure: $149B. Also notes that Russia’s military budget became increasingly opaque and actual spending may be higher.",
          url: "https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2025. Used for Russia’s 2025 military expenditure: $190B.",
          url: "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
        },
        {
          text: "SIPRI — Military Spending in Russia’s Budget for 2026. Used for Russia’s 2026 planned military expenditure: 14.9 trillion rubles.",
          url: "https://www.sipri.org/publications/2026/sipri-insights-peace-and-security/budget-fifth-year-war-military-spending-russias-budget-2026",
        },
        {
          text: "Bank of Russia — Official exchange rates. Used for the official USD/RUB exchange rate: 1 USD = 74.6200 RUB on 24.06.2026.",
          url: "https://www.cbr.ru/eng/currency_base/daily/",
        },
      ],
      warning:
        "Because Russia classifies a large share of wartime expenditure, this counter should be read as a conservative-to-broad military expenditure estimate, not as a complete economic cost of the war. It does not include all indirect losses, sanctions damage, future veteran payments, reconstruction liability, destroyed equipment replacement beyond budgeted expenditure, or long-term demographic and economic costs.",
      model: [
        "Main estimate used:",
        "Total spent on war as of 23 June 2026, 00:00 UTC: $616,259,611,181+",
        "Current rate: $6,331.76 per second",
        "about $16.64 billion per month",
        "about $199.68 billion per year",
        "Formula: current total = $616,259,611,181 + elapsed seconds since 2026-06-23T00:00:00Z × $6,331.76",
      ],
      methodology:
        "This counter combines Russia’s yearly military expenditure estimates from SIPRI and a 2026 per-second growth rate derived from Russia’s planned ruble military expenditure converted at the official Bank of Russia exchange rate. It is intentionally framed as a transparent expenditure estimate rather than a precise total cost of war.",
    },
  ],
  ru: [
    {
      eyebrow: "Источники и методология",
      title: "Источники и методология",
      subtitle: "Этот счётчик — публичная оценка, а не точное число смертей в реальном времени.",
      rows: [
        {
          text: "Mediazona / BBC Russian / Meduza — оценка погибших российских военных на основе открытой поимённой верификации и статистического моделирования Probate Registry.",
          url: "https://en.zona.media/article/2026/05/09/losses",
        },
        {
          text: "UALosses — база документированных погибших и пропавших без вести украинских военных по открытым данным.",
          url: "https://ualosses.org/",
        },
        {
          text: "UN OHCHR / HRMMU — подтверждённые гражданские жертвы в Украине; это проверенный минимум, а не полное реальное число.",
          url: "https://ukraine.ohchr.org/en/reports",
        },
        {
          text: "CSIS — аналитические оценки и диапазоны потерь, используемые для проверки общей модели.",
          url: "https://www.csis.org/analysis/russias-grinding-war-ukraine",
        },
        {
          text: "Russia Matters — агрегатор публичных оценок потерь от разных институтов и официальных лиц.",
          url: "https://www.russiamatters.org/news/russia-ukraine-war-report-card/russia-ukraine-war-report-card-june-3-2026",
        },
      ],
      warning:
        "Эта цифра — минимальная публичная оценка. Реальное число может быть значительно выше — возможно, до двух раз, — потому что многие смерти не подтверждены, запаздывают в данных, скрыты или не могут быть проверены на оккупированных и прифронтовых территориях.",
      model: [
        "Базовая оценка: 471,418 погибших",
        "Базовая дата: 23 июня 2026",
        "Оценочный прирост: 600 смертей в день",
        "Отображается как: публичная оценка +",
      ],
      methodology:
        "Счётчик соединяет независимые оценки погибших российских военных, документированные данные о погибших украинских военных и подтверждённые гражданские жертвы. Поскольку все доступные наборы данных неполны во время активной войны, число намеренно показано как оценка, а не как подтверждённый итог.",
    },
    {
      eyebrow: "СЧЁТЧИК ДРОНОВ И РАКЕТ",
      title: "Источники по дронам и ракетам",
      subtitle: "Этот счётчик оценивает российские дроны, ложные цели и ракеты, запущенные по Украине.",
      rows: [
        {
          text: "Ukrainian Air Force daily reports — основной публичный источник ежедневных данных о российских дронах, ложных целях и ракетах против Украины.",
          url: "https://t.me/kpszsu",
        },
        {
          text: "Institute for Science and International Security — ежемесячный анализ применения российских Shahed-type UAV против Украины, включая итоги 2025 и 2026 годов.",
          url: "https://isis-online.org/isis-reports/monthly-analysis-of-russian-shahed-136-deployment-against-ukraine",
        },
        {
          text: "CSIS Russian Firepower Strike Tracker — долгосрочный набор данных о российских ракетных ударах по Украине.",
          url: "https://www.csis.org/programs/futures-lab/projects/russian-firepower-strike-tracker-analyzing-missile-attacks-ukraine",
        },
        {
          text: "Ukraine Ministry of Defence summaries — дополнительные публичные сводки о перехватах ПВО и зафиксированных воздушных атаках.",
          url: "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
        },
        {
          text: "Open-source news confirmations — используются только как вторичный контекст, когда ссылаются на Ukrainian Air Force или официальные украинские данные.",
          url: "https://www.reuters.com/world/europe/ukraine/",
        },
      ],
      warning:
        "Эта цифра — консервативная публичная оценка. Реальное число может быть выше, потому что модель не полностью включает все ракеты после сентября 2024 года, все запуски дронов до 2025 года и атаки, которые могут по-разному учитываться в разных источниках.",
      model: [
        "Базовая оценка: 102,760 запущенных объектов",
        "Округлённое отображение: 103,000+",
        "Базовая дата: 23 июня 2026",
        "Оценочный прирост: 286 запусков в день",
        "Средний шаг: +1 каждые 302 секунды",
        "Отображается как: публичная оценка +",
      ],
      methodology:
        "Модель соединяет публичные итоги запусков Shahed-type UAV, оценку запусков за июнь 2026 года по недавнему среднесуточному темпу и базу CSIS по ракетным пускам. Она включает дроны, ложные цели и ракеты, запущенные по Украине, и намеренно представлена как консервативная публичная оценка, а не подтверждённый итог.",
      calculation: [
        "Shahed-type UAV в 2025 году: 54,538",
        "Shahed-type UAV в январе–мае 2026 года: 30,707",
        "Оценка запусков UAV 1–23 июня 2026: 6,049",
        "Ракеты, сентябрь 2022 — сентябрь 2024: 11,466",
        "Итого: 102,760",
        "Округлённое отображение: 103,000+",
      ],
      tick: [
        "286 запусков в день",
        "86,400 секунд в день / 286 = 302 секунды",
        "Шаг счётчика: +1 примерно каждые 302 секунды",
      ],
    },
    {
      eyebrow: "МЕТОДОЛОГИЯ ДЕНЕЖНОГО СЧЁТЧИКА",
      title: "Методология денежного счётчика",
      subtitle:
        "Этот счётчик оценивает военные расходы России с начала полномасштабного вторжения в Украину 24 февраля 2022 года. Это не официальный кремлёвский счёт за войну. Военный бюджет России становится всё менее прозрачным, а значительная часть военных и силовых расходов засекречена или вынесена за пределы узкой строки «Национальная оборона». Поэтому проект использует более широкие оценки военных расходов, а не минимальную официальную строку бюджета.",
      rows: [
        {
          text: "SIPRI — Trends in World Military Expenditure, 2022. Использовано для военных расходов России в 2022 году: $86.4B.",
          url: "https://www.sipri.org/media/press-release/2023/world-military-expenditure-reaches-new-record-high-european-spending-surges",
        },
        {
          text: "Reuters / SIPRI — Global military spending climbed 7% in 2023. Использовано для военных расходов России в 2023 году: $109B.",
          url: "https://www.reuters.com/world/growth-global-military-spending-accelerated-2023-think-tank-sipri-says-2024-04-22/",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2024. Использовано для военных расходов России в 2024 году: $149B; также отмечена растущая непрозрачность бюджета и возможность более высоких фактических расходов.",
          url: "https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2025. Использовано для военных расходов России в 2025 году: $190B.",
          url: "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
        },
        {
          text: "SIPRI — Military Spending in Russia’s Budget for 2026. Использовано для планируемых военных расходов России в 2026 году: 14.9 трлн рублей.",
          url: "https://www.sipri.org/publications/2026/sipri-insights-peace-and-security/budget-fifth-year-war-military-spending-russias-budget-2026",
        },
        {
          text: "Bank of Russia — Official exchange rates. Использован официальный курс USD/RUB: 1 USD = 74.6200 RUB на 24.06.2026.",
          url: "https://www.cbr.ru/eng/currency_base/daily/",
        },
      ],
      warning:
        "Поскольку Россия засекречивает значительную долю военных расходов, этот счётчик следует читать как консервативно-широкую оценку военных трат, а не как полную экономическую цену войны. Он не включает все косвенные потери, санкционный ущерб, будущие выплаты ветеранам, ответственность за восстановление, замену уничтоженной техники сверх бюджетных расходов и долгосрочные демографические и экономические последствия.",
      model: [
        "Основная оценка:",
        "Потрачено на войну на 23 июня 2026, 00:00 UTC: $616,259,611,181+",
        "Текущий темп: $6,331.76 в секунду",
        "около $16.64 млрд в месяц",
        "около $199.68 млрд в год",
        "Формула: текущая сумма = $616,259,611,181 + секунды с 2026-06-23T00:00:00Z × $6,331.76",
      ],
      methodology:
        "Счётчик соединяет годовые оценки военных расходов России от SIPRI и темп роста за 2026 год, рассчитанный из планируемых рублёвых военных расходов России, переведённых по официальному курсу Bank of Russia. Он намеренно представлен как прозрачная оценка расходов, а не как точная полная цена войны.",
    },
  ],
  ua: [
    {
      eyebrow: "Джерела і методологія",
      title: "Джерела і методологія",
      subtitle: "Цей лічильник — публічна оцінка, а не точна кількість смертей у реальному часі.",
      rows: [
        {
          text: "Mediazona / BBC Russian / Meduza — оцінка загиблих російських військових на основі відкритої поіменної верифікації та статистичного моделювання Probate Registry.",
          url: "https://en.zona.media/article/2026/05/09/losses",
        },
        {
          text: "UALosses — база документованих загиблих і зниклих безвісти українських військових за відкритими даними.",
          url: "https://ualosses.org/",
        },
        {
          text: "UN OHCHR / HRMMU — підтверджені цивільні жертви в Україні; це перевірений мінімум, а не повне реальне число.",
          url: "https://ukraine.ohchr.org/en/reports",
        },
        {
          text: "CSIS — аналітичні оцінки та діапазони втрат, використані для перевірки ширшої моделі.",
          url: "https://www.csis.org/analysis/russias-grinding-war-ukraine",
        },
        {
          text: "Russia Matters — агрегатор публічних оцінок втрат від різних інституцій та офіційних осіб.",
          url: "https://www.russiamatters.org/news/russia-ukraine-war-report-card/russia-ukraine-war-report-card-june-3-2026",
        },
      ],
      warning:
        "Ця цифра — мінімальна публічна оцінка. Реальне число може бути значно вищим — можливо, до двох разів, — бо багато смертей не підтверджені, надходять із запізненням, приховані або неможливі для перевірки на окупованих і прифронтових територіях.",
      model: [
        "Базова оцінка: 471,418 загиблих",
        "Базова дата: 23 червня 2026",
        "Оцінюване зростання: 600 смертей на день",
        "Відображається як: публічна оцінка +",
      ],
      methodology:
        "Лічильник поєднує незалежні оцінки загиблих російських військових, документовані дані про загиблих українських військових і підтверджені цивільні жертви. Оскільки всі доступні набори даних неповні під час активної війни, число навмисно подано як оцінку, а не як підтверджений підсумок.",
    },
    {
      eyebrow: "ЛІЧИЛЬНИК ДРОНІВ І РАКЕТ",
      title: "Джерела щодо дронів і ракет",
      subtitle: "Цей лічильник оцінює російські дрони, хибні цілі й ракети, запущені по Україні.",
      rows: [
        {
          text: "Ukrainian Air Force daily reports — основне публічне джерело щоденних даних про російські дрони, хибні цілі й ракети проти України.",
          url: "https://t.me/kpszsu",
        },
        {
          text: "Institute for Science and International Security — щомісячний аналіз застосування російських Shahed-type UAV проти України, зокрема підсумки 2025 і 2026 років.",
          url: "https://isis-online.org/isis-reports/monthly-analysis-of-russian-shahed-136-deployment-against-ukraine",
        },
        {
          text: "CSIS Russian Firepower Strike Tracker — довгостроковий набір даних про російські ракетні удари по Україні.",
          url: "https://www.csis.org/programs/futures-lab/projects/russian-firepower-strike-tracker-analyzing-missile-attacks-ukraine",
        },
        {
          text: "Ukraine Ministry of Defence summaries — додаткові публічні зведення про перехоплення ППО та зафіксовані повітряні атаки.",
          url: "https://mod.gov.ua/en/news/ukrainian-air-defense-intercepted-nearly-92-of-drones-amid-intensified-aerial-attacks-in-may",
        },
        {
          text: "Open-source news confirmations — використовуються лише як вторинний контекст, коли цитують Ukrainian Air Force або офіційні українські дані.",
          url: "https://www.reuters.com/world/europe/ukraine/",
        },
      ],
      warning:
        "Ця цифра — консервативна публічна оцінка. Реальне число може бути вищим, бо модель не повністю охоплює всі ракети після вересня 2024 року, усі запуски дронів до 2025 року та атаки, які можуть по-різному рахуватися в різних джерелах.",
      model: [
        "Базова оцінка: 102,760 запущених об’єктів",
        "Округлене відображення: 103,000+",
        "Базова дата: 23 червня 2026",
        "Оцінюване зростання: 286 запусків на день",
        "Середній крок: +1 кожні 302 секунди",
        "Відображається як: публічна оцінка +",
      ],
      methodology:
        "Модель поєднує публічні підсумки запусків Shahed-type UAV, оцінку запусків у червні 2026 року за нещодавнім середньодобовим темпом і базу CSIS щодо ракетних пусків. Вона включає дрони, хибні цілі й ракети, запущені по Україні, і навмисно подана як консервативна публічна оцінка, а не підтверджений підсумок.",
      calculation: [
        "Shahed-type UAV у 2025 році: 54,538",
        "Shahed-type UAV у січні–травні 2026 року: 30,707",
        "Оцінка запусків UAV 1–23 червня 2026: 6,049",
        "Ракети, вересень 2022 — вересень 2024: 11,466",
        "Разом: 102,760",
        "Округлене відображення: 103,000+",
      ],
      tick: [
        "286 запусків на день",
        "86,400 секунд на день / 286 = 302 секунди",
        "Крок лічильника: +1 приблизно кожні 302 секунди",
      ],
    },
    {
      eyebrow: "МЕТОДОЛОГІЯ ГРОШОВОГО ЛІЧИЛЬНИКА",
      title: "Методологія грошового лічильника",
      subtitle:
        "Цей лічильник оцінює військові витрати Росії від початку повномасштабного вторгнення в Україну 24 лютого 2022 року. Це не офіційний кремлівський рахунок за війну. Воєнний бюджет Росії стає дедалі менш прозорим, а значну частину військових і силових видатків засекречено або винесено за межі вузького рядка «Національна оборона». Тому проєкт використовує ширші оцінки військових витрат, а не найнижчий офіційний бюджетний рядок.",
      rows: [
        {
          text: "SIPRI — Trends in World Military Expenditure, 2022. Використано для військових витрат Росії у 2022 році: $86.4B.",
          url: "https://www.sipri.org/media/press-release/2023/world-military-expenditure-reaches-new-record-high-european-spending-surges",
        },
        {
          text: "Reuters / SIPRI — Global military spending climbed 7% in 2023. Використано для військових витрат Росії у 2023 році: $109B.",
          url: "https://www.reuters.com/world/growth-global-military-spending-accelerated-2023-think-tank-sipri-says-2024-04-22/",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2024. Використано для військових витрат Росії у 2024 році: $149B; також зазначено зростання непрозорості бюджету й можливість вищих фактичних витрат.",
          url: "https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024",
        },
        {
          text: "SIPRI — Trends in World Military Expenditure, 2025. Використано для військових витрат Росії у 2025 році: $190B.",
          url: "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-european-and-asian-expenditures-surge",
        },
        {
          text: "SIPRI — Military Spending in Russia’s Budget for 2026. Використано для запланованих військових витрат Росії у 2026 році: 14.9 трлн рублів.",
          url: "https://www.sipri.org/publications/2026/sipri-insights-peace-and-security/budget-fifth-year-war-military-spending-russias-budget-2026",
        },
        {
          text: "Bank of Russia — Official exchange rates. Використано офіційний курс USD/RUB: 1 USD = 74.6200 RUB на 24.06.2026.",
          url: "https://www.cbr.ru/eng/currency_base/daily/",
        },
      ],
      warning:
        "Оскільки Росія засекречує значну частку воєнних витрат, цей лічильник варто читати як консервативно-широку оцінку військових видатків, а не як повну економічну ціну війни. Він не включає всі непрямі втрати, санкційні збитки, майбутні виплати ветеранам, відповідальність за відбудову, заміну знищеної техніки понад бюджетні видатки та довгострокові демографічні й економічні наслідки.",
      model: [
        "Основна оцінка:",
        "Витрачено на війну станом на 23 червня 2026, 00:00 UTC: $616,259,611,181+",
        "Поточний темп: $6,331.76 за секунду",
        "близько $16.64 млрд на місяць",
        "близько $199.68 млрд на рік",
        "Формула: поточна сума = $616,259,611,181 + секунди з 2026-06-23T00:00:00Z × $6,331.76",
      ],
      methodology:
        "Лічильник поєднує річні оцінки військових витрат Росії від SIPRI і темп зростання за 2026 рік, розрахований із запланованих рублевих військових видатків Росії, переведених за офіційним курсом Bank of Russia. Він навмисно поданий як прозора оцінка витрат, а не як точна повна ціна війни.",
    },
  ],
};

export const DONATE_COPY: Record<Lang, DonateCopy> = {
  en: {
    pageTitle: "Support This Project",
    pageDescription:
      "Support the development of The Price of Russian War by Maria Parakhina.",
    back: "Back to counter",
    kicker: "Donation",
    title: "Support This Project",
    paragraphs: [
      "Hello, my name is Maria Parakhina, and I am the creator of this space.",
      "I am a Russian citizen who has lived most of my life in Ukraine, and I am currently an asylum seeker in the United Kingdom.",
      "The purpose of this website is voice and memory. I want to illustrate the absurdity of this war — even though many of us have already become used to it. Darkness should not become normal.",
      "I would be grateful for any support for this initiative and for the further development of the website.",
    ],
    contactIntro:
      "If you would like to place your own fundraiser here in support of the Ukrainian Army, please contact me by email:",
    donationLinksAria: "Donation links",
    monobankText: "Open Monobank jar",
    paypalText: "PayPal QR code for Maria Parakhina",
    paypalQrLabel: "PAYPAL DONATION",
    paypalQrTitle: "Scan to support the project",
    paypalQrSubtitle: "PayPal QR code for Maria Parakhina",
    paypalQrInstruction: "Scan this code with your phone camera or PayPal app.",
    paypalQrOpen: "Open PayPal QR code",
    paypalQrClose: "Close PayPal QR code",
    paypalQrAlt: "PayPal donation QR code for Maria Parakhina",
    paypalFallback: "Open PayPal instead",
    portraitAria: "Portrait of Maria Parakhina",
    portraitAlt: "Maria Parakhina",
  },
  ru: {
    pageTitle: "Поддержать проект",
    pageDescription: "Поддержать развитие проекта «Цена российской войны» Марии Парахиной.",
    back: "Вернуться к счётчику",
    kicker: "Пожертвование",
    title: "Поддержать проект",
    paragraphs: [
      "Здравствуйте. Меня зовут Мария Парахина, я создательница этого пространства.",
      "Я гражданка России, большую часть жизни прожила в Украине, а сейчас являюсь просительницей убежища в Великобритании.",
      "Цель этого сайта — голос и память. Я хочу показать абсурдность этой войны — даже если многие из нас уже привыкли к ней. Тьма не должна становиться нормой.",
      "Я буду благодарна за любую поддержку этой инициативы и дальнейшего развития сайта.",
    ],
    contactIntro:
      "Если вы хотите разместить здесь свой сбор в поддержку Украинской Армии, пожалуйста, напишите мне на email:",
    donationLinksAria: "Ссылки для пожертвований",
    monobankText: "Открыть банку Monobank",
    paypalText: "QR-код PayPal для Марии Парахиной",
    paypalQrLabel: "ПОЖЕРТВОВАНИЕ PAYPAL",
    paypalQrTitle: "Сканируйте, чтобы поддержать проект",
    paypalQrSubtitle: "QR-код PayPal для Марии Парахиной",
    paypalQrInstruction: "Сканируйте код камерой телефона или приложением PayPal.",
    paypalQrOpen: "Открыть QR-код PayPal",
    paypalQrClose: "Закрыть QR-код PayPal",
    paypalQrAlt: "QR-код PayPal для пожертвования Марии Парахиной",
    paypalFallback: "Открыть PayPal вместо этого",
    portraitAria: "Портрет Марии Парахиной",
    portraitAlt: "Мария Парахина",
  },
  ua: {
    pageTitle: "Підтримати проєкт",
    pageDescription: "Підтримати розвиток проєкту «Ціна російської війни» Марії Парахіної.",
    back: "Повернутися до лічильника",
    kicker: "Пожертва",
    title: "Підтримати проєкт",
    paragraphs: [
      "Вітаю. Мене звати Марія Парахіна, я створила цей простір.",
      "Я громадянка Росії, більшу частину життя прожила в Україні, а зараз є шукачкою притулку у Великій Британії.",
      "Мета цього сайту — голос і пам’ять. Я хочу показати абсурдність цієї війни — навіть якщо багато хто з нас уже звик до неї. Темрява не має ставати нормою.",
      "Я буду вдячна за будь-яку підтримку цієї ініціативи й подальшого розвитку сайту.",
    ],
    contactIntro:
      "Якщо ви хочете розмістити тут власний збір на підтримку Української Армії, будь ласка, напишіть мені на email:",
    donationLinksAria: "Посилання для пожертв",
    monobankText: "Відкрити банку Monobank",
    paypalText: "QR-код PayPal для Марії Парахіної",
    paypalQrLabel: "ПОЖЕРТВА PAYPAL",
    paypalQrTitle: "Скануйте, щоб підтримати проєкт",
    paypalQrSubtitle: "QR-код PayPal для Марії Парахіної",
    paypalQrInstruction: "Скануйте цей код камерою телефона або застосунком PayPal.",
    paypalQrOpen: "Відкрити QR-код PayPal",
    paypalQrClose: "Закрити QR-код PayPal",
    paypalQrAlt: "QR-код PayPal для пожертви Марії Парахіні",
    paypalFallback: "Відкрити PayPal натомість",
    portraitAria: "Портрет Марії Парахіної",
    portraitAlt: "Марія Парахіна",
  },
};
