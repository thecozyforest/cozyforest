"use client";

import { useMemo, useState } from "react";
import {
  site,
  iconSrc,
  isExternal,
  categoryName,
  usedCategories,
  type Work
} from "@/lib/content";

const ALL = "all";

function Arrow() {
  return (
    <svg className="cf-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18 18 6M9 6h9v9" />
    </svg>
  );
}

function outboundProps(href: string) {
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
        <span className="cf-eyebrow">{hero.eyebrow}</span>
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
  const { profile, contacts } = site;
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
        <span className="cf-note-label">{profile.note.label}</span>
        <p>
          {profile.note.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <div className="cf-tags">
          {profile.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <ul className="cf-contacts">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a href={contact.href} {...outboundProps(contact.href)}>
              <span className="cf-contact-label">{contact.label}</span>
              <span className="cf-contact-value">
                {contact.value}
                <Arrow />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <a
      className={`cf-card${work.image ? " cf-card-illustrated" : ""}`}
      href={work.href}
      {...outboundProps(work.href)}
    >
      {work.image ? (
        <span className="cf-card-art" aria-hidden="true">
          <img src={work.image} alt="" loading="lazy" />
        </span>
      ) : null}
      <span className="cf-card-body">
        <span className="cf-card-icon" aria-hidden="true">
          <img src={iconSrc(work.icon)} alt="" loading="lazy" />
        </span>
        <span className="cf-card-text">
          <span className="cf-card-cat">{categoryName(work.category)}</span>
          <strong>{work.name}</strong>
          <small>{work.description}</small>
        </span>
        <Arrow />
      </span>
    </a>
  );
}

function Works() {
  const [active, setActive] = useState<string>(ALL);

  const shown = useMemo(
    () => (active === ALL ? site.works : site.works.filter((w) => w.category === active)),
    [active]
  );

  return (
    <section className="cf-section" id="works" aria-label="만든 것들">
      <div className="cf-section-head">
        <span className="cf-eyebrow">WORKS</span>
        <h2>만든 것들</h2>
      </div>

      <div className="cf-filter" role="tablist" aria-label="활동 분류">
        <button
          type="button"
          role="tab"
          aria-selected={active === ALL}
          className={`cf-chip${active === ALL ? " cf-chip-on" : ""}`}
          onClick={() => setActive(ALL)}
        >
          전체 <em>{site.works.length}</em>
        </button>
        {usedCategories.map((cat) => {
          const count = site.works.filter((w) => w.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active === cat.id}
              className={`cf-chip${active === cat.id ? " cf-chip-on" : ""}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.name} <em>{count}</em>
            </button>
          );
        })}
      </div>

      <div className="cf-grid">
        {shown.map((work) => (
          <WorkCard key={`${work.category}-${work.href}-${work.name}`} work={work} />
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="cf-section cf-section-timeline" id="timeline" aria-label="활동 이력">
      <div className="cf-section-head">
        <span className="cf-eyebrow">ACTIVITY</span>
        <h2>걸어온 길</h2>
      </div>
      <ol className="cf-timeline">
        {site.timeline.map((entry, index) => (
          <li key={`${entry.year}-${entry.title}-${index}`}>
            <span className="cf-year">{entry.year}</span>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Workroom() {
  return (
    <div className="cf-root">
      <Hero />
      <main className="cf-main">
        <ProfileBand />
        <Works />
        <Timeline />
      </main>
      <footer className="cf-footer">
        <p>{site.footer.line}</p>
        <small>{site.footer.credit}</small>
      </footer>
    </div>
  );
}
