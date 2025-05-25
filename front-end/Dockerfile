# front-end/Dockerfile

# 1) 빌드 스테이지: Node로 의존성 설치 및 빌드
FROM node:21-alpine AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2) 프로덕션 스테이지: Nginx로 정적 파일 서빙
FROM nginx:stable-alpine AS production-stage

# (선택) 커스텀 Nginx 설정이 있으면 아래 주석 해제
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
