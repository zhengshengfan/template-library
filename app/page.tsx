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
  Eye,
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
import { posterCatalog } from "../src/data/posterCatalog";

const CATEGORY_CONFIG = [
  { id: "work", name: "办公文档", icon: Briefcase, desc: "离职通知、工作总结、会议纪要、情况说明等常用 Word 文档。" },
  { id: "courseware", name: "教学课件", icon: GraduationCap, desc: "具体到课文、课题和学段的完整 PPT 课件，优先整理下载后可直接套用的成品课件。" },
  { id: "classmeeting", name: "主题班会", icon: BookOpen, desc: "安全教育、劳动教育、阅读活动、开学第一课等完整班会 PPT。" },
  { id: "teacherDoc", name: "教师文档", icon: FileText, desc: "教学设计、说课稿、逐字稿、听课记录、家长会发言稿等教师常用 Word 文档。" },
  { id: "sheet", name: "表格清单", icon: Table2, desc: "计划表、记账表、搬家清单、旅行清单等实用表格。" },
];


const TEMPLATE_TYPE_CONFIG = [
  { id: "word", name: "Word 文档", icon: FileText, desc: "请假、总结、教学资料等常用文档，支持预览和复制到 Word。" },
  { id: "ppt", name: "PPT 资料", icon: BookOpen, desc: "班会、公开课、活动课等成品型 PPT，后续以可直接套用为主。" },
  { id: "image", name: "图片海报", icon: Star, desc: "活动海报、通知海报、背景图等视觉模板。" },
  { id: "excel", name: "表格清单", icon: Table2, desc: "计划表、清单、统计表等表格类模板。" },
  { id: "package", name: "资料包", icon: Download, desc: "围绕具体场景整理 Word、PPT、图片等组合资料。" },
];

type TemplateSeedItem = [string, string, string, string[]];

const TEMPLATE_SEED: TemplateSeedItem[] = [
  ["离职通知书模板", "办公文档", "高频使用", ["称呼", "离职原因", "离职时间", "工作交接", "署名日期"]],
  ["转正申请模板", "办公文档", "办公常用", ["称呼", "试用回顾", "工作成果", "不足改进", "转正申请"]],
  ["请假条模板", "办公文档", "简单实用", ["称呼", "请假原因", "请假时间", "工作安排", "署名日期"]],
  ["工作总结模板", "办公文档", "办公常用", ["工作概述", "重点成果", "问题不足", "改进措施", "下步计划"]],
  ["周报模板", "办公文档", "高频使用", ["本周完成", "重点进展", "问题风险", "下周计划", "需要支持"]],
  ["月报模板", "办公文档", "办公常用", ["月度目标", "完成情况", "关键数据", "问题分析", "下月计划"]],
  ["述职报告模板", "办公文档", "正式汇报", ["岗位职责", "工作成果", "能力提升", "不足反思", "未来规划"]],
  ["会议纪要模板", "办公文档", "办公常用", ["会议信息", "参会人员", "会议议题", "决议事项", "待办跟进"]],

  ["二年级语文《雷雨》第二课时 PPT", "教学课件", "完整课件", ["课题导入", "朗读感知", "品读词句", "课堂活动", "总结拓展"]],
  ["三年级语文《守株待兔》公开课 PPT", "教学课件", "完整课件", ["寓言导入", "字词学习", "课文理解", "寓意讨论", "拓展练习"]],
  ["四年级语文《乡下人家》教学 PPT", "教学课件", "完整课件", ["情境导入", "整体感知", "画面赏析", "语言品读", "课堂小结"]],
  ["教学设计模板", "教师文档", "教师常用", ["课题", "教学目标", "教学重难点", "教学过程", "教学反思"]],
  ["说课稿模板", "教师文档", "比赛常用", ["说教材", "说学情", "说目标", "说教法", "说过程"]],
  ["公开课逐字稿模板", "教师文档", "公开课", ["导入语", "过渡语", "提问语", "评价语", "小结语"]],
  ["听课记录模板", "教师文档", "教研常用", ["课程信息", "教学过程", "课堂观察", "亮点记录", "改进建议"]],

  ["《劳动创造幸福》少先队活动课 PPT", "主题班会", "少先队活动", ["活动导入", "劳动故事", "互动任务", "榜样分享", "总结延伸"]],
  ["《阅读点亮成长》主题班会 PPT", "主题班会", "阅读活动", ["主题导入", "阅读分享", "互动讨论", "好书推荐", "班会总结"]],
  ["《防溺水安全教育》主题班会 PPT", "主题班会", "安全教育", ["风险认识", "案例警示", "安全知识", "情景判断", "承诺总结"]],
  ["《开学第一课：新学期新目标》PPT", "主题班会", "开学班会", ["新学期导入", "目标设定", "习惯养成", "班级约定", "行动计划"]],
  ["家长会发言稿模板", "教师文档", "家校沟通", ["开场问候", "班级情况", "学生表现", "家校建议", "结束感谢"]],
  ["少先队活动方案模板", "教师文档", "校园活动", ["活动主题", "活动目标", "活动准备", "活动流程", "活动延伸"]],
  ["读书节主持词模板", "教师文档", "校园活动", ["开场白", "活动介绍", "节目串词", "颁奖环节", "结束语"]],


  ["每日计划表模板", "表格清单", "效率工具", ["日期", "今日目标", "时间安排", "待办事项", "复盘总结"]],
  ["家庭记账表模板", "表格清单", "生活管理", ["月份", "收入", "固定支出", "变动支出", "本月结余"]],
  ["搬家清单模板", "表格清单", "生活清单", ["证件文件", "贵重物品", "生活用品", "搬前检查", "搬后确认"]],
  ["旅行清单模板", "表格清单", "出行必备", ["证件票据", "电子设备", "衣物洗护", "药品用品", "出行确认"]],
  ["物料清单模板", "表格清单", "执行必备", ["基础物料", "视觉物料", "签到物料", "备用物料", "负责人"]],
  ["活动策划方案模板", "表格清单", "可套用", ["活动背景", "活动主题", "时间地点", "流程安排", "人员分工"]],
  ["会议流程模板", "表格清单", "正式场景", ["会议主题", "时间地点", "参会人员", "会议议程", "会议要求"]],
  ["活动复盘模板", "表格清单", "复盘工具", ["活动概况", "数据结果", "亮点总结", "问题不足", "改进建议"]],
];

