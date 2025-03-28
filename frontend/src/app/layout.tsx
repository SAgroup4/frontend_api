'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // 只回傳內容，不寫 html / body
}
