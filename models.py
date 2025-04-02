# models.py 定義資料結構(post、comments)

from pydantic import BaseModel

class Post(BaseModel):
    user_id: str
    title: str
    content: str

class Comment(BaseModel):
    post_id: str
    user_id: str
    content: str
