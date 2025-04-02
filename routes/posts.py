from fastapi import APIRouter
from fastapi import HTTPException
from firebase_admin import firestore
from pydantic import BaseModel

# Firebase 初始化
db = firestore.client()

# 定義 Post 模型（與資料庫結構相對應）
class Post(BaseModel):
    user_id: str
    title: str
    content: str

# 定義路由器
post_router = APIRouter()

# 創建新文章的 API 路由
@post_router.post("/posts")
async def create_post(post: Post):
    try:
        # db.collection("post").add(...) 返回的是一個 tuple，應該取第一個元素，即 DocumentReference
        result = db.collection("post").add({
            "user_id": post.user_id,
            "title": post.title,
            "content": post.content,
            "timestamp": firestore.SERVER_TIMESTAMP,
            "comments_count": 0  # 初始設為 0
        })
        
        print("Add結果：", result)  # 打印返回結果檢查

        # 如果返回的是正確的 DocumentReference，應該可以獲得 post_ref.id
        post_ref = result[0]  # 取 tuple 的第一個元素（DocumentReference）
        print(f"文章創建成功, post_id: {post_ref.id}")  # 打印 post_id
        return {"post_id": post_ref.id}
    except Exception as e:
        print(f"錯誤: {str(e)}")  # 打印錯誤訊息
        raise HTTPException(status_code=500, detail=f"Error creating post: {str(e)}")

# 獲取所有文章的 API 路由
@post_router.get("/posts")
async def get_posts():
    posts_ref = db.collection("post").stream()
    posts = [{
        "post_id": post.id,
        "user_id": post.get("user_id"),
        "title": post.get("title"),
        "content": post.get("content"),
        "timestamp": post.get("timestamp"),
        "comments_count": post.get("comments_count")
    } for post in posts_ref]
    return posts

