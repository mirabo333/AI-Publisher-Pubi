# Pubi

이미지 또는 텍스트 요청을 받아 React + SCSS UI 코드를 생성하는 웹 애플리케이션입니다.  
Next.js 14 App Router 기반이며, OpenAI / Anthropic / Google Gemini 세 가지 AI 프로바이더를 지원합니다.

## 주요 기능

- **이미지 → 코드**: 스크린샷이나 디자인 이미지를 업로드하면 동일한 UI의 React 코드를 생성
- **텍스트 → 코드**: 설명만으로도 UI 코드 생성 가능
- **멀티턴 대화**: 이전 결과를 기반으로 수정 요청 가능
- **실시간 스트리밍**: 코드가 생성되는 즉시 표시
- **3개 프로바이더 선택**: Anthropic (Claude), OpenAI (GPT-4o), Google (Gemini)

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Sass (SCSS)
- **AI**: Anthropic Claude Sonnet / OpenAI GPT-4o / Google Gemini 2.0 Flash
- **주요 라이브러리**
  - `react-markdown` + `rehype-highlight` — 마크다운 및 코드 하이라이팅
  - `react-icons` — 아이콘
  - `@reactour/tour` — 온보딩 투어

## 데이터 흐름

```
page.tsx → POST /api/imageai → AI provider (stream) → CodeBox → IframeViewer
```

## 프로젝트 구조

```
app/
├── api/
│   └── imageai/
│       └── route.ts          # 멀티 프로바이더 스트리밍 핸들러
├── components/
│   ├── CodeBox.tsx            # 코드 표시 (구문 강조)
│   ├── IframeViewer.tsx       # 생성 코드 라이브 미리보기
│   ├── ClientTourProvider.tsx # 온보딩 투어
│   ├── Loading.tsx            # 로딩 상태
│   └── MarkdownViewer.tsx     # 마크다운 렌더링
├── assets/
│   └── styles/
│       └── main.module.scss   # 전역 스타일
└── page.tsx                   # 메인 페이지
```

## 시작하기

```bash
yarn install
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열고, 사이드바에서 프로바이더와 API 키를 입력합니다.  
API 키는 환경 변수 없이 UI에서 직접 입력하며 `localStorage`에 저장됩니다.

## API

### `POST /api/imageai`

**Request Body**
```json
{
  "provider": "anthropic" | "openai" | "gemini",
  "apiKey": "your-api-key",
  "image": "base64-encoded-string (optional)",
  "imageMimeType": "image/png (optional, default: image/jpeg)",
  "question": "수정 요청 또는 설명 (optional)",
  "chatHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response**: `text/plain` 스트림 (생성된 코드를 실시간으로 전송)

## 코드 생성 규칙

생성되는 코드는 아래 규칙을 따릅니다.

- 컴포넌트명은 반드시 `App`
- 스타일링은 SCSS 사용 (변수·mixin 포함)
- SCSS와 동일한 CSS 파일 함께 제공
- 들여쓰기 4 스페이스

## 스크립트

| 명령어 | 설명 |
|---|---|
| `yarn dev` | 개발 서버 시작 |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 프로덕션 서버 시작 |
| `yarn lint` | ESLint 검사 |
