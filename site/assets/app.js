/* ==========================================================================
   牧鹿学习课程 — SPA 逻辑
   零构建 · 客户端渲染 · markdown 为单一真相源
   ========================================================================== */
"use strict";

/* ---------- 课程目录(MANIFEST) ---------- */
const PARTS = [
  { id: "p0", name: "第零部分 · 前置篇", tag: "读懂调用的每个函数" },
  { id: "p1", name: "第一部分 · 基础篇", tag: "建立心智模型" },
  { id: "p2", name: "第二部分 · 核心系统篇", tag: "深入子系统" },
  { id: "p3", name: "第三部分 · 高级模式篇", tag: "组合与扩展" },
  { id: "p4", name: "第四部分 · 工程实践篇", tag: "从原理到运行时" },
  { id: "pa", name: "附录", tag: "参考资料速查" },
];

const MANIFEST = [
  // 前言
  { id: "00", part: null, num: "前言", title: "前言", path: "00-前言.md", subtitle: "牧鹿隐喻 · 三次浪潮 · harness 概念" },

  // Part 0 前置篇(读懂调用的每个函数;非数字 ID,不计入 18 章进度,但参与上下章导航)
  { id: "P1", part: "p0", num: "P1", title: "LangChain 基础 — Agent 的砖石", path: "第零部分-前置篇/LangChain基础-Agent的砖石.md", subtitle: "消息;模型;工具;RunnableConfig;回调" },
  { id: "P2", part: "p0", num: "P2", title: "LangGraph 基础 — Agent 的骨架", path: "第零部分-前置篇/LangGraph基础-Agent的骨架.md", subtitle: "create_agent;状态;中间件6钩子;检查点;流式" },
  { id: "P3", part: "p0", num: "P3", title: "能力注入与运行模式 — 一图看懂全流程", path: "第零部分-前置篇/能力注入与运行模式.md", subtitle: "能力注入全景;4模式(闪速/思考/PRO/Ultra)链路" },
  { id: "P4", part: "p0", num: "P4", title: "函数调用管线总览 — 从入口到出口的真实调用链", path: "第零部分-前置篇/函数调用管线总览.md", subtitle: "装配/执行/六钩子/子智能体/流式 五条真实调用链" },
  { id: "P5", part: "p0", num: "P5", title: "整体管线 — 一条消息的完整旅程", path: "第零部分-前置篇/整体管线-一条消息的完整旅程.md", subtitle: "HTTP→start_run→装配→astream→StreamBridge→SSE 端到端一条链" },

  // Part 1
  { id: "01", part: "p1", num: "01", title: "智能体编程的新范式", path: "第一部分-基础篇/01-智能体编程的新范式.md", subtitle: "Copilot→Agent 演进;Harness/App 分层;服务拓扑" },
  { id: "02", part: "p1", num: "02", title: "对话循环 — Agent 的心跳", path: "第一部分-基础篇/02-对话循环-Agent的心跳.md", subtitle: "make_lead_agent;LangGraph ReAct 图;run_agent" },
  { id: "03", part: "p1", num: "03", title: "工具系统 — Agent 的双手", path: "第一部分-基础篇/03-工具系统-Agent的双手.md", subtitle: "get_available_tools 装配;内置/社区/ACP" },
  { id: "04", part: "p1", num: "04", title: "沙箱与权限 — Agent 的护栏", path: "第一部分-基础篇/04-沙箱与权限-Agent的护栏.md", subtitle: "Sandbox 抽象;虚拟路径;沙箱工具;Guardrails" },

  // Part 2
  { id: "05", part: "p2", num: "05", title: "配置系统 — Agent 的基因", path: "第二部分-核心系统篇/05-配置系统-Agent的基因.md", subtitle: "AppConfig;热重载;启动锁;反射加载" },
  { id: "06", part: "p2", num: "06", title: "状态与线程 — Agent 的工作内存", path: "第二部分-核心系统篇/06-状态与线程-Agent的工作内存.md", subtitle: "ThreadState;自定义 reducer;隔离" },
  { id: "07", part: "p2", num: "07", title: "中间件链 — 生命周期扩展点", path: "第二部分-核心系统篇/07-中间件链-Agent的生命周期扩展点.md", subtitle: "26 个中间件;六种 Hook;装配顺序" },
  { id: "08", part: "p2", num: "08", title: "上下文管理 — 上下文预算", path: "第二部分-核心系统篇/08-上下文管理-Agent的上下文预算.md", subtitle: "摘要;Token 预算;动态上下文;循环检测" },
  { id: "09", part: "p2", num: "09", title: "记忆系统 — Agent 的长期记忆", path: "第二部分-核心系统篇/09-记忆系统-Agent的长期记忆.md", subtitle: "事实抽取;防抖队列;按用户存储;注入" },

  // Part 3
  { id: "10", part: "p3", num: "10", title: "子智能体系统 — Agent 的分身", path: "第三部分-高级模式篇/10-子智能体系统-Agent的分身.md", subtitle: "注册表;双线程池;task 工具;并发限制" },
  { id: "11", part: "p3", num: "11", title: "协调器模式与多智能体编排", path: "第三部分-高级模式篇/11-协调器模式与多智能体编排.md", subtitle: "Lead-as-Coordinator;ACP 外部智能体" },
  { id: "12", part: "p3", num: "12", title: "技能系统与插件架构", path: "第三部分-高级模式篇/12-技能系统与插件架构.md", subtitle: "SKILL.md frontmatter;加载;斜杠激活" },
  { id: "13", part: "p3", num: "13", title: "MCP 集成与外部协议", path: "第三部分-高级模式篇/13-MCP集成与外部协议.md", subtitle: "MultiServerMCPClient;mtime 缓存;OAuth" },

  // Part 4
  { id: "14", part: "p4", num: "14", title: "运行时与流式架构", path: "第四部分-工程实践篇/14-运行时与流式架构.md", subtitle: "run_agent;RunManager;StreamBridge;stream_mode" },
  { id: "15", part: "p4", num: "15", title: "持久化与 Schema 迁移", path: "第四部分-工程实践篇/15-持久化与Schema迁移.md", subtitle: "引擎;混合引导三分支;幂等列迁移" },
  { id: "16", part: "p4", num: "16", title: "Gateway API 与 IM 渠道", path: "第四部分-工程实践篇/16-Gateway-API与IM渠道.md", subtitle: "FastAPI lifespan;路由器;IM 消息总线" },
  { id: "17", part: "p4", num: "17", title: "嵌入式客户端与 TUI", path: "第四部分-工程实践篇/17-嵌入式客户端与TUI.md", subtitle: "DeerFlowClient;TUI redux;ThreadMetaWriter" },
  { id: "18", part: "p4", num: "18", title: "构建你自己的 Agent Harness", path: "第四部分-工程实践篇/18-构建你自己的Agent-Harness.md", subtitle: "链路追踪;安全威胁模型;六步路线图" },

  // 附录
  { id: "A", part: "pa", num: "A", title: "源码导航地图", path: "附录/A-源码导航地图.md", subtitle: "模块依赖树;Harness/App 边界;数据流" },
  { id: "B", part: "pa", num: "B", title: "工具完整清单", path: "附录/B-工具完整清单.md", subtitle: "内置+社区+ACP+沙箱+子智能体工具" },
  { id: "C", part: "pa", num: "C", title: "中间件完整清单", path: "附录/C-中间件完整清单.md", subtitle: "26 个中间件 × Hook × 触发条件" },
  { id: "D", part: "pa", num: "D", title: "配置项速查表", path: "附录/D-配置项速查表.md", subtitle: "config.yaml + extensions_config + 启动锁" },
  { id: "E", part: "pa", num: "E", title: "术语表", path: "附录/E-术语表.md", subtitle: "中英对照 + 章节定位" },
];

