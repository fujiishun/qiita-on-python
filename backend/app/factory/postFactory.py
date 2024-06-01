import factory
from django.conf import settings
from zoneinfo import ZoneInfo
from app.models import Post
from .userFactory import UserFactory

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    author = factory.SubFactory(UserFactory)
    title = factory.Sequence(lambda n: f'Test Post {n}'[:20])  # タイトルの長さを20文字に制限
    body = factory.Faker('text')
    posted_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
    re_written_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
    is_deleted = False  # デフォルトで削除されていない状態に設定
    is_draft = False  # デフォルトで公開状態に設定
    created_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
    updated_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
