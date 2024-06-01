import pytz
from django.utils.timezone import localtime

# 日本時間に変換する処理
def utc_to_jst(datetime_obj):
    jst_timezone = pytz.timezone('Asia/Tokyo')
    return localtime(datetime_obj, timezone=jst_timezone).strftime('%Y年%m月%d日 %H:%M')