const byId = (id) => MANIFEST.find((m) => m.id === id);
const CHAPTER_IDS = MANIFEST.filter((m) => /^\d+$/.test(m.id)).map((m) => m.id);

/* ---------- 状态 ---------- */
const LS = {
  progress: "deerflow:progress",   // {id: true}
  theme: "deerflow:theme",         // light|dark
  font: "deerflow:fontScale",      // number
  scroll: "deerflow:scroll",       // {id: px}
  collapsed: "deerflow:collapsed", // {partId: true}
};

const state = {
  current: null,
  currentMd: null,
  mdCache: new Map(),     // id -> raw md
  fontScale: 1,
  observer: null,         // IntersectionObserver for outline scroll-spy
};

/* ---------- 工具 ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function encodePath(path) {
  // 相对 site/ 的路径,逐段编码以兼容中文
  return "../" + path.split("/").map(encodeURIComponent).join("/");
}

/* ---------- marked 配置 + renderer 覆写 ---------- */
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    // 代码块:提取源码徽标 / mermaid / 普通高亮
    code({ lang, text }) {
      const language = (lang || "").trim().toLowerCase();

      // mermaid → 交给 mermaid.run()
      if (language === "mermaid") {
        return `<div class="mermaid">${esc(text)}</div>`;
      }

      // 提取首行 `// path:行号` 源码标注
      const lines = text.split("\n");
      const first = lines[0] || "";
      const cap = first.match(/^\/\/\s+(.+)$/);
      if (cap) {
        const caption = cap[1].trim();
        const rest = lines.slice(1).join("\n").replace(/^\n+/, "");
        const cm = caption.match(/^(.+?)(?::(\d+(?:-\d+)?))?$/);
        const pathStr = cm ? cm[1] : caption;
        const lineRange = cm && cm[2] ? cm[2] : "";
        const linesChip = lineRange
          ? `<span class="lines">${esc(lineRange)}</span>` : "";
        return `<div class="codeblock">`
          + `<div class="code-caption"><span class="ico">📄</span>`
          + `<span class="path">${esc(pathStr)}</span>${linesChip}</div>`
          + `<pre class="has-caption"><code class="language-${language || "python"}">${esc(rest)}</code></pre>`
          + `</div>`;
      }

      // 普通:无标签块用 python(书里几乎都是);有标签按标签
      const cls = language ? `language-${language}` : "language-python";
      return `<pre><code class="${cls}">${esc(text)}</code></pre>`;
    },
  },
});

