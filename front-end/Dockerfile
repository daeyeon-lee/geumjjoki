# front-end/Dockerfile

# --------------------------------------------------------------------------------
# 0) dev-stage  ─ Hot Module Replacement 용
# --------------------------------------------------------------------------------
FROM node:22.15.0-alpine AS dev-stage
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 전체 소스 복사
COPY . .

# Vite/React-Scripts/Next 등 어떤 툴이든 0.0.0.0 바인딩 필수
ENV HOST 0.0.0.0
# ← npm script 이름 맞춰 주세요
CMD ["npm", "run", "dev", "--", "--host"]
# --------------------------------------------------------------------------------
# 1) 빌드 스테이지: Node 21.6.1 Alpine으로 의존성 설치 및 빌드 (타입체크 제외)
# --------------------------------------------------------------------------------
FROM node:22.15.0-alpine AS build-stage
WORKDIR /app

# 의존성만 먼저 복사하여 설치 (빌드 캐시 활용)
COPY package*.json ./
RUN npm install

# 소스 전체 복사
COPY . .

# 프로덕션 빌드를 타입체크 없이 진행
RUN npm run build-only

# --------------------------------------------------------------------------------
# 2) 프로덕션 스테이지: Nginx로 정적 파일 서빙
# --------------------------------------------------------------------------------
FROM nginx:stable-alpine AS production-stage

# 커스텀 Nginx 설정 복사 (SPA 라우팅 지원)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물을 Nginx HTML 디렉터리로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx 기본 포트 노출
EXPOSE 80

# Nginx 포그라운드 실행
CMD ["nginx", "-g", "daemon off;"]
