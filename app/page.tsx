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

const CATEGORY_CONFIG = [
  { id: "work", name: "工作办公", icon: Briefcase, desc: "请假、离职、转正、总结、会议纪要等高频办公文档。" },
  { id: "teacher", name: "教师教育", icon: GraduationCap, desc: "教学设计、说课稿、听课记录、家长会发言稿等教师资料。" },
  { id: "student", name: "学生校园", icon: BookOpen, desc: "自我介绍、竞选演讲、检讨书、读后感、国旗下讲话等。" },
  { id: "life", name: "生活实用", icon: Home, desc: "借条、欠条、收据、证明、委托书、投诉信等生活文书。" },
  { id: "speech", name: "发言讲话", icon: CalendarDays, desc: "主持词、开场白、结束语、领导讲话、获奖感言等。" },
  { id: "career", name: "个人求职", icon: UserRound, desc: "个人简历、自我评价、求职信、面试自我介绍、实习总结等。" },
];

type TemplateSeedItem = [string, string, string, string[]];

const TEMPLATE_SEED: TemplateSeedItem[] = [
  ["请假条模板", "工作办公", "高频使用", ["称呼", "请假原因", "请假时间", "工作安排", "署名日期"]],
  ["调休申请模板", "工作办公", "办公常用", ["申请人", "加班时间", "调休时间", "调休原因", "工作交接"]],
  ["离职通知书模板", "工作办公", "高频使用", ["用人单位", "所在部门", "离职原因", "通知日期", "最后工作日", "交接安排"]],
  ["辞职通知书模板", "工作办公", "正式文书", ["用人单位", "所在部门", "辞职原因", "通知日期", "最后工作日", "交接安排"]],
  ["转正申请模板", "工作办公", "办公常用", ["入职时间", "岗位职责", "试用成果", "不足改进", "转正申请"]],
  ["加薪申请模板", "工作办公", "高意向", ["岗位信息", "工作成果", "申请理由", "期望薪资", "感谢表达"]],
  ["工作总结模板", "工作办公", "办公常用", ["工作概述", "重点成果", "问题不足", "改进措施", "下步计划"]],
  ["周报模板", "工作办公", "高频使用", ["本周完成", "重点进展", "问题风险", "下周计划", "需要支持"]],
  ["月报模板", "工作办公", "办公常用", ["月度目标", "完成情况", "关键数据", "问题分析", "下月计划"]],
  ["会议纪要模板", "工作办公", "办公常用", ["会议信息", "参会人员", "会议议题", "决议事项", "待办跟进"]],

  ["教学设计模板", "教师教育", "教师常用", ["课题", "教学目标", "教学重难点", "教学过程", "教学反思"]],
  ["说课稿模板", "教师教育", "比赛常用", ["说教材", "说学情", "说目标", "说教法", "说过程"]],
  ["公开课教案模板", "教师教育", "公开课", ["课题信息", "教学目标", "教学准备", "教学过程", "课堂评价"]],
  ["公开课逐字稿模板", "教师教育", "公开课", ["导入语", "过渡语", "提问语", "评价语", "小结语"]],
  ["听课记录模板", "教师教育", "教研常用", ["课程信息", "教学过程", "课堂观察", "亮点记录", "改进建议"]],
  ["教学反思模板", "教师教育", "教师常用", ["目标达成", "课堂亮点", "存在问题", "原因分析", "改进措施"]],
  ["家长会发言稿模板", "教师教育", "场景明确", ["开场问候", "班级情况", "学生表现", "家校建议", "结束感谢"]],
  ["班主任评语模板", "教师教育", "期末常用", ["整体评价", "优点表现", "成长变化", "改进建议", "鼓励期待"]],
  ["少先队活动课设计模板", "教师教育", "校园活动", ["活动主题", "活动目标", "活动准备", "活动流程", "活动延伸"]],
  ["班级活动方案模板", "教师教育", "校园活动", ["活动主题", "时间地点", "活动目标", "活动流程", "注意事项"]],

  ["自我介绍模板", "学生校园", "校园常用", ["基本信息", "兴趣特长", "学习经历", "个人优势", "表达目的"]],
  ["竞选演讲稿模板", "学生校园", "校园常用", ["开场问候", "竞选岗位", "个人优势", "服务计划", "结束拉票"]],
  ["检讨书模板", "学生校园", "校园常用", ["错误事实", "原因分析", "认识反思", "改正措施", "保证承诺"]],
  ["读后感模板", "学生校园", "写作常用", ["书籍信息", "主要内容", "印象片段", "个人感受", "联系生活"]],
  ["观后感模板", "学生校园", "写作常用", ["观看内容", "主要情节", "触动之处", "个人感悟", "行动启发"]],
  ["国旗下讲话稿模板", "学生校园", "校园活动", ["主题开场", "事例说明", "观点表达", "行动倡议", "结束语"]],

  ["情况说明书模板", "生活实用", "通用文书", ["说明对象", "事情经过", "原因说明", "处理结果", "落款日期"]],
  ["申请书模板", "生活实用", "通用文书", ["标题", "称呼", "申请事项", "申请理由", "署名日期"]],
  ["投诉信模板", "生活实用", "维权常用", ["投诉对象", "问题经过", "证据说明", "投诉诉求", "联系方式"]],
  ["委托书模板", "生活实用", "正式文书", ["委托人", "受托人", "委托事项", "权限范围", "有效期限"]],
  ["证明模板", "生活实用", "正式文书", ["被证明人", "证明事项", "证明内容", "证明单位", "落款日期"]],
  ["承诺书模板", "生活实用", "正式文书", ["承诺人", "承诺事项", "具体承诺", "责任说明", "签署日期"]],
  ["借条模板", "生活实用", "高风险文书", ["出借人", "借款人", "借款金额", "还款日期", "签名捺印"]],
  ["欠条模板", "生活实用", "高风险文书", ["债权人", "欠款人", "欠款金额", "欠款原因", "还款时间"]],
  ["收据模板", "生活实用", "常用凭证", ["付款人", "收款人", "收款金额", "收款事由", "经手人"]],

  ["主持词模板", "发言讲话", "活动常用", ["开场白", "嘉宾介绍", "流程串联", "互动衔接", "结束语"]],
  ["领导讲话稿模板", "发言讲话", "正式场景", ["开场致意", "活动意义", "工作肯定", "希望要求", "结束祝福"]],
  ["开场白结束语模板", "发言讲话", "活动常用", ["问候开场", "主题引入", "氛围铺垫", "总结回顾", "结束感谢"]],
  ["获奖感言模板", "发言讲话", "场景明确", ["感谢对象", "获奖心情", "经历回顾", "未来表态", "结束致谢"]],
  ["表态发言模板", "发言讲话", "正式场景", ["表明态度", "认识理解", "工作措施", "责任承诺", "结束表态"]],

  ["个人简历模板", "个人求职", "求职常用", ["基本信息", "求职意向", "教育经历", "工作经历", "技能优势"]],
  ["自我评价模板", "个人求职", "求职常用", ["性格特点", "能力优势", "工作态度", "经验积累", "发展方向"]],
  ["求职信模板", "个人求职", "求职常用", ["应聘岗位", "个人背景", "能力匹配", "求职意愿", "联系方式"]],
  ["面试自我介绍模板", "个人求职", "面试常用", ["基本介绍", "经历概述", "岗位优势", "匹配理由", "结束表达"]],
  ["实习总结模板", "个人求职", "实习常用", ["实习岗位", "实习内容", "收获成长", "不足反思", "未来计划"]],
  ["离职交接清单模板", "个人求职", "交接常用", ["工作事项", "文件资料", "账号权限", "待办问题", "交接确认"]],
];

