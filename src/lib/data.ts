/* ──────────────────────────────────────────────
 *  Central data config for VILINS
 *  Single source of truth for projects, lobby
 *  elements, scene media, and materials.
 * ────────────────────────────────────────────── */

// ─── Projects ────────────────────────────────

export interface Project {
  id: string;
  title: string;
  year: number;
  area: string;
  timeline: string;
  type: string;
  scope: string[];
  thumb: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "neva-towers",
    title: "Neva Towers",
    year: 2025,
    area: "350 000 м²",
    timeline: "3 кв. 2024 – 1 кв. 2025",
    type: "МФК",
    scope: ["Реечные стеновые панели", "Перегородки", "Ручки"],
    thumb: "/placeholders/project-neva-towers-1.svg",
    images: [
      "/placeholders/project-neva-towers-1.svg",
      "/placeholders/project-neva-towers-2.svg",
      "/placeholders/project-neva-towers-3.svg",
    ],
  },
  {
    id: "wow",
    title: "ЖК WOW",
    year: 2025,
    area: "36 000 м²",
    timeline: "1 кв. 2025 – 2 кв. 2025",
    type: "ЖК",
    scope: ["Почтовые ящики", "Навигация", "Стеновые панели"],
    thumb: "/placeholders/project-wow-1.svg",
    images: [
      "/placeholders/project-wow-1.svg",
      "/placeholders/project-wow-2.svg",
    ],
  },
  {
    id: "sky-view",
    title: "Sky View",
    year: 2024,
    area: "142 979 м²",
    timeline: "1 кв. 2024 – 1 кв. 2025",
    type: "ЖК",
    scope: ["Почтовые ящики", "Лифтовые порталы", "Стеновые панели", "Каннелюры", "Ниши", "Панно"],
    thumb: "/placeholders/project-sky-view-1.svg",
    images: [
      "/placeholders/project-sky-view-1.svg",
      "/placeholders/project-sky-view-2.svg",
      "/placeholders/project-sky-view-3.svg",
      "/placeholders/project-sky-view-4.svg",
    ],
  },
  {
    id: "will-towers",
    title: "Will Towers",
    year: 2024,
    area: "46 783 м²",
    timeline: "1 кв. 2022 – 3 кв. 2022",
    type: "ЖК",
    scope: ["Почтовые ящики", "Навигация", "Стеновые панели"],
    thumb: "/placeholders/project-will-towers-1.svg",
    images: [
      "/placeholders/project-will-towers-1.svg",
      "/placeholders/project-will-towers-2.svg",
      "/placeholders/project-will-towers-3.svg",
    ],
  },
  {
    id: "west-garden",
    title: "West Garden",
    year: 2023,
    area: "41 544 м²",
    timeline: "2 кв. 2023 – 4 кв. 2023",
    type: "ЖК",
    scope: ["Навигация", "Реечные стеновые панели"],
    thumb: "/placeholders/project-west-garden-1.svg",
    images: [
      "/placeholders/project-west-garden-1.svg",
      "/placeholders/project-west-garden-2.svg",
    ],
  },
  {
    id: "river-sky",
    title: "River Sky",
    year: 2023,
    area: "24 130 м²",
    timeline: "1 кв. 2023 – 3 кв. 2023",
    type: "ЖК",
    scope: ["Почтовые ящики", "Навигация", "Стеновые панели"],
    thumb: "/placeholders/project-river-sky-1.svg",
    images: [
      "/placeholders/project-river-sky-1.svg",
      "/placeholders/project-river-sky-2.svg",
      "/placeholders/project-river-sky-3.svg",
    ],
  },
  {
    id: "manzherok",
    title: "Манжерок",
    year: 2023,
    area: "54 000 м²",
    timeline: "3 кв. 2022 – 1 кв. 2023",
    type: "Курорт",
    scope: ["Стеновые панели", "Ручки", "Навигация", "Дверные проёмы", "Облицовка дверей"],
    thumb: "/placeholders/project-manzherok-1.svg",
    images: [
      "/placeholders/project-manzherok-1.svg",
      "/placeholders/project-manzherok-2.svg",
      "/placeholders/project-manzherok-3.svg",
    ],
  },
  {
    id: "azurr",
    title: "Ресторан «Azurr», Мрия",
    year: 2023,
    area: "783 м²",
    timeline: "1 кв. 2023 – 2 кв. 2023",
    type: "Ресторан",
    scope: ["Инсталляция"],
    thumb: "/placeholders/project-azurr-1.svg",
    images: [
      "/placeholders/project-azurr-1.svg",
      "/placeholders/project-azurr-2.svg",
    ],
  },
  {
    id: "alcon-tower",
    title: "Alcon Tower",
    year: 2023,
    area: "217 726 м²",
    timeline: "1 кв. 2023 – 3 кв. 2023",
    type: "МФК",
    scope: ["Лифтовые порталы"],
    thumb: "/placeholders/project-alcon-tower-1.svg",
    images: [
      "/placeholders/project-alcon-tower-1.svg",
      "/placeholders/project-alcon-tower-2.svg",
    ],
  },
  {
    id: "alia",
    title: "ÁLIA",
    year: 2022,
    area: "30 624 м²",
    timeline: "1 кв. 2018 – 2 кв. 2018",
    type: "ЖК",
    scope: ["Почтовые ящики", "Лифтовые порталы", "Стойка ресепшн", "Навигация"],
    thumb: "/placeholders/project-alia-1.svg",
    images: [
      "/placeholders/project-alia-1.svg",
      "/placeholders/project-alia-2.svg",
      "/placeholders/project-alia-3.svg",
    ],
  },
  {
    id: "movenpick",
    title: "Гостиница Mövenpick",
    year: 2020,
    area: "5 299 м²",
    timeline: "1 кв. 2020 – 2 кв. 2020",
    type: "Отель",
    scope: ["Навигация"],
    thumb: "/placeholders/project-movenpick-1.svg",
    images: [
      "/placeholders/project-movenpick-1.svg",
      "/placeholders/project-movenpick-2.svg",
    ],
  },
  {
    id: "serebryany-bor",
    title: "Дом «Серебряный бор»",
    year: 2018,
    area: "10 606 м²",
    timeline: "1 кв. 2020 – 2 кв. 2020",
    type: "ЖК",
    scope: ["Навигация", "Реечные панели"],
    thumb: "/placeholders/project-serebryany-bor-1.svg",
    images: [
      "/placeholders/project-serebryany-bor-1.svg",
      "/placeholders/project-serebryany-bor-2.svg",
      "/placeholders/project-serebryany-bor-3.svg",
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByIds(ids: string[]): Project[] {
  return ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[];
}

// ─── Scene media mapping ─────────────────────

export interface SceneMedia {
  videoSrc: string;
  posterSrc: string;
}

export const storyScenes: Record<string, SceneMedia> = {
  "scene-01": {
    videoSrc: "/scene/scene-01_video_blueprint.mp4",
    posterSrc: "/scene/scene-01_frame_blueprint.jpeg",
  },
  "scene-02": {
    videoSrc: "/scene/scene-02_video_factory.mp4",
    posterSrc: "/scene/scene-02_video_factory.jpeg",
  },
  "scene-03": {
    videoSrc: "/scene/scene-03_video_assembly.mp4",
    posterSrc: "/scene/scene-03_video_assembly.jpeg",
  },
  "scene-04": {
    videoSrc: "/scene/scene-04_video_lobby-final.mp4",
    posterSrc: "/scene/scene-04_video_lobby-final.jpeg",
  },
  "scene-06": {
    videoSrc: "/scene/scene-10_video_facade.mp4",
    posterSrc: "/scene/scene-10_video_facade.jpeg",
  },
};

export const elementScenes: Record<string, SceneMedia> = {
  reception: {
    videoSrc: "/scene/scene-05_video_reception.mp4",
    posterSrc: "/scene/scene-05_video_reception.jpeg",
  },
  mailboxes: {
    videoSrc: "/scene/scene-06_video_mailboxes.mp4",
    posterSrc: "/scene/scene-06_video_mailboxes.jpeg",
  },
  elevatorPortals: {
    videoSrc: "/scene/scene-07_video_elevator.mp4",
    posterSrc: "/scene/scene-07_video_elevator.jpeg",
  },
  stairs: {
    videoSrc: "/scene/scene-08_video_stairs.mp4",
    posterSrc: "/scene/scene-08_video_stairs.jpeg",
  },
  wallPanels: {
    videoSrc: "/scene/scene-09_video_panels.mp4",
    posterSrc: "/scene/scene-09_video_panels.jpeg",
  },
};

// ─── Lobby elements config ───────────────────

export interface LobbyElement {
  key: string;
  label: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  position: { top: string; left: string };
  projectIds: string[];
}

export const lobbyElements: LobbyElement[] = [
  {
    key: "reception",
    label: "Стойка ресепшн",
    description:
      "Нержавеющая сталь с матовой обработкой и покрытием нитридом титана. Геометрия рассчитана под зонирование, подсветку и навигацию.",
    ...elementScenes.reception,
    position: { top: "74%", left: "55%" },
    projectIds: ["alia", "sky-view"],
  },
  {
    key: "mailboxes",
    label: "Почтовые блоки",
    description:
      "Компактные модули из стали с интегрированными отсеками для посылок. Единый дизайн‑код с ресепшн и панелями.",
    ...elementScenes.mailboxes,
    position: { top: "57%", left: "44%" },
    projectIds: ["sky-view", "will-towers", "river-sky", "wow"],
  },
  {
    key: "elevatorPortals",
    label: "Лифтовые порталы",
    description:
      "Обрамления из нержавеющей стали или латуни с PVD‑покрытием. Порталы на типовые этажи и в лобби — с фрамугой или без.",
    ...elementScenes.elevatorPortals,
    position: { top: "50%", left: "63%" },
    projectIds: ["alia", "sky-view", "alcon-tower"],
  },
  {
    key: "stairs",
    label: "Лестничные ограждения",
    description:
      "Ограждения из тёмной стали и стекла. Ритм стоек и профиль поручня подчёркивают архитектуру пролётов.",
    ...elementScenes.stairs,
    position: { top: "60%", left: "89%" },
    projectIds: ["river-sky", "neva-towers"],
  },
  {
    key: "wallPanels",
    label: "Стеновые панели",
    description:
      "Перфорированные и гладкие панели для стен и потолков. Материалы: нержавеющая сталь, латунь, Cor‑ten.",
    ...elementScenes.wallPanels,
    position: { top: "32%", left: "11%" },
    projectIds: ["west-garden", "river-sky", "sky-view", "manzherok", "wow", "neva-towers"],
  },
];

// ─── Materials catalog ───────────────────────

export interface MaterialEntry {
  title: string;
  description: string;
  useCases: string[];
  imageSrc: string;
}

export const materials: MaterialEntry[] = [
  {
    title: "Нитрид титана (PVD TiN)",
    description:
      "PVD‑покрытие нитридом титана придаёт нержавеющей стали устойчивый оттенок — от светлого золотого до глубокого бронзового. Покрытие устойчиво к истиранию, коррозии и УФ‑излучению. Камера крупного формата VILINS обеспечивает единый оттенок на крупногабаритных деталях.",
    useCases: ["Стойки ресепшн", "Лифтовые порталы", "Стеновые панели", "Декоративные накладки"],
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
  },
  {
    title: "Нержавеющая сталь",
    description:
      "Основной конструкционный и декоративный материал. Матовая, шлифованная или зеркальная обработка поверхности. Высокая коррозионная стойкость и долговечность. Базовый материал для последующего PVD‑покрытия.",
    useCases: ["Ограждения лестниц", "Почтовые блоки", "Навигация", "Фасадные панели"],
    imageSrc: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  },
  {
    title: "Латунь",
    description:
      "Тёплая тональность в интерьере. Используется для акцентных элементов в сочетании с нержавеющей сталью. Патинирование или лакирование — в зависимости от дизайн‑концепции проекта.",
    useCases: ["Акцентные панели", "Порталы лифтов", "Декоративные вставки", "Поручни"],
    imageSrc: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
  },
  {
    title: "Cor‑ten",
    description:
      "Кортеновская сталь с характерной ржавой патиной. Мощный визуальный акцент на фасадах и в интерьерах. Защитный слой оксидов формируется естественным путём.",
    useCases: ["Фасадные панели", "Входные группы", "Арт‑объекты", "Козырьки"],
    imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    title: "Чёрная сталь",
    description:
      "Окрашенная или патинированная сталь со строгим индустриальным характером. Применяется для ограждений, каркасов и акцентных конструкций в сочетании со стеклом.",
    useCases: ["Лестничные ограждения", "Каркасные конструкции", "Стеновые системы", "Навигация"],
    imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    title: "Листы металла",
    description:
      "Прямые и фактурные листы — основа для панелей, облицовки, декоративных экранов. Широкий выбор толщин, фактур и финишных обработок.",
    useCases: ["Стеновая облицовка", "Потолочные панели", "Декоративные экраны", "Кассеты"],
    imageSrc: "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=1200&q=80",
  },
  {
    title: "Почтовые ящики",
    description:
      "Модульная система почтовых блоков из нержавеющей стали. Интегрированные отсеки для посылок, единый дизайн‑код с другими элементами лобби.",
    useCases: ["Жилые комплексы", "Бизнес‑центры", "Апарт‑отели"],
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    title: "Лестничные ограждения",
    description:
      "Ограждения из нержавеющей стали, чёрного металла и стекла. Расчёт ритма стоек и профиля поручня под архитектуру пролётов.",
    useCases: ["Лобби жилых комплексов", "Общественные пространства", "Офисные здания"],
    imageSrc: "https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?w=1200&q=80",
  },
  {
    title: "Стойки ресепшн",
    description:
      "Индивидуальное проектирование стоек из нержавеющей стали и латуни с PVD‑покрытием. Геометрия рассчитана под зонирование, подсветку и навигацию.",
    useCases: ["Лобби ЖК", "Отели", "Бизнес‑центры", "Медицинские учреждения"],
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    title: "Стеновые панели",
    description:
      "Перфорированные, реечные и гладкие панели для стен и потолков. Крупноформатные элементы с PVD‑покрытием нитридом титана.",
    useCases: ["Лобби", "Коридоры", "Лифтовые холлы", "Общественные зоны"],
    imageSrc: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  },
  {
    title: "Лифтовые порталы",
    description:
      "Обрамления из нержавеющей стали или латуни с PVD‑покрытием. Типовые и индивидуальные решения — с фрамугой или без.",
    useCases: ["Типовые этажи", "Лобби", "Премиальные ЖК", "МФК"],
    imageSrc: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
  },
  {
    title: "Фасады",
    description:
      "Кинетические и статичные фасадные панели, козырьки, входные группы. Защищённые покрытия для городского климата, согласованные с архитектурной концепцией.",
    useCases: ["Кинетические панели", "Козырьки", "Входные группы", "Навигация снаружи"],
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  },
  {
    title: "Навигация",
    description:
      "Системы навигации и указателей из металла: номера квартир, этажные указатели, информационные стенды. Единый визуальный язык с интерьером.",
    useCases: ["Жилые комплексы", "Общественные здания", "Гостиницы", "Курорты"],
    imageSrc: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
  },
  {
    title: "Облицовка колонн",
    description:
      "Металлическая облицовка колонн и пилонов: гнутые и сварные элементы из нержавеющей стали, латуни, чёрного металла. Точная подгонка под существующую геометрию.",
    useCases: ["Лобби", "Паркинги", "Торговые центры", "Бизнес‑центры"],
    imageSrc: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
  },
];
