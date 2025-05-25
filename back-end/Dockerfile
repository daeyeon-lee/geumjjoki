# 1) Python 3.9 이미지 사용
FROM python:3.9

# 2) 작업 디렉터리 설정
WORKDIR /app

# 3) 시스템 패키지 설치 (MySQL client 등)
RUN apt-get update \
 && apt-get install -y --no-install-recommends default-libmysqlclient-dev build-essential \
 && rm -rf /var/lib/apt/lists/*

# 4) Python 의존성 복사 및 설치
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# 5) 소스 복사
COPY . .

# 6) 환경변수 로딩 (python-dotenv 설치 필요)
#    이미 settings.py 에서 load_dotenv() 하고 있으면 자동으로 .env 반영됨

# 7) 컨테이너 시작 명령
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
