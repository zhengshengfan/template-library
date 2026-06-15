import type { Metadata } from "next";
import PosterCatalogClient from "./PosterCatalogClient";

export const metadata: Metadata = {
  title: "海报素材免费下载 - 节气节日宣传海报模板",
  description: "实用模板库提供二十四节气、传统节日、常用活动宣传海报素材，竖屏满屏设计，适合公众号、小红书、朋友圈、学校活动和企业宣传使用。",
};

export default function PostersPage() {
  return <PosterCatalogClient />;
}
