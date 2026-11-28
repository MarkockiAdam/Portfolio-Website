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
      "contact.title": "Let’s build something.",
      "contact.text": "Projects, collaborations, or a good conversation about tech and power — my inbox is open.",
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
      "contact.title": "Zbudujmy coś razem.",
      "contact.text": "Projekty, współpraca albo dobra rozmowa o technologii i władzy — śmiało pisz.",
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
      "contact.title": "Construisons quelque chose.",
      "contact.text": "Projets, collaborations ou une bonne discussion sur la tech et le pouvoir — écrivez-moi.",
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
