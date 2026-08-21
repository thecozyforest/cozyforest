"use client";

import { useRef, useState } from "react";
import {
  site,
  iconSrc,
  isExternal,
  shownGroups,
  featuredItems,
  bookItems,
  lectureHistory,
  statValue,
  type Group,
  type LinkItem
} from "@/lib/content";

function Arrow() {
  return (
    <svg className="cf-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

function outboundProps(href?: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function Hero() {
  const { hero } = site;
  return (
    <header className="cf-hero">
      <div className="cf-hero-art">
        <img src={hero.image} alt={hero.imageAlt} fetchPriority="high" />
        <div className="cf-hero-veil" aria-hidden="true" />
      </div>
      <div className="cf-hero-copy">
        {hero.eyebrow ? <span className="cf-eyebrow">{hero.eyebrow}</span> : null}
        <h1>
          {hero.title.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p>
          {hero.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <a className="cf-hero-cta" href={`#${hero.cta.target}`}>
          {hero.cta.label}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  );
}

function ProfileBand() {
  const { profile } = site;
  return (
    <section className="cf-profile" aria-label="프로필">
      <div className="cf-profile-id">
        <img className="cf-avatar" src={profile.image} alt={profile.imageAlt} />
        <div>
          <h2>{profile.name}</h2>
          <p className="cf-roles">
            {profile.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="cf-note">
        {profile.note.label ? <span className="cf-note-label">{profile.note.label}</span> : null}
        <p>
          {profile.note.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        {profile.tags.length > 0 ? (
          <div className="cf-tags">
            {profile.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** 기경민은 이런 사람 — 20초짜리 경력 요약과 확인 가능한 숫자. */
function IntroCard() {
  const { intro } = site;
  return (
    <section className="cf-intro" id="about" aria-label="소개">
      <div className="cf-intro-lead">
        <span className="cf-eyebrow">{intro.eyebrow}</span>
        <p className="cf-intro-arc">{intro.headline}</p>
        <p className="cf-intro-body">
          {intro.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <dl className="cf-stats">
          {intro.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{statValue(stat)}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="cf-timeline">
        {intro.timeline.map((step) => (
          <li key={step.year}>
            <span className="cf-timeline-year">{step.year}</span>
            <span className="cf-timeline-copy">
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 처음 온 사람에게 입구 세 개만 알려 줍니다. */
function Entries({ onOpen }: { onOpen: (groupId: string) => void }) {
  const { entries } = site;
  return (
    <section className="cf-entries" aria-label={entries.title}>
      <div className="cf-entries-head">
        <h3>{entries.title}</h3>
        <p>{entries.description}</p>
      </div>
      <div className="cf-entries-list">
        {entries.items.map((entry) => (
          <button key={entry.target} type="button" onClick={() => onOpen(entry.target)}>
            <strong>{entry.question}</strong>
            <span>
              {entry.label}
              <i aria-hidden="true">→</i>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/** 대표 작업 — 카테고리를 파고들지 않아도 보이는 자리. */
function Featured() {
  const { featured } = site;
  if (featuredItems.length === 0) return null;

  return (
    <section className="cf-featured" id="featured" aria-label={featured.title}>
      <div className="cf-section-head">
        <span className="cf-eyebrow">{featured.eyebrow}</span>
        <h3>{featured.title}</h3>
        <p>{featured.description}</p>
      </div>
      <div className="cf-cards">
        {featuredItems.map((item) => (
          <a key={item.name} className="cf-card" href={item.href} {...outboundProps(item.href)}>
            <span className="cf-card-top">
              {item.icon ? (
                <span className="cf-card-icon" aria-hidden="true">
                  <img src={iconSrc(item.icon)} alt="" loading="lazy" />
                </span>
              ) : null}
              <span className="cf-card-kind">{item.groupName}</span>
              <span className="cf-card-where">{item.badge ? item.badge : "공개"}</span>
            </span>
            <strong>{item.name}</strong>
            <p className="cf-card-why">{item.why}</p>
            {item.description ? <small>{item.description}</small> : null}
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

/** 링크 없이 기록만 남기는 항목 */
function StaticRow({ item }: { item: LinkItem }) {
  return (
    <li className="cf-row">
      <span className="cf-row-static">
        {item.year ? (
          <span className="cf-row-year">{item.year}</span>
        ) : item.icon ? (
          <span className="cf-row-icon" aria-hidden="true">
            <img src={iconSrc(item.icon)} alt="" loading="lazy" />
          </span>
        ) : null}
        <span className="cf-row-copy">
          <strong>{item.name}</strong>
          {item.description ? <small>{item.description}</small> : null}
        </span>
      </span>
    </li>
  );
}

function LinkRow({
  item,
  copiedValue,
  onCopy
}: {
  item: LinkItem;
  copiedValue: string | null;
  onCopy: (value: string, fallbackHref?: string) => void;
}) {
  const isCopied = !!item.copy && copiedValue === item.copy;

  return (
    <li className="cf-row">
      <a
        href={item.href}
        {...outboundProps(item.href)}
        onClick={(event) => {
          if (!item.copy) return;
          event.preventDefault();
          onCopy(item.copy, item.href);
        }}
      >
        {item.year ? (
          <span className="cf-row-year">{item.year}</span>
        ) : item.icon ? (
          <span className="cf-row-icon" aria-hidden="true">
            <img src={iconSrc(item.icon)} alt="" loading="lazy" />
          </span>
        ) : null}
        <span className="cf-row-copy">
          <strong>{item.name}</strong>
          {item.description ? <small>{isCopied ? "복사했습니다" : item.description}</small> : null}
        </span>
        {item.badge ? <span className="cf-badge">{item.badge}</span> : null}
        {item.copy ? (
          <span className={`cf-copy-badge${isCopied ? " cf-copy-badge-on" : ""}`}>
            {isCopied ? "복사됨" : "복사"}
          </span>
        ) : (
          <Arrow />
        )}
      </a>
    </li>
  );
}

function Panel({
  group,
  copiedValue,
  onCopy
}: {
  group: Group;
  copiedValue: string | null;
  onCopy: (value: string, fallbackHref?: string) => void;
}) {
  return (
    <div className="cf-panel" role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`}>
      <div className="cf-panel-head">
        <span className="cf-panel-icon" aria-hidden="true">
          <img src={iconSrc(group.icon)} alt="" />
        </span>
        <div>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
      </div>
      <ul className="cf-rows">
        {group.items.map((item, index) =>
          !item.href ? (
            <StaticRow key={`${item.name}-${index}`} item={item} />
          ) : (
            <LinkRow
              key={`${item.name}-${index}`}
              item={item}
              copiedValue={copiedValue}
              onCopy={onCopy}
            />
          )
        )}
      </ul>
    </div>
  );
}

function Shelf({
  activeId,
  onSelect,
  panelRef
}: {
  activeId?: string;
  onSelect: (id: string) => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const active = shownGroups.find((g) => g.id === activeId) ?? shownGroups[0];

  /** 구형·제한 브라우저를 위한 대비책. 숨은 입력칸을 만들어 복사합니다. */
  const legacyCopy = (value: string) => {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:-100px;opacity:0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(field);
    return ok;
  };

  const copy = async (value: string, fallbackHref?: string) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = legacyCopy(value);
    }

    if (ok) {
      setCopiedValue(value);
      window.setTimeout(() => setCopiedValue(null), 1800);
      return;
    }

    // 복사가 끝내 안 되면 원래 링크 동작(메일 앱 열기)으로 넘깁니다.
    if (fallbackHref) window.location.href = fallbackHref;
  };

  if (!active) return null;

  return (
    <section className="cf-shelf" id="shelf" aria-label="작업실">
      <div className="cf-tabs" role="tablist" aria-orientation="vertical" aria-label="분류">
        {shownGroups.map((group, index) => {
          const on = group.id === active.id;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              id={`tab-${group.id}`}
              aria-selected={on}
              aria-controls={`panel-${group.id}`}
              className={`cf-tab${on ? " cf-tab-on" : ""}`}
              onClick={() => onSelect(group.id)}
            >
              <span className="cf-tab-icon" aria-hidden="true">
                <img src={iconSrc(group.icon)} alt="" />
              </span>
              <span className="cf-tab-copy">
                <strong>{group.name}</strong>
                <small>{group.description}</small>
              </span>
              <span className="cf-tab-meta" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} <i>/</i> {group.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="cf-panel-slot" ref={panelRef}>
        <Panel group={active} copiedValue={copiedValue} onCopy={copy} />
      </div>
    </section>
  );
}

/** 저서·집필 — 웹으로 넓히기 전부터 쌓아 온 쪽. */
function Books() {
  const { credibility } = site;
  if (bookItems.length === 0) return null;

  return (
    <section className="cf-books" id="books" aria-label={credibility.title}>
      <div className="cf-section-head">
        <span className="cf-eyebrow">{credibility.eyebrow}</span>
        <h3>{credibility.title}</h3>
        <p>{credibility.lead}</p>
      </div>
      <ul className="cf-book-list">
        {bookItems.map((book) => {
          const inner = (
            <>
              <span className="cf-book-year">{book.year}</span>
              <span className="cf-book-copy">
                <strong>{book.name}</strong>
                {book.description ? <small>{book.description}</small> : null}
              </span>
              {book.href ? <Arrow /> : null}
            </>
          );
          return (
            <li key={book.name}>
              {book.href ? (
                <a href={book.href} {...outboundProps(book.href)}>
                  {inner}
                </a>
              ) : (
                <span className="cf-book-static">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** 연수 — 일지가 아니라 강사 포트폴리오로 읽히도록. */
function Speaking({ onOpen }: { onOpen: (groupId: string) => void }) {
  const { speaking } = site;
  const recent = lectureHistory.slice(0, 4);

  return (
    <section className="cf-speaking" id="speaking" aria-label={speaking.title}>
      <div className="cf-speaking-main">
        <span className="cf-eyebrow">{speaking.brand}</span>
        <h3>{speaking.title}</h3>
        <p className="cf-speaking-lead">{speaking.lead}</p>
        <p className="cf-speaking-body">{speaking.description}</p>

        <span className="cf-speaking-label">강의 가능한 주제</span>
        <div className="cf-topics">
          {speaking.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>

        <a className="cf-speaking-cta" href={speaking.cta.href}>
          {speaking.cta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="cf-speaking-history">
        <span className="cf-speaking-label">최근 강의</span>
        <ul>
          {recent.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <span className="cf-row-year">{item.year}</span>
              <span className="cf-row-copy">
                <strong>{item.name}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </span>
            </li>
          ))}
        </ul>
        <button type="button" className="cf-more" onClick={() => onOpen(speaking.historyGroup)}>
          전체 연수 기록 보기
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </section>
  );
}

export default function Workroom() {
  const [activeId, setActiveId] = useState(shownGroups[0]?.id);
  const panelRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setActiveId(id);
    // 좁은 화면에서는 패널이 목록 아래에 오므로 스크롤로 데려다 줍니다.
    if (window.matchMedia("(max-width: 63.99rem)").matches) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  /** 다른 구역에서 작업실을 열 때는 선반까지 데려다 줍니다. */
  const openGroup = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => {
      shelfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="cf-root">
      <Hero />
      <main className="cf-main">
        <ProfileBand />
        <IntroCard />
        <Entries onOpen={openGroup} />
        <Featured />
        <div className="cf-shelf-anchor" ref={shelfRef}>
          <Shelf activeId={activeId} onSelect={select} panelRef={panelRef} />
        </div>
        <Books />
        <Speaking onOpen={openGroup} />
      </main>
      <footer className="cf-footer">
        <p>{site.footer.line}</p>
        <small>{site.footer.credit}</small>
      </footer>
    </div>
  );
}
