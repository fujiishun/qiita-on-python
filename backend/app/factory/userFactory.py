import factory
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from factory.django import DjangoModelFactory
from zoneinfo import ZoneInfo
from faker import Faker

# ログインIDを生成し、20文字に制限する
def generate_login_id(n):
    login_id = f"user{n}"
    return login_id[:20]

# 表示名を生成し、20文字に制限する
def generate_display_name(instance):  # factory.LazyAttributeから呼ばれるときはインスタンスを引数として受け取る
    fake = Faker()
    name = fake.name()
    return name[:20]

class UserFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()

    login_id = factory.Sequence(generate_login_id)
    password = factory.LazyFunction(lambda: make_password('testpassword'))
    display_name = factory.LazyAttribute(generate_display_name)
    is_deleted = False
    created_at = factory.Faker('past_datetime', start_date="-30d", tzinfo=ZoneInfo('UTC'))
    updated_at = factory.Faker('past_datetime', start_date="-10d", tzinfo=ZoneInfo('UTC'))