/* ---------- 主题 ---------- */
function getStoredTheme() {
  const t = localStorage.getItem(LS.theme);
  if (t === "light" || t === "dark") return t;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  $("#hlTheme").href = `assets/vendor/highlight-${theme === "dark" ? "github-dark" : "github"}.min.css`;
  $("#themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem(LS.theme, theme);
  // mermaid 主题需重新初始化并重渲染当前页
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: theme === "dark" ? "dark" : "default" });
    if (state.currentMd != null && state.current) rerenderMermaid();
  }
}

/* ---------- 字号 ---------- */
function applyFont(scale) {
  state.fontScale = Math.min(1.35, Math.max(0.8, scale));
  document.documentElement.style.setProperty("--font-scale", state.fontScale);
  localStorage.setItem(LS.font, String(state.fontScale));
}

/* ---------- 进度(完成章节) ---------- */
function getProgress() { return loadJSON(LS.progress, {}); }
function setProgress(obj) { saveJSON(LS.progress, obj); }
function isDone(id) { return !!getProgress()[id]; }
function toggleDone(id) {
  const p = getProgress();
  if (p[id]) delete p[id]; else p[id] = true;
  setProgress(p);
  refreshProgressUI();
}
function refreshProgressUI() {
  const p = getProgress();
  // 侧栏勾选
  $$("#sidebarNav .nav-item").forEach((a) => {
    a.classList.toggle("completed", !!p[a.dataset.id]);
  });
  // 侧栏计数(只数 18 章)
  const done = CHAPTER_IDS.filter((id) => p[id]).length;
  $("#sidebarProgress").textContent = `${done} / ${CHAPTER_IDS.length} 完成`;
  // 封面统计
  const coverStat = $("#coverProgress");
  if (coverStat) coverStat.textContent = `${done} / ${CHAPTER_IDS.length}`;
  // 底部按钮
  const fc = $("#footComplete");
  if (fc && state.current) {
    const done0 = !!p[state.current];
    fc.classList.toggle("done", done0);
    fc.querySelector(".check").textContent = done0 ? "✅" : "☐";
    fc.querySelector(".lbl").textContent = done0 ? "已完成" : "标记完成";
  }
}

/* ---------- 侧栏构建 ---------- */
function buildSidebar() {
  const nav = $("#sidebarNav");
  let html = "";
  // 前言单独一组
  html += renderNavGroup(null, "开篇", [byId("00")]);
  for (const part of PARTS) {
    const items = MANIFEST.filter((m) => m.part === part.id);
    if (!items.length) continue;
    html += renderNavGroup(part.id, `${part.name}`, items, part.tag);
  }
  nav.innerHTML = html;

  // 折叠状态恢复
  const collapsed = loadJSON(LS.collapsed, {});
  $$("#sidebarNav .nav-group").forEach((g) => {
    if (collapsed[g.dataset.part]) g.classList.add("collapsed");
  });

  // 折叠点击
  $$("#sidebarNav .nav-group-title").forEach((t) => {
    t.addEventListener("click", () => {
      const g = t.closest(".nav-group");
      g.classList.toggle("collapsed");
      const c = loadJSON(LS.collapsed, {});
      c[g.dataset.part] = g.classList.contains("collapsed");
      saveJSON(LS.collapsed, c);
    });
  });

  // 章节链接
  $$("#sidebarNav .nav-item").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = "#/" + a.dataset.id;
      closeSidebarMobile();
    });
  });

  // 收起/展开全部
  $("#collapseAll").addEventListener("click", () => {
    const groups = $$("#sidebarNav .nav-group");
    const anyOpen = groups.some((g) => !g.classList.contains("collapsed"));
    const c = {};
    groups.forEach((g) => {
      g.classList.toggle("collapsed", anyOpen);
      if (anyOpen) c[g.dataset.part] = true;
    });
    saveJSON(LS.collapsed, c);
    $("#collapseAll").textContent = anyOpen ? "展开" : "收起";
  });
  refreshProgressUI();
}

