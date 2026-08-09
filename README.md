# The Cozy Forest 🦔

**도치쌤의 아늑한 숲** — 가르치고, 만들고, 기록하는 사람의 링크 페이지입니다.

밤의 서재 히어로에서 시작해 종이빛 본문으로 이어지고, 활동을 카테고리로 걸러 볼 수 있습니다.
링크트리처럼 링크를 모으면서 포트폴리오처럼 이력까지 담습니다.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 내 것으로 바꾸기

고칠 파일은 **`src/content/site.json` 하나**입니다. 코드는 건드리지 않아도 됩니다.

| 항목 | 위치 | 설명 |
|---|---|---|
| 사이트 이름·설명 | `meta` | 브라우저 탭 제목, 검색·공유 시 나오는 문구 |
| 첫 화면 문구 | `hero` | `title`의 `\n`은 줄바꿈입니다 |
| 프로필·포스트잇·태그 | `profile` | `note.lines`가 손글씨로 나옵니다 |
| 연락처 | `contacts` | 메일은 `mailto:`, 나머지는 `https://` |
| **활동 분류** | `categories` | 필터 버튼이 됩니다. 늘리고 줄여도 됩니다 |
| 작업물 카드 | `works` | `category`는 위 `categories`의 `id`와 맞춥니다 |
| 이력 | `timeline` | 연도 + 제목 + 한 줄 설명 |

- `works`의 `icon`은 `public/icons/`에 있는 파일 이름을 씁니다
  (`school` `docs` `manual` `contact` `magazine` `code` `download` `game` `privacy` `naver-blog` `instagram` `kakao-chat` `kakao-group`).
- `works`에 `image`를 넣으면 카드 위에 그림이 깔립니다. 넣지 않으면 아이콘만 나옵니다.
- 사진은 `public/assets/`에 넣고 `/assets/파일명` 으로 씁니다.

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
공유 이미지가 제대로 뜨려면 이 값이 필요합니다.

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