const HOT_KEYWORDS = ["请假条", "离职通知", "工作总结", "教学设计", "说课稿", "情况说明", "借条", "自我介绍"];
const CATEGORY_NAMES = CATEGORY_CONFIG.map((item) => item.name);
const CATEGORY_SLUGS = {
  工作办公: "work",
  教师教育: "teacher",
  学生校园: "student",
  生活实用: "life",
  发言讲话: "speech",
  个人求职: "career",
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
  "请假条模板": "请假条\n\n尊敬的【领导/老师】：\n\n您好！\n\n我是【部门/班级】的【姓名】。因【请假原因】，需于【开始时间】至【结束时间】请假，共计【请假天数】。\n\n请假期间，我已提前做好相关安排：【工作/学习安排说明】。如有紧急事项，可通过【联系电话】与我联系，我会及时配合处理。\n\n恳请批准。\n\n请假人：【姓名】\n【日期】",
  "调休申请模板": "调休申请书\n\n尊敬的【领导称呼】：\n\n您好！\n\n我是【部门名称】的【姓名】。本人于【加班日期】因【加班事项】完成加班，共计【加班时长】。现因【调休原因】，申请于【调休日期】调休【调休时长】。\n\n调休前，我会提前完成【已完成事项】，并将【待跟进事项】同步给【交接人/同事】。调休期间如有紧急情况，我会保持【联系电话】畅通，及时配合处理。\n\n恳请领导批准。\n\n申请人：【姓名】\n【日期】",
  "离职通知书模板": "离职通知书\n\n【公司名称】：\n\n本人【姓名】，身份证号【身份证号码】，现为贵单位【部门名称】【岗位名称】员工。因【离职原因】，本人现依法以书面形式通知贵单位解除劳动合同。\n\n本人于【通知日期】提交本通知，计划最后工作日为【最后工作日期】。如本人仍处于试用期，请将最后工作日调整为自通知之日起满【三日】后的日期；如本人已转正，请将最后工作日调整为自通知之日起满【三十日】后的日期。\n\n为保证工作顺利衔接，本人将在离职前配合完成以下事项：\n\n一、整理并移交本人负责的【工作资料/项目文件/客户信息】；\n二、说明当前未完成事项及后续跟进建议；\n三、配合办理【办公物品/账号权限/资料文件】等交接；\n四、按照公司流程办理离职手续。\n\n本通知为本人解除劳动合同的书面通知，并非请求批准。请贵单位依法配合办理工作交接、工资结算、社保公积金处理及离职证明出具等相关手续。\n\n特此通知。\n\n通知人：【姓名】\n联系电话：【联系电话】\n【日期】",
  "辞职通知书模板": "辞职通知书\n\n【公司名称】：\n\n本人【姓名】为贵单位【部门名称】【岗位名称】员工。因【辞职原因】，经本人慎重考虑，现正式通知贵单位：本人将依法解除与贵单位之间的劳动合同。\n\n本人提交本通知的日期为【通知日期】，预计最后工作日期为【最后工作日期】。本人将按照法律规定及公司交接流程，配合完成离职前的工作交接。\n\n离职前，本人将重点完成以下事项：\n\n一、梳理本人负责的【工作事项/项目进度/客户资料】；\n二、向【交接人/部门】说明待办事项和注意问题；\n三、归还【办公用品/设备/资料】；\n四、配合办理离职手续及相关结算事项。\n\n感谢公司在任职期间给予的平台与支持。后续如需本人配合补充交接说明，可通过【联系电话】与本人联系。\n\n特此通知。\n\n通知人：【姓名】\n【日期】",
  "转正申请模板": "转正申请书\n\n尊敬的【公司名称】领导：\n\n您好！\n\n我是【部门名称】试用员工【姓名】，于【入职日期】入职公司，担任【岗位名称】。根据公司试用期管理要求，现试用期即将结束，特向公司提出转正申请。\n\n试用期间，我主要负责以下工作：\n\n一、【工作内容一】；\n二、【工作内容二】；\n三、【工作内容三】。\n\n在领导和同事的帮助下，我逐步熟悉了岗位流程，也能够独立完成【核心工作任务】。这段时间里，我对公司的业务、团队协作方式和岗位要求有了更深入的了解。\n\n同时，我也认识到自己在【不足之处】方面仍需提升。后续我会继续加强学习，提高工作效率和结果意识。\n\n我认可公司的发展方向，也希望能够以正式员工身份继续为团队贡献力量。恳请公司领导予以考核并批准转正。\n\n申请人：【姓名】\n【日期】",
  "加薪申请模板": "加薪申请书\n\n尊敬的【领导称呼】：\n\n您好！\n\n我是【部门名称】的【姓名】，目前担任【岗位名称】。自【入职时间】入职以来，我一直认真履行岗位职责，积极配合团队推进各项工作。\n\n近期工作中，我主要完成了以下成果：\n\n一、【工作成果一】，带来了【结果/数据/影响】；\n二、【工作成果二】，提升了【效率/质量/转化】；\n三、【工作成果三】，协助团队完成【项目/任务】。\n\n随着岗位职责增加和工作内容拓展，我希望公司能结合本人工作表现、岗位价值及实际贡献，对薪资进行适当调整。本人期望薪资调整为【期望薪资/调整幅度】。\n\n无论结果如何，我都会继续保持认真负责的工作态度，不断提升自身能力，为团队创造更多价值。恳请领导予以考虑。\n\n申请人：【姓名】\n【日期】",
  "工作总结模板": "个人工作总结\n\n总结人：【姓名】\n所属部门：【部门名称】\n总结周期：【时间周期】\n\n一、工作概述\n\n在【时间周期】内，我围绕【核心工作目标】开展工作，主要完成了【主要工作方向一】、【主要工作方向二】和【主要工作方向三】等任务。整体来看，本阶段工作推进【总体情况】，重点事项基本完成。\n\n二、主要工作完成情况\n\n（一）【工作模块一】\n\n围绕【具体任务】，我完成了【具体内容】，取得了【结果/数据/成果】。\n\n（二）【工作模块二】\n\n在【项目/事项】中，我主要负责【个人职责】，并配合【相关人员/部门】完成【协作内容】。\n\n（三）【工作模块三】\n\n针对【问题/需求】，我进行了【处理方式】，目前已实现【处理结果】。\n\n三、工作亮点\n\n本阶段较有价值的工作是【亮点事项】。该事项在【效率提升/流程优化/结果转化/用户反馈】方面起到了一定作用。\n\n四、存在不足\n\n工作中仍存在一些不足，例如【不足一】、【不足二】。主要原因是【原因分析】，后续需要进一步改进。\n\n五、下一步计划\n\n接下来，我将重点做好以下工作：\n\n一、继续推进【计划一】；\n二、优化完善【计划二】；\n三、提升【能力/流程/效率】；\n四、及时复盘问题，确保工作更有条理。\n\n总结人：【姓名】\n【日期】",
  "会议纪要模板": "会议纪要\n\n会议名称：【会议名称】\n会议时间：【会议时间】\n会议地点：【会议地点】\n主持人：【主持人】\n记录人：【记录人】\n参会人员：【参会人员】\n\n一、会议主题\n\n本次会议主要围绕【会议主题】进行讨论，重点明确【核心事项】、【责任分工】和【后续安排】。\n\n二、会议内容\n\n（一）关于【议题一】\n\n会议认为：【讨论结论/主要观点】。相关部门需重点关注【注意事项】。\n\n（二）关于【议题二】\n\n会议明确：【处理意见/执行要求】。由【负责人】负责跟进，并于【完成时间】前反馈进展。\n\n（三）关于【议题三】\n\n会议要求：【具体要求】。后续根据【依据/情况】进一步完善。\n\n三、会议决议\n\n一、【决议事项一】；\n二、【决议事项二】；\n三、【决议事项三】。\n\n四、待办事项\n\n1. 【待办事项一】——负责人：【负责人】——完成时间：【完成时间】；\n2. 【待办事项二】——负责人：【负责人】——完成时间：【完成时间】。\n\n记录人：【记录人】\n【日期】",
  "教学设计模板": "教学设计\n\n课题：【课题名称】\n学科：【学科】\n授课年级：【年级班级】\n课时：【课时安排】\n授课教师：【教师姓名】\n\n一、教材分析\n\n【请填写本课在教材中的位置、主要内容、与单元目标的关系，以及本课学习价值。】\n\n二、学情分析\n\n【请填写学生已有基础、学习特点、可能遇到的困难，以及本课需要重点引导的地方。】\n\n三、教学目标\n\n1. 知识与能力：学生能够掌握【知识点/技能点】，理解【核心内容】。\n2. 过程与方法：学生通过【学习方式】，提升【能力目标】。\n3. 情感态度与价值观：学生能够联系【生活/实际/主题】，形成【价值引导】。\n\n四、教学重点\n\n【请填写本课最需要学生掌握的核心内容。】\n\n五、教学难点\n\n【请填写学生理解或运用中最容易出现困难的地方。】\n\n六、教学准备\n\n教师准备：【课件/学习单/图片/视频/板书设计】。\n学生准备：【预习任务/资料收集/问题思考】。\n\n七、教学过程\n\n（一）情境导入，激发兴趣\n\n教师通过【图片/问题/故事/生活情境】导入，引导学生思考【导入问题】，自然揭示课题。\n\n（二）自主学习，整体感知\n\n学生围绕【学习任务】自主阅读或观察，圈画关键词句，初步了解本课主要内容。\n\n（三）合作探究，突破重点\n\n学生围绕【核心问题】进行小组交流，教师巡视指导，鼓励学生结合文本、材料或生活经验说明理由。\n\n（四）重点点拨，梳理方法\n\n教师根据学生汇报进行归纳，引导学生理解【重点内容】，并总结【学习方法/表达方法】。\n\n（五）练习巩固，迁移运用\n\n学生完成【练习任务/表达任务/实践任务】，教师及时评价反馈，帮助学生巩固所学。\n\n（六）课堂小结，提升认识\n\n教师引导学生回顾本节课内容，总结学习收获，并联系后续学习或生活实际进行提升。\n\n八、板书设计\n\n【请填写板书结构，建议突出课题、关键词和学习方法。】\n\n九、教学反思\n\n【请课后填写目标达成情况、课堂亮点、存在问题和改进措施。】",
  "说课稿模板": "说课稿\n\n课题：【课题名称】\n说课教师：【教师姓名】\n学科：【学科】\n授课对象：【年级班级】\n\n各位评委老师，大家好！今天我说课的内容是【课题名称】。下面我将从教材分析、学情分析、教学目标、教学重难点、教学方法、教学过程和板书设计几个方面进行说明。\n\n一、说教材\n\n【课题名称】是【教材版本/册数/单元】中的内容。本课围绕【核心内容】展开，既承接了学生已有的【已有知识】，也为后续学习【后续内容】奠定基础，具有较强的【知识价值/育人价值/实践价值】。\n\n二、说学情\n\n【年级班级】学生已经具备【已有基础】，但在【学习难点/能力短板】方面仍需要教师引导。因此，本节课我将通过【教学策略】帮助学生理解重点、突破难点。\n\n三、说教学目标\n\n根据课程标准、教材内容和学生实际，我确定以下教学目标：\n\n1. 学生能够掌握【知识目标】；\n2. 学生能够通过【学习活动】提升【能力目标】；\n3. 学生能够感受【情感目标/价值目标】。\n\n四、说教学重难点\n\n本课教学重点是【教学重点】。\n教学难点是【教学难点】。\n\n五、说教学方法\n\n本节课主要采用【教学方法一】、【教学方法二】和【教学方法三】。通过情境创设、问题引导和合作探究，让学生在参与中理解，在表达中提升。\n\n六、说教学过程\n\n第一环节：情境导入。通过【导入方式】引出课题，激发学生学习兴趣。\n\n第二环节：自主学习。学生围绕【学习任务】自主阅读或观察，初步感知内容。\n\n第三环节：合作探究。学生围绕【核心问题】小组讨论，并进行交流展示。\n\n第四环节：重点点拨。教师根据学生回答进行归纳总结，突破教学重难点。\n\n第五环节：练习巩固。学生完成【练习/表达/实践任务】，实现知识迁移。\n\n第六环节：总结提升。教师带领学生回顾本课内容，归纳学习方法，提升课堂价值。\n\n七、说板书设计\n\n本节课板书围绕【课题名称】展开，突出【关键词一】、【关键词二】和【关键词三】，力求简洁清晰，帮助学生形成知识结构。\n\n我的说课到此结束，谢谢各位老师。",
  "公开课教案模板": "公开课教案\n\n课题：【课题名称】\n授课教师：【教师姓名】\n授课班级：【年级班级】\n课时安排：【课时】\n授课时间：【授课时间】\n\n一、教学目标\n\n1. 学生能够掌握【知识点】，理解【核心内容】。\n2. 学生能够通过【学习活动】，提升【阅读/表达/思考/实践】能力。\n3. 学生能够联系【生活实际/主题情境】，形成【情感态度或价值认识】。\n\n二、教学重点\n\n【请填写本节课必须落实的核心知识或关键能力。】\n\n三、教学难点\n\n【请填写学生理解、表达或迁移运用中容易出现困难的内容。】\n\n四、教学准备\n\n教师准备：【课件、学习单、板书、图片、视频等】。\n学生准备：【预习任务、资料收集、问题思考等】。\n\n五、教学过程\n\n（一）创设情境，导入新课\n\n教师通过【情境材料】提出问题：【导入问题】。学生自由交流后，教师顺势揭示课题。\n\n（二）初步感知，明确任务\n\n学生围绕【学习任务】自主学习，圈画重点信息，教师巡视指导并进行必要提示。\n\n（三）合作探究，交流展示\n\n学生围绕【核心问题】进行小组讨论，形成小组观点。小组代表汇报，其他学生补充评价。\n\n（四）教师点拨，突破难点\n\n教师结合学生交流情况，引导学生抓住【关键词/方法/结构】，帮助学生突破理解难点。\n\n（五）课堂练习，巩固提升\n\n学生完成【练习任务】，教师根据学生表现进行评价，鼓励学生说清思路和理由。\n\n（六）课堂小结，拓展延伸\n\n教师引导学生总结本节课学习内容，归纳学习方法，并布置与【主题/生活/后续学习】相关的拓展任务。\n\n六、板书设计\n\n【请填写板书内容，建议使用“课题 + 关键词 + 方法”的结构。】\n\n七、教学反思\n\n本节课的亮点是【课堂亮点】；需要改进的是【不足之处】。后续将从【改进方向】继续优化。",
  "公开课逐字稿模板": "公开课逐字稿\n\n课题：【课题名称】\n执教教师：【教师姓名】\n授课班级：【年级班级】\n\n一、导入环节\n\n同学们，上课前请大家先看【图片/问题/材料】。看到它，你想到了什么？\n\n学生自由回答。\n\n教师评价：你观察得很仔细；你的想法很有意思；你能联系生活来说，说明你在认真思考。\n\n今天我们就一起学习【课题名称】。请同学们齐读课题。\n\n二、初读感知\n\n请同学们打开【课本/学习材料】，自由朗读或阅读一遍。读的时候思考两个问题：第一，【问题一】；第二，【问题二】。\n\n学生阅读，教师巡视。\n\n刚才老师看到很多同学都在认真圈画。现在请【学生姓名】来说一说，你找到的重点内容是什么？\n\n学生回答。\n\n教师评价：你抓住了关键词，说明你读得很认真。\n\n三、合作探究\n\n下面请同学们四人为一组，围绕这个问题进行讨论：【核心问题】。讨论时要做到人人发言，并说清楚自己的理由。\n\n小组讨论。\n\n哪个小组愿意分享？请【小组名称】代表发言。\n\n学生汇报。\n\n教师评价：你们小组表达很完整，不仅说出了答案，还说明了理由。\n\n四、重点讲解\n\n刚才同学们已经找到了很多重要信息。老师把大家的观点整理一下。我们可以从【角度一】、【角度二】、【角度三】三个方面理解。\n\n这里有一个地方容易出错，请大家看大屏幕。这个问题不能只看表面，还要结合【文本/材料/生活实际】来理解。\n\n五、课堂练习\n\n现在请同学们完成学习单第【题号】题。完成后和同桌互相交流。\n\n学生练习。\n\n教师提问：【学生姓名】，你愿意分享一下你的答案吗？\n\n学生回答。\n\n教师评价：你的表达很清楚，如果能再加上理由，会更完整。\n\n六、课堂小结\n\n这节课我们学习了【课题名称】，知道了【知识/方法/主题】。以后遇到类似内容时，同学们也可以按照【方法总结】来学习。\n\n七、作业布置\n\n今天的作业有两项：第一，【作业一】；第二，【作业二】。",
  "情况说明书模板": "情况说明\n\n关于【事项名称】的情况说明\n\n尊敬的【说明对象】：\n\n您好！\n\n我是【姓名/单位/身份】。现就【事项名称】作如下说明。\n\n一、基本情况\n\n【请填写事情发生的时间、地点、背景、涉及人员以及需要说明的核心事项。】\n\n二、具体经过\n\n【请按照时间顺序说明事情经过，尽量客观、清楚，避免情绪化表达。】\n\n三、原因说明\n\n【请说明造成该情况的主要原因，可从客观原因、沟通原因、流程原因等角度填写。】\n\n四、处理结果\n\n截至目前，【请填写已完成的处理措施、目前进展或相关结果】。\n\n五、后续安排\n\n后续本人/本单位将采取以下措施：\n\n一、【后续措施一】；\n二、【后续措施二】；\n三、【后续措施三】。\n\n以上情况属实，特此说明。\n\n说明人/单位：【姓名/单位名称】\n联系电话：【联系电话】\n【日期】",
  "申请书模板": "申请书\n\n尊敬的【申请对象】：\n\n您好！\n\n我是【姓名/单位/身份】。因【申请原因】，现向【申请对象/单位】提出【申请事项】申请。\n\n一、申请事项\n\n本人申请【请填写具体申请内容】，希望能够获得【审批/支持/协助/办理】。\n\n二、申请理由\n\n（一）【理由一】；\n（二）【理由二】；\n（三）【理由三】。\n\n三、相关说明\n\n如申请获批，本人将按照【相关要求/管理规定】执行，并积极配合完成【后续事项】。如需补充材料，本人也会及时提供。\n\n恳请予以考虑和批准。\n\n此致\n敬礼！\n\n申请人：【姓名】\n联系电话：【联系电话】\n【日期】",
  "投诉信模板": "投诉信\n\n投诉人：【姓名】\n联系电话：【联系电话】\n投诉对象：【商家/单位/平台名称】\n投诉事项：【投诉事项】\n\n尊敬的【受理单位/平台客服/相关负责人】：\n\n您好！\n\n本人于【购买/办理/发生时间】在【地点/平台/渠道】购买或办理了【商品/服务名称】。在使用或沟通过程中，出现了【问题描述】，已对本人造成【影响说明】。\n\n一、事实经过\n\n【请按照时间顺序写清楚事情经过，包括购买时间、沟通记录、问题出现时间、对方处理情况等。】\n\n二、问题说明\n\n本人认为该问题主要体现在以下方面：\n\n一、【问题一】；\n二、【问题二】；\n三、【问题三】。\n\n三、已有证据\n\n本人可提供【订单截图/聊天记录/付款凭证/照片/录音/快递记录】等材料作为证明。\n\n四、诉求内容\n\n现本人提出以下诉求：\n\n一、【诉求一】；\n二、【诉求二】；\n三、【诉求三】。\n\n请贵方重视并尽快核实处理，于【期望回复时间】前给予明确答复。\n\n投诉人：【姓名】\n【日期】",
  "委托书模板": "个人委托书\n\n委托人：【委托人姓名】\n身份证号：【委托人身份证号码】\n联系电话：【委托人联系电话】\n\n受托人：【受托人姓名】\n身份证号：【受托人身份证号码】\n联系电话：【受托人联系电话】\n\n本人因【委托原因】，无法亲自办理【委托事项】，现委托【受托人姓名】代为办理相关事宜。\n\n一、委托事项\n\n【请填写具体委托事项，例如：代为提交材料、领取文件、办理手续、签收物品等。】\n\n二、委托权限\n\n受托人在上述事项范围内，可代为【具体权限一】、【具体权限二】、【具体权限三】。\n\n三、委托期限\n\n本委托书有效期自【开始日期】起至【结束日期】止。\n\n四、责任说明\n\n受托人在委托权限范围内办理相关事项所产生的法律后果，由委托人承担。超出委托权限范围的事项，由受托人自行承担责任。\n\n委托人签名：【委托人姓名】\n受托人签名：【受托人姓名】\n【日期】",
  "证明模板": "证明\n\n兹证明【被证明人姓名】，身份证号【身份证号码】，系【单位/学校/社区】的【员工/学生/居民/其他身份】。\n\n经核实，【被证明人姓名】于【时间范围】期间【证明事项】，具体情况如下：\n\n一、【证明内容一】；\n二、【证明内容二】；\n三、【证明内容三】。\n\n本证明仅用于【用途说明】，不作其他用途。\n\n特此证明。\n\n证明单位：【单位名称】\n联系人：【联系人姓名】\n联系电话：【联系电话】\n【日期】",
  "承诺书模板": "承诺书\n\n本人/本单位【承诺人姓名/单位名称】就【承诺事项】郑重承诺如下：\n\n一、本人/本单位承诺【承诺内容一】；\n二、本人/本单位承诺【承诺内容二】；\n三、本人/本单位承诺【承诺内容三】；\n四、本人/本单位将严格按照【相关要求/规定/约定】执行。\n\n如本人/本单位未履行上述承诺，愿意承担由此产生的相应责任。\n\n本承诺书自签署之日起生效。\n\n承诺人/单位：【承诺人姓名/单位名称】\n联系电话：【联系电话】\n【日期】",
  "借条模板": "借条\n\n今【借款人姓名】因【借款用途】，向【出借人姓名】借到人民币【借款金额】元整（大写：【大写金额】）。\n\n借款期限自【借款日期】起至【还款日期】止。借款人承诺于【还款日期】前归还全部借款。\n\n双方关于利息约定如下：【利息约定】。如无利息，请填写“无利息”。\n\n借款人信息：\n姓名：【借款人姓名】\n身份证号：【借款人身份证号码】\n联系电话：【借款人联系电话】\n\n出借人信息：\n姓名：【出借人姓名】\n身份证号：【出借人身份证号码】\n联系电话：【出借人联系电话】\n\n收款账户/方式：【收款账户或收款方式】\n\n借款人签名并捺印：【借款人姓名】\n【日期】",
  "欠条模板": "欠条\n\n本人【欠款人姓名】因【欠款原因】，尚欠【债权人姓名】人民币【欠款金额】元整（大写：【大写金额】）。\n\n本人承诺于【还款日期】前归还上述欠款。如逾期未还，愿意承担由此产生的相关责任。\n\n欠款人信息：\n姓名：【欠款人姓名】\n身份证号：【欠款人身份证号码】\n联系电话：【欠款人联系电话】\n\n债权人信息：\n姓名：【债权人姓名】\n联系电话：【债权人联系电话】\n\n特立此据。\n\n欠款人签名并捺印：【欠款人姓名】\n【日期】",
  "收据模板": "收据\n\n今收到【付款人姓名/单位名称】交来【付款事由】款项，金额为人民币【金额】元整（大写：【大写金额】）。\n\n收款方式：【现金/转账/其他】\n收款日期：【收款日期】\n经手人：【经手人姓名】\n联系电话：【联系电话】\n\n备注：【备注说明】\n\n此据。\n\n收款人/单位：【收款人姓名/单位名称】\n【日期】",
  "个人简历模板": "个人简历\n\n一、基本信息\n\n姓名：【姓名】\n联系电话：【联系电话】\n邮箱：【邮箱地址】\n所在城市：【城市名称】\n求职意向：【目标岗位】\n\n二、教育经历\n\n【学校名称】｜【专业名称】｜【学历】｜【起止时间】\n主修课程：【课程名称】\n在校经历：【奖项/社团/学生工作/项目经历】\n\n三、工作/实习经历\n\n【公司名称】｜【岗位名称】｜【起止时间】\n\n1. 负责【工作内容一】，通过【方法/工具】完成【结果】；\n2. 参与【项目/任务】，承担【个人职责】，取得【成果数据】；\n3. 协助【团队/部门】完成【协作内容】，提升【效率/质量/转化】。\n\n四、项目经历\n\n项目名称：【项目名称】\n项目角色：【个人角色】\n项目内容：【项目简介】\n个人贡献：【个人具体贡献】\n项目成果：【结果数据/作品链接/项目影响】\n\n五、技能证书\n\n【技能/证书一】\n【技能/证书二】\n【软件/工具/语言能力】\n\n六、自我评价\n\n本人具备【能力优势】，做事认真负责，学习能力较强。过往经历中积累了【相关经验】，希望在【目标岗位】方向持续发展，并为团队创造实际价值。",
  "面试自我介绍模板": "面试自我介绍\n\n面试官您好！\n\n我叫【姓名】，毕业于【学校名称】【专业名称】，今天应聘的是【应聘岗位】。\n\n过去我曾在【公司/项目/学校经历】中负责【相关工作内容】，主要完成了【具体成果】。这段经历让我熟悉了【岗位相关能力】，也提升了我的沟通协调、执行落地和复盘总结能力。\n\n我认为自己比较适合这个岗位，主要有三点原因：\n\n第一，我具备【能力优势一】，能够胜任【岗位任务一】；\n第二，我有【相关经验】，对【业务/行业/工具】有一定了解；\n第三，我对【行业/岗位方向】比较感兴趣，愿意持续学习并长期投入。\n\n如果有机会加入贵公司，我会尽快熟悉业务，认真完成工作，为团队创造价值。\n\n以上就是我的自我介绍，谢谢。",
  "自我介绍模板": "自我介绍\n\n大家好！\n\n我叫【姓名】，来自【学校/班级/单位】。我是一个【性格特点】的人，平时喜欢【兴趣爱好】，也愿意主动参与集体活动。\n\n在学习和生活中，我比较擅长【优势特长】。过去我曾经参与过【相关经历】，这段经历让我学会了【收获成长】。\n\n我希望通过这次自我介绍，让大家更好地认识我。接下来，我也会继续努力，积极学习，认真完成自己的任务，并和大家友好相处。\n\n谢谢大家！",
  "竞选演讲稿模板": "竞选演讲稿\n\n尊敬的老师、亲爱的同学们：\n\n大家好！\n\n我是【姓名】，今天我要竞选的是【竞选岗位】。非常感谢老师和同学们给我这次展示自己的机会。\n\n我认为自己竞选这个岗位有以下几个优势：\n\n第一，我【个人优势一】；\n第二，我【个人优势二】；\n第三，我愿意为班级和同学服务，认真完成老师交给的任务。\n\n如果我能够竞选成功，我会从以下方面努力：\n\n一、认真负责，做好本职工作；\n二、主动帮助同学，维护班级秩序；\n三、积极配合老师，参与班级管理；\n四、听取同学意见，努力让班级变得更好。\n\n如果没有竞选成功，我也不会气馁，会继续向优秀同学学习。希望大家支持我，投我一票。\n\n谢谢大家！",
};

