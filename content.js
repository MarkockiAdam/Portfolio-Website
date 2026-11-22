/* ==========================================================================
   CONTENT — edit this file to change what the website says.
   Everything visitors read lives here: links, projects, journey, and all
   three languages (en = English, pl = Polski, fr = Français).

   ⚠️  Lines marked  // TODO  are placeholders. Replace them with real info.
   ========================================================================== */

window.SITE = {
  name: "Adam Markocki",
  github: "MarkockiAdam",               // used for the contributions heatmap
  email: "",                            // TODO: public email, e.g. "hello@markockiadam.com"
  photo: "",                            // TODO: e.g. "assets/adam.jpg" (square photo works best)

  socials: [
    { label: "X / Twitter", url: "https://x.com/" },          // TODO: your handle
    { label: "GitHub",      url: "https://github.com/MarkockiAdam" },
    { label: "LinkedIn",    url: "https://www.linkedin.com/" } // TODO: your profile
  ],

  /* Projects. icon: trophy, globe, block, book, heart, chart, star, flag, crown, pick, grid, mail
     links: any number of { label, url }. */
  projects: [
    {
      name: "ValuationDojo",            // TODO: check name + description
      icon: "chart",
      tags: ["iOS", "SwiftUI", "Finance"],
      desc: {
        en: "Learn to value companies like an investor — one practice round at a time.",
        pl: "Naucz się wyceniać spółki jak inwestor — runda po rundzie.",
        fr: "Apprendre à valoriser une entreprise comme un investisseur, un exercice à la fois."
      },
      links: [{ label: "App Store", url: "#" }, { label: "GitHub", url: "#" }]
    },
    {
      name: "BookWorm",                 // TODO
      icon: "book",
      tags: ["iOS", "SwiftUI"],
      desc: {
        en: "A reading companion that turns books into a daily habit.",
        pl: "Towarzysz czytania, który zamienia książki w codzienny nawyk.",
        fr: "Un compagnon de lecture qui fait des livres une habitude quotidienne."
      },
      links: [{ label: "App Store", url: "#" }]
    },
    {
      name: "HabitBuddy",               // TODO
      icon: "heart",
      tags: ["iOS", "SwiftUI"],
      desc: {
        en: "Build habits with a friend who keeps you honest.",
        pl: "Buduj nawyki z kimś, kto pilnuje, żebyś nie odpuszczał.",
        fr: "Construire ses habitudes avec un ami qui vous garde sur la bonne voie."
      },
      links: [{ label: "App Store", url: "#" }]
    },
    {
      name: "Hachi",                    // TODO
      icon: "star",
      tags: ["Web"],
      desc: {
        en: "Description coming soon.",
        pl: "Opis już wkrótce.",
        fr: "Description à venir."
      },
      links: [{ label: "Visit", url: "#" }]
    }
  ],

  /* Journey — shown as "advancements". Oldest first. gold: true = highlighted. next: true = locked. */
  journey: [
    {
      icon: "block", when: { en: "Childhood", pl: "Dzieciństwo", fr: "Enfance" },
      title: { en: "Built my first worlds", pl: "Pierwsze zbudowane światy", fr: "Mes premiers mondes" },
      text: {
        en: "It started with Minecraft. I've been building things ever since.",
        pl: "Zaczęło się od Minecrafta. Od tamtej pory ciągle coś buduję.",
        fr: "Tout a commencé avec Minecraft. Depuis, je n'ai jamais arrêté de construire."
      }
    },
    {
      icon: "chart", when: { en: "Teens", pl: "Nastolatek", fr: "Adolescence" },
      title: { en: "Went deep on markets", pl: "Wsiąkłem w rynki", fr: "Plongée dans les marchés" },
      text: {
        en: "Investing, the stock market, the basics of trading. Finance and economics became an obsession.",
        pl: "Inwestowanie, giełda, podstawy tradingu. Finanse i ekonomia stały się obsesją.",
        fr: "Investissement, bourse, bases du trading. La finance et l'économie sont devenues une obsession."
      }
    },
    {
      icon: "globe", when: { en: "University", pl: "Studia", fr: "Université" },
      title: { en: "Started International Relations", pl: "Stosunki międzynarodowe", fr: "Relations internationales" },
      text: {
        en: "Studying conflict, power struggles, and what leaders do with power once they have it.",
        pl: "Studiuję konflikty, walkę o władzę i to, co przywódcy z nią robią.",
        fr: "J'étudie les conflits, les luttes de pouvoir et ce que les dirigeants en font."
      }
    },
    {
      icon: "star", when: { en: "Programme", pl: "Program", fr: "Programme" },
      title: { en: "Joined WISE", pl: "Dołączyłem do WISE", fr: "Membre de WISE" },
      text: {
        en: "Elite student programme at Kraków University of Economics.",
        pl: "Elitarny program studencki Uniwersytetu Ekonomicznego w Krakowie.",
        fr: "Programme d'excellence de l'Université d'économie de Cracovie."
      }
    },
    {
      icon: "flag", when: { en: "Co-founder", pl: "Współzałożyciel", fr: "Cofondateur" },
      title: { en: "Co-founded a think tank", pl: "Współzałożyłem think tank", fr: "Cofondé un think tank" },
      text: {
        en: "Turning ideas about policy and power into research people can use.",   // TODO: think tank name
        pl: "Zamieniamy pomysły o polityce i władzy w analizy, z których da się korzystać.",
        fr: "Transformer des idées sur la politique et le pouvoir en recherche utile."
      }
    },
    {
      icon: "trophy", gold: true, when: { en: "2026", pl: "2026", fr: "2026" },
      title: { en: "Won the Swift Student Challenge", pl: "Wygrałem Swift Student Challenge", fr: "Lauréat du Swift Student Challenge" },
      text: {
        en: "Selected as a winner of Apple's Swift Student Challenge.",
        pl: "Jeden ze zwycięzców Swift Student Challenge organizowanego przez Apple.",
        fr: "Sélectionné parmi les lauréats du Swift Student Challenge d'Apple."
      }
    },
    {
      icon: "crown", next: true, when: { en: "Next quest", pl: "Następna misja", fr: "Prochaine quête" },
      title: { en: "Where technology meets global affairs", pl: "Tam, gdzie technologia spotyka geopolitykę", fr: "Là où la tech rencontre la géopolitique" },
      text: {
        en: "Building at the intersection of tech and power. Loading…",
        pl: "Budowanie na styku technologii i władzy. Ładowanie…",
        fr: "Construire à la croisée de la tech et du pouvoir. Chargement…"
      }
    }
  ],

  heroes: ["Napoleon", "Steve Jobs", "James Dyson"],

  /* Interface text in each language. */
  i18n: {
    en: {
      "meta.title": "Adam Markocki — Builder of apps. Student of power.",
      "hero.eyebrow": "Kraków, Poland · Builder",
      "hero.title": "Builder of apps.<br>Student of power.",
      "hero.lede": "I’m Adam. I study international relations and build apps for iPhone and the web. Swift Student Challenge winner 2026.",
      "hero.cta1": "See my work",
      "hero.cta2": "Get in touch",
      "badge.ssc": "Swift Student Challenge Winner ’26",
      "badge.tank": "Think tank co-founder",
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
      "about.title": "From Minecraft to the world stage",
      "about.p1": "I’ve been building things since I was a kid. First it was worlds in Minecraft. Now it’s apps people use every day.",
      "about.p2": "I study international relations because I’m fascinated by power: who wins it, how they keep it, and what they build with it.",
      "about.p3": "I love reading about people who built big things. David Senra’s Founders podcast turned it into a habit.",
      "about.heroes": "People I learn from",
      "journey.kicker": "04 / Journey",
      "journey.title": "Advancements",
      "journey.locked": "Locked",
      "contact.kicker": "05 / Contact",
      "contact.title": "Let’s build something.",
      "contact.text": "Projects, collaborations, or a good conversation about tech and power — my inbox is open.",
      "contact.email": "Email me",
      "contact.copied": "Email copied",
      "footer.made": "Built by hand in Kraków.",
      "nav.home": "Home", "nav.work": "Work", "nav.code": "Code",
      "nav.about": "About", "nav.journey": "Journey", "nav.contact": "Contact",
      "ui.sound": "Sound", "ui.theme": "Day / night", "ui.lang": "Language",
      "toast.title": "Achievement unlocked!",
      "toast.ssc": "Swift Student Challenge Winner 2026",
      "toast.explorer": "Explorer — you reached the end"
    },
    pl: {
      "meta.title": "Adam Markocki — Buduję aplikacje. Badam władzę.",
      "hero.eyebrow": "Kraków · Twórca",
      "hero.title": "Buduję aplikacje.<br>Badam władzę.",
      "hero.lede": "Jestem Adam. Studiuję stosunki międzynarodowe i tworzę aplikacje na iPhone’a i na web. Zwycięzca Swift Student Challenge 2026.",
      "hero.cta1": "Zobacz projekty",
      "hero.cta2": "Napisz do mnie",
      "badge.ssc": "Zwycięzca Swift Student Challenge ’26",
      "badge.tank": "Współzałożyciel think tanku",
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
      "about.title": "Od Minecrafta do sceny światowej",
      "about.p1": "Buduję od dziecka. Najpierw były to światy w Minecrafcie. Teraz to aplikacje, z których ludzie korzystają na co dzień.",
      "about.p2": "Studiuję stosunki międzynarodowe, bo fascynuje mnie władza: kto ją zdobywa, jak ją utrzymuje i co z nią buduje.",
      "about.p3": "Uwielbiam czytać o ludziach, którzy zbudowali wielkie rzeczy. Podcast Founders Davida Senry zrobił z tego nawyk.",
      "about.heroes": "Od kogo się uczę",
      "journey.kicker": "04 / Droga",
      "journey.title": "Osiągnięcia",
      "journey.locked": "Zablokowane",
      "contact.kicker": "05 / Kontakt",
      "contact.title": "Zbudujmy coś razem.",
      "contact.text": "Projekty, współpraca albo dobra rozmowa o technologii i władzy — śmiało pisz.",
      "contact.email": "Napisz maila",
      "contact.copied": "Skopiowano adres",
      "footer.made": "Zrobione ręcznie w Krakowie.",
      "nav.home": "Start", "nav.work": "Projekty", "nav.code": "Kod",
      "nav.about": "O mnie", "nav.journey": "Droga", "nav.contact": "Kontakt",
      "ui.sound": "Dźwięk", "ui.theme": "Dzień / noc", "ui.lang": "Język",
      "toast.title": "Osiągnięcie odblokowane!",
      "toast.ssc": "Zwycięzca Swift Student Challenge 2026",
      "toast.explorer": "Odkrywca — dotarłeś do końca"
    },
    fr: {
      "meta.title": "Adam Markocki — Je crée des apps. J’étudie le pouvoir.",
      "hero.eyebrow": "Cracovie, Pologne · Créateur",
      "hero.title": "Je crée des apps.<br>J’étudie le pouvoir.",
      "hero.lede": "Je suis Adam. J’étudie les relations internationales et je crée des apps pour iPhone et le web. Lauréat du Swift Student Challenge 2026.",
      "hero.cta1": "Voir mes projets",
      "hero.cta2": "Me contacter",
      "badge.ssc": "Lauréat Swift Student Challenge ’26",
      "badge.tank": "Cofondateur d’un think tank",
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
      "about.title": "De Minecraft à la scène mondiale",
      "about.p1": "Je construis depuis que je suis enfant. D’abord des mondes dans Minecraft. Aujourd’hui, des apps que les gens utilisent chaque jour.",
      "about.p2": "J’étudie les relations internationales parce que le pouvoir me fascine : qui le conquiert, comment on le garde, et ce qu’on en fait.",
      "about.p3": "J’adore lire sur ceux qui ont bâti de grandes choses. Le podcast Founders de David Senra en a fait une habitude.",
      "about.heroes": "Ceux qui m’inspirent",
      "journey.kicker": "04 / Parcours",
      "journey.title": "Progrès",
      "journey.locked": "Verrouillé",
      "contact.kicker": "05 / Contact",
      "contact.title": "Construisons quelque chose.",
      "contact.text": "Projets, collaborations ou une bonne discussion sur la tech et le pouvoir — écrivez-moi.",
      "contact.email": "M’écrire",
      "contact.copied": "Adresse copiée",
      "footer.made": "Fait main à Cracovie.",
      "nav.home": "Accueil", "nav.work": "Projets", "nav.code": "Code",
      "nav.about": "À propos", "nav.journey": "Parcours", "nav.contact": "Contact",
      "ui.sound": "Son", "ui.theme": "Jour / nuit", "ui.lang": "Langue",
      "toast.title": "Succès débloqué !",
      "toast.ssc": "Lauréat du Swift Student Challenge 2026",
      "toast.explorer": "Explorateur — vous êtes arrivé au bout"
    }
  }
};
