# routes/login.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
import bcrypt

router = APIRouter()

# 登入請求格式
class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginRequest):
    student_id = data.email.split("@")[0]
    doc_ref = db.collection("users").document(student_id)
    doc = doc_ref.get()

    # 檢查帳號是否存在（代表已完成信箱驗證）
    if not doc.exists:
        raise HTTPException(status_code=404, detail="帳號不存在或尚未完成驗證")

    user_data = doc.to_dict()

    # 驗證密碼（用 bcrypt 的 checkpw）
    if not bcrypt.checkpw(data.password.encode(), user_data["password"].encode()):
        raise HTTPException(status_code=401, detail="密碼錯誤")

    return {"message": "登入成功"}