function renderNavGroup(partId, name, items, tag = "") {
  const itemsHtml = items.map((m) => `
    <a class="nav-item" data-id="${m.id}" href="#/${m.id}">
      <span class="num">${esc(m.num)}</span>
      <span class="label">${esc(m.title)}</span>
      <span class="done">✓</span>
    </a>`).join("");
  return `<div class="nav-group" data-part="${esc(partId || name)}">
    <div class="nav-group-title"><span class="chev">▾</span>${esc(name)}${tag ? `<span style="color:var(--fg-faint);font-weight:400;margin-left:6px">· ${esc(tag)}</span>` : ""}</div>
    <div class="nav-items">${itemsHtml}</div>
  </div>`;
}

function setActiveNav(id) {
  $$("#sidebarNav .nav-item").forEach((a) => {
    a.classList.toggle("active", a.dataset.id === id);
  });
  // 展开当前所在组
  const m = byId(id);
  if (m && m.part) {
    const g = $(`#sidebarNav .nav-group[data-part="${m.part}"]`);
    if (g) g.classList.remove("collapsed");
  }
}

/* ---------- 路由 ---------- */
function parseHash() {
  const h = location.hash.replace(/^#\/?/, "").trim();
  if (!h) return { view: "cover" };
  return { view: "chapter", id: h };
}

async function route() {
  const { view, id } = parseHash();
  if (view === "cover") { renderCover(); return; }
  const m = byId(id);
  if (!m) { renderCover(); return; }
  state.current = id;
  setActiveNav(id);
  $("#topbarTitle").textContent = `${m.num} · ${m.title}`;
  let md = state.mdCache.get(id);
  if (md == null) {
    try {
      const res = await fetch(encodePath(m.path));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      md = await res.text();
      state.mdCache.set(id, md);
    } catch (e) {
      $("#content").innerHTML = `<div class="loading">
        <h2>⚠️ 无法加载章节</h2>
        <p>抓取 <code>${esc(m.path)}</code> 失败:${esc(e.message)}</p>
        <p>请确保用 <code>python3 serve.py</code> 起了本地服务(而非直接 file:// 打开)。</p></div>`;
      return;
    }
  }
  state.currentMd = md;
  await renderChapter(m, md);
}

/* ---------- 章节渲染 ---------- */
async function renderChapter(m, md) {
  const content = $("#content");
  content.innerHTML = `<div class="doc"><div class="chapter-eyebrow">${esc(partName(m.part))} · 第 ${esc(m.num)} 章</div></div>`;
  // 标题:用 markdown 里的 H1 作大标题,先剥掉它再渲染正文
  const { titleHtml, body } = splitTitle(md);
  const html = marked.parse(body);
  const doc = `<div class="doc">
    <div class="chapter-eyebrow">${esc(partName(m.part))}${m.part ? ` · 第 ${esc(m.num)} 章` : ""}</div>
    ${titleHtml}
    <div class="chapter-body">${html}</div>
    ${renderFootNav(m)}
  </div>`;
  content.innerHTML = doc;
  // 增强
  enhance(content);
  // 恢复滚动位置
  restoreScroll(m.id);
  refreshProgressUI();
  // 滚动到顶(除非恢复位置)
  if (!(loadJSON(LS.scroll, {})[m.id] > 0)) window.scrollTo(0, 0);
}

function splitTitle(md) {
  // 取首个 # 一级标题作 H1,正文剥掉它
  const m = md.match(/^#\s+(.+?)\s*\n([\s\S]*)/);
  if (m) {
    return { titleHtml: `<h1>${esc(stripMdInline(m[1]))}</h1>`, body: m[2] };
  }
  return { titleHtml: `<h1>${esc(byId(state.current).title)}</h1>`, body: md };
}
function stripMdInline(s) {
  // 去掉行内 markdown 标记(**code** 等),保留纯文本作大标题
  return s.replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

function partName(partId) {
  const p = PARTS.find((x) => x.id === partId);
  return p ? p.name : "开篇";
}

/* ---------- 渲染后增强 ---------- */
function enhance(root) {
  // 1. 语法高亮
  $$("pre code", root).forEach((block) => {
    try { hljs.highlightElement(block); } catch {}
  });
  // 2. mermaid 渲染
  renderMermaidIn(root);
  // 3. callout 提示框
  $$("blockquote", root).forEach((bq) => {
    const strong = $("strong", bq);
    const t = strong ? strong.textContent : "";
    if (/^设计决策分析/.test(t)) bq.classList.add("callout", "callout-design");
    else if (/^交叉引用/.test(t)) bq.classList.add("callout", "callout-xref");
    else if (/^声明/.test(t)) bq.classList.add("callout", "callout-stmt");
  });
  // 4. 表格包裹(横向滚动)
  $$("table", root).forEach((t) => {
    if (t.parentElement.classList.contains("table-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });
  // 5. 内链 .md → SPA 路由
  $$('a[href$=".md"], a[href*=".md"]', root).forEach((a) => {
    const href = a.getAttribute("href");
    const target = resolveInternalLink(href);
    if (target) {
      a.setAttribute("href", "#/" + target);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        location.hash = "#/" + target;
      });
    }
  });
  // 6. 大纲 + 滚动联动
  buildOutline(root);
  // 7. 底部"标记完成"
  const fc = $("#footComplete", root);
  if (fc) fc.addEventListener("click", () => { toggleDone(state.current); });
  // 上一/下一章链接由 href=#/id 处理(hashchange 自动)
}

function resolveInternalLink(href) {
  let h = href.replace(/^\.\//, "").replace(/^\.\.\//, "");
  // 去掉锚点
  h = h.split("#")[0];
  const m = MANIFEST.find((x) => x.path === h || x.path.endsWith("/" + h) || h.endsWith(x.path));
  return m ? m.id : null;
}

/* ---------- mermaid ----------
   关键:渲染前把原始 mermaid 源码存进 dataset.mmd。
   因为 mermaid 渲染后会把 <svg> 注入节点,此时 textContent 是 SVG 文本,
   不能再用它去重新 parse(会报 "Syntax error in text")。
   切主题重渲染时必须从 dataset.mmd 还原原始源码。 ---------- */
let mermaidIdx = 0;
function renderMermaidIn(root) {
  const nodes = $$(".mermaid", root);
  if (!nodes.length || !window.mermaid) return;
  const toRun = [];
  nodes.forEach((n) => {
    if (n.dataset.processed) return;          // mermaid 已渲染过,跳过
    // 首次渲染:textContent 是干净的 mermaid 源码,存档备用
    if (!n.dataset.mmd) n.dataset.mmd = n.textContent;
    n.id = "mmd-" + (mermaidIdx++);
    toRun.push(n);
  });
  if (toRun.length) {
    mermaid.run({ nodes: toRun }).catch((e) => {
      console.warn("mermaid run error", e);
    });
  }
}
function rerenderMermaid() {
  // 主题切换后:从 dataset.mmd 还原原始源码,重画
  const root = $("#content");
  const nodes = $$(".mermaid", root);
  nodes.forEach((n) => {
    if (!n.dataset.mmd) return;               // 没源码(不该发生),跳过
    n.removeAttribute("data-processed");
    n.textContent = n.dataset.mmd;            // 还原成原始 mermaid 文本
    n.id = "mmd-" + (mermaidIdx++);           // 换 id 强制 mermaid 重新生成
  });
  if (nodes.length) {
    mermaid.run({ nodes }).catch((e) => {
      console.warn("mermaid rerun error", e);
    });
  }
}

/* ---------- 大纲 + 滚动联动 ---------- */
function buildOutline(root) {
  const outline = $("#outline");
  const headings = $$("h2, h3, h4", root);
  if (!headings.length) { outline.innerHTML = ""; return; }
  outline.innerHTML = `<div class="outline-title">本页大纲</div>` + headings.map((h, i) => {
    const id = `sec-${i}`;
    h.id = id;
    const lvl = h.tagName.toLowerCase();
    return `<a href="#${id}" class="lvl-${lvl}" data-target="${id}">${esc(h.textContent)}</a>`;
  }).join("");
  // 点击大纲 → 平滑滚动,不改 hash(避免触发路由)
  $$("a", outline).forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const el = document.getElementById(a.dataset.target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  // IntersectionObserver 滚动联动
  if (state.observer) state.observer.disconnect();
  const links = $$("a", outline);
  state.observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const id = en.target.id;
        links.forEach((l) => l.classList.toggle("active", l.dataset.target === id));
      }
    });
  }, { rootMargin: "-90px 0px -70% 0px", threshold: 0 });
  headings.forEach((h) => state.observer.observe(h));
}

/* ---------- 底部导航 ---------- */
function renderFootNav(m) {
  const order = MANIFEST.filter((x) => x.id !== "00");
  const idx = order.findIndex((x) => x.id === m.id);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const prevHtml = prev
    ? `<a class="foot-nav prev" href="#/${prev.id}"><span class="lbl">← 上一章</span><span class="ttl">${esc(prev.title)}</span></a>` : `<span></span>`;
  const nextHtml = next
    ? `<a class="foot-nav next" href="#/${next.id}"><span class="lbl">下一章 →</span><span class="ttl">${esc(next.title)}</span></a>` : `<span></span>`;
  return `<div class="chapter-foot">
    ${prevHtml}
    <button class="foot-complete" id="footComplete"><span class="check">☐</span><span class="lbl">标记完成</span></button>
    ${nextHtml}
  </div>`;
}

/* ---------- 封面页 ---------- */
function renderCover() {
  state.current = null;
  state.currentMd = null;
  setActiveNav("");
  $("#topbarTitle").textContent = "学习课程";
  const p = getProgress();
  const done = CHAPTER_IDS.filter((id) => p[id]).length;
  $("#content").innerHTML = `<div class="cover">
    <div class="cover-hero">
      <div class="deer">🦌</div>
      <h1>牧鹿</h1>
      <div class="subtitle">解码 DeerFlow Harness — 一本带源码的 Agent 运行时架构深度剖析</div>
      <div class="quote">"一器而工聚焉者,车为多。" ——《考工记》<br>
        构建一个 AI Agent 亦如造车:对话循环为辕,工具为辐,沙箱为軎辖,中间件链串起一切,而承载其上的运行时框架——Agent Harness——正是那个舆。古人御舆,驾驭天地之间最精密的机械;今人牧鹿,驾驭硅基时代最复杂的智能体系统。
        <cite>本书因此得名 牧鹿书</cite>
      </div>
      <div class="cover-cta">
        <a class="btn-primary" href="#/00">开始学习 →</a>
      </div>
    </div>
    <div class="cover-stats">
      <div class="stat"><span class="num">18</span><span class="lbl">章节</span></div>
      <div class="stat"><span class="num">5</span><span class="lbl">附录</span></div>
      <div class="stat"><span class="num">72</span><span class="lbl">架构图</span></div>
      <div class="stat"><span class="num" id="coverProgress">${done} / ${CHAPTER_IDS.length}</span><span class="lbl">已学完</span></div>
    </div>
    <div class="cover-features">
      <a class="feature-card" href="#/00">
        <span class="emoji">🌱</span>
        <h3>时间紧张?</h3>
        <p>00 → 01 → 02 → 04,拿到核心认知就够用。</p>
        <span class="target">从前言开始 →</span>
      </a>
      <a class="feature-card" href="#/07">
        <span class="emoji">⚡</span>
        <h3>有经验?</h3>
        <p>直接读 Part 2 — 中间件链是 DeerFlow 的心脏,遇概念缺口回溯 Part 1。</p>
        <span class="target">直达第 7 章 →</span>
      </a>
      <a class="feature-card" href="#/18">
        <span class="emoji">🛠️</span>
        <h3>系统学习?</h3>
        <p>从头到尾,每章做练习,最后 Ch18 构建自己的 Harness。</p>
        <span class="target">直达实战章 →</span>
      </a>
      <a class="feature-card" href="#/A">
        <span class="emoji">📚</span>
        <h3>查资料?</h3>
        <p>附录速查:源码地图 / 工具 / 中间件 / 配置 / 术语。</p>
        <span class="target">翻附录 →</span>
      </a>
    </div>
    <p style="text-align:center;color:var(--fg-faint);font-size:0.8rem;margin-top:48px">
      本书基于 deer-flow 开源仓库(Apache-2.0)源码分析编写 · 仅用于教育和学术目的
    </p>
  </div>`;
  $("#outline").innerHTML = "";
  window.scrollTo(0, 0);
}

/* ---------- 滚动:进度条 + 位置记忆 ---------- */
let scrollTimer = null;
function onScroll() {
  const st = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = h > 0 ? (st / h) * 100 : 0;
  $("#readProgress").style.width = pct + "%";
  // 位置记忆(防抖)
  if (state.current) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const s = loadJSON(LS.scroll, {});
      s[state.current] = st;
      saveJSON(LS.scroll, s);
    }, 200);
  }
}
function restoreScroll(id) {
  const s = loadJSON(LS.scroll, {});
  if (s[id] > 0) {
    requestAnimationFrame(() => window.scrollTo(0, s[id]));
  }
}

