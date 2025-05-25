import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from accounts.models import User, UserProfile


def generate_nickname():
    # Korean adjectives and nouns
    adjectives_ko = ["멋진", "행복한", "조용한", "용감한", "귀여운", "반짝이는", "신나는", "달콤한"]
    nouns_ko = ["고양이", "토끼", "늑대", "여우", "호랑이", "곰", "용", "펭귄"]
    # English adjectives and nouns
    adjectives_en = ["Cool", "Happy", "Silent", "Brave", "Cute", "Shiny", "Excited", "Sweet"]
    nouns_en = ["Cat", "Rabbit", "Wolf", "Fox", "Tiger", "Bear", "Dragon", "Penguin"]
    # Decide language randomly
    if random.choice([True, False]):
        # Korean nickname
        nickname = f"{random.choice(adjectives_ko)}{random.choice(nouns_ko)}{random.randint(1, 99)}"
    else:
        # English nickname
        nickname = f"{random.choice(adjectives_en)}{random.choice(nouns_en)}{random.randint(1, 99)}"
    return nickname


class Command(BaseCommand):
    help = "[이름: user{i}, 이메일: user{i}@test.com]의 정보로 비밀번호와 유저의 수를 지정해 그 수만큼 유저와 프로필을 생성"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=100,
            help="생성할 유저 수 (default: 100)",
        )
        parser.add_argument(
            "--password",
            type=str,
            default="1234",
            help="비밀번호 설정 (default: 1234)",
        )
        parser.add_argument(
            "--batch_size",
            type=int,
            default=1000,
            help="몇 명씩 생성할 건지 설정 (default: 1000)",
        )

    def handle(self, *args, **options):
        User = get_user_model()
        count = options["count"]
        raw_password = options["password"]
        batch_size = options["batch_size"]

        self.stdout.write(f"{count} 명의 유저 생성중...")

        # 이미 생성된 이메일 스킵
        existing_emails = set(
            User.objects.filter(email__endswith="@test.com").values_list(
                "email",
                flat=True,
            )
        )

        hashed_password = make_password(raw_password)

        users_to_create = []
        for i in range(1, count + 1):
            email = f"user{i}@test.com"
            if email in existing_emails:
                continue
            users_to_create.append(
                User(
                    username=f"user{i}",
                    email=email,
                    password=hashed_password,
                    is_active=True,
                    is_staff=False,
                    is_superuser=False,
                    nickname=generate_nickname(),  # 랜덤 닉네임 설정
                )
            )
        total = len(users_to_create)
        self.stdout.write(f"총 {total} 명의 유저를 {batch_size}개씩 batch로 생성")

        for start in range(0, total, batch_size):
            end = min(start + batch_size, total)
            chunk = users_to_create[start:end]
            User.objects.bulk_create(chunk, batch_size=batch_size)
            self.stdout.write(f"  • {start+1}~{end} 생성 완료")
        self.stdout.write(
            self.style.SUCCESS(f"✅   {len(users_to_create)} 명의 유저 생성 완료")
        )

        # username이 user로 시작하면서 프로필이 없는 회원의 프로필 생성
        user_query = User.objects.filter(
            username__startswith="user",
            user_profile__isnull=True,
        )
        profiles = [
            UserProfile(
                user=u,
                average_income=random.randrange(
                    1_000_000,
                    5_000_001,
                    100_000,
                ),
            )
            for u in user_query
        ]
        UserProfile.objects.bulk_create(profiles, batch_size=batch_size)
        self.stdout.write(
            self.style.SUCCESS(f"✅   {len(profiles)} 명의 프로필 생성 완료")
        )
