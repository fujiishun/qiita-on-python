import factory
from django.conf import settings
from zoneinfo import ZoneInfo
from app.models import Comment
from .userFactory import UserFactory
from .postFactory import PostFactory

class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    commenter = factory.SubFactory(UserFactory)
    post = factory.SubFactory(PostFactory)
    body = factory.Faker('text', max_nb_chars=200)
    commented_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
    is_deleted = False
    created_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
    updated_at = factory.Faker('date_time', tzinfo=ZoneInfo(settings.TIME_ZONE))
