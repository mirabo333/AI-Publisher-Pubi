# AI Publisher (Pubi)

OpenAI API를 연동한 AI 챗봇 웹 애플리케이션입니다. Next.js 14 App Router 기반으로 구축되었으며, 마크다운 렌더링과 코드 하이라이팅을 지원합니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Sass (SCSS)
- **AI**: OpenAI API (`gpt-3.5-turbo`)
- **주요 라이브러리**
  - `react-markdown` + `rehype-highlight` — 마크다운 및 코드 하이라이팅
  - `react-icons` — 아이콘
  - `highlight.js` — 코드 구문 강조
  - `@reactour/tour` — 온보딩 투어

## 프로젝트 구조

```
app/
├── api/
│   └── openai/
│       └── route.ts    # OpenAI Chat Completions API 프록시
└── page.tsx            # 메인 페이지
```

## 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 OpenAI API 키를 설정합니다.

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## API

### `POST /api/openai`

OpenAI `gpt-3.5-turbo` 모델에 메시지를 전송합니다.

**Request Body**
```json
{
  "role": "user",
  "content": "질문 내용"
}
```

**Response**
```json
{
  "answer": "AI 응답 내용"
}
```

## 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 검사 |

## 배포

[Vercel](https://vercel.com)에 배포 시 환경 변수 `OPENAI_API_KEY`를 프로젝트 설정에서 추가해야 합니다.
