# 금쪽이 프론트엔드 프로젝트

## 프로젝트 소개
금쪽이 프로젝트의 프론트엔드 애플리케이션입니다. Vue 3와 TypeScript를 기반으로 개발되었습니다.

## 기술 스택
- **프레임워크**: Vue 3
- **언어**: TypeScript
- **상태 관리**: Pinia
- **라우팅**: Vue Router
- **스타일링**: Tailwind CSS
- **테스트**: Vitest, Cypress
- **빌드 도구**: Vite
- **소셜 로그인**: Kakao SDK

## 프로젝트 구조
```
frontend/
├── src/                    # 소스 코드
│   ├── assets/            # 정적 자원 (이미지, 스타일 등)
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   ├── plugins/           # 플러그인 (axios 등)
│   ├── router/            # 라우팅 설정
│   ├── stores/            # Pinia 스토어
│   ├── types/             # TypeScript 타입 정의
│   ├── views/             # 페이지 컴포넌트
│   ├── App.vue           # 루트 컴포넌트
│   └── main.ts           # 애플리케이션 진입점
├── public/                # 정적 파일
├── cypress/              # E2E 테스트
├── .vscode/              # VS Code 설정
├── node_modules/         # 의존성 패키지
├── .env                  # 환경 변수
├── tsconfig.json         # TypeScript 설정
├── vite.config.ts        # Vite 설정
└── package.json          # 프로젝트 메타데이터 및 의존성
```

## 주요 기능
- 소셜 로그인 (카카오)
- 반응형 모바일 레이아웃
- 상태 관리 (Pinia)
- API 통신 (Axios)

## 시작하기

### 필수 조건
- Node.js (v18 이상)
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 테스트
```bash
# 단위 테스트
npm run test:unit

# E2E 테스트
npm run test:e2e
```

## 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정해야 합니다:

```
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key_here
```

## 코드 스타일
- ESLint와 Prettier를 사용하여 코드 스타일을 관리합니다.
- TypeScript를 사용하여 타입 안정성을 보장합니다.

## 배포
- Vite를 사용하여 프로덕션 빌드를 생성합니다.
- `npm run build` 명령어로 빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
