前端部分由CRA改成使用Next.js開發
已經完成註冊登入，基本的一般討論區頁面和 Heder和Sidebar  
需要安裝的主要依賴包括：Next.js 15.2.4、React 19.0.0、React DOM 19.0.0、Material-UI等UI組件庫
開發依賴包括：TypeScript、ESLint等工具
可以通過在Frontend目錄下執行npm install 來安裝所有依賴

做完全站維持使用者登入狀態
還沒做登出功能

後端部分使用FastAPI開發
完成了註冊登入功能
建立了requirements.txt文件，列出所有必要的Python套件
主要依賴包括：FastAPI、Uvicorn、Python-Jose等
可以通過在api目錄下執行pip install -r requirements.txt 來安裝所有依賴

資料庫連接部分已修改完成
去firestore下載transfer-student-platform-firebase-adminsdk-(這段記得改)-key.json收進 secrets/ 資料夾 
專案結構可以長這樣：

sa/
├── api/
│   ├── main.py
│   ├── db.py
│   ├── ...
│   └── secrets/
│       └── firebase-key.json  ← 放這裡
建立 .env 檔案
在 api/ 目錄底下新增 .env 檔案，在裡面寫下：
FIREBASE_KEY_PATH=secrets/transfer-student-platform-firebase-adminsdk-這段記得改-key.json
沒拼錯單字應該就能連上資料庫了

