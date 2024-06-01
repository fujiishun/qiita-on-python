from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, login_id, password=None, **extra_fields):
        if not login_id:
            raise ValueError('Users must have a login ID')
        user = self.model(login_id=login_id, **extra_fields)
        user.set_password(password)  # パスワードをハッシュ化して保存
        user.save(using=self._db)
        return user

    def create_superuser(self, login_id, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(login_id, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    login_id = models.CharField(max_length=20, unique=True)
    display_name = models.CharField(max_length=20)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'login_id'
    REQUIRED_FIELDS = ['display_name']  # パスワード以外で必須のフィールド

    def __str__(self):
        return self.login_id


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField()
    posted_at = models.DateTimeField(blank=True, null=True)
    re_written_at = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    is_draft = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    commented_at = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
