'use client'; // 設為 Client Component，確保可以使用交互

import React from 'react';
import Header from '../Header'; // 確保 Header 路徑正確
import Sidebar from '../Sidebar'; // 確保 Sidebar 路徑正確
import './styles.css'; // 確保樣式檔案路徑正確

/**
 * Layout 組件 - 網站主要佈局
 * 
 * 功能：
 * 1. 包含 Header、Sidebar 和主要內容區域
 * 2. 提供頁面內容的容器
 * 
 * @component
 */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-main">
        <Sidebar />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
