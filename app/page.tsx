// @ts-nocheck
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  Copy,
  Download,
  FileText,
  GraduationCap,
  Home,
  Link,
  Search,
  ShieldCheck,
  Star,
  Table2,
  UserRound,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const CATEGORY_CONFIG = [
  { id: "work", name: "职场办公", icon: Briefcase, desc: "辞职信、总结、周报、述职、会议纪要等常用办公文档。" },
  { id: "education", name: "教育资料", icon: GraduationCap, desc: "教学设计、说课稿、家长会发言稿、班主任评语等。" },
  { id: "event", name: "活动方案", icon: CalendarDays, desc: "活动策划、会议流程、主持词、物料清单、复盘模板。" },
  { id: "life", name: "生活文书", icon: Home, desc: "申请书、情况说明、投诉信、委托书等生活常用文书。" },
  { id: "sheet", name: "表格清单", icon: Table2, desc: "计划表、记账表、搬家清单、旅行清单等实用表格。" },
];

type TemplateSeedItem = [string, string, string, string[]];

const TEMPLATE_SEED: TemplateSeedItem[] = [
  ["标准辞职信模板", "职场办公", "高频使用", ["称呼", "离职原因", "离职时间", "工作交接", "署名日期"]],
  ["转正申请模板", "职场办公", "办公常用", ["称呼", "试用回顾", "工作成果", "不足改进", "转正申请"]],
  ["请假条模板", "职场办公", "简单实用", ["称呼", "请假原因", "请假时间", "工作安排", "署名日期"]],
  ["工作总结模板", "职场办公", "办公常用", ["工作概述", "重点成果", "问题不足", "改进措施", "下步计划"]],
  ["周报模板", "职场办公", "高频使用", ["本周完成", "重点进展", "问题风险", "下周计划", "需要支持"]],
  ["月报模板", "职场办公", "办公常用", ["月度目标", "完成情况", "关键数据", "问题分析", "下月计划"]],
  ["述职报告模板", "职场办公", "正式汇报", ["岗位职责", "工作成果", "能力提升", "不足反思", "未来规划"]],
  ["会议纪要模板", "职场办公", "办公常用", ["会议信息", "参会人员", "会议议题", "决议事项", "待办跟进"]],
  ["教学设计模板", "教育资料", "教师常用", ["课题", "教学目标", "教学重难点", "教学过程", "教学反思"]],
  ["说课稿模板", "教育资料", "比赛常用", ["说教材", "说学情", "说目标", "说教法", "说过程"]],
  ["公开课逐字稿模板", "教育资料", "公开课", ["导入语", "过渡语", "提问语", "评价语", "小结语"]],
  ["班主任评语模板", "教育资料", "期末常用", ["整体评价", "优点表现", "成长变化", "改进建议", "鼓励期待"]],
  ["家长会发言稿模板", "教育资料", "场景明确", ["开场问候", "班级情况", "学生表现", "家校建议", "结束感谢"]],
  ["少先队活动方案模板", "教育资料", "校园活动", ["活动主题", "活动目标", "活动准备", "活动流程", "活动延伸"]],
  ["读书节主持词模板", "教育资料", "校园活动", ["开场白", "活动介绍", "节目串词", "颁奖环节", "结束语"]],
  ["听课记录模板", "教育资料", "教研常用", ["课程信息", "教学过程", "课堂观察", "亮点记录", "改进建议"]],
  ["活动策划方案模板", "活动方案", "可套用", ["活动背景", "活动主题", "时间地点", "流程安排", "人员分工"]],
  ["会议流程模板", "活动方案", "正式场景", ["会议主题", "时间地点", "参会人员", "会议议程", "会议要求"]],
  ["颁奖典礼主持词模板", "活动方案", "活动常用", ["开场白", "嘉宾介绍", "奖项介绍", "颁奖串词", "结束语"]],
  ["团建活动方案模板", "活动方案", "团队活动", ["活动目的", "活动时间", "活动地点", "活动流程", "预算安排"]],
  ["物料清单模板", "活动方案", "执行必备", ["基础物料", "视觉物料", "签到物料", "备用物料", "负责人"]],
  ["活动复盘模板", "活动方案", "复盘工具", ["活动概况", "数据结果", "亮点总结", "问题不足", "改进建议"]],
  ["申请书模板", "生活文书", "通用文书", ["标题", "称呼", "申请事项", "申请理由", "署名日期"]],
  ["情况说明模板", "生活文书", "通用文书", ["标题", "说明对象", "事实经过", "原因说明", "落款日期"]],
  ["投诉信模板", "生活文书", "维权常用", ["投诉对象", "问题经过", "证据说明", "投诉诉求", "联系方式"]],
  ["委托书模板", "生活文书", "正式文书", ["委托人", "受托人", "委托事项", "权限范围", "有效期限"]],
  ["每日计划表模板", "表格清单", "效率工具", ["日期", "今日目标", "时间安排", "待办事项", "复盘总结"]],
  ["家庭记账表模板", "表格清单", "生活管理", ["月份", "收入", "固定支出", "变动支出", "本月结余"]],
  ["搬家清单模板", "表格清单", "生活清单", ["证件文件", "贵重物品", "生活用品", "搬前检查", "搬后确认"]],
  ["旅行清单模板", "表格清单", "出行必备", ["证件票据", "电子设备", "衣物洗护", "药品用品", "出行确认"]],
];

