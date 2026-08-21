# CLAUDE.md — The Cozy Forest

도치쌤(기경민 · GitHub: `thecozyforest`)의 개인 페이지입니다. 링크 모음에서 출발했지만 지금은 **처음 온 사람이 1분 안에 "기경민이 어떤 사람인지" 파악하는 포트폴리오**를 목표로 합니다. Next.js 16 App Router + TypeScript, CSS는 순수 CSS 한 장(`src/app/globals.css`)으로 관리합니다.

배포는 GitHub `main` → Vercel 자동 배포입니다. **로컬이 `origin/main`보다 뒤처져 있을 수 있으니 작업 전에 `git fetch && git log --oneline HEAD..origin/main`으로 확인하세요.**

## 구조

```
src/
├─ content/site.json      ← 콘텐츠는 전부 여기. 수정 요청은 대부분 이 파일만 고치면 됨
├─ lib/content.ts         ← site.json의 타입 + 헬퍼(대표작 참조 해석, 숫자 집계, 저서 추출)
├─ components/Workroom.tsx← 화면 전체. "use client" (분류 탭 상태에 useState 사용)
└─ app/
   ├─ layout.tsx          ← 메타데이터·OG·Person/WebSite JSON-LD. site.json에서 값을 가져옴
   ├─ sitemap.ts          ← /sitemap.xml
   ├─ robots.ts           ← /robots.txt
   ├─ page.tsx            ← Workroom 렌더만
   └─ globals.css         ← :root 변수 → 색 전부 여기서 통제
public/
├─ icon.svg               ← 파비콘(고슴도치)
├─ icons/*.svg            ← 카드 아이콘
└─ assets/*.webp          ← 프로필·히어로·OG 이미지
```

## 화면 순서 (Workroom.tsx)

```
Hero(밤의 서재)
 → ProfileBand(프로필 + 포스트잇)
 → IntroCard   : 경력 한 줄 요약 + 확인 가능한 숫자 4개 + 연표   ← site.json의 intro
 → Entries     : "처음 오셨다면" 입구 3개(누르면 아래 분류가 열림) ← entries
 → Featured    : 대표 작업 6개                                  ← featured
 → Shelf       : 기존 분류형 작업실(왼쪽 탭 + 오른쪽 패널)         ← groups
 → Books       : 저서·집필                                      ← credibility
 → Speaking    : 강의 가능한 주제 + 최근 강의 + 문의 CTA          ← speaking
 → Footer
```

## 작업 규칙

- 콘텐츠 수정 요청("링크 추가", "이력 바꿔줘")은 `src/content/site.json`만 고친다. 컴포넌트를 건드리지 않는다.
- 새 카테고리를 추가할 때는 `groups`에 `{id, name, description, icon, items}`를 넣는다. 항목이 하나도 없는 그룹은 화면에 자동으로 안 나온다.
- **대표작(`featured.items`)은 링크를 직접 적지 않는다.** `{group, name, why}`로 `groups` 안의 항목을 가리키기만 하고, 주소·아이콘·배지는 원본에서 가져온다. 이름이 바뀌면 참조가 끊겨 그 카드만 조용히 사라지므로, 항목 이름을 고칠 때는 `featured`도 함께 본다.
- **숫자는 손으로 적지 않는다.** `intro.stats`는 `{countOf: "그룹id"}`(그룹 항목 수)나 `{sinceYear: 2014, unit: "년+"}`(올해 기준 경과 연수)로만 쓴다. 확인할 수 없는 수치(참가 인원, 사용자 수)는 본인이 알려 준 값이 아니면 넣지 않는다.
- 저서 목록은 `credibility.sourceGroup`이 가리키는 그룹에서 `year`가 붙은 항목을 자동으로 뽑는다. 책을 추가하려면 `groups`의 `writing`에만 넣으면 된다.
- 색 변경은 `globals.css`의 `:root` 변수만 고친다. 개별 규칙에 색을 직접 박지 않는다.
- CSS 클래스 접두어는 `cf-`로 통일한다.
- 이미지는 `public/assets/`에 webp로 넣는다(원본 PNG는 `../_원본이미지/`에 보관).
- 수정 후 `npm run build`로 타입·빌드를 확인한다.
- 개인정보·비공개 링크·API 키는 커밋하지 않는다. 근무 학교 이력은 본인이 확인해 준 것만 넣는다(2026-08 기준: 넣지 않기로 함).

## SEO

- `<title>`과 OG 제목은 `meta.seoTitle`("기경민(도치쌤) | …")입니다. 브랜드명이 아니라 **실명이 먼저** 오도록 유지합니다.
- `layout.tsx`가 `Person` + `WebSite` JSON-LD를 넣습니다. 인스타·블로그·GitHub 주소는 `meta.sameAs`에서 가져옵니다.
- 검색엔진 소유 확인 코드는 `meta.verification.google` / `meta.verification.naver`에 문자열만 채우면 메타 태그가 자동으로 붙습니다. 비어 있으면 태그를 아예 넣지 않습니다.
- Google Search Console·네이버 서치어드바이저 등록과 `sitemap.xml` 제출은 코드 밖 작업이라 본인이 해야 합니다.

## 브랜드

- **도치쌤의 아늑한 숲** = 전체 공간(사이트 이름, 푸터, OG).
- **도치의 교실 설계실** = 연수·강의 브랜드. 연수 구역(`speaking.brand`)에서만 노출합니다.

## 컨텍스트 앵커

- **intent**: dorms-linktree / dorms-minihome 템플릿을 참고해 도치쌤 고유의 링크 페이지를 만들고, 그 위에 포트폴리오 층을 얹는다
- **changes_made**: Next.js 골격만 남기고 화면·스타일 전면 재작성 → 이후 대표작·경력·저서·강사 포트폴리오·첫 방문 안내 5개 구역과 SEO(제목 실명화, JSON-LD, sitemap, robots) 추가
- **decisions**: 표절 회피를 위해 CSS/컴포넌트는 새로 작성(`lt-` → `cf-`), 콘텐츠는 단일 JSON으로 분리, 대표작·숫자는 참조/집계로만 두어 중복 관리를 없앰, 근무 학교 이력은 미공개
- **next_steps**: Search Console·서치어드바이저 등록 후 `meta.verification` 채우기 → 대표작 6개의 `why` 문구를 본인 말로 다듬기 → 필요하면 책 표지 이미지 추가
