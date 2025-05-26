# 실행방법

```
# 필요시 드랍 후 재 실행
docker compose down 

# 운영(prod)
docker compose                    \
  -f docker-compose.yml           \
  -f docker-compose.prod.yml       \
up -d --build

# 개발(dev)
docker compose                    \
  -f docker-compose.yml           \
  -f docker-compose.dev.yml       \
up -d --build
```

```env
# .env 설정

# front-end
VITE_KAKAO_JAVASCRIPT_KEY=key
## delvelopmnet(개발) | product(운영)
MODE=development

# back-end
# .env
SECRET_KEY=key
KAKAO_REST_API_KEY=key
KAKAO_SECRET_KEY=key
NAVER_REST_API_KEY=key
NAVER_SECRET_KEY=key
## True(개발) | False(운영)
DEBUG=True
```