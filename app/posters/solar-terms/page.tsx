import type { Metadata } from "next";
import PosterCatalogClient from "../PosterCatalogClient";

export const metadata: Metadata = {
  title: "二十四节气海报免费下载 - 实用模板库",
  description: "浏览立春、清明、处暑、立秋等二十四节气海报素材，竖屏满屏设计，适合活动宣传、公众号和朋友圈使用。",
};

export default function SolarTermsPostersPage() {
  return <PosterCatalogClient initialCategory="solar_terms" />;
}
