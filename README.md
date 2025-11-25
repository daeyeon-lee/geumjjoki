# 금쪼기

> 소비습관 개선을 위한 챌린지를 통해 금융상품을 리워드로 제공하는 서비스

![alt text](images/main.png)

# 📜 목차

- [서비스 개요](#서비스-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [아키텍처 구성](#아키텍처-구성)
- [폴더 구조](#폴더-구조)
- [팀원 소개](#팀원-소개)

# 📝서비스 개요

소비습관 개선을 위한 챌린지를 통해 금융상품을 리워드로 제공하는 서비스

### 페르소나

**충동적인 소비습관을 가진 이쪼기님**

- **현재 상황** :

  - 월 수입 250만원, 월 지출 240만원, 월 저축 10만원
  - 수입의 대부분이 지출로 사용되고 저축액이 상당히 적은 상태

- **문제점** :
  - 소비의 대부분이 충동적
  - 저축을 시작하고자 하지만 정보가 부족하고 습관이 형성되어 있지 않음
- **필요한 점** :
  - 금쪼기 어플의 챌린지를 통해 충동적인 소비 습관을 개선하고 다양한 금융 상품 리워드를 활용해 저축을 시작

# ⚡주요 기능

### 1. 소비

- 소비액 분석 : 이전 달 대비 소비액 증가 / 감소 시 빨간색 / 초록색으로 표시

- 카테고리별 사용량 요약 : 챌린지 카테고리별 월 누적 소비액 요약

- 소비 현황 : 월별 누적 소비액 조회, 소비 내역 리스트 조회, 조회 조건 필터링

- 상세 내역 : 상세 내역 조회 및 수정

<div class = "flex">
  <img src="images/소비액분석.png" alt="소비액 분석" width="200" >
  <img src="images/소비현황.png" alt="소비 현황" width="200" >
  <img src="images/소비카테고리.png" alt="소비 카테고리" width="200" >
</div>

### 2. 리워드

- 상품 목록 필터링 : 전체 조회, 상품 카테고리별 조회

- 구매 내역 필터링 : 기간별 이전 구매 내역 조회, 유효기간에 따라 사용 가능, 사용 완료, 중지, 만료 구분
<div class = "flex">
  <img src="images/리워드상품목록.png" alt="상품 목록" width="200" >
  <img src="images/리워드구매내역.png" alt="구매 내역" width="200" >
</div>

### 3. 챌린지

- 진행 중인 챌린지 : 현재 진행중인 챌린지를 카테고리, 내용, 포인트, 도전 기간 조회회

- 도전 가능한 챌린지 : 챌린지는 카테고리별 1개만 선택 가능

- 지난 챌린지 : 전체, 성공, 실패 필터링 / 실패 여부에 따라 버튼 색상 변경

<div class = "flex">
  <img src="images/지난챌린지.png" alt="지난 챌린지" width="200" >
  <img src="images/챌린지목록.png" alt="챌린지 목록" width="200" >
</div>

### 4. 게시글

- 전체 게시글 조회 : 게시글 목록 필터링 (최신순/ 인기순)

<div class = "flex">
  <img src="images/게시글조회.png" alt="게시글 조회" width="200" >
  <img src="images/게시글상세.png" alt="게시글 상세" width="200" >
</div>

### 마이페이지

- 프로필 : 현재 보유 포인트, 월별 누적 소비금액, 도전 챌린지 수 조회

- 리워드 요약 : 교환 가능한 리워드 미리보기

- 챌린지 요약 : 도전 가능한 챌린지 목록 미리보기

  <div class = "flex">
    <img src="images/마이페이지.png" alt="마이페이지" width="200" >
  </div>

# 🛠기술 스택

### Frontend

- Language: TypeScript
- Framework: Vue.js
- UI/스타일링: TailwindCSS
- 상태 관리: Pinia
- 라우팅: Vue Router
- 개발 도구: Vit

### Backend

- Language: Python
- Framework: Django
- Database: MySQL
- ORM: Spring Data JPA
- 인증/보안: JWT

### Infra

- Containerization: Docker
- Cloud: AWS

# 📐아키텍처 구성

### 시스템 아키텍처

![alt text](images/시스템_아키텍처.png)

# 📂폴더 구조

```
geumjjoki/
├── front-end/                # Vue3 기반 프론트엔드
│   ├── src/                  # 소스코드
│   │   ├── components/       # 공통/페이지별 컴포넌트
│   │   ├── pages/            # 라우트별 페이지 컴포넌트
│   │   ├── assets/           # 이미지, 스타일 등 정적 리소스
│   │   ├── types/            # 타입 정의
│   │   ├── composables/      # 커스텀 훅/로직
│   │   └── ...               # 기타 src 하위 폴더
│   ├── public/               # 정적 파일 (favicon 등)
│   ├── package.json          # 프론트엔드 의존성/스크립트
│   ├── vite.config.ts        # Vite 설정
│   ├── Dockerfile            # 프론트엔드 도커파일
│   └── ...                   # 기타 설정 파일
│
├── back-end/                 # Django 기반 백엔드
│   ├── accounts/             # 사용자/인증 관련 앱
│   ├── articles/             # 게시글 관련 앱
│   ├── challenges/           # 챌린지 관련 앱
│   ├── rewards/              # 리워드 관련 앱
│   ├── expenses/             # 지출 관련 앱
│   ├── geumjjoki/            # Django 프로젝트 설정
│   ├── requirements.txt      # 백엔드 파이썬 의존성
│   ├── manage.py             # Django 관리 스크립트
│   ├── Dockerfile            # 백엔드 도커파일
│   └── ...                   # 기타 설정/앱
│
├── docker-compose.yml        # 전체 서비스 도커 컴포즈
├── README.md                 # 프로젝트 설명서
└── ...                       # 기타 파일/폴더
```

# 👥팀원 소개

| 김권수   | 김정택 | 이대연 | 하재민 |
| -------- | ------ | ------ | ------ |
| BE, 팀장 | BE     | FE     | FE     |
