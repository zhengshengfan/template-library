import type { Metadata } from "next";
import PosterCatalogClient from "../PosterCatalogClient";

export const metadata: Metadata = {
  title: "节日海报免费下载 - 实用模板库",
  description: "浏览春节、中秋节、教师节等节日宣传海报素材，适合学校活动、企业宣传、公众号、小红书和朋友圈使用。",
};

export default function FestivalPostersPage() {
  return <PosterCatalogClient initialCategory="festivals" />;
}