function buildContent(title, format) {
  if (FORMULA_CONTENT[title]) return FORMULA_CONTENT[title];

  return `${title}

适用场景：
适合需要快速准备「${title.replace("模板", "")}」的场景。正文采用正式通用结构，复制后可直接粘贴到 Word，并根据红色字段替换个人信息。

标准结构：
${format.map((item, index) => `${index + 1}. ${item}：【请填写${item}】`).join("\n")}

正文示例：
尊敬的【称呼/对象】：

您好！

我是【姓名/单位/身份】，现就【事项名称】进行说明/申请/汇报，具体内容如下：

一、基本情况

【请在此填写事情背景、使用场景或基本信息。】

二、具体内容

【请在此填写主要内容、过程、理由、安排或个人想法。】

三、后续安排

【请在此填写下一步计划、承诺事项、处理方式或联系方式。】

以上内容请予以参考/审批/知悉。

此致
敬礼！

署名：【姓名/单位】
日期：【日期】`;
}const templates = TEMPLATE_SEED.map(([title, category, tag, format], index) => ({
  id: index + 1,
  slug: toTemplateSlug(title),
  title,
  category,
  tag,
  format,
  scenario: `适合${category}中需要快速准备「${title.replace("模板", "")}」的场景，打开即可查看标准结构并复制修改。`,
  content: buildContent(title, format),
  note: title.includes("离职通知") || title.includes("辞职通知")
    ? "红色内容为必须替换项。离职/辞职在法律表述上属于书面通知，不建议写成“申请批准”。复制到 Word 后，请按实际试用期或转正状态调整通知期限。"
    : "红色内容为必须替换项。复制到 Word 后，请先改完所有红色字段，再根据实际情况删减段落，避免直接提交占位内容。",
}));


