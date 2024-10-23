#!/bin/sh
# データベースが起動するのを待つ
echo "Waiting for database..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 1
done
echo "Database is up - executing command"
# マイグレーションを実行
python manage.py migrate
# シードデータをロード（以下必要に応じてコメントアウトを外す）
# python manage.py loaddata seed_data.json
# サーバーを起動
exec "$@"