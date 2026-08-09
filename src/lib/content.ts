import data from "@/content/site.json";

export type IconName =
  | "school" | "docs" | "manual" | "contact" | "magazine"
  | "code" | "download" | "game" | "privacy"
  | "naver-blog" | "instagram" | "kakao-chat" | "kakao-group";

export type LinkItem = {
  name: string;
  description?: string;
  /** 링크 항목이면 필수. timeline 그룹에서는 생략합니다. */
  href?: string;
  icon?: IconName;
  /** timeline 그룹에서 왼쪽에 표시할 연도 */
  year?: string;
  /** 값이 있으면 클릭 시 이동 대신 이 문자열을 복사합니다. */
  copy?: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  /** "timeline"이면 연도 목록으로 그립니다. 없으면 링크 목록입니다. */
  kind?: "timeline";
  items: LinkItem[];
};

export type SiteContent = {
  meta: { siteName: string; tagline: string; description: string; ogImage: string };
  hero: {
    eyebrow?: string;
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
  groups: Group[];
  footer: { line: string; credit: string };
};

export const site = data as unknown as SiteContent;

export const iconSrc = (icon: string) => `/icons/${icon}.svg`;

export const isExternal = (href?: string) => !!href && href.startsWith("http");

/** 항목이 하나도 없는 그룹은 화면에 그리지 않습니다. */
export const shownGroups = site.groups.filter((g) => g.items.length > 0);
