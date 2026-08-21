import data from "@/content/site.json";

export type IconName =
  | "school" | "docs" | "manual" | "contact" | "magazine"
  | "code" | "download" | "game" | "privacy"
  | "naver-blog" | "instagram" | "kakao-chat" | "kakao-group";

export type LinkItem = {
  name: string;
  description?: string;
  /** 없으면 눌리지 않는 기록 항목이 됩니다(연수 이력 등). */
  href?: string;
  icon?: IconName;
  /** 있으면 아이콘 자리에 연도가 들어갑니다. */
  year?: string;
  /** 값이 있으면 클릭 시 이동 대신 이 문자열을 복사합니다. */
  copy?: string;
  /** 항목 오른쪽에 붙는 작은 표시. 예: "DoRms", "PIN" */
  badge?: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  items: LinkItem[];
};

/** 숫자는 직접 적지 않고 site.json에서 세거나 계산합니다. */
export type Stat =
  | { countOf: string; label: string; unit?: string }
  | { sinceYear: number; label: string; unit?: string };

export type SiteContent = {
  meta: {
    siteName: string;
    personName: string;
    alternateName: string;
    tagline: string;
    seoTitle: string;
    description: string;
    keywords: string[];
    sameAs: string[];
    verification: { google: string; naver: string };
    ogImage: string;
  };
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
  intro: {
    eyebrow: string;
    headline: string;
    lines: string[];
    stats: Stat[];
    timeline: { year: string; title: string; description: string }[];
  };
  entries: {
    title: string;
    description: string;
    items: { question: string; label: string; target: string }[];
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    /** group + name으로 groups 안의 실제 항목을 가리킵니다(링크는 한 곳에서만 관리). */
    items: { group: string; name: string; why: string }[];
  };
  groups: Group[];
  speaking: {
    brand: string;
    title: string;
    lead: string;
    description: string;
    topics: string[];
    cta: { label: string; href: string };
    historyGroup: string;
  };
  credibility: {
    eyebrow: string;
    title: string;
    lead: string;
    /** 이 그룹에서 연도가 붙은 항목을 저서 목록으로 씁니다. */
    sourceGroup: string;
  };
  footer: { line: string; credit: string };
};

export const site = data as unknown as SiteContent;

export const iconSrc = (icon: string) => `/icons/${icon}.svg`;

export const isExternal = (href?: string) => !!href && href.startsWith("http");

/** 항목이 하나도 없는 그룹은 화면에 그리지 않습니다. */
export const shownGroups = site.groups.filter((g) => g.items.length > 0);

const groupById = (id: string) => site.groups.find((g) => g.id === id);

const findItem = (groupId: string, name: string) =>
  groupById(groupId)?.items.find((item) => item.name === name);

export type FeaturedItem = LinkItem & { why: string; groupName: string };

/** 대표 작업. groups에서 못 찾은 참조는 조용히 빼서 화면이 깨지지 않게 합니다. */
export const featuredItems: FeaturedItem[] = site.featured.items.flatMap((ref) => {
  const item = findItem(ref.group, ref.name);
  if (!item) return [];
  return [{ ...item, why: ref.why, groupName: groupById(ref.group)?.name ?? "" }];
});

/** 저서 목록 = 지정한 그룹에서 연도가 붙은 항목. */
export const bookItems: LinkItem[] =
  groupById(site.credibility.sourceGroup)?.items.filter((item) => !!item.year) ?? [];

export const lectureHistory: LinkItem[] =
  groupById(site.speaking.historyGroup)?.items.filter((item) => !!item.year) ?? [];

export const statValue = (stat: Stat) => {
  const unit = stat.unit ?? "";
  if ("countOf" in stat) return `${groupById(stat.countOf)?.items.length ?? 0}${unit}`;
  return `${new Date().getFullYear() - stat.sinceYear}${unit}`;
};
