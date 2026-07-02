# 附录 C：中间件完整清单

> DeerFlow 中间件链全量清单（第 7 章）。按装配顺序排列。带 \* 为条件性中间件。

## C.1 Hook 类型

| Hook | 触发 | 用途 |
|------|------|------|
| `before_agent`/`abefore_agent` | run 开始（一次） | 获取资源、初始化 |
| `after_agent`/`aafter_agent` | run 结束（一次） | 释放资源、排队记忆 |
| `before_model`/`abefore_model` | 每次调模型前 | 摘要、注入 |
| `after_model`/`aafter_model` | 每次调模型后 | 标题、用量、限流（反向执行） |
| `wrap_model_call`/`awrap_model_call` | 包裹模型调用 | 输入消毒、错误恢复、合并（洋葱，第一个最外层） |
| `wrap_tool_call`/`awrap_tool_call` | 包裹工具调用 | 审计、错误兜底、授权、澄清 |

## C.2 共享运行时基座（lead + subagent）

| # | 中间件 | Hook | 作用 |
|---|--------|------|------|
| 1 | `InputSanitizationMiddleware` | wrap_model_call | 输入消毒转义（最外层，第 7 章） |
| 2 | `ToolOutputBudgetMiddleware` | wrap_tool_call/wrap_model_call | 工具输出预算裁剪（第 8 章） |
| 3 | `UploadsMiddleware`\* | before_agent | 注入上传文件（仅 lead，第 3 章） |
| 4 | `ThreadDataMiddleware` | before_agent | 创建 per-thread 目录（第 4、6 章） |
| 5 | `SandboxMiddleware` | before_agent | 惰性获取沙箱（第 4 章） |
| 6 | `DanglingToolCallMiddleware`\* | wrap_model_call | 悬挂工具调用修补（仅 lead） |
| 7 | `LLMErrorHandlingMiddleware` | wrap_model_call | LLM 错误归一化（第 7 章） |
| 8 | `GuardrailMiddleware`\* | wrap_tool_call | 工具前授权（可选，第 18 章） |
| 9 | `SandboxAuditMiddleware` | wrap_tool_call | 沙箱操作审计 |
| 10 | `ToolErrorHandlingMiddleware` | wrap_tool_call | 工具错误兜底（第 7 章） |

## C.3 lead 专属中间件

| # | 中间件 | Hook | 作用 |
|---|--------|------|------|
| 11 | `DynamicContextMiddleware` | before_agent | 日期/记忆注入首条 HumanMessage（第 8 章） |
| 12 | `SkillActivationMiddleware` | wrap_model_call | 斜杠技能激活（第 12 章） |
| 13 | `DeerFlowSummarizationMiddleware`\* | before_model | 上下文摘要（第 8 章） |
| 14 | `TodoMiddleware`\* | before_model | 计划模式 TodoList（`is_plan_mode`） |
| 15 | `TokenUsageMiddleware`\* | after_model | Token 用量统计 |
| 16 | `TitleMiddleware` | after_model | 自动标题生成 |
| 17 | `MemoryMiddleware` | after_agent | 记忆排队（第 9 章） |
| 18 | `ViewImageMiddleware`\* | before_model | 图片 base64 注入（视觉模型） |
| 19 | `DeferredToolFilterMiddleware`\* | wrap_model_call/wrap_tool_call | 延迟工具过滤（`tool_search`，第 13 章） |
| 20 | `SystemMessageCoalescingMiddleware` | wrap_model_call | SystemMessage 合并（第 8 章） |
| 21 | `SubagentLimitMiddleware`\* | after_model | 子智能体并发限流（`subagent_enabled`，第 10 章） |
| 22 | `LoopDetectionMiddleware`\* | after_model+wrap_model_call | 循环检测硬停（第 8 章） |
| 23 | `TokenBudgetMiddleware`\* | before_agent+after_model+wrap_model_call | per-run token 预算（第 8 章） |
| 24 | `custom_middlewares`\* | 任意 | 用户自定义 |
| 25 | `SafetyFinishReasonMiddleware`\* | after_model | 安全终止抑制工具（利用反向执行，第 7 章） |
| 26 | `ClarificationMiddleware` | wrap_tool_call | 澄清中断（**最后**，`goto=END`，第 7 章） |

## C.4 顺序即语义

- **第一**：`InputSanitizationMiddleware`（最外层 wrap，所有内层见消毒消息）
- **最后**：`ClarificationMiddleware`（中断型，避免误触发后续）
- **反向 after 利用**：`SafetyFinishReasonMiddleware` 注册在 custom 之后，`after_model` 反向执行使其最先跑

## C.5 子智能体差异

`build_subagent_runtime_middlewares` 关闭 `UploadsMiddleware` 和 `DanglingToolCallMiddleware`（子智能体不处理用户上传），复用其余基座；lead 专属中间件不挂载（子智能体有自己的中间件集）。