/* ---------- 移动端侧栏 ---------- */
function openSidebarMobile() {
  $("#sidebar").classList.add("open");
  $("#sidebarBackdrop").classList.add("show");
}
function closeSidebarMobile() {
  $("#sidebar").classList.remove("open");
  $("#sidebarBackdrop").classList.remove("show");
}

/* ---------- 搜索(全文 + 标题,懒加载索引) ---------- */
const searchState = {
  indexed: false,
  indexing: false,
  index: [],          // [{id, num, title, subtitle, partName, textPlain, textLower}]
  lastResults: [],
  activeIdx: 0,
};

function buildSearchModal() {
  if ($("#searchModal")) return;
  const el = document.createElement("div");
  el.id = "searchModal";
  el.className = "search-overlay";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "搜索章节");
  el.innerHTML = `
    <div class="search-modal" role="document">
      <div class="search-box">
        <span class="search-ico">🔍</span>
        <input id="searchInput" class="search-input" type="search"
          placeholder="搜索标题、正文、源码片段…(Ctrl+K)" autocomplete="off" spellcheck="false" />
        <kbd class="search-kbd">Esc</kbd>
      </div>
      <div id="searchResults" class="search-results"></div>
    </div>`;
  document.body.appendChild(el);

  const input = $("#searchInput", el);
  input.addEventListener("input", () => scheduleSearch(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSearch(); e.preventDefault(); }
    else if (e.key === "Enter") {
      const res = searchState.lastResults[searchState.activeIdx];
      if (res) { gotoResult(res); e.preventDefault(); }
    } else if (e.key === "ArrowDown") { moveSel(1); e.preventDefault(); }
    else if (e.key === "ArrowUp") { moveSel(-1); e.preventDefault(); }
  });
  // 点击遮罩空白处关闭
  el.addEventListener("mousedown", (e) => { if (e.target === el) closeSearch(); });
}

