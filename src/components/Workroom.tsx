"use client";

import { useRef, useState } from "react";
import { site, iconSrc, isExternal, shownGroups, type Group, type LinkItem } from "@/lib/content";

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

function Shelf() {
  const [activeId, setActiveId] = useState(shownGroups[0]?.id);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = shownGroups.find((g) => g.id === activeId) ?? shownGroups[0];

  const select = (id: string) => {
    setActiveId(id);
    // 좁은 화면에서는 패널이 목록 아래에 오므로 스크롤로 데려다 줍니다.
    if (window.matchMedia("(max-width: 63.99rem)").matches) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

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
              onClick={() => select(group.id)}
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

export default function Workroom() {
  return (
    <div className="cf-root">
      <Hero />
      <main className="cf-main">
        <ProfileBand />
        <Shelf />
      </main>
      <footer className="cf-footer">
        <p>{site.footer.line}</p>
        <small>{site.footer.credit}</small>
      </footer>
    </div>
  );
}
