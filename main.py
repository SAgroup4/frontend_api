# main.py - FastAPI後端服務的主要入口點

# 引入FastAPI框架，這是一個現代、快速的Web框架，用於建立API
from fastapi import FastAPI
# 引入CORS中間件，用於處理跨域資源共享
from fastapi.middleware.cors import CORSMiddleware
# 引入註冊和驗證相關的路由模組
from routes import register  # 處理使用者註冊的路由
from routes import verify    # 處理郵件驗證的路由
from routes import login 

#引入發布與留言的路由
from routes import posts   # 從 posts.py 引入文章的路由
from routes import comments  # 從 comments.py 引入留言的路由

# 創建FastAPI應用實例
app = FastAPI()

# 設定CORS（跨域資源共享）
# 這是一個安全機制，用於控制不同網域的網頁能否存取API
app.add_middleware(
    CORSMiddleware,
    # 允許的來源網域，["*"]表示允許所有來源
    # 在實際產品環境中，應該限制為特定的前端網域
    allow_origins=["*"],
    # 允許攜帶認證資訊（如cookies）
    allow_credentials=True,
    # 允許的HTTP方法，["*"]表示允許所有方法（GET、POST等）
    allow_methods=["*"],
    # 允許的HTTP標頭，["*"]表示允許所有標頭
    allow_headers=["*"],
)

# 註冊路由模組
# 這些路由模組包含了處理不同API端點的邏輯
app.include_router(register.router)  # 加入註冊相關的路由
app.include_router(verify.router)    # 加入驗證相關的路由
app.include_router(login.router)
app.include_router(posts.post_router)     # 加入發文的路由
app.include_router(comments.comment_router)  # 加入留言的路由

#確認FFastAPI有連上
@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}

@app.get("/posts")
def get_posts():
    # 假資料
    posts = [
        {"title": "First Post", "content": "This is the first post."},
        {"title": "Second Post", "content": "This is the second post."},
    ]
    return posts