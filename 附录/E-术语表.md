# 附录 E：术语表

> 中英对照 + 章节定位。按拼音/字母排序。

## 术语

| 中文 | English | 定义 | 章 |
|------|---------|------|---|
| 暗示重连 | Last-Event-ID | SSE 用事件 id 支持断线重连续传 | 14 |
| 半程式化 | Semi-structured | — | — |
| 包装器 | Wrapper | 包裹调用，可改写请求/响应 | 7 |
| 边 | Edge | 图中连接节点的条件转移 | 2 |
| 表征 | Representation | — | — |
| 并发分区 | Concurrency Partition | — | — |
| 补丁 | Patch | 飞书卡片原地更新 | 16 |
| 不可变状态 | Immutable State | 每次更新返回新对象 | 6,17 |
| 部分隔离 | Partial Isolation | 子智能体继承沙箱但隔离对话 | 10 |
| 操作归一化 | Action Normalization | 错误转可读反馈 | 7 |
| 策略过滤 | Policy Filtering | 技能 allowed-tools 过滤工具箱 | 12 |
| 插槽 | Slot | — | — |
| 查询点 | Query Point | — | — |
| 拆解-委派-综合 | Decompose-Delegate-Synthesize | 协调者三步 | 11 |
| 超时 | Timeout | 子智能体默认 30 分钟 | 10 |
| 澄清中断 | Clarification Interrupt | ask_clarification 触发 goto=END | 7 |
| 持久化 | Persistence | 状态/数据落盘 | 15 |
| 检查点 | Checkpoint | LangGraph 状态快照，支持中断恢复 | 14 |
| 出站消息 | OutboundMessage | Agent → 平台 | 16 |
| 触发器 | Trigger | 工具仅触发，逻辑在中间件 | 3 |
| 单例 | Singleton | 进程级唯一实例 | 5 |
| 倒排 | Reverse Order | after_* 反向执行 | 7 |
| 防抖 | Debounce | 定时器合并多次入队 | 9 |
| 防御纵深 | Defense in Depth | 多道防线叠加 | 4,18 |
| 分发器 | Dispatcher | ChannelManager 消费消息总线 | 16 |
| 分支分派 | Branch Dispatch | bootstrap 三分支按状态选策略 | 15 |
| 封闭失败 | Fail Closed | 不确定时拒绝 | 6,18 |
| 覆盖 | Override | per-agent 配置覆盖 | 10 |
| 隔离 | Isolation | 按线程/按用户隔离状态 | 6 |
| 工作记忆 | Working Memory | 检查点状态，会话级 | 9 |
| 工具 | Tool | Agent 调用的动作 | 3 |
| 工具组 | Tool Group | 工具逻辑分组 | 3 |
| 供应商 | Provider | 可插拔实现（沙箱/检查点/护栏） | 4,15,18 |
| 冠名 | Tag | tag_mcp_tool 标记 MCP 来源 | 13 |
| 护栏 | Guardrail | 工具执行前授权 | 4,18 |
| 缓存失效 | Cache Invalidation | mtime/签名检测配置变化 | 5,13 |
| 缓存感知 | Cache-aware | 静态/动态分离利前缀缓存 | 8 |
| 回滚 | Rollback | abort 时恢复 pre-run 检查点 | 14 |
| 集成 | Integration | — | — |
| 检查点 | Checkpoint | 见检查点 | 14 |
| 降级 | Graceful Degradation | 错误不崩，转反馈 | 7 |
| 接口 | Interface | 抽象契约 | 4 |
| 节点 | Node | 图中的执行单元 | 2 |
| 截断 | Truncation | 工具输出/历史裁剪 | 8 |
| 进程内 | In-process | 嵌入式客户端，无 HTTP | 17 |
| 镜像 | Mirror | LocalSandbox 与 AioSandbox 同虚拟路径契约 | 4 |
| 卷 | Volume | — | — |
| 决策点 | Decision Point | 约束放此处易被发现 | 5 |
| 客户端 | Client | DeerFlowClient | 17 |
| 控制流原语 | Command(goto=END) | LangGraph 图跳转 | 7 |
| 快照 | Snapshot | 配置/状态快照 | 5,14 |
| 括号 | Bracket | stream_actions 的 RunStarted…RunEnded | 17 |
| 蓝图 | Blueprint | — | — |
| 离线 | Offline | — | — |
| 立即执行 | Direct Execution | 简单单步不委派 | 11 |
| 链路追踪 | Tracing | LangSmith/Langfuse，挂图根 | 18 |
| 两个路径 | Two Paths | HTTP/嵌入式并行 + 契约对齐 | 17 |
| 路径翻译 | Path Translation | 虚拟↔物理路径 | 4,13 |
| 路径穿越 | Path Traversal | 越界访问，PermissionError | 4 |
| 轮询 | Polling | 子智能体 5s 轮询 | 10 |
| 幂等 | Idempotent | 迁移可重复执行 | 15 |
| 模块单例 | Module Singleton | 各子系统配置单例 | 5 |
| 内存队列 | Memory Queue | MemoryStreamBridge | 14 |
| 内嵌运行时 | Embedded Runtime | Gateway 进程内驱动图 | 14 |
| 拼接 | Concatenation | — | — |
| 漂移检测 | Drift Detection | safe_add_column 检测列形状不一致 | 15 |
| 平台 | Platform | IM 平台（飞书/Slack/...） | 16 |
| 启动锁 | Startup-only | 改后需重启的字段 | 5 |
| 前缀缓存 | Prefix Cache | 静态系统提示复用 | 8 |
| 嵌套 | Nesting | 子智能体禁 task 防递归 | 10 |
| 嵌入式 | Embedded | 进程内，无 HTTP | 17 |
| 强制 | Hard | 硬限制（并发/循环/预算） | 8,10 |
| 切换 | Switch | — | — |
| 任务 | Task | 子智能体委派工具 | 10 |
| 三态 | Three-state | user_id _AUTO/str/None | 6 |
| 三级解析 | Three-level Resolution | 子智能体 内置→自定义→覆盖 | 10 |
| 三元组 | Triple | 签名 (mtime, size, sha256) | 5 |
| 上传 | Upload | 文件上传 + 文档转换 | 16 |
| 设备 | Device | — | — |
| 审计 | Audit | SandboxAuditMiddleware 记录沙箱操作 | 7 |
| 生产者/消费者 | Producer/Consumer | StreamBridge 解耦 | 14 |
| 事实 | Fact | 记忆的离散条目 | 9 |
| 收窄 | Narrow | allowed-tools 限制工具箱 | 12 |
| 输出预算 | Output Budget | 工具输出裁剪中间件 | 8 |
| 数据流 | Data Flow | 请求/状态流转路径 | 14 |
| 双线程池 | Dual Thread Pool | 子智能体调度池+执行池 | 10 |
| 提示注入 | Prompt Injection | 伪造系统标签 | 7,18 |
| 提示级扩展 | Prompt-level Extension | 技能，不动代码 | 12 |
| 通道 | Channel | 状态字段的 reducer 通道 | 6 |
| 通用智能体 | General-purpose | 内置子智能体 | 10 |
| 同步外壳 | Sync Shell | get_cached_mcp_tools 同步包异步 | 13 |
| 投递 | Delivery | — | — |
| 透传 | Pass-through | — | — |
| 外部智能体 | External Agent | ACP 桥接 | 11 |
| 网关 | Gateway | FastAPI + 内嵌运行时 | 16 |
| 委派 | Delegate | task 工具委派子任务 | 10 |
| 信任边界 | Trust Boundary | 内部共享/外部隔离 | 11 |
| 行 | Row | TUI ViewState 的行 | 17 |
| 延迟加载 | Deferred Loading | tool_search 按需提升工具 schema | 13 |
| 一致性 | Consistency | — | — |
| 引擎 | Engine | SQLAlchemy 异步引擎 | 15 |
| 拥有权转移 | Ownership Transfer | 最新渠道绑定获胜 | 16 |
| 用户上下文 | User Context | ContextVar 承载当前用户 | 6 |
| 游标 | Cursor | — | — |
| 游泳 | — | — | — |
| 有状态 | Stateful | — | — |
| 语义化 reducer | Semantic Reducer | 按字段语义合并并发写入 | 6 |
| 预算 | Budget | Token 预算/工具输出预算 | 8 |
| 预热 | Warm-up | lifespan 预热 tiktoken | 16 |
| 元数据 | Metadata | Langfuse trace 元数据 | 18 |
| 责任 | Ownership | 表/资源的归属 | 15 |
| 增量 | Delta | messages-tuple 逐 token 增量 | 14,17 |
| 账户 | Account | — | — |
| 折叠 | Collapse | — | — |
| 真相源 | Single Source of Truth | resolve_runtime_user_id | 6 |
| 中断 | Interrupt | abort/澄清中断 | 7,14 |
| 中间件 | Middleware | 横切关注点容器 | 7 |
| 仲裁 | Arbitration | — | — |
| 重连 | Reconnect | Last-Event-ID 续传 | 14 |
| 主动 | Active | — | — |
| 主协调者 | Lead Orchestrator | subagent_enabled 后的 lead 角色 | 11 |
| 装配 | Assembly | 建图时组装工具/中间件 | 2,3 |
| 状态 | State | ThreadState，图的共享内存 | 6 |
| 状态机 | State Machine | run 状态流转 | 14 |
| 子智能体 | Subagent | 独立上下文的 Agent 分身 | 10 |
| 自我修复 | Self-heal | tiktoken 冷却后重试 | 9 |
| 字典 | Dict | — | — |
| 综合 | Synthesize | 协调者合并子结果 | 11 |
| 总线 | Bus | MessageBus 异步发布/订阅 | 16 |
| 阻塞 | Blocking | runs.wait 路径 | 16 |
| 阻塞 IO | Blocking IO | 须移出事件循环 | 4,15 |
| 作用域 | Scope | merge_promoted 按 catalog_hash 作用域 | 6 |
| ACP | Agent Communication Protocol | 外部 Agent 协议桥接 | 11 |
| Agent Harness | — | 围绕 LLM 的运行时框架 | 1 |
| App 层 | App Layer | app.*，FastAPI + IM，不可发布 | 1 |
| Artifact | — | Agent 呈现给用户的文件 | 3,6 |
| Command | — | LangGraph 状态更新/控制流原语 | 3,7 |
| ContextVar | — | asyncio task-local 上下文 | 6 |
| DeerFlowClient | — | 嵌入式进程内客户端 | 17 |
| fail closed | 封闭失败 | 不确定时拒绝 | 6,18 |
| Fork | 分身 | 子智能体上下文继承 | 10 |
| Guardrail | 护栏 | 工具前授权 | 18 |
| Harness 层 | Harness Layer | deerflow.*，可发布框架包 | 1 |
| Hook | 钩子 | 中间件生命周期扩展点 | 7 |
| IM | Instant Messaging | 飞书/Slack/Telegram/Discord/钉钉 | 16 |
| Langfuse | — | 链路追踪平台 | 18 |
| LangGraph | — | 图式 Agent 编排框架 | 2 |
| LangSmith | — | 链路追踪平台 | 18 |
| MCP | Model Context Protocol | 标准化外部工具协议 | 13 |
| on_disconnect | — | 断连时取消后台 run | 14 |
| per-thread | 按线程 | 每线程隔离 | 4,6 |
| per-user | 按用户 | 每用户隔离 | 6,9 |
| ReAct | Reason+Act | 模型-工具循环图模式 | 2 |
| reducer | 合并器 | 并发写入的合并函数 | 6 |
| Runtime | 运行时 | LangGraph 执行上下文 | 2,14 |
| SKILL.md | — | 技能定义文件 | 12 |
| SOUL.md | — | 自定义 Agent 人格文件 | 5 |
| SSE | Server-Sent Events | 流式推送协议 | 14 |
| StreamBridge | 流式桥 | 生产者/消费者解耦 | 14 |
| TUI | Terminal UI | textual 终端应用 | 17 |
| ToolMessage | — | 工具结果消息 | 3 |
| virtual path | 虚拟路径 | /mnt/user-data/* 统一视角 | 4 |
