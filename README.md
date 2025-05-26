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