# 附录 B：工具完整清单

> DeerFlow Agent 工具箱的全量清单。来源见第 3 章 `get_available_tools`。

## B.1 内置工具（BUILTIN_TOOLS，默认存在）

| 工具 | 文件 | 作用 | 特性 |
|------|------|------|------|
| `present_files` | `tools/builtins/present_file_tool.py:83` | 呈现文件给用户（仅 `/mnt/user-data/outputs`） | 返回 `Command(update={"artifacts":...})`，merge_artifacts 去重 |
| `ask_clarification` | `tools/builtins/clarification_tool.py:6` | 请求用户澄清 | 占位实现，真正逻辑在 `ClarificationMiddleware`，`goto=END` 中断 |

## B.2 条件性内置工具

| 工具 | 触发条件 | 文件 |
|------|---------|------|
| `view_image` | 模型 `supports_vision` | `tools/builtins/view_image_tool.py:49` |
| `task` | `subagent_enabled` | `tools/builtins/task_tool.py:187` |
| `skill_manage` | `skill_evolution.enabled` | `tools/skill_manage_tool.py` |
| `setup_agent` | `is_bootstrap=True` | `tools/builtins/setup_agent_tool.py:16` |
| `update_agent` | 自定义 Agent（`agent_name` 且非 bootstrap） | `tools/builtins/update_agent_tool.py:85` |

## B.3 沙箱工具（config 声明，反射加载）

| 工具 | 文件 | 作用 |
|------|------|------|
| `bash` | `sandbox/tools.py:1388` | 执行 bash（路径翻译+host-bash 防护+输出截断） |
| `ls` | `sandbox/tools.py:1444` | 目录列表（树形，max 2 层） |
| `read_file` | `sandbox/tools.py:1666` | 读文件（可选行范围） |
| `write_file` | `sandbox/tools.py:1757` | 写/追加文件 |
| `str_replace` | `sandbox/tools.py:1850` | 子串替换（单次/全部） |

## B.4 社区工具（community/，可选）

| 类别 | provider | 文件 |
|------|---------|------|
| 网页搜索 | tavily | `community/tavily/tools.py:17 web_search_tool` |
| 网页抓取 | tavily / jina_ai / firecrawl | 各 `community/*/tools.py` |
| 图片搜索 | ddg | `community/image_search/tools.py:77` |
| Docker 沙箱 | aio_sandbox | `community/aio_sandbox/` `AioSandboxProvider` |
| 其他搜索 | brave/exa/serper/ddg_search/searxng/infoquest/fastcrw/groundroute/browserless | `community/*/` |

## B.5 ACP 工具（外部 Agent 桥接）

| 工具 | 触发条件 | 文件 |
|------|---------|------|
| `invoke_acp_agent` | `config.acp_agents` 非空 | `tools/builtins/invoke_acp_agent_tool.py:139 build_invoke_acp_agent_tool` |

per-thread 工作区 `{base_dir}/threads/{tid}/acp-workspace/`，lead 经 `/mnt/acp-workspace/` 只读访问。

## B.6 MCP 工具（外部协议桥接）

| 来源 | 文件 | 机制 |
|------|------|------|
| 多服务器 | `mcp/cache.py:82 get_cached_mcp_tools` | 惰性初始化 + mtime 缓存失效 |
| 传输 | stdio/SSE/HTTP | stdio 钉 cwd/TMPDIR；HTTP/SSE 支持 OAuth |
| 路径翻译 | `mcp/tools.py:77 _local_uri_to_virtual_path` | 物理路径→虚拟路径，线程树外不暴露 |
| 延迟加载 | `tool_search` 提升 | `DeferredToolFilterMiddleware` 按 `promoted` 状态 |

## B.7 装配优先级（去重）

同名工具按 `config > builtins > MCP > ACP` 优先级保留，其余丢弃 + warning（issue #1803）。
