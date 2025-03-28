# db.py - Firebase資料庫連接設定檔

# 引入Firebase Admin SDK，這是用來管理Firebase服務的主要套件
import firebase_admin
# 從firebase_admin引入credentials用於驗證，firestore用於操作資料庫
from firebase_admin import credentials, firestore

# 檢查Firebase是否已經初始化，避免重複初始化
# firebase_admin._apps是一個字典，存放所有已初始化的Firebase應用實例
if not firebase_admin._apps:
    # 建立一個認證物件，使用服務帳號金鑰檔案
    # 這個JSON檔案包含了連接Firebase所需的所有認證資訊
    # 注意：這個檔案要保管好，不要外流，因為它包含了重要的存取權限
    cred = credentials.Certificate("transfer-student-platform-firebase-adminsdk-fbsvc-faca01e665.json")
    
    # 使用認證物件初始化Firebase應用
    # 這步驟會建立一個Firebase應用實例，之後所有的Firebase操作都會使用這個實例
    firebase_admin.initialize_app(cred)

# 建立並匯出Firestore資料庫的客戶端物件
# 這個物件提供了所有操作Firestore資料庫的方法
# 例如：新增文件、讀取文件、更新文件、刪除文件等
db = firestore.client()