const HOT_KEYWORDS = ["雷雨课件", "劳动教育", "防溺水", "教学设计", "家长会", "离职通知", "工作总结", "搬家清单"];
const CATEGORY_NAMES = CATEGORY_CONFIG.map((item) => item.name);
const CATEGORY_SLUGS = {
  办公文档: "work",
  教学课件: "courseware",
  主题班会: "classmeeting",
  教师文档: "teacher-doc",
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

const FORMULA_CONTENT: Record<string, string> = {
  "离职通知书模板": `离职通知书

尊敬的某某某公司人事部：

您好！

我是市场部员工张三。因个人职业规划调整，经慎重考虑，现正式向公司发出离职通知，计划最后工作日期为2026年6月30日。

在某某某公司工作期间，我得到了领导和同事的帮助，也积累了很多宝贵经验。对于公司给予的平台和培养，我表示真诚感谢。

为保证工作顺利衔接，我会在离职前完成以下交接事项：

一、整理当前负责的客户资料和项目进度；
二、将未完成事项移交给同事李四；
三、配合部门完成相关文件、账号和资料交接；
四、保持必要沟通，协助处理后续衔接问题。

请公司根据相关流程协助办理离职手续。

此致
敬礼！

通知人：张三
2026年6月1日`,
  "转正申请模板": `转正申请书

尊敬的某某某公司领导：

您好！

我是运营部试用员工张三，于2026年3月1日入职某某某公司，担任运营专员岗位。根据公司试用期管理要求，现试用期即将结束，特向公司提出转正申请。

试用期间，我主要负责公众号内容整理、活动数据统计、用户反馈收集和日常运营支持工作。在部门领导李四的指导下，我逐步熟悉了岗位流程，也能够独立完成基础运营任务。

在这段时间里，我完成了以下工作：

一、整理并发布运营内容20篇；
二、协助完成两次线上活动执行；
三、建立用户反馈统计表，提高问题跟进效率；
四、配合团队完成月度数据汇总。

我也认识到自己在数据分析深度和跨部门沟通效率方面还有提升空间。后续我会继续加强学习，提高工作主动性和结果意识。

我认可公司的工作氛围和发展方向，也希望能以正式员工身份继续为团队贡献力量。请公司根据相关流程予以考核。

通知人：张三
2026年6月1日`,
  "请假条模板": `请假条

尊敬的李四经理：

您好！

我是市场部员工张三。因家中有事需要处理，需请事假一天，请假时间为2026年6月6日，预计2026年6月7日正常返岗。

请假期间，我已提前整理好当日工作安排。其中，客户资料更新工作已完成，活动方案修改事项已同步给同事王五协助跟进。如有紧急情况，我会保持手机畅通，及时配合处理。

恳请批准。

请假人：张三
2026年6月5日`,
  "工作总结模板": `工作总结

一、基本情况

2026年5月，我围绕部门重点工作，主要完成了内容整理、客户资料维护、活动执行协助和数据汇总等任务。整体来看，本月工作推进较为稳定，重点事项均按计划完成。

二、主要工作完成情况

一是完成内容整理工作。本月共整理产品介绍资料12份，优化详情页文案8篇，提升了资料使用效率。

二是完成客户资料维护。对现有客户信息进行了分类归档，补充了联系方式、跟进状态和需求备注，方便后续销售跟进。

三是协助活动执行。参与了某某某公司新品推广活动的前期准备，包括物料清单整理、流程确认和现场执行支持。

四是完成数据汇总。根据部门要求，对本月咨询量、转化情况和反馈问题进行了统计，并形成汇总表。

三、存在问题

本月工作中也存在一些不足。例如部分资料整理不够细致，个别沟通事项反馈不够及时，对数据背后原因的分析还不够深入。

四、改进措施

后续我会重点从三方面改进：一是提前制定每日工作清单；二是重要事项及时记录和反馈；三是加强数据分析能力，提高总结质量。

五、下月计划

2026年6月，我计划继续完善资料库内容，配合完成活动复盘，并推动重点客户资料更新工作，确保部门工作有序推进。

总结人：张三
2026年5月31日`,
  "周报模板": `工作周报

汇报人：张三
所属部门：市场部
汇报周期：2026年6月3日—2026年6月7日

一、本周工作完成情况

1. 完成某某某公司产品资料整理，共整理产品文案15条，图片资料30张。
2. 协助李四完成新品推广活动方案修改，补充了活动流程和物料清单。
3. 跟进客户反馈问题8项，其中6项已解决，2项正在等待技术部门回复。
4. 完成本周运营数据统计，包括访问量、咨询量和转化情况。

二、本周重点成果

本周重点完成了新品活动资料整理工作，确保活动页面和宣传内容能够按时上线。同时，通过客户反馈汇总，发现用户对产品规格说明关注较多，已建议后续优化详情页说明。

三、存在问题

本周部分事项推进时间较紧，活动方案修改与数据统计工作存在时间冲突。后续需要提前拆分任务，避免临时集中处理。

四、下周工作计划

1. 完成活动复盘初稿；
2. 继续整理客户反馈问题；
3. 优化产品详情页常见问题说明；
4. 配合部门完成月度数据汇总。

五、需要支持

希望技术部协助确认客户反馈中的页面加载问题，便于下周完成统一回复。`,
  "月报模板": `月度工作报告

汇报人：张三
所属部门：市场部
汇报月份：2026年5月

一、本月工作概述

2026年5月，我主要围绕内容建设、活动执行、客户反馈和数据统计四个方面开展工作。整体工作按计划推进，重点任务基本完成。

二、重点工作完成情况

1. 内容建设方面
本月完成产品资料整理36条，优化宣传文案12篇，并配合设计同事李四完成页面素材归档。

2. 活动执行方面
协助完成某某某公司新品推广活动，包括活动流程确认、物料清单整理、现场执行支持和后期数据收集。

3. 客户反馈方面
本月共整理客户反馈问题24项，其中18项已完成处理，6项已提交相关部门继续跟进。

4. 数据统计方面
完成月度访问数据、咨询数据和转化数据统计，为部门复盘提供基础资料。

三、本月工作亮点

通过资料分类整理，团队查找产品信息的效率有所提升；通过反馈问题汇总，也帮助团队发现了详情页说明不够清晰的问题。

四、存在不足

本月部分工作仍偏执行层面，对数据分析和问题归因不够深入。后续需要提高主动分析能力。

五、下月工作计划

1. 完成活动复盘报告；
2. 持续优化产品资料库；
3. 建立客户反馈分类表；
4. 配合部门完成下月推广计划。

汇报人：张三
2026年5月31日`,
  "述职报告模板": `述职报告

述职人：张三
所属部门：市场部
述职岗位：市场运营专员
述职周期：2026年1月—2026年6月

一、岗位职责

本人主要负责公司线上内容运营、活动执行支持、客户反馈整理和月度数据汇总等工作。在述职周期内，我围绕部门年度目标，配合完成产品资料建设、推广活动执行和用户反馈优化等任务。

二、主要工作完成情况

1. 内容运营方面
累计整理产品介绍资料56份，优化详情页文案18篇，协助设计同事李四完成活动页面素材归档，提高了资料查找和复用效率。

2. 活动执行方面
参与某某某公司春季推广活动和新品上线活动，负责活动流程梳理、物料清单整理、社群通知发布和后期数据收集。两次活动均按计划完成。

3. 客户反馈方面
建立客户反馈分类表，将反馈问题分为产品说明、页面体验、售后咨询和物流问题四类，便于相关部门快速跟进。

4. 数据汇总方面
按月完成访问量、咨询量、转化情况和用户反馈数据整理，为部门复盘提供基础依据。

三、工作亮点

本周期内，我重点优化了资料整理方式，将分散文件按产品、活动和客户问题三个维度归档，减少了团队重复查找资料的时间。

四、存在不足

本人在数据分析深度方面仍有不足，对部分活动结果的原因分析不够充分；在跨部门沟通中，有时反馈不够及时，影响了部分事项推进效率。

五、改进计划

后续我将从三方面改进：一是提升数据分析能力，增加问题归因；二是建立重要事项跟进表，及时反馈进度；三是加强活动复盘能力，形成可复制经验。

六、下一阶段工作计划

下一阶段，我将继续完善产品资料库，配合完成夏季推广活动，并推动客户反馈表常态化更新，为部门工作提供更稳定的支持。

述职人：张三
2026年6月30日`,
  "会议纪要模板": `会议纪要

会议名称：6月产品推广工作协调会
会议时间：2026年6月8日 14:30—16:00
会议地点：三楼会议室
主持人：李四
记录人：张三
参会人员：市场部、销售部、设计部相关人员

一、会议主题

围绕某某某公司夏季新品推广工作，确认推广节奏、物料准备、销售跟进和数据复盘安排。

二、会议主要内容

1. 市场部汇报推广计划
张三说明了本次新品推广的整体方案，包括活动时间、主推产品、页面上线节点和社群预热安排。推广活动计划于2026年6月15日开始，持续7天。

2. 设计部说明物料进度
设计同事王五反馈，目前主图、详情页长图和社群海报已完成初稿，预计2026年6月10日前完成最终修改。

3. 销售部提出跟进需求
销售部提出，希望在活动开始前补充产品常见问题说明，便于客服和销售统一回复客户咨询。

三、会议决议

1. 市场部于6月9日前确认最终活动文案；
2. 设计部于6月10日前完成活动视觉物料；
3. 销售部于6月11日前整理客户常见问题；
4. 客服部于活动上线前完成统一话术确认。

四、待办事项

1. 张三负责整理活动页面文案，完成时间：6月9日；
2. 王五负责修改活动海报，完成时间：6月10日；
3. 李四负责汇总销售反馈问题，完成时间：6月11日。

五、下次跟进

计划于2026年6月12日上午召开活动上线前确认会，检查页面、物料、话术和人员安排。

记录人：张三
2026年6月8日`,
  "教学设计模板": `教学设计

课题：某某课题
授课教师：张老师
授课班级：三年级一班
课时安排：第一课时
学科：语文

一、教学目标

1. 知识与能力目标
学生能够掌握本课的基础知识，理解重点词句或核心概念，并能结合具体情境进行表达和运用。

2. 过程与方法目标
学生通过自主阅读、小组交流、问题探究和课堂展示，提升理解能力、表达能力和合作学习能力。

3. 情感态度与价值观目标
学生能够联系生活实际，形成积极的学习态度，增强对本课主题的理解和认同。

二、教学重点

引导学生理解本课核心内容，掌握重点知识，并能够用自己的语言进行说明或表达。

三、教学难点

帮助学生突破理解障碍，学会将课堂知识迁移到实际表达、练习或生活情境中。

四、教学准备

教师准备课件、板书设计、学习单和相关图片资料。学生提前预习课文或学习材料，完成基础问题思考。

五、教学过程

（一）导入新课

教师张老师通过图片、问题或生活情境导入新课，引导学生思考：“这个内容和我们的生活有什么联系？”学生自由交流后，教师顺势揭示课题。

（二）初读感知

学生自主阅读学习材料，圈画不理解的词句或重点内容。教师巡视指导，并提醒学生关注标题、关键词和主要信息。

（三）合作探究

学生围绕核心问题进行小组讨论。例如：“这一部分主要写了什么？”“作者或材料想表达什么？”“哪些地方最能体现主题？”小组代表进行汇报。

（四）重点讲解

教师结合学生回答，梳理重点内容，补充讲解容易混淆或理解困难的地方，并通过板书帮助学生形成清晰结构。

（五）课堂练习

学生完成课堂练习或表达任务。可以采用填空、仿写、口头表达、小组展示等方式，检查学生对本课内容的掌握情况。

（六）课堂小结

教师引导学生回顾本节课学习内容，总结本课重点，并鼓励学生将学习方法运用到后续学习中。

六、作业设计

1. 完成课后基础练习；
2. 整理本课重点词句或知识点；
3. 结合生活实际写一段相关表达。

七、教学反思

本节课整体流程较完整，学生能够参与课堂讨论。后续教学中可以增加学生自主表达时间，并根据学生反馈调整练习难度。`,
  "说课稿模板": `说课稿

课题：某某课题
说课教师：张老师
学科：语文
授课对象：三年级一班

各位评委老师，大家好！今天我说课的内容是某某课题。下面我将从教材分析、学情分析、教学目标、教学重难点、教学方法、教学过程和板书设计几个方面进行说明。

一、说教材

某某课题是本单元中的重要学习内容，承接前面知识，也为后续学习奠定基础。本课内容结构清晰，具有较强的知识性和实践性，适合引导学生在理解中学习，在表达中提升。

二、说学情

三年级一班学生已经具备一定的基础阅读和表达能力，但在抓住重点、完整表达和联系生活实际方面仍需要教师引导。因此，本节课教学中，我注重通过问题引导和合作交流帮助学生理解内容。

三、说教学目标

根据课程标准、教材内容和学生实际情况，我确定以下教学目标：

1. 学生能够理解本课主要内容，掌握重点知识；
2. 学生能够通过讨论、朗读、练习或表达活动提升学习能力；
3. 学生能够联系生活经验，加深对本课主题的理解。

四、说教学重难点

教学重点是引导学生理解本课核心内容，掌握重点知识和表达方法。

教学难点是帮助学生将所学内容迁移到实际表达或练习中，做到学以致用。

五、说教学方法

本节课主要采用情境导入法、问题引导法、合作探究法和练习巩固法。通过层层递进的问题设计，让学生在参与中理解，在交流中提升。

六、说教学过程

第一环节，情境导入。教师通过图片、问题或生活情境引出课题，激发学生学习兴趣。

第二环节，自主学习。学生阅读材料，圈画重点内容，初步感知本课主题。

第三环节，合作探究。学生围绕核心问题进行小组讨论，并派代表交流汇报。

第四环节，重点讲解。教师根据学生反馈进行点拨，突破重点和难点。

第五环节，课堂练习。学生完成相关练习或表达任务，巩固所学内容。

第六环节，总结提升。教师带领学生回顾本节课内容，归纳学习方法。

七、说板书设计

板书围绕课题、重点内容和学习方法展开，力求简洁清晰，帮助学生形成知识结构。

我的说课到此结束，谢谢各位老师。`,
  "公开课逐字稿模板": `公开课逐字稿

课题：某某课题
执教教师：张老师
授课班级：三年级一班

一、导入环节

同学们，今天上课前，老师想先请大家看一张图片。看到这张图片，你想到了什么？

学生自由回答。

教师评价：你观察得很仔细；你的想法很有意思；你能联系生活来说，非常好。

今天我们就一起学习某某课题。请同学们齐读课题。

二、初读感知

请同学们打开课本或学习材料，自由朗读一遍。读的时候思考两个问题：第一，这部分内容主要讲了什么？第二，你觉得哪些地方比较重要？

学生自由阅读，教师巡视。

刚才老师看到很多同学都在认真圈画。现在请李明同学来说一说，你找到的重点内容是什么？

学生回答。

教师评价：你抓住了关键词，说明你读得很认真。

三、合作探究

下面请同学们四人为一组，围绕这个问题进行讨论：本课最核心的内容是什么？你从哪里看出来？

小组讨论。

哪个小组愿意分享？请第一小组代表发言。

学生汇报。

教师评价：你们小组表达很完整，不仅说出了答案，还说明了理由。

四、重点讲解

刚才同学们已经找到了很多重要信息。老师把大家的观点整理一下。我们可以从三个方面理解本课内容：第一，基本内容；第二，重点方法；第三，实际运用。

教师板书并讲解。

这里有一个地方容易出错，请大家看大屏幕。这个问题不能只看表面，还要结合前后内容来理解。

五、课堂练习

现在请同学们完成学习单第一题和第二题。完成后和同桌互相交流。

学生练习。

教师巡视后提问：王芳同学，你愿意分享一下你的答案吗？

学生回答。

教师评价：你的表达很清楚，如果能再加上理由，会更完整。

六、课堂小结

这节课我们学习了某某课题，知道了本课的重点内容，也学习了分析和表达的方法。以后遇到类似内容时，同学们也可以按照“先找重点，再说理由，最后联系实际”的方法来学习。

七、作业布置

今天的作业有两项：第一，完成课后练习；第二，用今天学到的方法，写一段自己的理解。`,
  "班主任评语模板": `班主任评语

李明同学：

你是一个踏实、懂事、有责任心的孩子。本学期你能够遵守班级纪律，按时完成作业，和同学相处也比较友好。在课堂上，你能认真听讲，积极思考，遇到问题愿意主动请教老师。

这学期你在学习习惯方面进步明显，书写比以前更加工整，课堂表达也更加清楚。在班级活动中，你能够积极配合老师完成任务，体现出较强的集体意识。

当然，你也要看到自己的不足。有时候你在课堂发言上还不够大胆，遇到难题时容易犹豫。希望你以后能更加自信，勇敢表达自己的想法。

老师相信，只要你继续保持认真踏实的态度，一定会取得更大的进步。新学期继续加油！

班主任：张老师
2026年6月30日`,
  "家长会发言稿模板": `家长会发言稿

各位家长朋友：

大家下午好！我是三年级一班班主任张老师。非常感谢各位家长在百忙之中参加今天的家长会，也感谢大家一直以来对班级工作的支持和配合。

今天的家长会主要想和大家交流三个方面的内容：一是本学期班级整体情况；二是孩子们在学习和习惯方面的表现；三是后续家校配合建议。

首先，从班级整体情况来看，本学期大部分同学能够遵守纪律，按时完成作业，课堂参与度也在逐步提高。孩子们在阅读、书写、表达和合作方面都有不同程度的进步。

其次，在学习习惯方面，我们也发现了一些需要共同关注的问题。比如部分孩子作业书写不够认真，阅读时间不够稳定，遇到问题时缺少主动思考。希望家长在家中能够多关注孩子的学习过程，而不仅仅看结果。

第三，在行为习惯方面，希望家长继续配合学校，引导孩子养成按时作息、独立整理物品、主动完成学习任务的习惯。好的习惯不是一天形成的，需要学校和家庭共同坚持。

最后，希望我们继续保持沟通。学校教育和家庭教育方向一致，孩子的成长才会更稳定。后续如果孩子在学习或生活中出现问题，也欢迎家长及时与我联系。

再次感谢各位家长的到来。让我们一起陪伴孩子健康、快乐、踏实地成长。谢谢大家！`,
  "少先队活动方案模板": `少先队活动方案

活动主题：争做新时代好队员
活动对象：三年级一班全体少先队员
活动时间：2026年5月20日
活动地点：某某小学多功能教室
辅导员：张老师

一、活动背景

为引导少先队员增强组织意识、责任意识和集体荣誉感，三年级一班计划开展“争做新时代好队员”主题队会活动，让队员在活动中受教育、受启发、受鼓舞。

二、活动目标

1. 引导队员了解新时代好队员的基本要求；
2. 培养队员热爱祖国、热爱集体、积极向上的意识；
3. 鼓励队员从身边小事做起，争做有理想、有本领、有担当的少先队员。

三、活动准备

1. 提前确定主持人和发言队员；
2. 准备队旗、红领巾、背景课件和音乐；
3. 安排小组展示内容；
4. 准备活动记录表和评价卡。

四、活动流程

（一）整理队伍，宣布开始

中队长整理队伍，报告人数。辅导员张老师宣布活动开始。

（二）出旗，唱队歌

全体队员面向队旗，规范敬礼，齐唱《中国少年先锋队队歌》。

（三）主题导入

辅导员围绕“什么是新时代好队员”提出问题，引导队员结合学习、劳动、文明礼仪和集体生活进行思考。

（四）小组展示

各小组围绕一个关键词进行展示，如“爱学习”“讲文明”“爱劳动”“守纪律”“有担当”。

（五）队员分享

队员代表李明分享自己在学习和生活中争做好队员的做法。

（六）辅导员总结

辅导员张老师总结活动内容，鼓励队员从每天的小事做起，把队员标准落实到实际行动中。

（七）呼号，退旗

全体队员呼号，退旗，活动结束。

五、活动延伸

活动后，每位队员完成一张“我的行动承诺卡”，记录自己接下来一周准备坚持完成的一件小事。`,
  "读书节主持词模板": `读书节主持词

甲：尊敬的各位老师。
乙：亲爱的同学们。
合：大家上午好！

甲：书籍是人类进步的阶梯。
乙：阅读是打开世界的一扇窗。
甲：在这充满书香的日子里，我们迎来了某某小学读书节活动。
乙：今天，让我们一起走进书的世界，感受阅读的快乐。

甲：首先，请允许我介绍参加本次活动的领导和老师，他们是李校长、王主任以及各班班主任老师。
乙：让我们用热烈的掌声欢迎他们的到来！

甲：下面进行第一项，请李校长为本次读书节致辞。
乙：感谢李校长的精彩讲话。相信同学们一定会把阅读当成习惯，把书香带进生活。

甲：接下来进入节目展示环节。首先请欣赏三年级一班带来的经典诵读节目。
乙：掌声欢迎！

甲：感谢同学们的精彩展示。接下来将进行“阅读之星”颁奖环节。
乙：请获奖同学上台领奖，也请李校长为他们颁奖。

甲：读一本好书，就像和一位智者对话。
乙：愿每一位同学都能在阅读中遇见更好的自己。
合：某某小学读书节活动到此结束，谢谢大家！`,
  "听课记录模板": `听课记录

听课人：张老师
授课教师：李老师
授课班级：三年级一班
课题：某某课题
听课时间：2026年6月5日

一、教学过程记录

1. 导入环节
李老师通过图片、问题或生活情境导入新课，引导学生联系已有经验，激发学习兴趣。

2. 新课学习
教师组织学生阅读学习材料，抓住关键词句或核心知识点，引导学生理解本课重点内容。

3. 课堂互动
教师多次提问，鼓励学生结合自己的理解进行表达。学生参与度较高，课堂氛围较好。

4. 合作探究
学生围绕核心问题进行小组讨论，并派代表交流汇报。教师能够根据学生回答进行及时点拨。

5. 巩固练习
教师安排课堂练习，帮助学生巩固所学知识，并通过展示交流了解学生掌握情况。

二、课堂亮点

本节课教学目标明确，课堂结构较完整。教师能够通过问题引导帮助学生理解内容，课堂评价语言比较及时，能够鼓励学生积极参与。

三、改进建议

课堂后半部分学生自主表达时间略少，可以增加小组展示或同桌交流环节，让更多学生参与表达。

四、听课感受

本节课教学思路清晰，重点突出，能够较好地落实知识理解和表达训练目标。`,
  "活动策划方案模板": `活动策划方案

活动名称：某某某公司夏季新品推广活动
策划人：张三
活动时间：2026年6月15日—2026年6月21日
活动地点：某某某公司线上商城

一、活动背景

为提升夏季新品曝光度，增强用户对产品的了解，某某某公司计划开展夏季新品推广活动，通过限时优惠、内容种草和用户互动等方式促进转化。

二、活动目标

1. 提升新品页面访问量；
2. 增加用户咨询数量；
3. 促进新品销售转化；
4. 收集用户反馈，为后续优化提供参考。

三、活动主题

夏日焕新，限时尝鲜。

四、活动对象

某某某公司现有客户、新关注用户以及对夏季新品感兴趣的潜在用户。

五、活动内容

1. 新品限时优惠：活动期间购买新品可享受专属优惠；
2. 内容推广：通过公众号、小红书和社群发布产品介绍；
3. 用户互动：设置留言抽奖，鼓励用户分享使用场景；
4. 客服跟进：对咨询用户进行及时回复和记录。

六、人员分工

张三负责整体活动统筹和文案整理。
李四负责活动页面设计。
王五负责社群发布和用户互动。
赵六负责客户咨询记录和数据整理。

七、预算安排

活动物料费用：800元。
推广费用：1200元。
奖品费用：500元。
合计预算：2500元。

八、活动复盘

活动结束后，由张三整理访问量、咨询量、成交情况和用户反馈，形成活动复盘报告。`,
  "会议流程模板": `会议流程

会议名称：2026年6月部门月度工作会议
会议时间：2026年6月10日 09:30—11:00
会议地点：二楼会议室
主持人：李四
参会人员：市场部全体成员

一、会议准备

1. 张三提前一天发送会议通知；
2. 各小组准备月度工作汇报材料；
3. 行政同事准备会议室、投影设备和签到表；
4. 记录人准备会议纪要模板。

二、会议流程

09:30—09:35  主持人开场，说明会议主题和会议要求。

09:35—09:50  各小组负责人汇报本月重点工作完成情况。

09:50—10:10  讨论本月工作中存在的问题，包括活动执行、客户反馈和资料整理进度。

10:10—10:30  确认下月重点工作计划，明确各项任务负责人和完成时间。

10:30—10:45  部门负责人李四进行总结，提出改进要求。

10:45—11:00  记录人复述会议决议，确认待办事项和下次跟进时间。

三、会议要求

1. 参会人员提前5分钟到场；
2. 汇报内容控制在5分钟以内；
3. 讨论问题要具体，避免空泛表达；
4. 会后由张三在当天18点前发送会议纪要。

四、会后跟进

会议结束后，根据会议纪要建立待办清单，由各负责人按时间节点推进。`,
  "颁奖典礼主持词模板": `颁奖典礼主持词

活动名称：某某小学读书节颁奖典礼
主持人：张三、李明
活动时间：2026年6月12日
活动地点：学校报告厅

一、开场白

男：尊敬的各位老师。
女：亲爱的同学们。
合：大家上午好！

男：书香浸润校园，阅读点亮成长。
女：在本届读书节活动中，同学们积极参与阅读、分享和展示，收获了知识，也收获了成长。

男：今天，我们在这里举行读书节颁奖典礼，为表现突出的班级和同学送上掌声与祝贺。

二、介绍嘉宾

女：参加今天活动的领导和老师有李校长、王主任以及各年级班主任老师。
男：让我们用热烈的掌声欢迎他们的到来！

三、宣布获奖名单

男：下面进行第一项，宣布“阅读之星”获奖名单。
女：获得“阅读之星”称号的同学是：三年级一班李明、三年级二班王芳、四年级一班赵阳。
男：请获奖同学上台领奖。

四、颁奖环节

女：有请李校长为获奖同学颁奖。
男：让我们再次用掌声祝贺他们！

五、代表发言

女：接下来，有请获奖学生代表李明同学发言。
男：感谢李明同学的分享。希望更多同学以他们为榜样，把阅读坚持下去。

六、结束语

女：一本好书，可以打开一扇窗。
男：一次阅读，可以点亮一段成长。
女：愿同学们继续与书为友，在阅读中遇见更好的自己。
男：某某小学读书节颁奖典礼到此结束。
合：谢谢大家！`,
  "团建活动方案模板": `团建活动方案

活动名称：市场部夏季团建活动
活动时间：2026年6月22日 14:00—18:00
活动地点：城市公园拓展区
参与人员：市场部全体员工
负责人：张三

一、活动目的

为增强团队凝聚力，缓解阶段性工作压力，促进同事之间沟通交流，市场部计划组织一次夏季团建活动。通过轻松的户外游戏和团队协作任务，提升团队默契。

二、活动主题

轻松一夏，凝聚同行。

三、活动安排

14:00—14:20  集合签到，负责人张三清点人数并说明安全注意事项。

14:20—15:00  破冰游戏“名字接龙”，帮助成员快速进入活动状态。

15:00—16:00  团队协作游戏“趣味接力”，按小组完成任务挑战。

16:00—16:30  茶歇交流，发放饮用水和点心。

16:30—17:30  小组合作任务“创意合影”，各组完成主题照片拍摄。

17:30—18:00  活动总结，公布优胜小组并合影留念。

四、人员分工

张三负责整体统筹和现场签到。
李四负责游戏规则说明和计分。
王五负责物料准备和拍照记录。
赵六负责安全提醒和应急处理。

五、物料准备

队旗4面、号码贴40张、饮用水4箱、点心若干、急救包1个、音响1套、备用雨伞10把。

六、预算安排

场地费用：800元
物料费用：600元
茶歇费用：900元
奖品费用：500元
合计：2800元

七、注意事项

活动当天请大家穿着轻便服装，注意防晒和补水。如遇恶劣天气，活动顺延或改为室内活动。`,
  "物料清单模板": `物料清单

活动名称：夏季新品推广活动
使用日期：2026年6月15日
使用地点：某某某公司直播间
负责人：张三

一、基础物料

1. 签到表：2份，用于工作人员签到，负责人李四。
2. 工作牌：15个，用于现场人员识别，负责人王五。
3. 饮用水：2箱，用于现场补给，负责人赵六。
4. 备用插排：4个，用于设备供电，负责人张三。

二、视觉物料

1. 活动背景板：1块，用于直播间主背景。
2. 产品展示牌：6个，用于说明产品卖点。
3. 宣传海报：10张，用于现场布置和拍摄。
4. 价格提示牌：3个，用于展示活动信息。

三、设备物料

1. 补光灯：2台，负责人李四。
2. 相机：1台，负责人王五。
3. 麦克风：2支，负责人赵六。
4. 备用电池：4块，负责人张三。

四、备用物料

1. 胶带、剪刀、马克笔各2份。
2. 纸巾、湿巾、垃圾袋若干。
3. 应急药品和创可贴1套。

五、现场核对

□ 所有物料是否已到场
□ 数量是否与清单一致
□ 是否明确保管人
□ 活动结束后是否完成回收`,
  "活动复盘模板": `活动复盘报告

活动名称：夏季新品推广活动
活动时间：2026年6月15日—2026年6月21日
复盘人：张三
参与部门：市场部、销售部、设计部、客服部

一、活动概况

本次活动围绕某某某公司夏季新品进行推广，主要通过线上商城、社群发布、小红书内容和客服跟进等方式触达用户。活动周期为7天，核心目标是提升新品曝光和用户咨询量。

二、活动数据

1. 活动页面访问量：12800次；
2. 用户咨询量：356条；
3. 新增收藏人数：218人；
4. 成交订单：92单；
5. 客户反馈问题：47条。

三、活动亮点

1. 活动前预热较充分，社群和小红书内容带来一定访问增长；
2. 产品卖点图较清晰，用户对产品材质和规格咨询减少；
3. 客服回复话术统一，提高了咨询处理效率。

四、存在问题

1. 活动页面上线时间较紧，部分图片细节后期才补充；
2. 前两天客服高峰期回复速度不够快；
3. 用户对优惠规则仍有疑问，说明活动规则展示不够直观。

五、原因分析

页面信息层级不够清晰，导致用户需要反复询问优惠规则；活动前对客服咨询量预估不足，人员排班不够充分。

六、改进建议

1. 下次活动提前3天完成页面和物料终稿；
2. 优惠规则用图表形式展示；
3. 活动前准备常见问题话术；
4. 高峰期增加客服值班人员。

七、后续安排

张三负责整理活动复盘资料，李四负责优化活动页面模板，王五负责汇总客户反馈问题，并于2026年6月25日前完成改进计划。`,
  "申请书模板": `申请书

关于办公电脑更换的申请

尊敬的行政部领导：

您好！

我是市场部员工张三。因目前使用的办公电脑已连续使用多年，运行速度较慢，在处理图片资料、表格统计和活动文件时经常出现卡顿，影响日常工作效率。现申请更换一台新的办公电脑。

一、申请原因

本人日常工作需要同时处理产品图片、活动文案、客户资料表和数据统计文件。现有电脑启动较慢，打开大型图片和多个表格时容易卡顿，影响工作进度。

二、申请事项

申请更换一台满足日常办公和基础图片处理需求的电脑，建议配置为16GB内存、512GB固态硬盘及以上。

三、使用安排

如申请通过，本人将按公司资产管理要求办理领用手续，并妥善保管办公设备。原电脑可根据行政部安排进行检测、维修或调配。

四、申请说明

本次申请主要是为了保障工作顺利开展，提高资料处理效率。恳请领导结合实际情况予以审批。

此致
敬礼！

申请人：张三
所属部门：市场部
2026年6月8日`,
  "情况说明模板": `情况说明

关于客户资料提交延迟的情况说明

尊敬的某某某公司领导：

您好！

我是市场部员工张三。现就客户资料提交延迟一事作如下说明。

原计划于2026年6月5日前提交的客户资料整理表，因部分客户信息需要再次核对，加上期间涉及销售部和客服部数据同步，导致资料整理进度受到影响，未能在原定时间内完成提交。

截至目前，客户基础信息已整理完成，剩余部分主要为客户跟进状态和历史沟通记录。本人已与销售部同事李四确认相关数据，并计划于2026年6月7日18点前完成全部资料提交。

此次延迟给部门工作安排带来不便，本人深表歉意。后续我会提前预留信息核对时间，重要节点及时反馈进度，避免类似情况再次发生。

特此说明。

说明人：张三
2026年6月6日`,
  "投诉信模板": `投诉信

投诉人：张三
联系电话：13800000000
投诉对象：幸福小区物业服务中心
投诉事项：关于楼道灯长期损坏未维修的投诉

尊敬的物业服务中心：

您好！

我是幸福小区3号楼业主张三。现就3号楼2单元楼道灯长期损坏未维修一事进行投诉，并希望贵方尽快处理。

一、问题经过

自2026年5月20日起，3号楼2单元三层至五层楼道灯多次无法正常亮起。本人及多位邻居曾通过物业群和电话反馈，但截至2026年6月8日，相关问题仍未得到有效解决。

二、造成影响

楼道夜间照明不足，给居民上下楼带来不便，也存在一定安全隐患。老人和儿童夜间通行时尤其容易发生磕碰。

三、投诉诉求

1. 请物业在2026年6月10日前安排维修人员检查并修复楼道灯；
2. 请明确后续公共设施报修处理时限；
3. 请对本次问题处理情况进行反馈。

四、联系方式

如需核实情况，可通过电话13800000000与本人联系。希望贵方重视居民合理诉求，尽快解决问题。

投诉人：张三
2026年6月8日`,
  "委托书模板": `委托书

委托人：张三
身份证号：330100199001010000
联系电话：13800000000

受托人：李四
身份证号：330100199202020000
联系电话：13900000000

一、委托事项

本人因工作原因无法亲自前往某某服务中心办理材料领取手续，现委托李四代为办理相关事项。

二、委托权限

受托人可代为提交本人身份证复印件、领取相关材料、签收办理回执，并就材料领取过程中的一般事项进行确认。

三、委托期限

本委托书有效期为2026年6月8日至2026年6月15日。超过有效期后，本委托书自动失效。

四、责任说明

受托人在授权范围内办理上述事项所产生的相关结果，由委托人本人承担。受托人不得超出本委托书授权范围办理其他事项。

特此委托。

委托人：张三
受托人：李四
2026年6月8日`,
  "每日计划表模板": `每日计划表

日期：2026年6月8日
姓名：张三
今日主题：完成活动资料整理和客户反馈汇总

一、今日重点目标

1. 完成夏季新品活动物料清单整理；
2. 汇总本周客户反馈问题；
3. 修改工作总结初稿；
4. 与设计同事确认活动海报修改点。

二、时间安排

09:00—10:00  查看邮件和处理紧急事项。
10:00—11:30  整理活动物料清单。
11:30—12:00  与李四确认活动页面文案。
14:00—15:30  汇总客户反馈问题并分类。
15:30—16:30  修改工作总结初稿。
16:30—17:30  检查明日待办事项并同步进度。

三、待办事项

□ 活动物料清单完成并发给负责人；
□ 客户反馈表补充处理状态；
□ 工作总结初稿修改完成；
□ 明日会议资料提前准备。

四、今日复盘

完成情况：大部分任务已完成，客户反馈表还需要补充两个问题的处理结果。

问题记录：上午临时事项较多，导致物料清单整理时间被压缩。

改进计划：明天上午先处理重要任务，再集中回复零散消息。`,
  "家庭记账表模板": `家庭记账表

记账月份：2026年6月
记账人：张三
家庭成员：3人

一、本月收入

1. 工资收入：8000元
2. 兼职收入：1200元
3. 其他收入：300元
本月收入合计：9500元

二、固定支出

1. 房租 / 房贷：3000元
2. 水电燃气：450元
3. 通讯网络：180元
4. 交通通勤：500元
5. 保险费用：600元
固定支出合计：4730元

三、日常支出

1. 餐饮买菜：1800元
2. 生活用品：360元
3. 服饰鞋包：500元
4. 医疗药品：120元
5. 休闲娱乐：400元
日常支出合计：3180元

四、本月结余

本月收入合计：9500元
本月支出合计：7910元
本月结余：1590元

五、复盘记录

本月餐饮支出略高，主要原因是外卖次数较多。下月计划减少外卖频率，每周提前安排两次家庭采购。

六、下月预算

餐饮买菜预算：1500元
交通预算：500元
娱乐预算：300元
储蓄目标：2000元`,
  "搬家清单模板": `搬家清单

搬家日期：2026年6月15日
旧住址：幸福小区3号楼
新住址：阳光花园5号楼
负责人：张三

一、证件文件

□ 身份证、户口本、护照
□ 房产证、租房合同、物业资料
□ 银行卡、证件照、重要票据
□ 学籍资料、医疗资料、保险资料

二、贵重物品

□ 首饰、手表、收藏品
□ 电脑、相机、平板、硬盘
□ 现金、银行卡、备用钥匙
□ 易碎或高价值物品单独打包并贴标签

三、生活用品

□ 衣物、床品、毛巾
□ 洗漱用品、护肤用品
□ 厨房用品、餐具、清洁用品
□ 常用药品、充电器、工具箱

四、搬前检查

□ 水、电、燃气是否关闭
□ 门窗是否锁好
□ 快递、外卖、账单地址是否修改
□ 旧房钥匙、门禁卡是否整理

五、搬后确认

□ 大件家具是否完好
□ 重要物品是否齐全
□ 水电网络是否可用
□ 纸箱和垃圾是否清理完毕

备注：贵重物品建议由本人随身携带，不交由搬家公司统一运输。`,
  "旅行清单模板": `旅行清单

出行日期：2026年7月10日—2026年7月14日
目的地：杭州
出行人数：2人
整理人：张三

一、证件与票据

□ 身份证
□ 高铁票 / 机票订单
□ 酒店订单截图
□ 学生证、优惠证件
□ 旅游保险凭证

二、电子设备

□ 手机、充电器、充电宝
□ 耳机、相机、存储卡
□ 转换插头、数据线
□ 地图、打车、酒店 App 提前登录

三、衣物用品

□ 换洗衣物4套
□ 外套1件
□ 舒适鞋1双
□ 睡衣、袜子、内衣
□ 洗漱用品、护肤品、防晒霜

四、常用药品

□ 感冒药、肠胃药
□ 创可贴、碘伏棉签
□ 晕车药、过敏药
□ 个人长期服用药品

五、出发前确认

□ 门窗关闭
□ 水电燃气关闭
□ 垃圾清理
□ 充电宝充满电
□ 行程和紧急联系人已告知家人

备注：出发当天请提前2小时到达车站或机场，证件和手机建议随身携带。`,
};

function buildContent(title, format) {
  if (FORMULA_CONTENT[title]) {
    return FORMULA_CONTENT[title];
  }

  const cleanTitle = title.replace("模板", "");

  if (title.includes("搬家清单")) {
    return `搬家清单模板

使用说明：
本模板用于搬家前后核对物品和事项，避免遗漏重要文件、贵重物品和生活用品。可按实际家庭情况增删项目。

一、证件文件
□ 身份证 / 户口本 / 护照
□ 房产证 / 租房合同 / 物业资料
□ 银行卡 / 证件照 / 重要票据
□ 学籍、医疗、保险等资料

二、贵重物品
□ 首饰、手表、收藏品
□ 电脑、相机、平板等电子设备
□ 现金、银行卡、重要钥匙
□ 易碎或高价值物品单独打包

三、生活用品
□ 衣物、床品、洗漱用品
□ 厨房用品、餐具、清洁用品
□ 常用药品、充电器、工具箱
□ 儿童用品 / 宠物用品

四、搬前检查
□ 水、电、燃气是否关闭
□ 门窗是否锁好
□ 快递、外卖、账单地址是否修改
□ 旧房钥匙、门禁卡是否整理

五、搬后确认
□ 大件家具是否完好
□ 重要物品是否齐全
□ 水电网络是否可用
□ 纸箱和垃圾是否清理完毕`;
  }

  if (title.includes("旅行清单")) {
    return `旅行清单模板

使用说明：
本模板用于出行前整理随身物品和行程准备事项，可根据目的地、天数和出行人群调整。

一、证件与票据
□ 身份证 / 护照 / 驾驶证
□ 车票 / 机票 / 酒店订单
□ 学生证、优惠证件、保险凭证

二、电子设备
□ 手机、充电器、充电宝
□ 相机、耳机、转换插头
□ 常用软件、地图、离线资料

三、衣物用品
□ 换洗衣物、外套、鞋袜
□ 洗漱用品、护肤用品、防晒用品
□ 雨伞、纸巾、收纳袋

四、常用药品
□ 感冒药、肠胃药、创可贴
□ 晕车药、过敏药、个人常用药

五、出发前确认
□ 门窗关闭
□ 水电燃气关闭
□ 垃圾清理
□ 行程和联系人已确认`;
  }

  if (title.includes("物料清单")) {
    return `物料清单模板

使用说明：
本模板适合活动、会议、拍摄、布置等场景，用于提前核对所需物料、数量、负责人和准备状态。

一、基础信息
活动名称：【活动名称】
使用日期：【日期】
使用地点：【地点】
负责人：【负责人】

二、物料明细
1. 物料名称：【物料名称】
   数量：【数量】
   用途：【用途说明】
   准备状态：【未准备 / 已准备 / 已到位】

2. 物料名称：【物料名称】
   数量：【数量】
   用途：【用途说明】
   准备状态：【未准备 / 已准备 / 已到位】

三、检查记录
□ 数量是否准确
□ 是否有备用物料
□ 是否明确保管人
□ 是否完成现场核对`;
  }

  if (title.includes("证明")) {
    return `${title}\n\n【接收单位 / 使用场景】：\n\n兹证明【姓名】，因【事项原因】需要开具本证明。经核实，相关情况如下：\n\n一、基本信息\n姓名：【姓名】\n联系方式：【联系电话】\n事项说明：【在此填写需要证明的具体事项】\n\n二、证明内容\n【请在此填写证明内容，说明事实情况、时间范围和用途。】\n\n本证明仅用于【用途说明】，不作其他用途。\n\n特此证明。\n\n出具单位 / 个人：【名称】\n经办人：【经办人】\n联系电话：【联系电话】\n日期：【日期】`;
  }

  if (title.includes("清单") || title.includes("表")) {
    return `${title}\n\n使用说明：\n本模板用于整理「${cleanTitle}」相关项目。请根据实际情况增删条目，并补充负责人、时间、数量或状态。\n\n一、基础信息\n名称：【名称】\n日期：【日期】\n负责人：【负责人】\n备注：【备注说明】\n\n二、清单内容\n${format.map((item, index) => `${index + 1}. ${item}：【填写具体内容】`).join("\n")}\n\n三、核对记录\n□ 内容是否完整\n□ 数量是否准确\n□ 责任人是否明确\n□ 是否完成最终确认`;
  }

  return `${title}\n\n使用说明：\n本模板适合需要准备「${cleanTitle}」的场景。请根据实际情况替换【】中的内容，避免直接使用示例信息。\n\n标准结构：\n${format.map((item, index) => `${index + 1}. ${item}：【填写具体内容】`).join("\n")}\n\n正文示例：\n【称呼】：\n\n您好！\n\n我是【姓名】，现就【事项名称】进行说明 / 申请 / 汇报，具体内容如下：\n\n一、基本情况\n【请填写事项背景、时间、地点、涉及对象或基本原因。】\n\n二、具体内容\n【请填写主要内容、处理过程、工作安排或个人想法。】\n\n三、后续安排\n【请填写下一步计划、承诺事项、处理方式或联系方式。】\n\n以上内容请予参考。\n\n署名：【姓名 / 单位名称】\n日期：【日期】`;
}

function getTemplateType(title, category) {
  if (title.includes("PPT")) return "ppt";
  if (title.includes("海报")) return "poster";
  if (category === "表格清单") return "excel";
  return "word";
}

function getTemplateScenario(title, category) {
  if (title.includes("PPT")) {
    return `完整 PPT 资料，围绕「${title.replace(" PPT", "")}」整理内容，后续下载文件以可直接套用为标准，只需按实际情况修改学校、班级、姓名和日期。`;
  }
  if (title.includes("海报")) {
    return `风格化海报模板，适合节日节气、校园宣传、公众号配图等场景。网站展示预览，高清文件后续通过下载页面获取。`;
  }
  return `适合${category}中需要快速准备「${title.replace("模板", "")}」的场景，打开即可查看完整示例并按实际情况少量修改。`;
}

function getDownloadLabel(type) {
  if (type === "ppt") return "前往下载 PPT";
  if (type === "poster") return "前往下载海报";
  return "前往下载";
}

const templates = TEMPLATE_SEED.map(([title, category, tag, format], index) => {
  const type = getTemplateType(title, category);
  return {
    id: index + 1,
    slug: toTemplateSlug(title),
    title,
    category,
    tag,
    type,
    format,
    scenario: getTemplateScenario(title, category),
    content: buildContent(title, format),
    note: type === "word" || type === "excel" ? "模板已提供完整示例，使用时请根据真实姓名、日期、单位和具体事项替换红色内容。" : "下载链接将通过外部下载页提供，当前先预留入口。",
    downloadMode: type === "ppt" || type === "poster" ? "external" : "copy",
    downloadUrl: "",
  };
});


const RED_FIELD_PATTERNS = [
  /张三/g,
  /李四/g,
  /王五/g,
  /赵六/g,
  /某某某公司/g,
  /某某小学/g,
  /市场部/g,
  /运营部/g,
  /行政部/g,
  /销售部/g,
  /客服部/g,
  /二年级一班/g,
  /三年级一班/g,
  /2026年\d{1,2}月\d{1,2}日/g,
  /2026年\d{1,2}月/g,
  /\d{4}年\d{1,2}月\d{1,2}日/g,
  /13800000000/g,
  /13900000000/g,
  /\d+元/g,
  /幸福小区3号楼/g,
  /阳光花园5号楼/g,
  /杭州/g,
  /张老师/g,
  /李老师/g,
  /李明/g,
  /王芳/g,
  /李校长/g,
  /王主任/g,
  /某某课题/g,
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markEditableFields(text) {
  let html = escapeHtml(text);
  RED_FIELD_PATTERNS.forEach((pattern) => {
    html = html.replace(pattern, (match) => `<span style="color:#d93025;font-weight:600;">${match}</span>`);
  });
  return html;
}

function isRightAlignedLine(line) {
  return /^(申请人|请假人|汇报人|总结人|述职人|说课教师|执教教师|听课人|记录人|说明人|投诉人|委托人|受托人|策划人|负责人|班主任|联系电话|日期|2026年|\d{4}年)/.test(line);
}

function buildWordHtml(content) {
  const lines = String(content || "").split("\n");
  const firstTextIndex = lines.findIndex((line) => line.trim());

  const body = lines
    .map((raw, index) => {
      const line = raw.trim();

      if (!line) {
        return `<p style="margin:0 0 10px 0;line-height:1.8;">&nbsp;</p>`;
      }

      const marked = markEditableFields(line);

      if (index === firstTextIndex) {
        return `<h1 style="text-align:center;font-size:22pt;font-weight:700;margin:0 0 24px 0;line-height:1.4;font-family:'SimHei','Microsoft YaHei',sans-serif;">${marked}</h1>`;
      }

      if (/^[一二三四五六七八九十]+、/.test(line)) {
        return `<h2 style="font-size:14pt;font-weight:700;margin:18px 0 8px 0;line-height:1.8;font-family:'SimHei','Microsoft YaHei',sans-serif;">${marked}</h2>`;
      }

      if (/^（[一二三四五六七八九十]+）/.test(line)) {
        return `<h3 style="font-size:12pt;font-weight:700;margin:14px 0 6px 0;line-height:1.8;font-family:'SimHei','Microsoft YaHei',sans-serif;">${marked}</h3>`;
      }

      if (/^\d+[.、]/.test(line)) {
        return `<p style="font-size:12pt;margin:0 0 8px 0;line-height:1.9;text-indent:0;font-family:'FangSong','SimSun',serif;">${marked}</p>`;
      }

      if (isRightAlignedLine(line)) {
        return `<p style="font-size:12pt;margin:0 0 8px 0;line-height:1.9;text-align:right;font-family:'FangSong','SimSun',serif;">${marked}</p>`;
      }

      return `<p style="font-size:12pt;margin:0 0 8px 0;line-height:1.9;text-indent:2em;font-family:'FangSong','SimSun',serif;">${marked}</p>`;
    })
    .join("");

  return `
    <div style="background:#ffffff;color:#111111;font-family:'FangSong','SimSun',serif;font-size:12pt;line-height:1.9;">
      <div style="max-width:720px;margin:0 auto;padding:48px 56px;background:#ffffff;">
        ${body}
        <div style="margin-top:24px;border-top:1px solid #e5e5e5;padding-top:12px;font-size:10.5pt;color:#888;font-family:'Microsoft YaHei',sans-serif;">
          红色内容为建议替换项，请根据真实情况修改后使用。
        </div>
      </div>
    </div>
  `;
}

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
        {item.type === "ppt" ? <Pill tone="yellow">PPT</Pill> : item.type === "poster" ? <Pill tone="yellow">海报</Pill> : null}
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
      className="group rounded-[26px] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f5f5f5] text-[#111] transition group-hover:bg-[#111] group-hover:text-white">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#111]">{category.name}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[#777]">{category.desc}</p>
        </div>
      </div>
    </button>
  );
}

