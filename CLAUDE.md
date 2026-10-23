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
- **숫자는 되도록 손으로 적지 않는다.** `intro.stats`는 `{countOf: "그룹id"}`(그룹 항목 수, `datedOnly: true`면 연도 붙은 항목만)나 `{sinceYear: 2014, unit: "년+"}`(올해 기준 경과 연수)로 쓴다. 밖에서 확인한 수치만 `{value, label, note}`로 직접 적고 `note`에 기준일을 꼭 단다 — 지금은 도름스 전체 도름 랭킹(창구 `npm run data -- ranking --period all`)과 내 앱·글 누적 조회(`apps`/`posts --author 보드라운고슴도치` 합). 갱신할 때 같은 명령으로 다시 확인한다. 확인할 수 없는 수치(참가 인원, 사용자 수)는 본인이 알려 준 값이 아니면 넣지 않는다.
- 연수 구역의 '강의한 곳'은 `lecture` 그룹에서 연도 붙은 항목의 설명 첫 칸(" · " 앞)을 세어 자동으로 만든다. 새 연수는 설명을 `주최 · 날짜 · …` 순서로 쓴다.
- 경력 숫자(교직 연차·담임 횟수·자격)는 본인이 공개를 정한 것만 넣는다. 이 파일은 공개 저장소에 올라가므로 경위는 저장소 밖 `../_작업기록/작업이력.md`에 적는다.
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

- **intent**: (2026-10-23) 10/22 갱신 뒤 "나아진 것"까지 반영해 브랜딩이 잘 되게 — 강사 브랜드 브리프(`연수 들은 거 정리하자- 강의하자/dochi_instructor_brand_strategy_context.html`)의 "코딩 강사로 좁히지 않기"를 기준으로 삼음
- **changes_made**: 숫자 칸 6개(도름스 전체 도름 1위 4,217·누적 조회 4.6만+ 기준일 표기, 연수는 연도 붙은 11회만), 연수 구역 '강의한 곳' 자동 칩(교실백점 6회·담임톡 3회·교육티타임·중화고), 대표작 교체(수시 입결 뷰어·수능최저 조회기·출발 프롬프트 틀 → 상담카드 수합앱·책장 밖의 딸들·교육티타임 LIVE), 소개 화살표 끝을 '교사 연수 강사'로, 연표 2025·2026 문구, 인스타는 @thecozyforest(도치T)만, 블로그 이름을 실제 「보드라운고슴도치의 숲」으로, 진학 노트 설명, SEO 설명·키워드. 코드는 `content.ts`(Stat 종류·lectureHosts)·`Workroom.tsx`·`globals.css`(.cf-stats small, .cf-hosts)
- **decisions**: 2026-10-23 선택지 질문에서 — 도름스 숫자 "넣기, 기준월 표기"(추천 선택, 사용자가 "총 도름 4000이 넘을 텐데" 짚어 랭킹으로 확인), 대표작 "폭을 넓히기"(추천 선택), 인스타 "도치T만 남기기"(추천이 아닌 쪽을 직접 고름 → @usermaria912는 sameAs에서도 뺌). 새 대표작 3개의 why는 Claude 초안(사용자 확인 전). 경력 숫자는 보류
- **next_steps**: (2026-10-23 푸시·배포 완료) 새 대표작 why 문장 본인 확인 → 경력 숫자 공개 여부 → 10.25 면접 특강을 마치면 연수 기록에 추가 → 도름스 숫자 월 1회 다시 확인 → Search Console·서치어드바이저 등록 후 `meta.verification`
