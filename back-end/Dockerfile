# # Dockerfile

# # Python 기반 이미지 사용
# FROM python:3.9

# # 작업 디렉토리 설정
# WORKDIR /app

# # 필요한 파일 복사
# COPY ./requirements.txt ./
# RUN pip install --upgrade pip && pip install -r requirements.txt

# # 프로젝트 소스 복사
# COPY . .

# # 환경 변수 설정 (timezone 문제 예방)
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # 기본 실행 명령어 (개발용)
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# back-end/Dockerfile

# 1) 베이스 이미지
FROM python:3.9

# 2) 작업 디렉터리 설정
WORKDIR /app

# 3) 의존성 정의 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# 4) 소스 복사
COPY . .

# 5) (선택) static 파일 수집, 마이그레이트 등 사전 작업
# RUN python manage.py collectstatic --noinput
RUN python manage.py makemigrations
RUN python manage.py migrate

# 6) 개발용 서버 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