const HOT_KEYWORDS = ["辞职信", "工作总结", "教学设计", "家长会", "主持词", "活动策划", "情况说明", "搬家清单"];
const CATEGORY_NAMES = CATEGORY_CONFIG.map((item) => item.name);
const CATEGORY_SLUGS = {
  职场办公: "work",
  教育资料: "education",
  活动方案: "event",
  生活文书: "life",
  表格清单: "sheet",
};

function toTemplateSlug(title) {
  return title.replace("模板", "").replace(/\s+/g, "-").toLowerCase();
}

function getTemplatePath(item) {
  return `/templates/${item.id}-${encodeURIComponent(item.slug)}`;
}

function getCategoryPath(name) {
  return `/categories/${CATEGORY_SLUGS[name] || encodeURIComponent(name)}`;
}

function buildContent(title, format) {
  return `${title}\n\n适用场景：\n适合需要快速准备「${title.replace("模板", "")}」的场景。\n\n标准格式：\n${format.map((item, index) => `${index + 1}. ${item}：______`).join("\n")}\n\n正文示例：\n尊敬的______：\n\n您好！\n\n因______原因，现就______事项进行说明/申请/汇报。主要内容如下：\n\n一、基本情况\n______\n\n二、具体内容\n______\n\n三、后续安排\n______\n\n特此说明。\n\n署名：______\n日期：____年__月__日`;
}

const templates = TEMPLATE_SEED.map(([title, category, tag, format], index) => ({
  id: index + 1,
  slug: toTemplateSlug(title),
  title,
  category,
  tag,
  format,
  scenario: `适合${category}中需要快速准备「${title.replace("模板", "")}」的场景，打开即可查看标准结构并复制修改。`,
  content: buildContent(title, format),
  note: "使用时请根据真实情况补充具体信息，避免直接提交未修改的占位内容。",
}));

