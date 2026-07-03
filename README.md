<div align="center">

# 牧鹿：解码 DeerFlow Harness

[![Website](https://img.shields.io/badge/在线访问-philo--zhou.github.io-2f6b4f?logo=github)](https://philo-zhou.github.io/deerflow-harness-book/site/) [![License](https://img.shields.io/badge/license-CC--BY--4.0-blue)](#license) [![Chapters](https://img.shields.io/badge/chapters-4%2B18%2B2%2B5-green)](#目录) [![Diagrams](https://img.shields.io/badge/mermaid-77%20diagrams-9333ea)](#) [![Run Locally](https://img.shields.io/badge/run%20locally-python3%20serve.py-2f6b4f)](#本地运行)

> 📖 **在线课程站点:[philo-zhou.github.io/deerflow-harness-book/site/](https://philo-zhou.github.io/deerflow-harness-book/site/)** —— 无需本地起服务,直接在浏览器学习。
>
> 💻 也可本地运行:`python3 serve.py` 后打开 http://localhost:8080/site/

</div>

> 📌 **源码基线**:本书基于 [deer-flow](https://github.com/bytedance/deer-flow) 仓库 commit [`7a6c4a99`](https://github.com/bytedance/deer-flow/commit/7a6c4a994a86583d2a3c056ee9d0f157d4f030c2)(2026-06-26)的源码分析编写。全书 `文件:行号` 锚点均对应该 commit;后续代码演进后,对照此 commit `git diff 7a6c4a99 HEAD -- <文件>` 定位变更、回填教程。

---

<div align="center">

# 牧鹿：解码 DeerFlow Harness

### 一本带源码的 Agent 运行时架构深度剖析

<br/>

> *"一器而工聚焉者，车为多。"* ——《考工记》
>
> 造一辆马车是最复杂的系统工程：**舆**承载乘者，辕定方向，辐传动力，軎辖为约束——每个构件各司其职，合而为一，车方能行。
>
> 构建一个 AI Agent 亦是如此：对话循环为**辕**，工具系统为**辐**，沙箱与权限为**軎辖**，中间件链是串起一切的**辕枙**，而将这一切承载于其上、使智能体真正运转的运行时框架—— Agent Harness——正是那个**舆**。
>
> DeerFlow（鹿流）是字节跳动开源的 LangGraph-based Agent Harness。古人御舆，驾驭天地之间最精密的机械；今人牧鹿，驾驭硅基时代最复杂的智能体系统。
>
> 本书因此得名 **牧鹿书**。

<br/>

当所有人都在教你怎么 **用** AI Agent——**这本书带你一行行读它的源码。**

<br/>

> **与《御舆：解码 Agent Harness》（claude-code-book）的不同：** 那本书因 Claude Code 闭源而**只做架构推演、不引用源码**；DeerFlow 是**开源**的，所以本书每个模块都**直接贴出仓库里的真实源码**——文件路径、行号区间、逐字摘录，让你不仅"理解为什么这样设计"，更能"看到它到底怎么写的"。

---

## 这本书有什么不同

**不做使用教程，不列 Prompt 技巧，只拆骨架、读源码。**

|  | 特色 | 说明 |
|:-:|------|------|
| | **源码走读而非 API 文档** | 每章以 `文件路径:行号` 锚定，贴关键片段逐行解读——讲"为什么这样设计"，也讲"它具体怎么写" |
| | **架构分析而非使用教程** | 追溯动机、分析权衡、指出反模式，从 LangGraph 图到中间件链的 26 个扩展点 |
| | **可迁移的认知模型** | 无论你用 LangChain、AutoGen、CrewAI 还是从零构建，书中的设计原则与 mermaid 图直接复用 |

> **声明：** 本书基于 deer-flow 开源仓库（Apache-2.0）的源码分析编写。所有引用代码均来自仓库本身，标注了文件路径与行号区间。DeerFlow 为字节跳动开源项目，本书不隶属于、也不代表字节跳动官方。

---

## 快速导航

> **零基础？** 先读 [Part 0 前置篇](第零部分-前置篇/LangChain基础-Agent的砖石.md)（LangChain + LangGraph 基础、能力注入与运行模式、函数调用管线总览，认全 DeerFlow 调用的每个原语与管线），再进正篇
>
> **时间紧张？** 00 → 01 → 02 → 04，拿到核心认知就够用
>
> **有经验？** 直接读 Part 2（中间件链是 DeerFlow 的心脏），遇到概念缺口回溯 Part 1
>
> **系统学习？** 从头到尾，每章做练习，最后 Ch18 构建自己的 Harness
>
> **查资料？** 直接翻 [附录 A](附录/A-源码导航地图.md)（模块定位）/ [B](附录/B-工具完整清单.md)（工具）/ [C](附录/C-中间件完整清单.md)（中间件）/ [D](附录/D-配置项速查表.md)（配置）/ [E](附录/E-术语表.md)（术语）

---

## 目录

### Part 0. 前置篇 — 读懂调用的每个函数

> 读正篇前先认全 DeerFlow 脚下的 LangChain / LangGraph 原语——让源码里每个 `create_agent`、`Command`、中间件钩子都有名有姓。每节配最小 demo + 仓库真实调用锚点。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| P1 | [LangChain 基础 — Agent 的砖石](第零部分-前置篇/LangChain基础-Agent的砖石.md) | 消息；模型；工具 `@tool`；RunnableConfig；回调 |
| P2 | [LangGraph 基础 — Agent 的骨架](第零部分-前置篇/LangGraph基础-Agent的骨架.md) | `create_agent`；状态；中间件六钩子；检查点；流式 |
| P3 | [能力注入与运行模式 — 一图看懂全流程](第零部分-前置篇/能力注入与运行模式.md) | 能力注入全景(装配时/运行时)；4 模式(闪速/思考/PRO/Ultra)链路 |
| P4 | [函数调用管线总览 — 从入口到出口的真实调用链](第零部分-前置篇/函数调用管线总览.md) | 装配/单轮执行/中间件六钩子/子智能体委派/流式 五条真实调用链 |

### Part 1. 基础篇 — 建立心智模型

> 理解 Agent 编程的范式转移，建立对 DeerFlow Harness 的整体认知框架。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| 01 | [智能体编程的新范式](第一部分-基础篇/01-智能体编程的新范式.md) | Copilot → Agent 演进；DeerFlow 全景；Harness/App 分层；服务拓扑；技术栈 |
| 02 | [对话循环 — Agent 的心跳](第一部分-基础篇/02-对话循环-Agent的心跳.md) | `make_lead_agent` 工厂；LangGraph ReAct 图；`run_agent` worker；stream modes |
| 03 | [工具系统 — Agent 的双手](第一部分-基础篇/03-工具系统-Agent的双手.md) | `get_available_tools` 装配；内置工具；社区工具；ACP；工具去重 |
| 04 | [沙箱与权限 — Agent 的护栏](第一部分-基础篇/04-沙箱与权限-Agent的护栏.md) | `Sandbox` 抽象；LocalSandboxProvider；虚拟路径；沙箱工具；Guardrails |

### Part 2. 核心系统篇 — 深入子系统

> 拆解 DeerFlow 的核心子系统——配置、状态、中间件链、上下文、记忆。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| 05 | [配置系统 — Agent 的基因](第二部分-核心系统篇/05-配置系统-Agent的基因.md) | `AppConfig`；配置版本与热重载；`reload_boundary` 启动锁；反射加载 |
| 06 | [状态与线程 — Agent 的工作内存](第二部分-核心系统篇/06-状态与线程-Agent的工作内存.md) | `ThreadState` schema；自定义 reducer；按线程/按用户隔离 |
| 07 | [中间件链 — Agent 的生命周期扩展点](第二部分-核心系统篇/07-中间件链-Agent的生命周期扩展点.md) | 26 个中间件；六种 Hook；装配顺序；`build_middlewares` |
| 08 | [上下文管理 — Agent 的上下文预算](第二部分-核心系统篇/08-上下文管理-Agent的上下文预算.md) | 摘要；Token 预算；动态上下文；SystemMessage 合并；循环检测 |
| 09 | [记忆系统 — Agent 的长期记忆](第二部分-核心系统篇/09-记忆系统-Agent的长期记忆.md) | 事实抽取；防抖队列；按用户存储；注入 |

### Part 3. 高级模式篇 — Agent 的组合与扩展

> 探索 Agent 如何组合、编排和扩展——从子智能体到 MCP 协议桥接。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| 10 | [子智能体系统 — Agent 的分身](第三部分-高级模式篇/10-子智能体系统-Agent的分身.md) | 注册表；双线程池执行器；`task` 工具；并发限制；检查点隔离 |
| 11 | [协调器模式与多智能体编排](第三部分-高级模式篇/11-协调器模式与多智能体编排.md) | Lead-as-Coordinator；ACP 外部智能体；并发与超时 |
| 12 | [技能系统与插件架构](第三部分-高级模式篇/12-技能系统与插件架构.md) | SKILL.md frontmatter；加载与存储；斜杠激活；安装 |
| 13 | [MCP 集成与外部协议](第三部分-高级模式篇/13-MCP集成与外部协议.md) | MultiServerMCPClient；惰性初始化；mtime 缓存失效；OAuth；路径翻译 |

### Part 4. 工程实践篇 — 从原理到运行时

> 运行时、持久化、对外 API、嵌入式客户端，以及构建自己的 Harness。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| 14 | [运行时与流式架构](第四部分-工程实践篇/14-运行时与流式架构.md) | `run_agent`；RunManager；StreamBridge；checkpointer；stream_mode 去重 |
| 15 | [持久化与 Schema 迁移](第四部分-工程实践篇/15-持久化与Schema迁移.md) | 引擎；混合引导三分支；alembic；幂等列迁移；并发安全 |
| 16 | [Gateway API 与 IM 渠道](第四部分-工程实践篇/16-Gateway-API与IM渠道.md) | FastAPI lifespan；Auth/CSRF；路由器；IM 消息总线与分发 |
| 17 | [嵌入式客户端与 TUI](第四部分-工程实践篇/17-嵌入式客户端与TUI.md) | `DeerFlowClient`；TUI redux 架构；`ThreadMetaWriter` |
| 18 | [构建你自己的 Agent Harness](第四部分-工程实践篇/18-构建你自己的Agent-Harness.md) | 链路追踪；安全威胁模型；六步路线图；从 harness 包出发 |

### Part 5. 架构总结 — 从装配到运行的全景

> 正篇 18 章逐站深挖后,这两章把镜头拉到最远:一张讲图怎么建,一张讲消息怎么跑。

| # | 章节 | 核心内容 |
|:-:|------|---------|
| G1 | [图的装配 — create_agent 如何把中间件编织成图](第五部分-架构总结/G1-图的装配.md) | 6 钩子分桶;4 锚点节点;正逆串联;jump_to;recursion_limit;deerflow 实际建出的图 |
| P5 | [整体管线 — 一条消息的完整旅程](第五部分-架构总结/整体管线-一条消息的完整旅程.md) | HTTP→start_run→装配→astream→StreamBridge→SSE 端到端七驿站 |

### Appendix — 参考资料速查

| | 内容 |
|:-:|------|
| [A](附录/A-源码导航地图.md) | **源码导航地图** — 模块依赖树、Harness/App 边界、6 条数据流路径 |
| [B](附录/B-工具完整清单.md) | **工具完整清单** — 内置 + 社区 + ACP + 沙箱 + 子智能体工具 |
| [C](附录/C-中间件完整清单.md) | **中间件完整清单** — 26 个中间件 × Hook × 触发条件 × 是否可选 |
| [D](附录/D-配置项速查表.md) | **配置项速查表** — `config.yaml` + `extensions_config.json` + 启动锁字段 |
| [E](附录/E-术语表.md) | **术语表** — 中英对照 + 章节定位 |

---

## 适合谁

|  | 读者 | 收获 |
|:-:|------|------|
| | **架构师** | 完整的 Agent 设计空间地图和工程权衡分析 |
| | **高级工程师** | LangGraph 中间件、工具调用、流式处理的底层机制 |
| | **研究者** | 可迁移的生产级 Agent 系统实现分析 |
| | **DeerFlow 用户/二次开发者** | 理解设计意图，最大化利用与扩展其能力 |

---

## 如何阅读源码引用

本书所有代码块上方都标注了来源，例如：

```
// backend/packages/harness/deerflow/agents/lead_agent/agent.py:416-420
```

表示该片段来自仓库中 `backend/packages/harness/deerflow/agents/lead_agent/agent.py` 的第 416–420 行。你可以打开仓库对照阅读，或用 `sed -n '416,420p' <file>` 快速核对。为控制篇幅，长文件只摘录核心片段（通常 20–60 行），并省略部分注释与日志；完整内容请回溯仓库。

---

## 背景

DeerFlow 是字节跳动开源的 LangGraph-based AI 超级智能体系统：一个带沙箱执行、持久化记忆、子智能体委派、可扩展工具（内置/MCP/社区）的"超级 Agent"，全栈架构——后端跑 Agent 运行时，前端是 Next.js 聊天 UI，外部 IM 平台（飞书、Slack、Telegram、Discord、钉钉）通过 Gateway 桥接进同一个 Agent。

本书的目标，是把这个"超级 Agent"的运行时框架（Agent Harness）拆开给你看——一行源码一行源码地看。

---

## 本地运行

本仓库除了 Markdown 原文,还附带一个**零构建、可离线**的课程站点(`site/`)。

```bash
# Python 3.9+ 即可,无需安装任何依赖
python3 serve.py
# 然后在浏览器打开 http://localhost:8080/site/
```

特性:三栏布局 + 章节进度追踪 + 源码徽标提取 + mermaid 渲染 + 亮暗主题 + 阅读位置记忆。前端库(marked / highlight.js / mermaid)已 vendor 到 `site/assets/vendor/`,断网也能跑。

详见 [site/assets/app.js](site/assets/app.js) 与 [serve.py](serve.py)。

---

## 目录结构

```
├── README.md                 # 本书封面 + 导航(即本页)
├── 00-前言.md                # 牧鹿隐喻 · 三次浪潮 · harness 概念
├── 第零部分-前置篇/          # LangChain/LangGraph 基础 + 能力注入/运行模式 + 函数调用管线(P1–P4)
├── 第一部分-基础篇/          # 01–04 章
├── 第二部分-核心系统篇/      # 05–09 章
├── 第三部分-高级模式篇/      # 10–13 章
├── 第四部分-工程实践篇/      # 14–18 章
├── 第五部分-架构总结/          # 图的装配 + 整体管线(G1/P5)
├── 附录/                     # A–E(源码地图/工具/中间件/配置/术语)
├── serve.py                  # 本地静态服务
└── site/                     # 课程网站 SPA
    ├── index.html
    └── assets/
        ├── style.css
        ├── app.js
        └── vendor/           # marked / highlight / mermaid
```

---

## License

本书文字内容采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 授权——可自由分享与改编,但须署名。

书中引用的源码来自 [deer-flow](https://github.com/bytedance/deer-flow)(Apache-2.0,字节跳动开源)。
课程站点前端库:marked(MIT)、highlight.js(BSD-3-Clause)、mermaid(MIT)。

---

<p align="center">
  本书仅用于教育和学术目的。可自由分享，但须署名。
</p>