function TypeCard({ type }) {
  const Icon = type.icon;
  return (
    <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-[#111]">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <span className="text-[14px] font-medium text-[#111]">{type.name}</span>
    </div>
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
              <a href="#categories">分类</a>
              <a href="#popular">模板</a>
              <a href="/posters">海报素材</a>
            </nav>
            <button onClick={openLogin} className="inline-flex items-center rounded-full bg-[#111] px-4 py-2 text-[13px] font-medium text-white">
              <UserRound className="mr-1.5 h-4 w-4" /> 我的
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
  const [wordCopied, setWordCopied] = useState(false);
  const [wordPreviewOpen, setWordPreviewOpen] = useState(true);
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
    setWordCopied(false);
    setWordPreviewOpen(true);
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
    showToast("纯文本已复制");
    setTimeout(() => setCopied(false), 1400);
  };

  const copyTemplateWord = async () => {
    if (!selected) return;

    const html = buildWordHtml(selected.content);
    const plainText = selected.content;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" }),
          }),
        ]);
      } else {
        await copyText(plainText);
      }

      setWordCopied(true);
      showToast("Word排版版已复制");
      setTimeout(() => setWordCopied(false), 1400);
    } catch {
      await copyText(plainText);
      showToast("当前浏览器不支持排版复制，已改为复制纯文本");
    }
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
        <Hero query={query} setQuery={setQuery} scrollToResults={scrollToResults} openCategoryPage={openCategoryPage} />

        <section id="categories" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-4 md:px-8">
          <div className="rounded-[34px] bg-[#f5f5f5]">
            <SectionTitle title="模板分类" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {CATEGORY_CONFIG.map((item) => (
                <CategoryCard key={item.id} category={item} onSelect={openCategoryPage} />
              ))}
            </div>

          </div>
        </section>

        <PosterEntrySection />

        {favoriteTemplates.length > 0 ? <TemplateRail title="我的收藏" items={favoriteTemplates} onOpen={setSelected} favorite /> : null}

        <TemplateResults query={query} setQuery={setQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filtered={filtered} setSelected={setSelected} setRequestOpen={setRequestOpen} />
        <AboutSection setRequestOpen={setRequestOpen} />
      </main>
      <Footer setInfoOpen={setInfoOpen} />
    </>
  );
}

