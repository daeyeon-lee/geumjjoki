# 금쪽이(geumjjoki) 프로젝트

## 📁 프로젝트 구조

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

---

## 🚀 빠른 시작

### 1. 환경 변수(.env) 설정

**front-end/.env**
```
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_js_key
MODE=development   # development(개발) 또는 product(운영)
```

**back-end/.env**
```
SECRET_KEY=your_django_secret
KAKAO_REST_API_KEY=your_kakao_rest_api_key
KAKAO_SECRET_KEY=your_kakao_secret_key
NAVER_REST_API_KEY=your_naver_rest_api_key
NAVER_SECRET_KEY=your_naver_secret_key
DEBUG=True         # 개발: True, 운영: False
```

---

### 2. Docker로 전체 서비스 실행

#### 운영(prod) 환경

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  up -d --build
```

#### 개발(dev) 환경

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  up -d --build
```

> **Tip:** 필요시 기존 컨테이너/볼륨을 정리하려면  
> `docker compose down` 명령을 먼저 실행하세요.

---

### 3. 개별 서비스 개발 환경 실행

#### 프론트엔드 (Vue3)

```bash
cd front-end
npm install
npm run dev
```

#### 백엔드 (Django)

```bash
cd back-end
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🗂️ 주요 폴더 설명

- **front-end/**  
  Vue3 + TypeScript 기반 SPA 소스코드  
  (src/components, src/pages 등)

- **back-end/**  
  Django 프로젝트 및 앱 소스코드  
  (accounts, articles, challenges, rewards, expenses 등)

---

## 📝 기타 참고

- **포트/도메인**:  
  - 프론트엔드: 기본 5173  
  - 백엔드: 기본 8000  
  (docker-compose에서 포트 매핑 확인)

- **테스트/코딩 컨벤션**:  
  - 프론트엔드: Vitest, ESLint, Prettier  
  - 백엔드: Django TestCase

- **문의/기여**:  
  Pull Request, Issue 등록 환영!

---

## 💡 Trouble Shooting

- 컨테이너가 정상적으로 실행되지 않을 때는 `.env` 파일, 포트 충돌, 의존성 설치 여부를 확인하세요.
- DB 초기화가 필요하면 `docker compose down -v`로 볼륨까지 삭제 후 재실행하세요.

---

## ⚙️ 데이터 초기화/생성 커맨드

아래 커맨드들은 더미 데이터, 카테고리, 챌린지, 리워드, 포인트, 경험치, 게시글 등 개발/테스트용 데이터를 생성하거나 동기화하는 데 사용됩니다.

### 공통 실행법

```bash
python manage.py <command> [옵션]
```

### 커맨드 목록 및 설명

| 커맨드명 | 위치 | 설명 및 주요 옵션 |
|----------|------|------------------|
| **create_test_users** | accounts | 테스트용 유저/프로필 대량 생성<br>옵션: <br>  --count (생성 수, 기본 100)<br>  --password (비번, 기본 1234)<br>  --batch_size (배치, 기본 1000) |
| **give_point** | accounts | 전체 또는 특정 유저에게 포인트 지급<br>옵션: <br>  --username (특정 유저만) <br>  --point (지급 포인트, 기본 10000) |
| **give_exp** | accounts | 특정 유저에게 경험치 지급 및 레벨 갱신<br>옵션: <br>  --username (필수) <br>  --exp (필수, 지급 경험치) |
| **create_categories** | expenses | KOSIS 기반 자기참조 카테고리 구조 생성 |
| **create_expenses** | expenses | 유저별 평균수입 기준, 지정 기간 지출내역 대량 생성<br>옵션: <br>  --startdate YYYY-MM-DD <br>  --enddate YYYY-MM-DD <br>  --unclassified-ratio (미분류 비율, 기본 0.05) |
| **create_expenses_for_user** | expenses | 특정 유저(username) 대상, 지정 기간 지출내역 생성<br>옵션: <br>  username (필수) <br>  --startdate YYYY-MM-DD <br>  --enddate YYYY-MM-DD <br>  --unclassified-ratio (미분류 비율, 기본 0.05) <br>  --ignore-income (월별 평균수입 제한 해제) |
| **sync_expenses_with_challenges** | expenses | 유저챌린지와 지출내역을 기간/카테고리 기준으로 자동 연결 및 합산 |
| **create_challenges** | challenges | 카테고리별 챌린지 더미 데이터 생성 (상태별 기간 랜덤) |
| **create_rewards** | rewards | 카테고리별 리워드 더미 데이터 40개 생성 |
| **create_reward_transactions** | rewards | 유저별 리워드 교환 더미 데이터 생성<br>옵션: <br>  --username (특정 유저만) <br>  --count (유저당 생성 수, 기본 5) |
| **create_articles** | articles | 샘플 게시글/댓글/좋아요 생성<br>sample_articles.json, sample_comment_contents.json 필요 |

---

### 예시: 전체 데이터 초기화 및 더미 데이터 생성

```bash
python manage.py create_test_users --count 1000 --password test1234
python manage.py create_categories
python manage.py create_expenses --startdate 2024-01-01 --enddate 2024-03-31
python manage.py create_expenses_for_user user1 --startdate 2024-01-01 --enddate 2024-03-31 --ignore-income
python manage.py create_challenges
python manage.py create_rewards
python manage.py sync_expenses_with_challenges
python manage.py create_reward_transactions --count 10
python manage.py give_point --point 5000
python manage.py give_exp --username user1 --exp 5000
python manage.py create_articles
```

각 커맨드는 필요에 따라 옵션을 조합해 사용할 수 있습니다. 자세한 옵션은 `python manage.py <command> --help`로 확인하세요.

---
