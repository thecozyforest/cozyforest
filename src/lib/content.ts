import data from "@/content/site.json";

export type IconName =
  | "school" | "docs" | "manual" | "contact" | "magazine"
  | "code" | "download" | "game" | "privacy"
  | "naver-blog" | "instagram" | "kakao-chat" | "kakao-group";

export type Category = {
  id: string;
  name: string;
  en: string;
};

export type Work = {
  category: string;
  name: string;
  description: string;
  href: string;
  icon: IconName;
  /** 있으면 카드 위쪽에 그림이 깔립니다. */
  image?: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type Contact = {
  label: string;
  value: string;
  href: string;
};

export type SiteContent = {
  meta: { siteName: string; tagline: string; description: string; ogImage: string };
  hero: {
    eyebrow: string;
    title: string;
    lines: string[];
    image: string;
    imageAlt: string;
    cta: { label: string; target: string };
  };
  profile: {
    name: string;
    image: string;
    imageAlt: string;
    roles: string[];
    note: { label: string; lines: string[] };
    tags: string[];
  };
  contacts: Contact[];
  categories: Category[];
  works: Work[];
  timeline: TimelineEntry[];
  footer: { line: string; credit: string };
};

export const site = data as SiteContent;

export const iconSrc = (icon: string) => `/icons/${icon}.svg`;

export const isExternal = (href: string) => href.startsWith("http");

/** 카테고리 id로 이름을 찾습니다. 없는 id면 id를 그대로 돌려줍니다. */
export const categoryName = (id: string) =>
  site.categories.find((c) => c.id === id)?.name ?? id;

/** 실제로 작업물이 하나라도 있는 카테고리만 필터 버튼으로 보여줍니다. */
export const usedCategories = site.categories.filter((c) =>
  site.works.some((w) => w.category === c.id)
);
