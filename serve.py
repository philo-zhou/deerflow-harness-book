#!/usr/bin/env python3
"""牧鹿学习课程 — 本地静态服务

用法:
    cd deerflow-book && python3 serve.py [port]

然后在浏览器打开:  http://localhost:8080/site/

它用标准库 http.server 服务整个 deerflow-book/ 目录:
  - /site/        课程 SPA 应用
  - /第一部分…/*.md   书的 markdown(被 SPA fetch)
全是相对路径,所以把 deerflow-book/ 当任意静态托管的根即可上线。
"""
from __future__ import annotations

import http.server
import socketserver
import sys
from pathlib import Path

# 服务根 = 本脚本所在目录(deerflow-book/)
ROOT = Path(__file__).resolve().parent

# 给文本类文件强制 utf-8 字符集,避免中文乱码
UTF8 = {
    ".md": "text/markdown; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    # 限制在 ROOT 内,不允许 .. 越界
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        # 强制正确的 Content-Type
        path = Path(self.translate_path(self.path))
        if path.is_file():
            ct = UTF8.get(path.suffix)
            if ct:
                self.send_header("Content-Type", ct)
        # 允许本地 fetch(同源其实不需要,留作开发友好)
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        # 简洁日志
        sys.stderr.write("  %s\n" % (fmt % args))


def main():
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"非法端口: {sys.argv[1]!r},使用默认 8080")
    # ThreadingHTTPServer:并发拉取多个 markdown/资源
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("0.0.0.0", port), Handler) as httpd:
        url = f"http://localhost:{port}/site/"
        print("=" * 56)
        print("  🦌 牧鹿学习课程")
        print(f"  服务根目录: {ROOT}")
        print(f"  打开浏览器: {url}")
        print("  Ctrl+C 停止")
        print("=" * 56)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n已停止。")


if __name__ == "__main__":
    main()
