from fastapi import APIRouter
from firebase_admin import firestore
from models import Comment

comment_router = APIRouter()

# Firebase 初始化
db = firestore.client()

@comment_router.post("/comments")
async def create_comment(comment: Comment):
    comment_ref = db.collection("comments").add({
        "post_id": comment.post_id,
        "user_id": comment.user_id,
        "content": comment.content,
        "timestamp": firestore.SERVER_TIMESTAMP
    })

    # 更新文章的留言數量
    post_ref = db.collection("posts").document(comment.post_id)
    post_ref.update({
        "comments_count": firestore.Increment(1)
    })

    return {"message": "Comment added successfully", "comment_id": comment_ref.id}

@comment_router.get("/comments/{post_id}")
async def get_comments(post_id: str):
    comments_ref = db.collection("comments").where("post_id", "==", post_id).stream()
    comments = [{"comment_id": comment.id,
                 "user_id": comment.get("user_id"),
                 "content": comment.get("content"),
                 "timestamp": comment.get("timestamp")} for comment in comments_ref]
    return comments