const RED_FIELD_PATTERNS = [
  /【[^】]+】/g,
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
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
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

    // 修复：从「相关模板」或列表切换到新模板时，页面会停留在当前滚动位置。
    // 等详情页内容完成切换后，再回到顶部，避免用户看到的是新模板页面中部/底部。
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
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
          <div className="mb-6 inline-flex rounded-full bg-[#f5f5f5] px-4 py-2 text-[14px] font-medium text-[#777]">免费复制 · Word预览 · 红色替换提示</div>
          <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.055em] md:text-[76px] lg:text-[88px]">
            常用模板<span className="block">一页搞定</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-8 text-[#666] md:text-[19px]">整理工作办公、教师教育、学生校园、生活实用、发言讲话和个人求职模板。支持纯文本复制、复制到 Word，并用红色标出需要替换的内容。</p>

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
              [46, "常用模板"],
              [6, "实用分类"],
              ["Word", "排版复制"],
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
          <InfoBox title="收藏功能" lines={[isFavorite ? "这个模板已加入收藏。后续登录后可同步保存到账号。" : "点击收藏后，可在后续用户中心里快速找到常用模板。"]} />
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
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/65">当前已支持纯文本复制和 Word 排版复制。后续会继续完善 Word、Excel、PDF 文件下载和资料包功能。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#111]">复制到Word</span>
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
        <InfoBox title="免费开放使用" lines={["当前全部模板免费开放，打开即可查看、复制和使用。", "需要修改的内容会在 Word 预览里标红，用户照着替换即可。"]} />
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
      body: ["你可以通过搜索框查找模板，也可以按分类浏览。", "打开模板详情后，可查看 Word 预览、复制纯文本或复制到 Word。红色内容为需要替换的提示项。"],
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
