// @ts-nocheck
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function clean(value: unknown) {
  return String(value || "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name);
    const category = clean(body.category);
    const desc = clean(body.desc);
    const createdAt = clean(body.createdAt) || new Date().toISOString();
    const pageUrl = clean(body.pageUrl);
    const userAgent = clean(body.userAgent);

    if (!name || !category || !desc) {
      return NextResponse.json({ ok: false, message: "请填写完整的模板需求信息" }, { status: 400 });
    }

    const user = process.env.TEMPLATE_EMAIL_USER;
    const pass = process.env.TEMPLATE_EMAIL_PASS;
    const to = process.env.TEMPLATE_EMAIL_TO || user;

    if (!user || !pass || !to) {
      return NextResponse.json({ ok: false, message: "邮箱环境变量未配置" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.TEMPLATE_EMAIL_HOST || "smtp.qq.com",
      port: Number(process.env.TEMPLATE_EMAIL_PORT || 465),
      secure: String(process.env.TEMPLATE_EMAIL_SECURE || "true") !== "false",
      auth: { user, pass },
    });

    const subject = `【实用模板库】新的模板需求：${name}`;
    const text = [
      "实用模板库收到一条新的模板需求：",
      "",
      `模板名称：${name}`,
      `模板分类：${category}`,
      `使用场景：${desc}`,
      `提交时间：${createdAt}`,
      pageUrl ? `提交页面：${pageUrl}` : "",
      userAgent ? `浏览器信息：${userAgent}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',Arial,sans-serif;line-height:1.8;color:#111;">
        <h2 style="margin:0 0 16px;font-size:20px;">实用模板库收到新的模板需求</h2>
        <table style="border-collapse:collapse;width:100%;max-width:680px;">
          <tr><td style="padding:10px 12px;background:#f7f7f7;width:110px;">模板名称</td><td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:10px 12px;background:#f7f7f7;">模板分类</td><td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(category)}</td></tr>
          <tr><td style="padding:10px 12px;background:#f7f7f7;">使用场景</td><td style="padding:10px 12px;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(desc)}</td></tr>
          <tr><td style="padding:10px 12px;background:#f7f7f7;">提交时间</td><td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(createdAt)}</td></tr>
          ${pageUrl ? `<tr><td style="padding:10px 12px;background:#f7f7f7;">提交页面</td><td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(pageUrl)}</td></tr>` : ""}
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `实用模板库 <${user}>`,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("template-request email error:", error);
    return NextResponse.json({ ok: false, message: "邮件发送失败" }, { status: 500 });
  }
}