function openSearch() {
  buildSearchModal();
  const el = $("#searchModal");
  if (el.classList.contains("open")) { $("#searchInput").focus(); return; }
  el.classList.add("open");
  document.body.classList.add("search-open");
  const input = $("#searchInput");
  input.value = "";
  searchState.lastResults = [];
  searchState.activeIdx = 0;
  renderSearchResults({ state: "empty" });
  // 懒建索引:首次打开时拉取所有章节
  ensureIndex().then(() => runSearch(input.value));
  setTimeout(() => input.focus(), 0);
}
function closeSearch() {
  const el = $("#searchModal");
  if (!el) return;
  el.classList.remove("open");
  document.body.classList.remove("search-open");
}

let searchTimer = null;
function scheduleSearch(q) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => runSearch(q), 140);
}

async function ensureIndex() {
  if (searchState.indexed || searchState.indexing) return;
  searchState.indexing = true;
  await Promise.all(MANIFEST.map(async (m) => {
    if (state.mdCache.has(m.id)) return;
    try {
      const res = await fetch(encodePath(m.path));
      if (res.ok) state.mdCache.set(m.id, await res.text());
    } catch {}
  }));
  searchState.index = MANIFEST.map((m) => {
    const textPlain = stripMdForSearch(state.mdCache.get(m.id) || "");
    return {
      id: m.id, num: m.num, title: m.title,
      subtitle: m.subtitle || "", partName: partName(m.part),
      textPlain, textLower: textPlain.toLowerCase(),
    };
  });
  searchState.indexed = true;
  searchState.indexing = false;
}

