#####################################################
# db.py - Firebase資料庫連接設定檔
# 這個文件的主要功能是：
# 1. 連接到 Firebase 雲端資料庫服務
# 2. 設置必要的認證和初始化
# 3. 提供一個可以在其他文件中使用的資料庫連接實例
#####################################################

# 【套件導入區域】

# firebase_admin 是 Firebase 官方提供的管理套件
# 這個套件讓我們能夠在 Python 中使用 Firebase 的各種功能
import firebase_admin

# 從 firebase_admin 套件中導入特定的功能：
# - credentials：用於處理 Firebase 的認證憑證
# - firestore：用於操作 Firebase 的資料庫功能
# - initialize_app：用於初始化 Firebase 應用
from firebase_admin import credentials, firestore, initialize_app

# os 套件用於處理檔案路徑和環境變數
# 例如：檢查檔案是否存在、讀取環境變數等
import os

# python-dotenv 套件中的 load_dotenv 函數
# 用於從 .env 檔案中讀取環境變數設定
# .env 檔案用於存放敏感資訊，如資料庫連接字串、API金鑰等
from dotenv import load_dotenv

# 【環境設定區域】

# 嘗試載入 .env 檔案中的環境變數
# 如果載入失敗（例如：檔案不存在或格式錯誤），則拋出異常
if not load_dotenv():
    raise Exception("無法載入 .env 文件，請確認文件存在且格式正確")

# 【Firebase 初始化區域】

# 檢查 Firebase 是否已經被初始化
# firebase_admin._apps 是一個字典，用於存放所有已初始化的 Firebase 應用實例
# 如果字典為空，表示還沒有初始化過任何 Firebase 應用
if not firebase_admin._apps:
    # 從環境變數中獲取 Firebase 金鑰檔案的路徑
    # 這個金鑰檔案包含了連接 Firebase 所需的所有認證資訊
    cred_path = os.getenv("FIREBASE_KEY_PATH")
    
    # 如果沒有找到金鑰路徑，拋出錯誤
    if not cred_path:
        raise ValueError("環境變數 FIREBASE_KEY_PATH 未設置，請在 .env 檔案中設定正確的金鑰檔案路徑")
    
    # 確認金鑰檔案是否實際存在於指定路徑
    if not os.path.exists(cred_path):
        raise FileNotFoundError(f"Firebase 金鑰文件不存在於路徑：{cred_path}，請確認檔案位置是否正確")
    
    try:
        # 使用金鑰檔案建立一個認證物件
        # Certificate() 函數會讀取並驗證金鑰檔案的內容
        cred = credentials.Certificate(cred_path)
        
        # 使用認證物件初始化 Firebase 應用
        # 這個步驟會建立與 Firebase 雲端服務的連接
        firebase_admin.initialize_app(cred)
    except Exception as e:
        # 如果初始化過程中發生任何錯誤，拋出異常
        raise Exception(f"Firebase 初始化失敗，錯誤訊息：{str(e)}")

# 【資料庫客戶端建立區域】

try:
    # 建立 Firestore 資料庫的客戶端物件
    # 這個客戶端物件 (db) 可以用來進行所有的資料庫操作
    # 例如：新增資料、查詢資料、更新資料、刪除資料等
    db = firestore.client()
except Exception as e:
    # 如果建立客戶端失敗，拋出異常
    raise Exception(f"Firestore 客戶端創建失敗，錯誤訊息：{str(e)}")
