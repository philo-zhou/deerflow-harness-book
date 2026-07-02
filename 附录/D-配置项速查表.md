# 附录 D：配置项速查表

> DeerFlow 两份配置文件的速查。详见第 5 章。

## D.1 config.yaml 主配置

配置路径优先级：① 显式参数 → ② `DEER_FLOW_CONFIG_PATH` 环境变量 → ③ `backend/config.yaml` → ④ 项目根 `config.yaml`（推荐）。

`$` 开头的值解析为环境变量。`config_version` 字段用于版本检查。

### 热重载字段（改后下一条消息生效，无需重启）

| 段 | 字段 | 说明 | 章 |
|---|------|------|---|
| `models[]` | `use`/`supports_thinking`/`supports_vision`/`max_tokens` | LLM 配置 | 5 |
| `tools[]` | `use`/`group` | 工具声明 | 3 |
| `tool_groups[]` | 工具分组 | 工具逻辑分组 | 3 |
| `title` | `enabled`/`max_words`/`max_chars` | 自动标题 | 7 |
| `summarization` | `enabled`/触发条件/keep 策略 | 上下文摘要 | 8 |
| `memory` | `enabled`/`injection_enabled`/`debounce_seconds`/`model_name`/`max_facts`/`fact_confidence_threshold`/`max_injection_tokens`/`token_counting` | 记忆系统 | 9 |
| `subagents` | `enabled`/`timeout_seconds`/`custom_agents` | 子智能体 | 10 |
| `acp_agents` | ACP 外部 Agent | 第 11 章 |
| `tool_search` | `enabled` | 延迟工具 | 13 |
| `guardrails` | `enabled`/`provider`/`fail_closed` | 护栏 | 18 |
| `loop_detection` | `enabled`/`warn_threshold`/`hard_limit` | 循环检测 | 8 |
| `token_budget` | `enabled`/预算 | Token 预算 | 8 |
| `token_usage` | `enabled` | Token 用量统计 | 7 |
| `safety_finish_reason` | `enabled` | 安全终止 | 7 |
| `suggestions` | 跟进问题 | — |
| `agents_api` | 自定义 Agent API | — |
| `skill_evolution` | `enabled` | Agent 管理技能 | 12 |
| `tool_output` | 工具输出预算 | 8 |

### 启动锁字段（STARTUP_ONLY_FIELDS，改后必须重启）

| 字段 | 原因 |
|------|------|
| `database` | `init_engine_from_config()` 启动时一次性建引擎 |
| `checkpointer` | `make_checkpointer()` 启动时绑定（含 SQLite WAL/busy_timeout） |
| `run_events` | `make_run_event_store()` 启动时选实现并冻结到 app.state |
| `stream_bridge` | `make_stream_bridge()` 启动时构造单例 |
| `sandbox` | `get_sandbox_provider()` 缓存 provider 单例 |
| `log_level` | `apply_logging_level()` 仅启动时跑 |
| `channels` | `start_channel_service()` 启动时建 IM 客户端 |
| `channel_connections` | 启动时接线连接仓库 + worker |

启动锁原因经 `format_field_description` 拼进 IDE 悬停，由 `tests/test_reload_boundary.py` 双向钉死。

## D.2 extensions_config.json 扩展配置

程序化读写（Gateway API），JSON 格式。

```json
{
  "mcpServers": {
    "server_name": {
      "enabled": true,
      "type": "stdio | sse | http",
      "command": "...", "args": [...], "env": {...},   // stdio
      "url": "...", "headers": {...}, "oauth": {...},   // sse/http
      "description": "..."
    }
  },
  "skills": {
    "skill_name": { "enabled": true }
  }
}
```

| 段 | API | 说明 |
|---|-----|------|
| `mcpServers` | `GET/PUT /api/mcp/config` | MCP 服务器配置（第 13 章） |
| `skills` | `PUT /api/skills/{name}` | 技能启用状态（第 12 章） |

## D.3 关键运行时配置（config.configurable）

每次请求可不同的运行时开关（第 2 章）：

| 字段 | 默认 | 作用 |
|------|------|------|
| `thinking_enabled` | true | 模型扩展思考 |
| `reasoning_effort` | null | 推理力度 |
| `model_name`/`model` | — | 临时切模型 |
| `is_plan_mode` | false | 计划模式（TodoMiddleware） |
| `subagent_enabled` | false | 子智能体（task 工具 + 协调者提示） |
| `max_concurrent_subagents` | 3 | 并发子智能体上限 |
| `agent_name` | — | 自定义 Agent |
| `is_bootstrap` | false | bootstrap 模式（setup_agent） |

## D.4 重要环境变量

| 变量 | 作用 |
|------|------|
| `DEER_FLOW_CONFIG_PATH` | 主配置路径 |
| `DEER_FLOW_EXTENSIONS_CONFIG_PATH` | 扩展配置路径 |
| `GATEWAY_ENABLE_DOCS` | 关闭 `/docs`/`/redoc`/`/openapi.json` |
| `GATEWAY_CORS_ORIGINS` | 跨域 origins（逗号分隔） |
| `LANGSMITH_TRACING`/`LANGFUSE_TRACING` | 链路追踪开关（第 18 章） |
| `DEER_FLOW_ENV`/`ENVIRONMENT` | 追踪 tag |
| `DEER_FLOW_CHANNELS_LANGGRAPH_URL`/`DEER_FLOW_CHANNELS_GATEWAY_URL` | IM 渠道服务 URL（Docker） |
