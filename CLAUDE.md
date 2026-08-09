# CLAUDE.md — The Cozy Forest

도치쌤(GitHub: `thecozyforest`)의 개인 링크 페이지입니다. Next.js 16 App Router + TypeScript, CSS는 순수 CSS 한 장(`src/app/globals.css`)으로 관리합니다.

## 구조

```
src/
├─ content/site.json      ← 콘텐츠는 전부 여기. 수정 요청은 대부분 이 파일만 고치면 됨
├─ lib/content.ts         ← site.json의 타입 + 헬퍼(카테고리 이름 찾기 등)
├─ components/Workroom.tsx← 화면 전체. "use client" (카테고리 필터에 useState 사용)
└─ app/
   ├─ layout.tsx          ← 메타데이터·OG 태그. site.json에서 값을 가져옴
   ├─ page.tsx            ← Workroom 렌더만
   └─ globals.css         ← :root 변수 → 색 전부 여기서 통제
public/
├─ icon.svg               ← 파비콘(고슴도치)
├─ icons/*.svg            ← 카드 아이콘
└─ assets/*.webp          ← 프로필·히어로·OG 이미지
```

## 작업 규칙

- 콘텐츠 수정 요청("링크 추가", "이력 바꿔줘")은 `src/content/site.json`만 고친다. 컴포넌트를 건드리지 않는다.
- 새 카테고리를 추가할 때는 `categories`에 `{id, name, en}`를 넣고, `works`의 `category`를 그 `id`와 맞춘다. 작업물이 하나도 없는 카테고리는 필터 버튼에 자동으로 안 나온다.
- 색 변경은 `globals.css`의 `:root` 변수만 고친다. 개별 규칙에 색을 직접 박지 않는다.
- CSS 클래스 접두어는 `cf-`로 통일한다.
- 이미지는 `public/assets/`에 webp로 넣는다(원본 PNG는 `../_원본이미지/`에 보관).
- 수정 후 `npm run build`로 타입·빌드를 확인한다.
- 개인정보·비공개 링크·API 키는 커밋하지 않는다.

## 컨텍스트 앵커

- **intent**: dorms-linktree / dorms-minihome 템플릿을 참고해 도치쌤 고유의 링크 페이지를 만든다
- **changes_made**: Next.js 골격만 남기고 화면·스타일 전면 재작성, 고슴도치 일러스트에서 팔레트 추출, 활동 분류 필터 추가, 에셋 5종 webp 생성
- **decisions**: 표절 회피를 위해 CSS/컴포넌트는 새로 작성(`lt-` → `cf-`), 콘텐츠는 단일 JSON으로 분리, 배포는 Vercel
- **next_steps**: site.json의 플레이스홀더를 실제 링크로 교체 → GitHub push → Vercel Import
