"use client";

import React, { useMemo, useState } from "react";
import { Download, Search, X } from "lucide-react";
import type { PosterItem } from "../../src/data/posterCatalog";
import { posterCatalog } from "../../src/data/posterCatalog";

type PosterCategory = "all" | PosterItem["category"];

const CATEGORY_LABELS: Record<PosterItem["category"], string> = {
  solar_terms: "二十四节气海报",
  festivals: "节日海报",
};

const FILTERS: { id: PosterCategory; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "solar_terms", label: "二十四节气海报" },
  { id: "festivals", label: "节日海报" },
];

export default function PosterCatalogClient({ initialCategory = "all" }: { initialCategory?: PosterCategory }) {
  const [activeCategory, setActiveCategory] = useState<PosterCategory>(initialCategory);
  const [query, setQuery] = useState("");

  const filteredPosters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posterCatalog.filter((poster) => {
      const categoryMatched = activeCategory === "all" || poster.category === activeCategory;
      const queryMatched =
        !normalizedQuery ||
        poster.title.toLowerCase().includes(normalizedQuery) ||
        poster.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return categoryMatched && queryMatched;
    });
  }, [activeCategory, query]);

  const solarCount = posterCatalog.filter((poster) => poster.category === "solar_terms").length;
  const festivalCount = posterCatalog.filter((poster) => poster.category === "festivals").length;

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-6 md:px-8">
      <section className="rounded-[34px] bg-white p-7 md:p-12 lg:p-14">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-[#666]">共 {posterCatalog.length} 张</span>
          <span className="rounded-full bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-[#666]">节气 {solarCount} 张</span>
          <span className="rounded-full bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-[#666]">节日 {festivalCount} 张</span>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <a href="/" className="text-[14px] font-medium text-[#777] transition hover:text-[#111]">
              实用模板库 / 海报素材
            </a>
            <h1 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-0.055em] text-[#111] md:text-[72px]">海报素材</h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#666]">节气节日海报，下载后可直接使用。适合公众号、小红书、朋友圈、学校活动和企业宣传。</p>
          </div>

          <div>
            <div className="flex items-center rounded-full bg-[#f5f5f5] p-2">
              <Search className="ml-5 h-5 w-5 text-[#999]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索立春、处暑、春节、教师节..."
                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none md:px-4"
              />
              {query ? (
                <button onClick={() => setQuery("")} className="mr-2 rounded-full p-2 text-[#777] transition hover:bg-white hover:text-[#111]" aria-label="清空搜索">
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[34px] bg-[#f5f5f5] p-5 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`rounded-full px-4 py-2.5 text-[14px] transition ${activeCategory === filter.id ? "bg-[#111] text-white" : "bg-white text-[#666] hover:text-[#111]"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="text-[14px] text-[#777]">当前显示 {filteredPosters.length} 张</div>
        </div>

        {filteredPosters.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosters.map((poster) => (
              <PosterCard key={poster.id} poster={poster} />
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] bg-white p-10 text-center">
            <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-[#111]">没有找到相关海报</h2>
            <p className="mt-3 text-[15px] text-[#777]">换个标题或标签关键词试试。</p>
          </div>
        )}
      </section>
    </main>
  );
}

function PosterCard({ poster }: { poster: PosterItem }) {
  const previewUrl = `/poster-assets/${poster.preview}`;
  const hasDownload = Boolean(poster.downloadUrl);

  return (
    <article className="overflow-hidden rounded-[30px] bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
      <div className="bg-[#eee]">
        <img src={previewUrl} alt={`${poster.title}海报预览`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="text-[13px] font-medium text-[#777]">{CATEGORY_LABELS[poster.category]}</div>
        <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#111]">{poster.title}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {poster.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-[12px] text-[#666]">
              {tag}
            </span>
          ))}
        </div>
        {hasDownload ? (
          <a href={poster.downloadUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#111] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-[#333]">
            <Download className="mr-2 h-4 w-4" />
            下载原图
          </a>
        ) : (
          <button disabled className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#eee] px-5 py-3 text-[14px] font-medium text-[#999]">
            下载链接整理中
          </button>
        )}
      </div>
    </article>
  );
}
