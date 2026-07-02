# 附录 A：源码导航地图

> 本附录是 deer-flow 仓库的"导航地图"——当你需要定位某个子系统时，从这里出发。

## A.1 仓库分层

```
deer-flow/
├── backend/
│   ├── packages/harness/deerflow/   ← Harness 层（deerflow.*，可发布）
│   │   ├── agents/                  ← Agent 系统（第 2、6、7、8、9 章）
│   │   ├── tools/                   ← 工具系统（第 3 章）
│   │   ├── sandbox/                 ← 沙箱（第 4 章）
│   │   ├── subagents/               ← 子智能体（第 10 章）
│   │   ├── skills/                  ← 技能（第 12 章）
│   │   ├── mcp/                     ← MCP（第 13 章）
│   │   ├── config/                  ← 配置（第 5 章）
│   │   ├── models/                  ← 模型工厂（第 5 章）
│   │   ├── reflection/              ← 反射（第 5 章）
│   │   ├── runtime/                 ← 运行时（第 14 章）
│   │   ├── persistence/             ← 持久化（第 15 章）
│   │   ├── guardrails/              ← 护栏（第 18 章）
│   │   ├── tracing/                 ← 链路追踪（第 18 章）
│   │   ├── community/               ← 社区工具（第 3 章）
│   │   ├── tui/                     ← TUI（第 17 章）
│   │   └── client.py                ← 嵌入式客户端（第 17 章）
│   └── app/                         ← App 层（app.*，不可发布）
│       ├── gateway/                 ← FastAPI Gateway（第 16 章）
│       └── channels/                ← IM 渠道（第 16 章）
├── frontend/                        ← Next.js 前端
├── skills/{public,custom}/          ← 技能目录（第 12 章）
├── config.yaml                      ← 主配置（第 5 章）
└── extensions_config.json           ← 扩展配置 MCP+技能（第 5 章）
```

## A.2 Harness / App 边界

**规则**：App 可 import deerflow，deerflow 不可 import app。由 `backend/tests/test_harness_boundary.py` 强制。

## A.3 六条数据流路径

| 路径 | 起点 → 终点 | 关键文件 |
|------|------------|---------|
| ① 浏览器请求 → Agent 回复 | Nginx:2026 → Gateway:8001 → run_agent → StreamBridge → SSE | `app/gateway/app.py`、`runtime/runs/worker.py` |
| ② 工具调用执行 | 模型 tool_calls → 工具节点 → sandbox.execute → ToolMessage | `tools/tools.py`、`sandbox/tools.py` |
| ③ 沙箱路径翻译 | Agent 虚拟路径 → replace_virtual_path → 物理路径 → 执行 → mask 输出 | `sandbox/tools.py:493` |
| ④ 记忆更新 | after_agent → MemoryUpdateQueue → 防抖 → MemoryUpdater → memory.json | `agents/memory/queue.py`、`updater.py` |
| ⑤ 子智能体委派 | task 工具 → SubagentExecutor → 双线程池 → _aexecute → 结果回填 | `subagents/executor.py` |
| ⑥ IM 消息 → Agent | 平台 → Channel → MessageBus → ChannelManager → runs.stream/wait → outbound | `app/channels/manager.py` |

## A.4 四层架构

| 层 | 章 | 职责 |
|---|---|---|
| L1 核心循环 | 2-6 | 图驱动 ReAct + 工具 + 沙箱 + 状态 + 配置 |
| L2 扩展点 | 7-13 | 中间件链 + 上下文 + 记忆 + 子智能体 + 技能 + MCP |
| L3 运行时 | 14-15 | 流式 + 检查点 + 持久化 + 迁移 |
| L4 对外接入 | 16-17 | Gateway + IM + 嵌入式客户端 + TUI |

## A.5 入口点速查

| 要找 | 去 |
|------|---|
| Agent 工厂 | `agents/lead_agent/agent.py:416 make_lead_agent` |
| 中间件装配 | `agents/lead_agent/agent.py:270 build_middlewares` + `tool_error_handling_middleware.py:_build_runtime_middlewares` |
| 工具装配 | `tools/tools.py:44 get_available_tools` |
| 沙箱接口 | `sandbox/sandbox.py:6 Sandbox` |
| 状态 schema | `agents/thread_state.py:111 ThreadState` |
| 用户解析 | `runtime/user_context.py:112 resolve_runtime_user_id` |
| 配置入口 | `config/app_config.py:497 get_app_config` |
| 运行时入口 | `runtime/runs/worker.py:121 run_agent` |
| 流式桥 | `runtime/stream_bridge/base.py StreamBridge` |
| 持久化引导 | `persistence/bootstrap.py:399 bootstrap_schema` |
| Gateway | `app/gateway/app.py:163 lifespan` + `:253 create_app` |
| IM 分发 | `app/channels/manager.py:775 ChannelManager` |
| 嵌入式客户端 | `client.py:83 DeerFlowClient` |
