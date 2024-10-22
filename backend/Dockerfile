FROM python:3.12
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
RUN apt-get update && apt-get install -y netcat-openbsd
ADD requirements.txt /backend/
RUN pip install -r requirements.txt
ADD . /backend/

# デプロイ用にマイグレートとシードを自動で走らせる　※不要な場合は以下3行はコメントアウトでよい
COPY entrypoint.sh /backend/
RUN chmod +x /backend/entrypoint.sh
ENTRYPOINT ["/backend/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]