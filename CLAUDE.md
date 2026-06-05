## Architecture
Pubi: Next.js 14 App Router 기반 UI 코드 생성 앱
page.tsx → /api/imageai → provider stream → CodeBox → IframeViewer

## Commands
yarn dev / build / start / lint

## Rules
- 컴포넌트명은 반드시 App
- 스타일은 SCSS 우선, CSS Modules는 page.tsx만
- 새 route는 imageai 패턴 따르기
- any 타입 금지