function Pill({ children, tone = "gray" }) {
  const styles =
    tone === "green"
      ? "bg-[#eaf7ef] text-[#16833a]"
      : tone === "yellow"
      ? "bg-[#fff3d6] text-[#9a6a00]"
      : "bg-[#f5f5f5] text-[#666]";
  return <span className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${styles}`}>{children}</span>;
}

function SectionTitle({ title, desc, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 px-1 md:flex-row md:items-end">
      <div>
        <h2 className="text-[30px] font-semibold tracking-[-0.04em] text-[#111] md:text-[42px]">{title}</h2>
        {desc ? <p className="mt-2 text-[15px] text-[#777]">{desc}</p> : null}
      </div>
      {action}
    </div>
  );
}

function TemplateCard({ item, onOpen, favorite = false }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group flex min-h-[230px] flex-col rounded-[30px] bg-white p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="mb-7 flex flex-wrap items-center gap-2">
        {favorite ? <Pill tone="yellow">已收藏</Pill> : null}
        <Pill>{item.category}</Pill>
        <Pill tone="green">免费</Pill>
      </div>
      <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#111]">{item.title}</h3>
      <p className="mt-4 line-clamp-3 text-[14px] leading-7 text-[#777]">{item.scenario}</p>
      <div className="mt-auto flex items-center pt-7 text-[14px] font-medium text-[#111]">
        查看模板 <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
}

function CategoryCard({ category, onSelect }) {
  const Icon = category.icon;
  return (
    <button
      onClick={() => onSelect(category.name)}
      className="group min-h-[210px] rounded-[28px] bg-white p-7 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f5] text-[#111] transition group-hover:bg-[#111] group-hover:text-white">
        <Icon size={23} strokeWidth={1.8} />
      </div>
      <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-[#111]">{category.name}</h3>
      <p className="mt-3 text-[14px] leading-7 text-[#777]">{category.desc}</p>
    </button>
  );
}

function InfoBox({ title, lines, dark = false }) {
  return (
    <div className={`${dark ? "bg-[#111] text-white" : "bg-white text-[#111]"} rounded-[36px] p-6 md:p-8`}>
      <h3 className="text-[22px] font-semibold">{title}</h3>
      <div className={`mt-4 space-y-3 text-[14px] leading-7 ${dark ? "text-white/70" : "text-[#666]"}`}>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function Modal({ icon, title, children, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-5 backdrop-blur-sm">
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[520px] rounded-[32px] bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.24)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f5] text-[#111]">{icon}</div>
          <button onClick={onClose} className="rounded-full bg-[#f5f5f5] p-2 text-[#666] transition hover:bg-[#eee] hover:text-[#111]">
            <X size={18} />
          </button>
        </div>
        <h2 className="mt-6 text-[30px] font-semibold tracking-[-0.04em] text-[#111]">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Header({ simple, openHome, openLogin }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.04] bg-white/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between px-5 md:px-8">
        <button onClick={() => openHome()} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111] text-white">
            <FileText size={18} strokeWidth={1.8} />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[17px] font-semibold tracking-[-0.02em]">实用模板库</div>
            <span className="hidden rounded-full bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-medium text-[#777] md:inline-flex">测试版</span>
          </div>
        </button>

        {simple ? (
          <div className="flex items-center gap-3">
            <button onClick={openLogin} className="inline-flex rounded-full bg-[#f5f5f5] px-4 py-2.5 text-[14px] font-medium text-[#111] transition hover:bg-[#eee] md:px-5">
              登录
            </button>
            <button onClick={() => openHome("categories")} className="rounded-full bg-[#111] px-5 py-2.5 text-[14px] font-medium text-white">
              返回首页
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-7">
            <nav className="hidden items-center gap-9 text-[14px] text-[#555] md:flex">
              <a href="#categories">模板分类</a>
              <a href="#popular">热门模板</a>
              <a href="#download">下载专区</a>
              <a href="#membership">免费使用</a>
            </nav>
            <button onClick={openLogin} className="inline-flex items-center rounded-full bg-[#111] px-4 py-2 text-[13px] font-medium text-white">
              <UserRound className="mr-1.5 h-4 w-4" /> 登录
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selected, setSelected] = useState(null);
  const [categoryPage, setCategoryPage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", category: "", desc: "" });
  const [requestError, setRequestError] = useState("");
  const [requestHistory, setRequestHistory] = useState([]);
  const [infoOpen, setInfoOpen] = useState(null);
  const [toast, setToast] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [recentViews, setRecentViews] = useState([]);

  useEffect(() => {
    try {
      const savedFavorites = window.localStorage.getItem("template_favorites");
      const savedRecent = window.localStorage.getItem("template_recent_views");
      const savedRequests = window.localStorage.getItem("template_requests");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedRecent) setRecentViews(JSON.parse(savedRecent));
      if (savedRequests) setRequestHistory(JSON.parse(savedRequests));
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("template_favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      window.localStorage.setItem("template_recent_views", JSON.stringify(recentViews));
    } catch {}
  }, [recentViews]);

  useEffect(() => {
    try {
      window.localStorage.setItem("template_requests", JSON.stringify(requestHistory));
    } catch {}
  }, [requestHistory]);

  useEffect(() => {
    setCopied(false);
  }, [selected?.id]);

  useEffect(() => {
    const pageTitle = selected ? `${selected.title}｜实用模板库` : categoryPage ? `${categoryPage}模板｜实用模板库` : "实用模板库｜常用模板一页搞定";
    try {
      document.title = pageTitle;
    } catch {}
  }, [selected, categoryPage]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      setLoginOpen(false);
      setInfoOpen(null);
      resetRequest();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return templates.filter((item) => {
      const inCategory = activeCategory === "全部" || item.category === activeCategory;
      const text = `${item.title} ${item.category} ${item.tag} ${item.scenario} ${item.format.join(" ")}`.toLowerCase();
      return inCategory && (!keyword || text.includes(keyword));
    });
  }, [query, activeCategory]);

  const favoriteTemplates = useMemo(() => templates.filter((item) => favorites.includes(item.id)), [favorites]);
  const recentTemplates = useMemo(() => recentViews.map((id) => templates.find((item) => item.id === id)).filter(Boolean), [recentViews]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const resetRequest = () => {
    setRequestOpen(false);
    setRequestSent(false);
    setRequestForm({ name: "", category: "", desc: "" });
    setRequestError("");
  };

  const openHome = (anchor = "top") => {
    setSelected(null);
    setCategoryPage(null);
    setActiveCategory("全部");
    setTimeout(() => {
      const target = anchor === "categories" ? document.getElementById("categories") : null;
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const openCategoryPage = (name) => {
    setSelected(null);
    setCategoryPage(name);
    setActiveCategory(name);
    setQuery("");
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const copyTemplate = async () => {
    if (!selected) return;
    await copyText(selected.content);
    setCopied(true);
    showToast("正文已复制");
    setTimeout(() => setCopied(false), 1400);
  };

  const copyTemplateLink = async (item) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await copyText(`${origin}${getTemplatePath(item)}`);
    showToast("模板链接已复制");
  };

  const copyCategoryLink = async (name) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await copyText(`${origin}${getCategoryPath(name)}`);
    showToast("分类链接已复制");
  };

  const submitRequest = () => {
    if (!requestForm.name.trim()) return setRequestError("请先填写模板名称");
    if (!requestForm.category) return setRequestError("请选择模板分类");
    if (!requestForm.desc.trim()) return setRequestError("请简单描述一下使用场景");

    setRequestHistory((current) => [{ ...requestForm, createdAt: new Date().toISOString() }, ...current].slice(0, 20));
    setRequestSent(true);
    showToast("需求已记录");
  };

  const setRequestField = (field, value) => {
    setRequestForm((current) => ({ ...current, [field]: value }));
    setRequestError("");
  };

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const exists = current.includes(id);
      showToast(exists ? "已取消收藏" : "已加入收藏");
      return exists ? current.filter((item) => item !== id) : [...current, id];
    });
  };

  const openTemplate = (item) => {
    setSelected(item);
    setRecentViews((current) => [item.id, ...current.filter((id) => id !== item.id)].slice(0, 6));
  };

  const clearLocalData = () => {
    setFavorites([]);
    setRecentViews([]);
    setRequestHistory([]);
    showToast("本地记录已清空");
    try {
      window.localStorage.removeItem("template_favorites");
      window.localStorage.removeItem("template_recent_views");
      window.localStorage.removeItem("template_requests");
    } catch {}
  };

  const pageProps = {
    openHome,
    openCategoryPage,
    setSelected: openTemplate,
    setRequestOpen,
    setInfoOpen,
    favorites,
    toggleFavorite,
    copied,
    copyTemplate,
    copyTemplateLink,
    copyCategoryLink,
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111]">
      <Header simple={Boolean(selected || categoryPage)} openHome={openHome} openLogin={() => setLoginOpen(true)} />

      {selected ? (
        <DetailPage item={selected} related={templates.filter((item) => item.category === selected.category && item.id !== selected.id).slice(0, 4)} {...pageProps} />
      ) : categoryPage ? (
        <CategoryPage name={categoryPage} {...pageProps} />
      ) : (
        <HomePage
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filtered={filtered}
          favoriteTemplates={favoriteTemplates}
          recentTemplates={recentTemplates}
          {...pageProps}
        />
      )}

      {loginOpen ? (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          favoriteCount={favorites.length}
          recentCount={recentViews.length}
          requestCount={requestHistory.length}
          clearLocalData={clearLocalData}
        />
      ) : null}

      {requestOpen ? (
        <RequestModal
          form={requestForm}
          error={requestError}
          sent={requestSent}
          setField={setRequestField}
          submit={submitRequest}
          close={resetRequest}
        />
      ) : null}

      {infoOpen ? <InfoModal type={infoOpen} close={() => setInfoOpen(null)} /> : null}
      {toast ? <Toast message={toast} /> : null}
    </div>
  );
}

function HomePage({ query, setQuery, activeCategory, setActiveCategory, filtered, favoriteTemplates, recentTemplates, openCategoryPage, setSelected, setRequestOpen, setInfoOpen }) {
  const scrollToResults = () => document.getElementById("popular")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <>
      <main>
        <Hero query={query} setQuery={setQuery} scrollToResults={scrollToResults} />

        <section id="categories" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-8 md:px-8">
          <SectionTitle title="模板分类" desc="从高频场景开始，先做小而实用的模板库。" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {CATEGORY_CONFIG.map((item) => (
              <CategoryCard key={item.id} category={item} onSelect={openCategoryPage} />
            ))}
          </div>
        </section>

        {favoriteTemplates.length > 0 ? <TemplateRail title="我的收藏" desc="你刚刚收藏的模板会显示在这里，后续登录后可同步保存到账号。" items={favoriteTemplates} onOpen={setSelected} favorite /> : null}
        {recentTemplates.length > 0 ? <TemplateRail title="最近查看" desc="你最近打开过的模板会显示在这里，方便快速继续使用。" items={recentTemplates} onOpen={setSelected} /> : null}

        <TemplateRail title="最新更新" desc="近期整理的常用模板，适合快速查看和复制使用。" items={templates.slice(0, 6)} onOpen={setSelected} />
        <TemplateResults query={query} setQuery={setQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filtered={filtered} setSelected={setSelected} setRequestOpen={setRequestOpen} />
        <DownloadSection />
        <UsageSection />
        <AboutSection setRequestOpen={setRequestOpen} />
      </main>
      <Footer setInfoOpen={setInfoOpen} />
    </>
  );
}

function Hero({ query, setQuery, scrollToResults }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 pb-8 pt-6 md:px-8">
      <div className="relative overflow-hidden rounded-[36px] bg-white px-6 py-16 md:px-12 md:py-24 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full bg-[#f5f5f5] px-4 py-2 text-[14px] font-medium text-[#777]">全站免费开放 · 打开即用 · 持续更新</div>
          <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.055em] md:text-[76px] lg:text-[88px]">
            常用模板<span className="block">一页搞定</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-8 text-[#666] md:text-[19px]">整理职场办公、教育资料、活动方案、生活文书和表格清单。所有模板均可免费查看和复制。</p>

          <div className="mx-auto mt-11 flex max-w-2xl items-center rounded-full bg-[#f5f5f5] p-2">
            <Search className="ml-5 h-5 w-5 text-[#999]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scrollToResults()}
              placeholder="搜索模板"
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none md:px-4"
            />
            {query ? (
              <button onClick={() => setQuery("")} className="mr-2 rounded-full px-3 py-2 text-[13px] text-[#777]">
                清空
              </button>
            ) : null}
            <button onClick={scrollToResults} className="rounded-full bg-[#111] px-5 py-3 text-[14px] text-white md:px-7">
              搜索
            </button>
          </div>

          <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2">
            {HOT_KEYWORDS.map((word) => (
              <button
                key={word}
                onClick={() => {
                  setQuery(word);
                  setTimeout(scrollToResults, 0);
                }}
                className="rounded-full bg-[#f5f5f5] px-4 py-2 text-[13px] font-medium text-[#666] transition hover:bg-[#eee] hover:text-[#111]"
              >
                {word}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3">
            {[
              [30, "常用模板"],
              [5, "实用分类"],
              ["免费", "复制使用"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-[24px] bg-[#f5f5f5] px-4 py-5 text-center">
                <div className="text-[26px] font-semibold tracking-[-0.04em] text-[#111]">{number}</div>
                <div className="mt-1 text-[13px] text-[#777]">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TemplateRail({ title, desc, items, onOpen, favorite = false }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 py-8 md:px-8">
      <SectionTitle title={title} desc={desc} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TemplateCard key={item.id} item={item} onOpen={onOpen} favorite={favorite} />
        ))}
      </div>
    </section>
  );
}

function TemplateResults({ query, setQuery, activeCategory, setActiveCategory, filtered, setSelected, setRequestOpen }) {
  return (
    <section id="popular" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-10 md:px-8">
      <SectionTitle
        title={activeCategory === "全部" ? "热门模板" : activeCategory}
        desc={query ? `已为你找到 ${filtered.length} 个相关模板，关键词：${query}` : "每个模板都按统一标准整理，减少查找和修改成本。"}
        action={
          query ? (
            <button onClick={() => setQuery("")} className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#111] transition hover:bg-[#eee]">
              显示全部
            </button>
          ) : null
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {["全部", ...CATEGORY_NAMES].map((name) => (
          <button key={name} onClick={() => setActiveCategory(name)} className={`rounded-full px-4 py-2.5 text-[14px] ${activeCategory === name ? "bg-[#111] text-white" : "bg-white text-[#666]"}`}>
            {name}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item) => (
            <TemplateCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      ) : (
        <EmptyResults setQuery={setQuery} setRequestOpen={setRequestOpen} />
      )}
    </section>
  );
}

function EmptyResults({ setQuery, setRequestOpen }) {
  return (
    <div className="rounded-[32px] bg-white p-10 text-center">
      <FileText className="mx-auto h-10 w-10 text-[#aaa]" strokeWidth={1.8} />
      <h3 className="mt-5 text-[24px] font-semibold tracking-[-0.04em] text-[#111]">没有找到相关模板</h3>
      <p className="mt-3 text-[15px] leading-7 text-[#777]">换个关键词试试，或者提交模板需求，我们后续整理。</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button onClick={() => setQuery("")} className="rounded-full bg-[#111] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-[#333]">
          显示全部模板
        </button>
        <button onClick={() => setRequestOpen(true)} className="rounded-full bg-[#f5f5f5] px-5 py-3 text-[14px] font-medium text-[#111] transition hover:bg-[#eee]">
          提交模板需求
        </button>
      </div>
    </div>
  );
}

function DetailPage({ item, related, openHome, openCategoryPage, setSelected, favorites, toggleFavorite, copied, copyTemplate, copyTemplateLink }) {
  const isFavorite = favorites.includes(item.id);

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-6 md:px-8">
      <div className="mb-4 flex flex-wrap gap-2 px-1 text-[13px] text-[#777]">
        <button onClick={() => openHome("categories")}>首页</button>
        <span>/</span>
        <button onClick={() => openCategoryPage(item.category)}>{item.category}</button>
        <span>/</span>
        <span className="text-[#111]">{item.title}</span>
      </div>

      <section className="rounded-[36px] bg-white p-7 md:p-12 lg:p-14">
        <div className="flex flex-wrap gap-2">
          <Pill>{item.category}</Pill>
          <Pill tone="green">免费</Pill>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="text-[42px] font-semibold leading-tight tracking-[-0.055em] md:text-[64px]">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#666]">{item.scenario}</p>
          </div>
          <div className="rounded-[30px] bg-[#f5f5f5] p-6">
            <h2 className="text-[20px] font-semibold">标准格式</h2>
            <ul className="mt-5 grid gap-3 text-[14px] text-[#666]">
              {item.format.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="h-4 w-4 text-[#111]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[36px] bg-white p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[26px] font-semibold">可复制模板</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-[14px] transition ${isFavorite ? "bg-[#fff3d6] text-[#9a6a00]" : "bg-[#f5f5f5] text-[#111] hover:bg-[#eee]"}`}
              >
                <Star className="mr-2 h-4 w-4" />
                {isFavorite ? "已收藏" : "收藏模板"}
              </button>
              <button onClick={() => copyTemplateLink(item)} className="inline-flex items-center rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] text-[#111] transition hover:bg-[#eee]">
                <Link className="mr-2 h-4 w-4" />
                复制链接
              </button>
              <button onClick={copyTemplate} className="inline-flex items-center rounded-full bg-[#111] px-5 py-2.5 text-[14px] text-white">
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "已复制" : "复制正文"}
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-[30px] bg-[#f8f8f8] p-6 text-[15px] leading-8 text-[#333]">{item.content}</pre>
        </div>

        <aside className="space-y-4">
          <InfoBox title="填写提醒" lines={[item.note]} />
          <InfoBox title="收藏功能" lines={[isFavorite ? "这个模板已加入收藏。后续登录后可同步保存到账号。" : "点击收藏后，可在后续用户中心里快速找到常用模板。"]} />
          
          <InfoBox title="文件下载规划" lines={["后续会支持 Word、Excel、PDF 等文件下载形式，目前可先免费复制正文使用。"]} dark />
        </aside>
      </section>

      <section className="mt-4 rounded-[36px] bg-white p-6 md:p-8">
        <SectionTitle title="相关模板" desc="同分类下的其他常用模板。" action={<button onClick={() => openCategoryPage(item.category)} className="rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px]">查看全部</button>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {related.map((template) => (
            <TemplateCard key={template.id} item={template} onOpen={setSelected} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CategoryPage({ name, openHome, setSelected, copyCategoryLink }) {
  const meta = CATEGORY_CONFIG.find((category) => category.name === name);
  const list = templates.filter((item) => item.category === name);
  const Icon = meta?.icon || FileText;

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-6 md:px-8">
      <div className="mb-4 flex gap-2 px-1 text-[13px] text-[#777]">
        <button onClick={() => openHome("categories")}>首页</button>
        <span>/</span>
        <span className="text-[#111]">{name}</span>
      </div>

      <section className="rounded-[36px] bg-white p-7 md:p-12 lg:p-14">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f5]">
          <Icon size={26} strokeWidth={1.8} />
        </div>
        <h1 className="mt-8 text-[42px] font-semibold tracking-[-0.055em] md:text-[72px]">{name}</h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#666]">{meta?.desc} 当前共整理 {list.length} 个常用模板，均可免费查看和复制。</p>
      </section>

      <section className="mt-4 rounded-[36px] bg-white p-6 md:p-8">
        <SectionTitle
          title={`${name}模板`}
          desc="点击模板可查看标准格式、正文内容和填写提醒。"
          action={
            <div className="flex flex-wrap gap-2">
              <button onClick={() => copyCategoryLink(name)} className="inline-flex items-center rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] transition hover:bg-[#eee]">
                <Link className="mr-2 h-4 w-4" />
                复制分类链接
              </button>
              <button onClick={() => openHome("categories")} className="rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] transition hover:bg-[#eee]">
                返回全部分类
              </button>
            </div>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => (
            <TemplateCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </section>
    </main>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-10 md:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[36px] bg-[#111] p-8 text-white md:col-span-2 md:p-11">
          <Download size={23} />
          <h2 className="mt-12 text-[32px] font-semibold md:text-[48px]">下载专区</h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/65">当前模板内容均可免费复制使用。后续会继续完善 Word、Excel、PDF 等文件下载形式。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#111]">复制即用</span>
            <span className="rounded-full bg-white/10 px-5 py-3 text-[14px] font-medium text-white">文件下载规划中</span>
          </div>
        </div>
        <div className="rounded-[36px] bg-white p-8 md:p-11">
          <ShieldCheck className="h-10 w-10" />
          <h3 className="mt-12 text-[28px] font-semibold">测试版说明</h3>
          <p className="mt-4 text-[15px] leading-8 text-[#777]">当前版本适合上线测试搜索、浏览、复制、收藏和需求反馈流程。</p>
        </div>
      </div>
    </section>
  );
}

function UsageSection() {
  return (
    <section id="membership" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-10 md:px-8">
      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="免费开放使用" lines={["当前全部模板免费开放，打开即可查看、复制和使用。", "无需登录，打开即可使用。"]} />
        <InfoBox title="更多实用功能" lines={["后续会继续完善文件下载、资料包整理、收藏和历史记录。"]} dark />
      </div>
    </section>
  );
}

function AboutSection({ setRequestOpen }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 pb-16 pt-6 md:px-8">
      <div className="rounded-[36px] bg-white p-8 md:p-11">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <BookOpen className="mb-4 h-5 w-5 text-[#777]" />
            <h2 className="text-[30px] font-semibold md:text-[44px]">先做小而实用</h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[#777]">这里会持续整理高频、实用、常见的模板内容，并统一格式，方便用户直接复制、修改和使用。</p>
          </div>
          <button onClick={() => setRequestOpen(true)} className="rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#333]">
            提交模板需求
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ setInfoOpen }) {
  return (
    <footer className="border-t border-black/[0.04] bg-white">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-4 px-5 py-8 text-[13px] text-[#777] md:flex-row md:items-center md:justify-between md:px-8">
        <div>© 2026 实用模板库</div>
        <div className="flex flex-wrap gap-5">
          <button onClick={() => setInfoOpen("about")} className="hover:text-[#111]">关于本站</button>
          <button onClick={() => setInfoOpen("guide")} className="hover:text-[#111]">使用说明</button>
          <button onClick={() => setInfoOpen("privacy")} className="hover:text-[#111]">隐私说明</button>
        </div>
      </div>
    </footer>
  );
}

function LoginModal({ onClose, favoriteCount, recentCount, requestCount, clearLocalData }) {
  return (
    <Modal icon={<UserRound size={23} strokeWidth={1.8} />} title="登录功能规划中" onClose={onClose}>
      <p className="mt-3 text-[15px] leading-8 text-[#777]">后续可用于保存收藏、查看历史记录和管理文件下载。</p>
      <div className="mt-7 grid grid-cols-3 gap-3">
        <Stat label="收藏" value={favoriteCount} />
        <Stat label="最近查看" value={recentCount} />
        <Stat label="需求" value={requestCount} />
      </div>
      <div className="mt-5 rounded-[24px] bg-[#f5f5f5] p-5 text-[14px] leading-7 text-[#666]">当前收藏、最近查看和需求记录已支持本地保存，登录后可升级为账号同步。</div>
      <div className="mt-5 grid gap-3">
        <button className="rounded-full bg-[#111] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#333]">微信登录，占位</button>
        <button className="rounded-full bg-[#f5f5f5] px-5 py-3.5 text-[14px] font-medium text-[#111] transition hover:bg-[#eee]">手机号登录，占位</button>
        <button onClick={clearLocalData} className="rounded-full bg-[#fff3f3] px-5 py-3.5 text-[14px] font-medium text-[#c62828] transition hover:bg-[#ffe8e8]">清空本地记录</button>
      </div>
    </Modal>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[22px] bg-[#f5f5f5] p-4 text-center">
      <div className="text-[24px] font-semibold tracking-[-0.04em] text-[#111]">{value}</div>
      <div className="mt-1 text-[12px] text-[#777]">{label}</div>
    </div>
  );
}

function RequestModal({ form, error, sent, setField, submit, close }) {
  if (sent) {
    return (
      <Modal icon={<Check size={23} strokeWidth={1.8} />} title="已收到需求" onClose={close}>
        <p className="mt-3 text-[15px] leading-8 text-[#777]">需求已保存到本地记录。后续接入后台、飞书表格或数据库后，可以同步收集真实用户需求。</p>
        <button onClick={close} className="mt-7 w-full rounded-full bg-[#111] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#333]">完成</button>
      </Modal>
    );
  }

  return (
    <Modal icon={<FileText size={23} strokeWidth={1.8} />} title="提交模板需求" onClose={close}>
      <p className="mt-3 text-[15px] leading-8 text-[#777]">告诉我们你想要什么模板，后续会优先整理高频需求。</p>
      <div className="mt-7 grid gap-3">
        <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="模板名称，例如：租房退押金说明" className="rounded-2xl bg-[#f5f5f5] px-5 py-4 text-[14px] outline-none" />
        <select value={form.category} onChange={(e) => setField("category", e.target.value)} className="rounded-2xl bg-[#f5f5f5] px-5 py-4 text-[14px] text-[#666] outline-none">
          <option value="">选择分类</option>
          {CATEGORY_NAMES.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <textarea value={form.desc} onChange={(e) => setField("desc", e.target.value)} placeholder="简单描述使用场景，例如：我要向房东说明退押金问题" rows={4} className="resize-none rounded-2xl bg-[#f5f5f5] px-5 py-4 text-[14px] outline-none" />
        {error ? <div className="rounded-2xl bg-[#fff3f3] px-5 py-3 text-[13px] text-[#c62828]">{error}</div> : null}
        <button onClick={submit} className="rounded-full bg-[#111] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#333]">提交需求</button>
      </div>
    </Modal>
  );
}

function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-[#111] px-5 py-3 text-[14px] font-medium text-white shadow-[0_18px_60px_rgba(15,23,42,0.22)]">
      {message}
    </div>
  );
}

function InfoModal({ type, close }) {
  const infoMap = {
    about: {
      title: "关于本站",
      body: ["实用模板库用于整理常用文档、表格、活动方案和生活文书模板。", "本站内容以实用、清晰、统一格式为目标，方便用户快速复制和修改。"],
    },
    guide: {
      title: "使用说明",
      body: ["你可以通过搜索框查找模板，也可以按分类浏览。", "打开模板详情后，可查看标准格式、复制正文，并根据实际情况替换占位内容。"],
    },
    privacy: {
      title: "隐私说明",
      body: ["当前版本不需要登录即可使用模板内容。", "后续如开放登录、收藏、下载记录等功能，会补充更完整的隐私说明。"],
    },
  };

  const info = infoMap[type];
  if (!info) return null;

  return (
    <Modal icon={<ShieldCheck size={23} strokeWidth={1.8} />} title={info.title} onClose={close}>
      <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#666]">
        {info.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Modal>
  );
}
