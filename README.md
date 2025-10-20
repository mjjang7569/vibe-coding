# Vibe Coding

일기 작성 및 관리 기능을 제공하는 Next.js 기반 웹 애플리케이션입니다. React, TypeScript, Tailwind CSS와 Storybook을 사용하여 개발되었습니다.

## 주요 기능

- 일기 목록 조회 및 검색
- 페이지네이션을 통한 일기 목록 탐색
- 반응형 UI 컴포넌트
- Storybook을 통한 컴포넌트 문서화

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Testing**: Storybook
- **Theme**: next-themes (다크/라이트 모드 지원)

## 설치 및 실행

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
개발 서버가 실행되면 브라우저에서 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 프로덕션 빌드
```bash
npm run build
npm start
```

### Storybook 실행
컴포넌트 문서화 및 테스트를 위해 Storybook을 실행할 수 있습니다:
```bash
npm run storybook
```
Storybook이 실행되면 [http://localhost:6006](http://localhost:6006)에서 확인할 수 있습니다.

## 테스트

### Linting
```bash
npm run lint
```

### Storybook 빌드 테스트
```bash
npm run build-storybook
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── diaries/           # 일기 목록 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 페이지별 컴포넌트
│   ├── diaries/           # 일기 관련 컴포넌트
│   └── diaries-detail/    # 일기 상세 컴포넌트
├── commons/               # 공통 컴포넌트 및 유틸리티
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── constants/         # 상수 정의
│   ├── layout/           # 공통 레이아웃
│   └── providers/        # React Context Providers
└── lib/                  # 라이브러리 및 유틸리티 함수
```

## 컴포넌트

프로젝트에 포함된 주요 UI 컴포넌트:
- Button: 기본 버튼 컴포넌트
- Input: 입력 필드 컴포넌트
- Searchbar: 검색바 컴포넌트
- Pagination: 페이지네이션 컴포넌트
- Selectbox: 셀렉트박스 컴포넌트
- Toggle: 토글 컴포넌트

각 컴포넌트는 Storybook에서 확인하고 테스트할 수 있습니다.