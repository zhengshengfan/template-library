import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "实用模板库｜常用模板一页搞定",
  description: "整理职场办公、教育资料、活动方案、生活文书和表格清单，免费查看和复制使用。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
