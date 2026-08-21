# The Cozy Forest 🦔

**도치쌤의 아늑한 숲** — 가르치고, 만들고, 기록하는 사람의 페이지입니다.

밤의 서재 히어로에서 시작해 종이빛 본문으로 이어집니다.
링크를 모으는 데서 멈추지 않고, 대표 작업 · 경력 · 저서 · 강의까지 한 장에 담습니다.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 화면 순서

```
첫 화면 → 프로필 → 소개(경력 요약 + 숫자 + 연표) → 처음 오셨다면(입구 3개)
  → 대표 작업 6개 → 분류형 작업실 → 저서·집필 → 연수·강의 + 문의
```

## 내 것으로 바꾸기

고칠 파일은 **`src/content/site.json` 하나**입니다. 코드는 건드리지 않아도 됩니다.

| 항목 | 위치 | 설명 |
|---|---|---|
| 사이트 이름·검색 문구 | `meta` | 탭 제목, 검색·공유 문구, SNS 주소, 검색엔진 확인 코드 |
| 첫 화면 문구 | `hero` | `title`의 `\n`은 줄바꿈입니다 |
| 프로필·포스트잇 | `profile` | `note.lines`가 손글씨로 나옵니다 |
| 소개·숫자·연표 | `intro` | 20초짜리 경력 요약 자리 |
| 처음 오셨다면 | `entries` | `target`은 아래 `groups`의 `id`입니다 |
| **대표 작업** | `featured` | 주소를 다시 적지 않고 `groups`의 항목을 가리킵니다 |
| 분류와 링크 | `groups` | 왼쪽 탭 하나 = `groups` 항목 하나 |
| 저서·집필 | `credibility` | 어느 그룹에서 책을 뽑을지 지정합니다 |
| 연수·강의 | `speaking` | 강의 주제, 문의 버튼, 최근 강의 |
| 푸터 | `footer` | 마지막 인사말 |

### 알아 두면 좋은 규칙

- `groups[].items[]`에서 `href`를 빼면 눌리지 않는 기록(연수 이력 등)이 되고, `year`를 넣으면 아이콘 자리에 연도가 들어갑니다. `badge`는 오른쪽에 붙는 작은 표시(`DoRms` 등), `copy`를 넣으면 클릭 시 이동 대신 복사됩니다.
- `icon`은 `public/icons/`에 있는 파일 이름을 씁니다
  (`school` `docs` `manual` `contact` `magazine` `code` `download` `game` `privacy` `naver-blog` `instagram` `kakao-chat` `kakao-group`).
- **대표 작업은 주소를 적지 않습니다.** `{"group": "admission", "name": "수시 입결 뷰어", "why": "..."}`처럼 가리키기만 하면 주소·아이콘·배지를 원본에서 가져옵니다. 원본 이름을 바꾸면 그 카드는 사라집니다.
- **숫자는 직접 세지 않습니다.** `intro.stats`에 `{"countOf": "admission", "label": "진학·입시 도구"}`를 넣으면 그 그룹의 항목 수가, `{"sinceYear": 2014, "unit": "년+", "label": "..."}`를 넣으면 올해 기준 경과 연수가 들어갑니다.
- 저서 목록은 `credibility.sourceGroup`이 가리키는 그룹에서 `year`가 있는 항목을 자동으로 뽑습니다.
- 사진은 `public/assets/`에 넣고 `/assets/파일명` 으로 씁니다.

## 검색에 걸리게 하기

- 탭 제목과 공유 제목은 `meta.seoTitle`입니다. 브랜드명보다 **이름을 앞에** 두는 편이 검색에 유리합니다.
- `layout.tsx`가 `Person` + `WebSite` 구조화 데이터(JSON-LD)를 자동으로 넣습니다. SNS·블로그 주소는 `meta.sameAs`에 적어 주세요.
- `/robots.txt`와 `/sitemap.xml`은 `src/app/robots.ts`, `src/app/sitemap.ts`에서 자동 생성됩니다.
- Google Search Console과 네이버 서치어드바이저에서 소유 확인 코드를 받으면 `meta.verification.google` / `meta.verification.naver`에 붙여넣으세요. 비워 두면 태그가 아예 붙지 않습니다.

## 색을 바꾸고 싶다면

`src/app/globals.css` 맨 위 `:root` 블록의 변수만 고치면 사이트 전체 색이 바뀝니다.

```css
--night: #241a18;  /* 첫 화면 밤 배경 */
--lamp:  #f2b45c;  /* 램프빛 · 버튼 */
--cream: #fbf6ee;  /* 본문 종이 */
--berry: #c04b45;  /* 카테고리 라벨 */
--moss:  #6e7f5a;  /* 이력 연도 */
```

## 파비콘과 공유 이미지

- 파비콘: `public/icon.svg`
- 카카오톡·트위터 공유 이미지: `public/assets/og-cover.webp` (1200×630 권장)

## 배포

GitHub 저장소를 [Vercel](https://vercel.com)에서 Import 하면 끝입니다.
배포 주소가 생기면 Vercel 환경변수에 `NEXT_PUBLIC_SITE_URL`을 그 주소로 넣어 주세요.
공유 이미지와 `sitemap.xml`, `canonical` 주소가 제대로 뜨려면 이 값이 필요합니다.

```bash
npm run build   # 배포 전 확인
```

> 공개 저장소에는 개인 정보, 비공개 링크, API 키를 넣지 마세요.

## 만들어진 배경

[dorms-linktree-template](https://github.com/shinnanchanguk/dorms-linktree-template)과
[dorms-minihome-template](https://github.com/ainssam/dorms-minihome-template)의 구성을 참고해,
Next.js 골격 위에 화면과 스타일을 새로 짰습니다. 두 원본 모두 MIT 라이선스입니다.

## License

MIT