function stripMdForSearch(md) {
  let s = md;
  s = s.replace(/^#\s+.+\n/, "");                 // 去掉首个 H1(标题已单独展示)
  s = s.replace(/```mermaid\n[\s\S]*?```/g, " ");  // 去图源(含保留字噪声,搜索意义小)
  s = s.replace(/```[^\n]*\n/g, " ");              // 去代码围栏标记行,保留代码内容(函数名值得搜)
  s = s.replace(/```/g, " ");                       // 去残余围栏
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

function runSearch(q) {
  if (!searchState.indexed) {
    searchState.lastResults = [];
    searchState.activeIdx = 0;
    renderSearchResults({ state: "indexing" });
    return;   // 索引就绪后 openSearch 的 ensureIndex().then 会再触发 runSearch
  }
  const out = computeSearch(q);
  searchState.lastResults = out.results || [];
  searchState.activeIdx = 0;
  renderSearchResults(out);
}

function computeSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { state: "empty" };
  const terms = q.split(/\s+/);
  const results = [];
  for (const ch of searchState.index) {
    const titleL = ch.title.toLowerCase();
    const subL = ch.subtitle.toLowerCase();
    const hay = titleL + " " + subL + " " + ch.textLower;
    if (!terms.every((t) => hay.includes(t))) continue;   // 多词:全部命中才算匹配
    const titleHit = terms.some((t) => titleL.includes(t));
    const subHit = terms.some((t) => subL.includes(t));
    let bodyPos = -1, matchedLen = 0;
    for (const t of terms) {
      const p = ch.textLower.indexOf(t);
      if (p >= 0 && (bodyPos < 0 || p < bodyPos)) { bodyPos = p; matchedLen = t.length; }
    }
    let score = 0;
    if (titleHit) score += 1000;
    if (subHit) score += 400;
    if (bodyPos >= 0) score += Math.max(50, 300 - Math.min(bodyPos, 300));
    let snippet = "";
    if (bodyPos >= 0) snippet = makeSnippet(ch.textPlain, bodyPos, matchedLen);
    else if (subHit) snippet = esc(ch.subtitle);
    results.push({ id: ch.id, num: ch.num, title: ch.title, partName: ch.partName, titleHit, snippet, score });
  }
  results.sort((a, b) => b.score - a.score);
  return { state: results.length ? "ok" : "none", results };
}

function makeSnippet(textPlain, pos, len) {
  const start = Math.max(0, pos - 36);
  const end = Math.min(textPlain.length, pos + len + 64);
  const pre = start > 0 ? "…" : "";
  const post = end < textPlain.length ? "…" : "";
  // 清掉 markdown 噪声(标题 #、表格 |、引用 >、强调 *、代码 `),match 段保持原样
  const clean = (s) => esc(s)
    .replace(/&gt;/g, "").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[`*#|>]/g, "").replace(/\s{2,}/g, " ");
  const before = clean(textPlain.slice(start, pos));
  const match = esc(textPlain.slice(pos, pos + len));
  const after = clean(textPlain.slice(pos + len, end));
  return pre + before + "<mark>" + match + "</mark>" + after + post;
}

function renderSearchResults(out) {
  const box = $("#searchResults");
  if (!box) return;
  let html = "";
  if (out.state === "indexing") {
    html = `<div class="search-empty">⏳ 正在建立全文索引…</div>`;
  } else if (out.state === "empty") {
    html = `<div class="search-hint">输入关键词,在全 ${MANIFEST.length} 篇中搜索标题、正文与源码片段。</div>`;
  } else if (out.state === "none") {
    html = `<div class="search-empty">没有匹配的章节 🦌</div>`;
  } else {
    html = out.results.map((r, i) => `
      <a class="search-result${i === searchState.activeIdx ? " active" : ""}" data-idx="${i}">
        <span class="sr-num">${esc(r.num)}</span>
        <span class="sr-main">
          <span class="sr-title">${esc(r.title)}${r.titleHit ? `<span class="sr-tag">标题</span>` : ""}</span>
          <span class="sr-snippet">${r.snippet || `<span class="sr-sub">${esc(r.partName)}</span>`}</span>
        </span>
      </a>`).join("");
  }
  box.innerHTML = html;
  $$(".search-result", box).forEach((a) => {
    a.addEventListener("click", () => {
      const res = searchState.lastResults[parseInt(a.dataset.idx, 10)];
      if (res) gotoResult(res);
    });
    a.addEventListener("mouseenter", () => {
      searchState.activeIdx = parseInt(a.dataset.idx, 10);
      updateSel();
    });
  });
}

function updateSel() {
  $$("#searchResults .search-result").forEach((a, i) => {
    a.classList.toggle("active", i === searchState.activeIdx);
  });
}
function moveSel(delta) {
  const n = searchState.lastResults.length;
  if (!n) return;
  searchState.activeIdx = (searchState.activeIdx + delta + n) % n;
  updateSel();
  const el = $$("#searchResults .search-result")[searchState.activeIdx];
  if (el) el.scrollIntoView({ block: "nearest" });
}
function gotoResult(res) {
  closeSearch();
  location.hash = "#/" + res.id;
}
function isTypingTarget(t) {
  if (!t) return false;
  const tag = (t.tagName || "").toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable;
}

/* ---------- 初始化 ---------- */
function init() {
  // 主题
  applyTheme(getStoredTheme());
  // 字号
  const fs = parseFloat(localStorage.getItem(LS.font));
  if (!isNaN(fs)) state.fontScale = fs;
  applyFont(state.fontScale);
  // 侧栏
  buildSidebar();
  // 顶栏按钮
  $("#themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
  $("#fontInc").addEventListener("click", () => applyFont(state.fontScale + 0.1));
  $("#fontDec").addEventListener("click", () => applyFont(state.fontScale - 0.1));
  $("#menuToggle").addEventListener("click", () => {
    $("#sidebar").classList.contains("open") ? closeSidebarMobile() : openSidebarMobile();
  });
  $("#sidebarBackdrop").addEventListener("click", closeSidebarMobile);
  // 搜索
  $("#searchBtn").addEventListener("click", openSearch);
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      const m = $("#searchModal");
      if (m && m.classList.contains("open")) closeSearch(); else openSearch();
    } else if (e.key === "/" && !isTypingTarget(e.target)) {
      e.preventDefault();
      openSearch();
    }
  });
  // 滚动
  window.addEventListener("scroll", onScroll, { passive: true });
  // 路由
  window.addEventListener("hashchange", route);
  route();
}

document.addEventListener("DOMContentLoaded", init);