function PosterEntrySection() {
  const featuredTitles = ["立春", "清明", "处暑", "春节", "中秋节", "教师节"];
  const featuredPosters = featuredTitles
    .map((title) => posterCatalog.find((poster) => poster.title === title))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-[1380px] px-5 py-8 md:px-8">
      <div className="rounded-[34px] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[30px] font-semibold tracking-[-0.04em] text-[#111] md:text-[42px]">海报素材</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#666]">节气节日海报，下载后可直接使用</p>
          </div>
          <a
            href="/posters"
            className="inline-flex w-fit items-center rounded-full bg-[#111] px-6 py-3 text-[14px] font-medium !text-white transition hover:bg-[#333]"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">查看全部海报</span>
            <ArrowRight className="ml-2 h-4 w-4 text-white" />
          </a>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {featuredPosters.map((poster) => {
            const previewUrl = `/poster-assets/${poster.preview}`;

            return (
              <a key={poster.id} href="/posters" className="group overflow-hidden rounded-[24px] bg-[#f5f5f5]">
                <img src={previewUrl} alt={`${poster.title}海报预览`} className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />
                <div className="p-3">
                  <div className="truncate text-[14px] font-semibold text-[#111]">{poster.title}</div>
                  <div className="mt-1 text-[12px] text-[#777]">{poster.category === "solar_terms" ? "二十四节气海报" : "节日海报"}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Hero({ query, setQuery, scrollToResults, openCategoryPage }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 pb-3 pt-5 md:px-8">
      <div className="relative overflow-hidden rounded-[34px] bg-white px-6 py-8 md:px-10 md:py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <h1 className="text-[42px] font-semibold leading-[1.05] tracking-[-0.055em] text-[#111] md:text-[68px]">
                实用模板库
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#666] md:text-[17px]">办公、教师、活动、生活常用模板，一处查找。</p>
            </div>

            <div>
              <div className="flex items-center rounded-full bg-[#f5f5f5] p-2">
                <Search className="ml-5 h-5 w-5 text-[#999]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && scrollToResults()}
                  placeholder="搜索请假条、工作总结、教学设计、PPT..."
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

              <div className="mt-4 flex flex-wrap gap-2">
                {HOT_KEYWORDS.slice(0, 8).map((word) => (
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
            </div>
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
        title={activeCategory === "全部" ? "全部模板" : activeCategory}
        desc={query ? `已找到 ${filtered.length} 个相关模板` : undefined}
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
      <p className="mt-3 text-[15px] leading-7 text-[#777]">换个关键词试试，或者提交模板需求。</p>
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

function DetailPage({
  item,
  related,
  openHome,
  openCategoryPage,
  setSelected,
  favorites,
  toggleFavorite,
  copied,
  copyTemplate,
  copyTemplateLink,
}) {
  const isFavorite = favorites.includes(item.id);
  const [wordPreviewOpen, setLocalWordPreviewOpen] = useState(true);
  const [wordCopied, setLocalWordCopied] = useState(false);

  useEffect(() => {
    setLocalWordPreviewOpen(true);
    setLocalWordCopied(false);
  }, [item.id]);

  const copyTemplateWordLocal = async () => {
    const html = buildWordHtml(item.content);
    const plainText = item.content;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(plainText);
      }

      setLocalWordCopied(true);
      window.setTimeout(() => setLocalWordCopied(false), 1400);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = plainText;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setLocalWordCopied(true);
      window.setTimeout(() => setLocalWordCopied(false), 1400);
    }
  };

  if (item.type === "ppt" || item.type === "poster") {
    return (
      <AssetDetailPage
        item={item}
        related={related}
        openHome={openHome}
        openCategoryPage={openCategoryPage}
        setSelected={setSelected}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        copyTemplateLink={copyTemplateLink}
      />
    );
  }

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
            <h2 className="text-[26px] font-semibold">Word预览与复制</h2>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-[14px] transition ${isFavorite ? "bg-[#fff3d6] text-[#9a6a00]" : "bg-[#f5f5f5] text-[#111] hover:bg-[#eee]"}`}
              >
                <Star className="mr-2 h-4 w-4" />
                {isFavorite ? "已收藏" : "收藏模板"}
              </button>

              <button
                onClick={() => setLocalWordPreviewOpen((value) => !value)}
                className="inline-flex items-center rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] text-[#111] transition hover:bg-[#eee]"
              >
                <Eye className="mr-2 h-4 w-4" />
                {wordPreviewOpen ? "收起预览" : "预览Word"}
              </button>

              <button
                onClick={copyTemplateWordLocal}
                className="inline-flex items-center rounded-full bg-[#111] px-5 py-2.5 text-[14px] text-white"
              >
                {wordCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {wordCopied ? "已复制Word版" : "复制到Word（推荐）"}
              </button>

              <button
                onClick={copyTemplate}
                className="inline-flex items-center rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] text-[#111] transition hover:bg-[#eee]"
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "已复制" : "复制纯文本"}
              </button>

              <button
                onClick={() => copyTemplateLink(item)}
                className="inline-flex items-center rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px] text-[#111] transition hover:bg-[#eee]"
              >
                <Link className="mr-2 h-4 w-4" />
                复制链接
              </button>
            </div>
          </div>

          {wordPreviewOpen ? <WordPreview content={item.content} /> : null}

          <pre className="mt-4 whitespace-pre-wrap rounded-[30px] bg-[#f8f8f8] p-6 text-[15px] leading-8 text-[#333]">{item.content}</pre>
        </div>

        <aside className="space-y-4">
          <InfoBox title="填写提醒" lines={[item.note]} />
          <InfoBox title="收藏功能" lines={[isFavorite ? "这个模板已加入收藏。" : "点击收藏后，可在本页快速找到常用模板。"]} />
          <InfoBox title="Word使用提示" lines={["点击复制到Word后，打开Word直接粘贴即可。红色文字为必须检查和替换的内容，普通黑色正文可按需保留。"]} dark />
        </aside>
      </section>

      <section className="mt-4 rounded-[36px] bg-white p-6 md:p-8">
        <SectionTitle
          title="相关模板"
          desc="同分类下的其他常用模板。"
          action={<button onClick={() => openCategoryPage(item.category)} className="rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px]">查看全部</button>}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {related.map((template) => (
            <TemplateCard key={template.id} item={template} onOpen={setSelected} />
          ))}
        </div>
      </section>
    </main>
  );
}

function AssetDetailPage({ item, related, openHome, openCategoryPage, setSelected, favorites, toggleFavorite, copyTemplateLink }) {
  const isFavorite = favorites.includes(item.id);
  const isPpt = item.type === "ppt";
  const downloadLabel = getDownloadLabel(item.type);
  const handleDownload = () => {
    if (item.downloadUrl) {
      window.open(item.downloadUrl, "_blank", "noopener,noreferrer");
      return;
    }
    window.alert("下载链接正在整理中");
  };

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
          <Pill tone="yellow">{isPpt ? "PPT" : "海报"}</Pill>
          <Pill tone="green">免费</Pill>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="text-[38px] font-semibold leading-tight tracking-[-0.055em] md:text-[60px]">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#666]">{item.scenario}</p>
            <div className="mt-8 flex flex-wrap gap-3">
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
              <button onClick={handleDownload} className="inline-flex items-center rounded-full bg-[#111] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#333]">
                <Download className="mr-2 h-4 w-4" />
                {downloadLabel}
              </button>
            </div>
          </div>
          <div className="rounded-[30px] bg-[#f5f5f5] p-6">
            <h2 className="text-[20px] font-semibold">内容包含</h2>
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
          <h2 className="text-[26px] font-semibold">预览与下载</h2>
          <p className="mt-2 text-[14px] leading-7 text-[#777]">当前先预留下载入口。后续上传网盘后，点击按钮即可前往下载页面获取文件。</p>
          <div className="mt-6 flex min-h-[360px] items-center justify-center rounded-[30px] bg-[#f5f5f5] p-8 text-center">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111]">
                {isPpt ? <BookOpen size={28} strokeWidth={1.8} /> : <Star size={28} strokeWidth={1.8} />}
              </div>
              <h3 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-[#111]">{isPpt ? "完整 PPT 资料" : "风格化海报素材"}</h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[#777]">文件预览图和下载链接将在素材确定后补充，当前页面用于提前建立分类和下载结构。</p>
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <InfoBox title="下载说明" lines={["文件将通过下载页面获取。未填写下载链接时，按钮会提示正在整理中。"]} dark />
          <InfoBox title="使用建议" lines={[isPpt ? "PPT 资料将优先做具体课题和主题内容，减少下载后的二次制作成本。" : "海报素材将优先做节日节气风格化设计，适合校园、公众号和活动宣传。"]} />
        </aside>
      </section>

      {related.length > 0 ? (
        <section className="mt-4 rounded-[36px] bg-white p-6 md:p-8">
          <SectionTitle title="相关模板" action={<button onClick={() => openCategoryPage(item.category)} className="rounded-full bg-[#f5f5f5] px-5 py-2.5 text-[14px]">查看全部</button>} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {related.map((template) => (
              <TemplateCard key={template.id} item={template} onOpen={setSelected} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function WordPreview({ content }) {
  return (
    <div className="rounded-[30px] bg-[#f3f3f3] p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111]">Word 预览窗口</h3>
          <p className="mt-1 text-[13px] text-[#777]">红色内容为需要用户替换的提示项，例如姓名、公司、日期、金额、联系方式。</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[#777]">A4排版预览</span>
      </div>

      <div className="mx-auto max-h-[680px] max-w-[780px] overflow-auto rounded-[18px] bg-[#dcdcdc] p-4 shadow-inner">
        <div
          className="mx-auto min-h-[720px] max-w-[680px] bg-white px-8 py-10 text-[#111] shadow-[0_12px_40px_rgba(15,23,42,0.12)] md:px-12 md:py-12"
          dangerouslySetInnerHTML={{ __html: buildWordHtml(content) }}
        />
      </div>
    </div>
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
        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#666]">{meta?.desc} 当前共整理 {list.length} 个内容。</p>
      </section>

      <section className="mt-4 rounded-[36px] bg-white p-6 md:p-8">
        <SectionTitle
          title={name}
          desc="点击内容可查看详情、预览和使用方式。"
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
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/65">支持模板预览、复制和下载，具体功能会根据模板类型展示。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#111]">复制到Word</span>
            <span className="rounded-full bg-white/10 px-5 py-3 text-[14px] font-medium text-white">更多模板持续更新</span>
          </div>
        </div>
        <div className="rounded-[36px] bg-white p-8 md:p-11">
          <ShieldCheck className="h-10 w-10" />
          <h3 className="mt-12 text-[28px] font-semibold">使用说明</h3>
          <p className="mt-4 text-[15px] leading-8 text-[#777]">打开模板详情后，可按页面提示预览、复制或下载。</p>
        </div>
      </div>
    </section>
  );
}

function UsageSection() {
  return (
    <section id="membership" className="scroll-mt-24 mx-auto max-w-[1380px] px-5 py-10 md:px-8">
      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox title="免费开放使用" lines={["当前全部模板免费开放，打开即可查看、复制和使用。", "需要修改的内容会在 Word 预览里标红，用户照着替换即可。"]} />
        <InfoBox title="更多实用功能" lines={["持续补充 Word、PPT、图片和表格模板。"]} dark />
      </div>
    </section>
  );
}

function AboutSection({ setRequestOpen }) {
  return (
    <section className="mx-auto max-w-[1380px] px-5 pb-14 pt-2 md:px-8">
      <div className="rounded-[30px] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[24px] font-semibold tracking-[-0.03em] md:text-[32px]">没有找到合适模板？</h2>
            <p className="mt-2 text-[14px] leading-7 text-[#777]">提交需求后，我们会优先补充高频、通用、可直接使用的模板。</p>
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
    <Modal icon={<UserRound size={23} strokeWidth={1.8} />} title="我的模板" onClose={onClose}>
      <p className="mt-3 text-[15px] leading-8 text-[#777]">这里会显示收藏、最近查看和提交过的模板需求。</p>
      <div className="mt-7 grid grid-cols-3 gap-3">
        <Stat label="收藏" value={favoriteCount} />
        <Stat label="最近查看" value={recentCount} />
        <Stat label="需求" value={requestCount} />
      </div>
      <div className="mt-5 rounded-[24px] bg-[#f5f5f5] p-5 text-[14px] leading-7 text-[#666]">收藏和最近查看会保存在当前浏览器中，方便下次继续使用。</div>
      <div className="mt-5 grid gap-3">
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
        <p className="mt-3 text-[15px] leading-8 text-[#777]">需求已提交，我们会参考高频需求继续补充模板。</p>
        <button onClick={close} className="mt-7 w-full rounded-full bg-[#111] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#333]">完成</button>
      </Modal>
    );
  }

  return (
    <Modal icon={<FileText size={23} strokeWidth={1.8} />} title="提交模板需求" onClose={close}>
      <p className="mt-3 text-[15px] leading-8 text-[#777]">告诉我们你需要什么模板。</p>
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
      body: ["你可以通过搜索框查找模板，也可以按分类浏览。", "打开模板详情后，可查看 Word 预览、复制纯文本或复制到 Word。红色内容为需要替换的提示项。"],
    },
    privacy: {
      title: "隐私说明",
      body: ["不登录也可以浏览和使用模板内容。", "我们只会使用必要信息来处理模板需求和改进体验。"],
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
