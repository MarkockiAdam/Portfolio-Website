/* ==========================================================================
   CONTENT — edit this file to change what the website says.
   Everything visitors read lives here: links, projects, journey, and all
   three languages (en = English, pl = Polski, fr = Français).

   ⚠️  Lines marked  // TODO  are placeholders. Replace them with real info.
   ========================================================================== */

window.SITE = {
  name: "Adam Markocki",
  github: "MarkockiAdam",               // used for the contributions heatmap
  email: "markockidev@icloud.com",
  photo: "assets/adam-illustrated.jpg", // picture in About

  socials: [
    { label: "X / Twitter", url: "https://x.com/MarkockiAdam" },
    { label: "LinkedIn",    url: "https://www.linkedin.com/in/adam-markocki-98a037218/" },
    { label: "GitHub",      url: "https://github.com/MarkockiAdam" },
    { label: "Instagram",   url: "https://www.instagram.com/markockiadam/" },
    { label: "TikTok",      url: "https://www.tiktok.com/@markockidev" }
  ],

  /* Projects. image: app icon in assets/projects/. accent: card colour. kind: short label.
     badge: gold "winner" label. featured: wide card.
     links: any number of { label, url }. */
  projects: [
    {
      name: "SafePoland",
      platform: "iOS", status: "award",          // used by the ATLAS style
      accent: "#3f9a54",
      kind: { en: "Emergency guide", pl: "Przewodnik kryzysowy", fr: "Guide d’urgence" },
      image: "assets/projects/safepoland.png",
      badge: true,                      // shows "Swift Student Challenge winner"
      featured: true,                   // big card
      desc: {
        en: "A guide to preparing for emergencies in Poland: emergency numbers and safety checklists in five languages. Works offline and collects no data.",
        pl: "Przewodnik, jak przygotować się na sytuacje kryzysowe w Polsce: numery alarmowe i listy kontrolne w pięciu językach. Działa offline i nie zbiera danych.",
        fr: "Un guide pour se préparer aux situations d’urgence en Pologne : numéros d’urgence et listes de sécurité en cinq langues. Hors ligne, sans collecte de données."
      },
      links: [{ label: "App Store", url: "https://apps.apple.com/app/id6770227009" }]
    },
    {
      name: "Easel",
      platform: "iOS · iPadOS", status: "live",          // used by the ATLAS style
      accent: "#c79a55",
      kind: { en: "Focus timer", pl: "Minutnik skupienia", fr: "Minuteur" },
      image: "assets/projects/easel.png",
      desc: {
        en: "A focus timer that slowly reveals a famous painting while you work. Stay focused, and the masterpiece is yours.",
        pl: "Minutnik skupienia, który powoli odsłania słynny obraz, gdy pracujesz. Wytrwaj do końca, a arcydzieło jest Twoje.",
        fr: "Un minuteur de concentration qui dévoile lentement un tableau célèbre pendant que vous travaillez."
      },
      links: [
        { label: "easelfocus.app", url: "https://easelfocus.app/" },
        { label: "App Store", url: "https://apps.apple.com/app/id6793262483" }
      ]
    },
    {
      name: "BookWorm",
      platform: "iOS · iPadOS", status: "live",          // used by the ATLAS style
      accent: "#5fa55a",
      kind: { en: "Reading tracker", pl: "Dziennik czytania", fr: "Suivi de lecture" },
      image: "assets/projects/bookworm.png",
      desc: {
        en: "A calm reading tracker for paper books, ebooks and audiobooks. Log a page in a second and keep your streak going.",
        pl: "Spokojny dziennik czytania dla książek papierowych, e-booków i audiobooków. Zapisz stronę w sekundę i nie przerywaj serii.",
        fr: "Un suivi de lecture apaisant pour livres papier, e-books et livres audio. Notez une page en une seconde et gardez votre série."
      },
      links: [
        { label: "ilovebookworm.com", url: "https://ilovebookworm.com/" },
        { label: "App Store", url: "https://apps.apple.com/app/id6761390761" }
      ]
    },
    {
      name: "TimeBox",
      platform: "iOS", status: "live",          // used by the ATLAS style
      accent: "#8d9bff",
      kind: { en: "Day planner", pl: "Planer dnia", fr: "Planificateur" },
      image: "assets/projects/timebox.png",
      desc: {
        en: "A minimalist time-blocking planner. Three top priorities a day, so you work on what actually matters.",
        pl: "Minimalistyczny planer do blokowania czasu. Trzy główne priorytety dziennie, żeby robić to, co naprawdę ważne.",
        fr: "Un planificateur minimaliste par blocs de temps. Trois priorités par jour, pour se concentrer sur l’essentiel."
      },
      links: [{ label: "App Store", url: "https://apps.apple.com/app/id6756616721" }]
    },
    {
      name: "Warashi",
      platform: "macOS", status: "beta",          // used by the ATLAS style
      accent: "#e0855a",
      kind: { en: "Mac utility", pl: "Narzędzie na Maca", fr: "Utilitaire Mac" },
      image: "assets/projects/warashi.png",
      desc: {
        en: "A flight recorder for your Mac. A quiet menu bar app that remembers what your Mac did, every five seconds, for a year.",
        pl: "Czarna skrzynka dla Twojego Maca. Cicha aplikacja w pasku menu, która przez rok co pięć sekund zapisuje, co robił Twój Mac.",
        fr: "Une boîte noire pour votre Mac. Une app discrète dans la barre des menus qui retient ce que fait votre Mac, toutes les cinq secondes, pendant un an."
      },
      links: [
        { label: "Free beta (Mac)", url: "https://github.com/MarkockiAdam/warashi-releases/releases/latest/download/Warashi.dmg" },
        { label: "warashi.app", url: "https://warashi.app/" }
      ]
    }
  ],

  /* Built in collaboration with Terra Cracovianum. icon: pixel icon name.
     Link labels can be plain text or { en, pl, fr }. */
  collab: {
    name: "Terra Cracovianum",
    logo: "assets/projects/terra-crest.png",
    url: "https://terracracovianum.org/projekty/",
    items: [
      {
        name: "Budżet Polski", icon: "chart",
        kind: { en: "Platform · Beta", pl: "Platforma · Beta", fr: "Plateforme · Bêta" },
        desc: {
          en: "An interactive look at Poland’s state budget, 2011–2026: where your taxes go, compared year to year with inflation taken into account.",
          pl: "Interaktywna wizualizacja budżetu Polski 2011–2026: na co idą Twoje podatki, z porównaniem lat z uwzględnieniem inflacji.",
          fr: "Une visualisation interactive du budget de la Pologne, 2011–2026 : où vont vos impôts, année par année, inflation comprise."
        },
        links: [{ label: "budzetpolski.com", url: "https://budzetpolski.com/" }]
      },
      {
        name: "terracracovianum.org", icon: "flag",
        kind: { en: "Website", pl: "Strona", fr: "Site web" },
        desc: {
          en: "The think tank’s home: free analysis on geopolitics, diplomacy and armed conflict, in Polish and English.",
          pl: "Dom think tanku: darmowe analizy o geopolityce, dyplomacji i konfliktach zbrojnych, po polsku i angielsku.",
          fr: "La maison du think tank : analyses gratuites sur la géopolitique, la diplomatie et les conflits, en polonais et en anglais."
        },
        links: [{ label: { en: "Visit", pl: "Otwórz", fr: "Visiter" }, url: "https://terracracovianum.org/" }]
      },
      {
        name: { en: "World Embassies", pl: "Ambasady świata", fr: "Ambassades du monde" }, icon: "globe",
        kind: { en: "Map", pl: "Mapa", fr: "Carte" },
        desc: {
          en: "Embassies and consulates on one map — Warsaw, Kraków and Paris so far. Search by country or street.",
          pl: "Ambasady i konsulaty na jednej mapie — na razie Warszawa, Kraków i Paryż. Szukaj po kraju lub ulicy.",
          fr: "Ambassades et consulats sur une carte — Varsovie, Cracovie et Paris pour l’instant. Recherche par pays ou par rue."
        },
        links: [{ label: { en: "Open map", pl: "Otwórz mapę", fr: "Ouvrir la carte" }, url: "https://terra-cracovianum.github.io/World-embassies/" }]
      },
      {
        name: { en: "Sejm Seat Calculator", pl: "Kalkulator Sejmowy", fr: "Calculateur de la Diète" }, icon: "calc",
        kind: { en: "Calculator", pl: "Kalkulator", fr: "Calculateur" },
        desc: {
          en: "Set each party’s support and see how the 460 seats in Poland’s parliament split under the D’Hondt method.",
          pl: "Ustaw poparcie partii i zobacz, jak 460 mandatów w Sejmie dzieli się metodą D’Hondta.",
          fr: "Réglez le score des partis et voyez comment les 460 sièges de la Diète se répartissent selon D’Hondt."
        },
        links: [{ label: { en: "Try it", pl: "Wypróbuj", fr: "Essayer" }, url: "https://terra-cracovianum.github.io/Kalkulator-wynik-w-do-sejmu/" }]
      },
      {
        name: { en: "Kraków Referendum 2026", pl: "Referendum Kraków 2026", fr: "Référendum de Cracovie 2026" }, icon: "map",
        kind: { en: "Results map", pl: "Mapa wyników", fr: "Carte des résultats" },
        desc: {
          en: "Turnout and results of the 2026 Kraków referendum, polling station by polling station.",
          pl: "Frekwencja i wyniki referendum w Krakowie 2026, komisja po komisji.",
          fr: "Participation et résultats du référendum de Cracovie 2026, bureau de vote par bureau de vote."
        },
        links: [{ label: { en: "Open map", pl: "Otwórz mapę", fr: "Ouvrir la carte" }, url: "https://terra-cracovianum.github.io/Wyniki-Referendum-KRK-2026/" }]
      },
      {
        name: { en: "Kraków Mayoral Election 2026", pl: "Wybory prezydenta Krakowa 2026", fr: "Élection du maire de Cracovie 2026" }, icon: "ballot",
        kind: { en: "Results maps", pl: "Mapy wyników", fr: "Cartes des résultats" },
        desc: {
          en: "Both rounds of the snap election (27 September and 11 October 2026), down to every polling station.",
          pl: "Obie tury przedterminowych wyborów (27 września i 11 października 2026), aż do każdej komisji.",
          fr: "Les deux tours de l’élection anticipée (27 septembre et 11 octobre 2026), jusqu’à chaque bureau de vote."
        },
        links: [
          { label: { en: "Round 1", pl: "I tura", fr: "1er tour" }, url: "https://terra-cracovianum.github.io/Krakow-Wybory-Prezydenckie-27-Wrzesnia-2026/" },
          { label: { en: "Round 2", pl: "II tura", fr: "2nd tour" }, url: "https://terra-cracovianum.github.io/Krakow-Wybory-Prezydenckie-Druga-Tura-11-Pazdziernika/" }
        ]
      }
    ]
  },

  /* CV timeline — newest first. gold: true = highlighted. next: true = locked "next quest". */
  journey: [
    {
      icon: "crown", next: true, when: { en: "Next quest", pl: "Następna misja", fr: "Prochaine quête" },
      title: { en: "Where technology meets global affairs", pl: "Tam, gdzie technologia spotyka geopolitykę", fr: "Là où la tech rencontre la géopolitique" },
      text: {
        en: "Building at the intersection of tech and power. Loading…",
        pl: "Budowanie na styku technologii i władzy. Ładowanie…",
        fr: "Construire à la croisée de la tech et du pouvoir. Chargement…"
      }
    },
    {
      icon: "trophy", gold: true, when: { en: "2026 · Apple", pl: "2026 · Apple", fr: "2026 · Apple" },
      title: { en: "Swift Student Challenge Winner", pl: "Zwycięzca Swift Student Challenge", fr: "Lauréat du Swift Student Challenge" },
      text: {
        en: "My iOS app SafePoland, a guide to preparing for emergency situations, was selected by Apple as a winning submission.",
        pl: "Moja aplikacja SafePoland, przewodnik przygotowania na sytuacje kryzysowe, została wybrana przez Apple jako zwycięskie zgłoszenie.",
        fr: "Mon app iOS SafePoland, un guide pour se préparer aux situations d’urgence, a été choisie par Apple parmi les projets lauréats."
      }
    },
    {
      icon: "flag", when: { en: "2026 — now", pl: "2026 — obecnie", fr: "2026 — aujourd’hui" },
      title: { en: "Co-founder & President, Terra Cracovianum", pl: "Współzałożyciel i prezes, Terra Cracovianum", fr: "Cofondateur et président, Terra Cracovianum" },
      text: {
        en: "An independent Kraków think tank on geopolitics, diplomacy and armed conflict. Free analysis, no paywall.",
        pl: "Niezależny krakowski think tank: geopolityka, dyplomacja i konflikty zbrojne. Darmowe analizy, bez paywalla.",
        fr: "Un think tank indépendant à Cracovie : géopolitique, diplomatie et conflits armés. Analyses gratuites, sans paywall."
      },
      link: { label: "terracracovianum.org", url: "https://terracracovianum.org/" }
    },
    {
      icon: "globe", when: { en: "2024 — 2027", pl: "2024 — 2027", fr: "2024 — 2027" },
      title: { en: "International Relations", pl: "Stosunki międzynarodowe", fr: "Relations internationales" },
      text: {
        en: "Krakow University of Economics. Member of the UEK Honors programme WISE.",
        pl: "Uniwersytet Ekonomiczny w Krakowie. Członek programu UEK Honors WISE.",
        fr: "Université d’économie de Cracovie. Membre du programme d’excellence UEK Honors WISE."
      }
    },
    {
      icon: "book", when: { en: "2020 — 2024 · High school", pl: "2020 — 2024 · Liceum", fr: "2020 — 2024 · Lycée" },
      title: { en: "Catholic Montessori High School", pl: "Katolickie Liceum Montessori", fr: "Lycée catholique Montessori" },
      text: {
        en: "Full name: Catholic Montessori High School of the Righteous Among the Nations, Kraków. Graduated with the Matura in 2024.",
        pl: "Katolickie Liceum Montessori im. Sprawiedliwych wśród Narodów Świata w Krakowie. Matura 2024.",   // TODO: check official Polish name
        fr: "Lycée catholique Montessori des Justes parmi les Nations, Cracovie. Baccalauréat polonais (Matura) en 2024."
      }
    }
  ],

  /* The rest of the CV. Places stay as written; titles are translated. */
  cv: {
    experience: [
      { title: { en: "Co-founder & President", pl: "Współzałożyciel i prezes", fr: "Cofondateur et président" }, place: "Terra Cracovianum", years: "2026 — now" },
      { title: { en: "Volunteer", pl: "Wolontariusz", fr: "Bénévole" }, place: "Padre Pio Charitable Organization, Kraków", years: "2015 — now" },
      { title: { en: "Restaurant team member", pl: "Członek zespołu restauracji", fr: "Équipier de restaurant" }, place: "McDonald’s, Kraków", years: "Jun — Sep 2024" },
      { title: { en: "Treasurer", pl: "Skarbnik", fr: "Trésorier" }, place: "Student company", years: "2022 — 2023" },
      { title: { en: "Painter", pl: "Malarz", fr: "Peintre" }, place: "Summer job", years: "Jul — Aug 2021" }
    ],
    activities: [
      { name: { en: "Student Parliament, Krakow University of Economics", pl: "Parlament Studentów UEK", fr: "Parlement étudiant, Université d’économie de Cracovie" }, role: { en: "Member", pl: "Członek", fr: "Membre" } },
      { name: "UEK Honors WISE", role: { en: "Member", pl: "Członek", fr: "Membre" } },
      { name: "Geopolitics & Economic Geography Student Society", role: { en: "Member", pl: "Członek", fr: "Membre" } },
      { name: "Edu for Edu", role: { en: "Finalist · Zwolnieni z Teorii", pl: "Finalista · Zwolnieni z Teorii", fr: "Finaliste · Zwolnieni z Teorii" } }
    ],
    certificates: [
      "Google Project Management — Coursera",
      "Google AI Essentials — Coursera",
      "UI/UX Fundamentals in Figma — Udemy",
      "Project Management Principles — Zwolnieni z Teorii",
      "Vibe Coding Fundamentals — Scrimba",
      "Prompt Engineering for ChatGPT — Vanderbilt University",
      "Forward Program — McKinsey & Company"
    ],
    languages: [
      { name: { en: "Polish", pl: "Polski", fr: "Polonais" }, level: { en: "Native", pl: "Ojczysty", fr: "Langue maternelle" } },
      { name: { en: "English", pl: "Angielski", fr: "Anglais" }, level: { en: "C2", pl: "C2", fr: "C2" } },
      { name: { en: "French", pl: "Francuski", fr: "Français" }, level: { en: "A1–A2", pl: "A1–A2", fr: "A1–A2" } }
    ]
  },


  /* Interface text in each language. */
  i18n: {
    en: {
      "atlas.notice": "Event logged",
      "skin.label": "Style",
      "picker.title": "How do you want to explore?",
      "picker.pixel": "A playful pixel sky — apps, story and a treasure chest.",
      "picker.atlas": "An analyst console — maps, signals, networks and a classified file.",
      "picker.hint": "You can switch anytime in the top-right corner.",
      "picker.enter": "Enter",
      "atlas.nav.overview": "Overview",
      "atlas.nav.assets": "Assets",
      "atlas.nav.ops": "Operations",
      "atlas.nav.signals": "Signals",
      "atlas.nav.timeline": "Timeline",
      "atlas.nav.dossier": "Dossier",
      "atlas.nav.contact": "Contact",
      "atlas.profiles": "Profiles",
      "atlas.search": "Search the profile",
      "atlas.classification": "Open source · Public profile",
      "atlas.base": "Base",
      "atlas.role": "Role",
      "atlas.roleval": "International relations student · App developer · Think-tank president",
      "atlas.affiliation": "Affiliation",
      "atlas.distinction": "Distinction",
      "atlas.map": "Area of operations",
      "atlas.kpi.apps": "Apps shipped",
      "atlas.kpi.tools": "Think-tank tools",
      "atlas.kpi.contrib": "Contributions · 12 mo",
      "atlas.kpi.langs": "Languages",
      "atlas.graph": "Link analysis",
      "atlas.graph.sub": "Organisations and projects connected to the subject. Hover a node to trace its links.",
      "atlas.legend.org": "Organisation",
      "atlas.legend.proj": "Project",
      "atlas.legend.award": "Award",
      "atlas.assets": "Assets · Apps",
      "atlas.col.name": "Name",
      "atlas.col.type": "Type",
      "atlas.col.platform": "Platform",
      "atlas.col.status": "Status",
      "atlas.col.links": "Links",
      "atlas.filter.all": "All",
      "atlas.status.live": "Live",
      "atlas.status.beta": "Beta",
      "atlas.status.award": "Award",
      "atlas.ops": "Operations · Terra Cracovianum",
      "atlas.signals": "Signals · GitHub",
      "atlas.weekly": "Contributions per week",
      "atlas.daily": "Daily activity",
      "atlas.last7": "Last 7 days",
      "atlas.streak": "Longest streak",
      "atlas.best": "Busiest day",
      "atlas.days": "days",
      "atlas.total": "Last 12 months",
      "atlas.week": "Week of",
      "atlas.timeline": "Activity timeline",
      "atlas.lane.edu": "Education",
      "atlas.lane.work": "Work & leadership",
      "atlas.lane.award": "Award",
      "atlas.today": "Today",
      "atlas.dossier": "Dossier · Full CV",
      "atlas.declassify": "Declassify",
      "atlas.restricted": "Restricted",
      "atlas.declassified": "Declassified",
      "atlas.redacted": "This file is redacted. Declassify it to read the full CV.",
      "atlas.cleared": "Clearance granted — full file",
      "atlas.channel": "Open channel",
      "atlas.copy": "Copy email",
      "atlas.copied": "Email copied",
      "atlas.pal.sections": "Sections",
      "atlas.pal.items": "Projects & tools",
      "atlas.pal.actions": "Actions",
      "atlas.pal.empty": "No results",
      "atlas.pal.pixel": "Switch to the Pixel style",
      "atlas.pal.hint": "↑↓ to move · Enter to open · Esc to close",
      "collab.kicker": "In collaboration with", "collab.text": "Tools I designed and built for the think tank I co-founded — used to explain budgets, elections and diplomacy.", "collab.all": "All projects",
      "cv.open": "Open my full CV", "cv.close": "Close the CV", "cv.hint": "Experience · activities · languages · certificates", "toast.loot": "Loot found — the full CV", "about.follow": "Follow me",
      "work.site": "Website",
      "cv.experience": "Experience", "cv.activities": "Activities", "cv.skills": "Skills",
      "cv.certificates": "Certificates", "cv.languages": "Languages", "work.winner": "Swift Student Challenge Winner",
      "meta.title": "Adam Markocki — Builder of apps. Student of power.",
      "hero.eyebrow": "Kraków, Poland 🇵🇱",
      "hero.title": "Builder of apps.<br>Student of power.",
      "hero.lede": "I’m Adam. I study international relations in Kraków and build apps for iPhone and Mac. Apple Swift Student Challenge winner 2026.",
      "hero.cta1": "See my work",
      "hero.cta2": "Get in touch",
      "badge.ssc": "Swift Student Challenge Winner ’26",
      "badge.tank": "Co-founder · Terra Cracovianum",
      "badge.wise": "WISE · Kraków Univ. of Economics",
      "work.kicker": "01 / Work",
      "work.title": "Things I’ve built",
      "code.kicker": "02 / Code",
      "code.title": "Blocks placed this year",
      "code.sub": "Every square is a day on GitHub.",
      "code.total": "{n} contributions in the last year",
      "code.error": "Couldn’t load contributions right now.",
      "code.open": "Open GitHub",
      "about.kicker": "03 / About",
      "about.title": "Between politics and tech",
      "about.p1": "Proudly Polish 🇵🇱<br>I study international relations, and when I get sick of politics, I go to tech. When I feel too stupid for tech, I go back to politics.",
      "journey.kicker": "04 / CV",
      "journey.title": "Experience & education",
      "journey.locked": "Locked",
      "contact.kicker": "05 / Contact",
      "contact.title": "My inbox is open.",
      "contact.text": "Whether it’s a project, a collaboration, an interview or just a hello — I’m always happy to hear from people. Reach out and I’ll get back to you.",
      "contact.email": "Email me",
      "contact.copied": "Email copied",
      "footer.made": "Built in Kraków, Poland.",
      "nav.home": "Home", "nav.work": "Work", "nav.code": "Code",
      "nav.about": "About", "nav.journey": "CV", "nav.contact": "Contact",
      "ui.sound": "Sound", "ui.theme": "Day / night", "ui.lang": "Language",
      "toast.title": "Achievement unlocked!",
      "toast.ssc": "Swift Student Challenge Winner 2026",
      "toast.explorer": "Explorer — you reached the end"
    },
    pl: {
      "atlas.notice": "Zdarzenie zarejestrowane",
      "skin.label": "Styl",
      "picker.title": "Jak chcesz zwiedzać?",
      "picker.pixel": "Zabawne pikselowe niebo — aplikacje, historia i skrzynia ze skarbem.",
      "picker.atlas": "Konsola analityka — mapy, sygnały, sieci i tajne akta.",
      "picker.hint": "Możesz to zmienić w każdej chwili w prawym górnym rogu.",
      "picker.enter": "Wejdź",
      "atlas.nav.overview": "Przegląd",
      "atlas.nav.assets": "Aktywa",
      "atlas.nav.ops": "Operacje",
      "atlas.nav.signals": "Sygnały",
      "atlas.nav.timeline": "Oś czasu",
      "atlas.nav.dossier": "Teczka",
      "atlas.nav.contact": "Kontakt",
      "atlas.profiles": "Profile",
      "atlas.search": "Szukaj w profilu",
      "atlas.classification": "Źródła otwarte · Profil publiczny",
      "atlas.base": "Baza",
      "atlas.role": "Rola",
      "atlas.roleval": "Student stosunków międzynarodowych · Twórca aplikacji · Prezes think tanku",
      "atlas.affiliation": "Afiliacja",
      "atlas.distinction": "Wyróżnienie",
      "atlas.map": "Obszar działań",
      "atlas.kpi.apps": "Wydane aplikacje",
      "atlas.kpi.tools": "Narzędzia think tanku",
      "atlas.kpi.contrib": "Kontrybucje · 12 mies.",
      "atlas.kpi.langs": "Języki",
      "atlas.graph": "Analiza powiązań",
      "atlas.graph.sub": "Organizacje i projekty powiązane z osobą. Najedź na węzeł, by zobaczyć powiązania.",
      "atlas.legend.org": "Organizacja",
      "atlas.legend.proj": "Projekt",
      "atlas.legend.award": "Nagroda",
      "atlas.assets": "Aktywa · Aplikacje",
      "atlas.col.name": "Nazwa",
      "atlas.col.type": "Typ",
      "atlas.col.platform": "Platforma",
      "atlas.col.status": "Status",
      "atlas.col.links": "Linki",
      "atlas.filter.all": "Wszystkie",
      "atlas.status.live": "Dostępna",
      "atlas.status.beta": "Beta",
      "atlas.status.award": "Nagroda",
      "atlas.ops": "Operacje · Terra Cracovianum",
      "atlas.signals": "Sygnały · GitHub",
      "atlas.weekly": "Kontrybucje tygodniowo",
      "atlas.daily": "Aktywność dzienna",
      "atlas.last7": "Ostatnie 7 dni",
      "atlas.streak": "Najdłuższa seria",
      "atlas.best": "Najaktywniejszy dzień",
      "atlas.days": "dni",
      "atlas.total": "Ostatnie 12 miesięcy",
      "atlas.week": "Tydzień od",
      "atlas.timeline": "Oś aktywności",
      "atlas.lane.edu": "Edukacja",
      "atlas.lane.work": "Praca i przywództwo",
      "atlas.lane.award": "Nagroda",
      "atlas.today": "Dziś",
      "atlas.dossier": "Teczka · Pełne CV",
      "atlas.declassify": "Odtajnij",
      "atlas.restricted": "Zastrzeżone",
      "atlas.declassified": "Odtajnione",
      "atlas.redacted": "Te akta są utajnione. Odtajnij je, aby przeczytać pełne CV.",
      "atlas.cleared": "Dostęp przyznany — pełne akta",
      "atlas.channel": "Otwarty kanał",
      "atlas.copy": "Kopiuj e-mail",
      "atlas.copied": "Skopiowano e-mail",
      "atlas.pal.sections": "Sekcje",
      "atlas.pal.items": "Projekty i narzędzia",
      "atlas.pal.actions": "Akcje",
      "atlas.pal.empty": "Brak wyników",
      "atlas.pal.pixel": "Przełącz na styl Pixel",
      "atlas.pal.hint": "↑↓ wybór · Enter otwiera · Esc zamyka",
      "collab.kicker": "We współpracy z", "collab.text": "Narzędzia, które zaprojektowałem i zbudowałem dla współzałożonego przeze mnie think tanku — o budżecie, wyborach i dyplomacji.", "collab.all": "Wszystkie projekty",
      "cv.open": "Otwórz pełne CV", "cv.close": "Zamknij CV", "cv.hint": "Doświadczenie · aktywności · języki · certyfikaty", "toast.loot": "Znaleziono łup — pełne CV", "about.follow": "Obserwuj mnie",
      "work.site": "Strona",
      "cv.experience": "Doświadczenie", "cv.activities": "Aktywności", "cv.skills": "Umiejętności",
      "cv.certificates": "Certyfikaty", "cv.languages": "Języki", "work.winner": "Zwycięzca Swift Student Challenge",
      "meta.title": "Adam Markocki — Buduję aplikacje. Badam władzę.",
      "hero.eyebrow": "Kraków, Polska 🇵🇱",
      "hero.title": "Buduję aplikacje.<br>Badam władzę.",
      "hero.lede": "Jestem Adam. Studiuję stosunki międzynarodowe w Krakowie i tworzę aplikacje na iPhone’a i Maca. Zwycięzca Apple Swift Student Challenge 2026.",
      "hero.cta1": "Zobacz projekty",
      "hero.cta2": "Napisz do mnie",
      "badge.ssc": "Zwycięzca Swift Student Challenge ’26",
      "badge.tank": "Współzałożyciel · Terra Cracovianum",
      "badge.wise": "WISE · UEK w Krakowie",
      "work.kicker": "01 / Projekty",
      "work.title": "Co zbudowałem",
      "code.kicker": "02 / Kod",
      "code.title": "Bloki postawione w tym roku",
      "code.sub": "Każdy kwadrat to jeden dzień na GitHubie.",
      "code.total": "{n} kontrybucji w ostatnim roku",
      "code.error": "Nie udało się teraz wczytać kontrybucji.",
      "code.open": "Otwórz GitHub",
      "about.kicker": "03 / O mnie",
      "about.title": "Między polityką a technologią",
      "about.p1": "Dumny Polak 🇵🇱<br>Studiuję stosunki międzynarodowe, a kiedy mam dość polityki, idę w technologię. Kiedy czuję się za głupi na technologię, wracam do polityki.",
      "journey.kicker": "04 / CV",
      "journey.title": "Doświadczenie i edukacja",
      "journey.locked": "Zablokowane",
      "contact.kicker": "05 / Kontakt",
      "contact.title": "Moja skrzynka jest otwarta.",
      "contact.text": "Projekt, współpraca, wywiad czy zwykłe „cześć” — zawsze chętnie poznaję nowych ludzi. Napisz do mnie, a odpowiem.",
      "contact.email": "Napisz maila",
      "contact.copied": "Skopiowano adres",
      "footer.made": "Zbudowane w Krakowie.",
      "nav.home": "Start", "nav.work": "Projekty", "nav.code": "Kod",
      "nav.about": "O mnie", "nav.journey": "CV", "nav.contact": "Kontakt",
      "ui.sound": "Dźwięk", "ui.theme": "Dzień / noc", "ui.lang": "Język",
      "toast.title": "Osiągnięcie odblokowane!",
      "toast.ssc": "Zwycięzca Swift Student Challenge 2026",
      "toast.explorer": "Odkrywca — dotarłeś do końca"
    },
    fr: {
      "atlas.notice": "Événement enregistré",
      "skin.label": "Style",
      "picker.title": "Comment voulez-vous explorer ?",
      "picker.pixel": "Un ciel en pixels ludique — apps, parcours et un coffre au trésor.",
      "picker.atlas": "Une console d’analyste — cartes, signaux, réseaux et un dossier classifié.",
      "picker.hint": "Vous pouvez changer à tout moment en haut à droite.",
      "picker.enter": "Entrer",
      "atlas.nav.overview": "Aperçu",
      "atlas.nav.assets": "Actifs",
      "atlas.nav.ops": "Opérations",
      "atlas.nav.signals": "Signaux",
      "atlas.nav.timeline": "Chronologie",
      "atlas.nav.dossier": "Dossier",
      "atlas.nav.contact": "Contact",
      "atlas.profiles": "Profils",
      "atlas.search": "Rechercher dans le profil",
      "atlas.classification": "Source ouverte · Profil public",
      "atlas.base": "Base",
      "atlas.role": "Rôle",
      "atlas.roleval": "Étudiant en relations internationales · Développeur d’apps · Président de think tank",
      "atlas.affiliation": "Affiliation",
      "atlas.distinction": "Distinction",
      "atlas.map": "Zone d’opérations",
      "atlas.kpi.apps": "Apps publiées",
      "atlas.kpi.tools": "Outils du think tank",
      "atlas.kpi.contrib": "Contributions · 12 mois",
      "atlas.kpi.langs": "Langues",
      "atlas.graph": "Analyse des liens",
      "atlas.graph.sub": "Organisations et projets liés au sujet. Survolez un nœud pour suivre ses liens.",
      "atlas.legend.org": "Organisation",
      "atlas.legend.proj": "Projet",
      "atlas.legend.award": "Distinction",
      "atlas.assets": "Actifs · Apps",
      "atlas.col.name": "Nom",
      "atlas.col.type": "Type",
      "atlas.col.platform": "Plateforme",
      "atlas.col.status": "Statut",
      "atlas.col.links": "Liens",
      "atlas.filter.all": "Tous",
      "atlas.status.live": "En ligne",
      "atlas.status.beta": "Bêta",
      "atlas.status.award": "Primé",
      "atlas.ops": "Opérations · Terra Cracovianum",
      "atlas.signals": "Signaux · GitHub",
      "atlas.weekly": "Contributions par semaine",
      "atlas.daily": "Activité quotidienne",
      "atlas.last7": "7 derniers jours",
      "atlas.streak": "Plus longue série",
      "atlas.best": "Jour le plus actif",
      "atlas.days": "jours",
      "atlas.total": "12 derniers mois",
      "atlas.week": "Semaine du",
      "atlas.timeline": "Chronologie des activités",
      "atlas.lane.edu": "Formation",
      "atlas.lane.work": "Travail et direction",
      "atlas.lane.award": "Distinction",
      "atlas.today": "Aujourd’hui",
      "atlas.dossier": "Dossier · CV complet",
      "atlas.declassify": "Déclassifier",
      "atlas.restricted": "Accès restreint",
      "atlas.declassified": "Déclassifié",
      "atlas.redacted": "Ce dossier est expurgé. Déclassifiez-le pour lire le CV complet.",
      "atlas.cleared": "Accès accordé — dossier complet",
      "atlas.channel": "Canal ouvert",
      "atlas.copy": "Copier l’e-mail",
      "atlas.copied": "E-mail copié",
      "atlas.pal.sections": "Sections",
      "atlas.pal.items": "Projets et outils",
      "atlas.pal.actions": "Actions",
      "atlas.pal.empty": "Aucun résultat",
      "atlas.pal.pixel": "Passer au style Pixel",
      "atlas.pal.hint": "↑↓ naviguer · Entrée ouvrir · Échap fermer",
      "collab.kicker": "En collaboration avec", "collab.text": "Des outils que j’ai conçus et construits pour le think tank que j’ai cofondé — pour expliquer budgets, élections et diplomatie.", "collab.all": "Tous les projets",
      "cv.open": "Ouvrir mon CV complet", "cv.close": "Fermer le CV", "cv.hint": "Expérience · activités · langues · certificats", "toast.loot": "Butin trouvé — le CV complet", "about.follow": "Me suivre",
      "work.site": "Site web",
      "cv.experience": "Expérience", "cv.activities": "Activités", "cv.skills": "Compétences",
      "cv.certificates": "Certificats", "cv.languages": "Langues", "work.winner": "Lauréat Swift Student Challenge",
      "meta.title": "Adam Markocki — Je crée des apps. J’étudie le pouvoir.",
      "hero.eyebrow": "Cracovie, Pologne 🇵🇱",
      "hero.title": "Je crée des apps.<br>J’étudie le pouvoir.",
      "hero.lede": "Je suis Adam. J’étudie les relations internationales à Cracovie et je crée des apps pour iPhone et Mac. Lauréat du Swift Student Challenge d’Apple 2026.",
      "hero.cta1": "Voir mes projets",
      "hero.cta2": "Me contacter",
      "badge.ssc": "Lauréat Swift Student Challenge ’26",
      "badge.tank": "Cofondateur · Terra Cracovianum",
      "badge.wise": "WISE · Univ. d’économie de Cracovie",
      "work.kicker": "01 / Projets",
      "work.title": "Ce que j’ai construit",
      "code.kicker": "02 / Code",
      "code.title": "Blocs posés cette année",
      "code.sub": "Chaque carré est une journée sur GitHub.",
      "code.total": "{n} contributions sur l’année écoulée",
      "code.error": "Impossible de charger les contributions pour le moment.",
      "code.open": "Ouvrir GitHub",
      "about.kicker": "03 / À propos",
      "about.title": "Entre politique et tech",
      "about.p1": "Fièrement polonais 🇵🇱<br>J’étudie les relations internationales, et quand j’en ai assez de la politique, je passe à la tech. Quand je me sens trop bête pour la tech, je reviens à la politique.",
      "journey.kicker": "04 / CV",
      "journey.title": "Expérience et formation",
      "journey.locked": "Verrouillé",
      "contact.kicker": "05 / Contact",
      "contact.title": "Ma boîte mail est ouverte.",
      "contact.text": "Un projet, une collaboration, une interview ou juste un bonjour — je suis toujours ravi d’échanger. Écrivez-moi, je vous répondrai.",
      "contact.email": "M’écrire",
      "contact.copied": "Adresse copiée",
      "footer.made": "Conçu à Cracovie, Pologne.",
      "nav.home": "Accueil", "nav.work": "Projets", "nav.code": "Code",
      "nav.about": "À propos", "nav.journey": "CV", "nav.contact": "Contact",
      "ui.sound": "Son", "ui.theme": "Jour / nuit", "ui.lang": "Langue",
      "toast.title": "Succès débloqué !",
      "toast.ssc": "Lauréat du Swift Student Challenge 2026",
      "toast.explorer": "Explorateur — vous êtes arrivé au bout"
    }
  }
};
