/**
 * DSH 插件：把 Serena 作为 MCP 服务器挂进 DSH。
 *
 * 挂载方式与 @openviking/dsh-memory-plugin 一致：
 * 用宿主自带的 @deepseek-ai/dsh-mcp-client，以 stdio 传输起 Serena 的 MCP server。
 * `@deepseek-ai/dsh-mcp-client` 由 DSH 自己提供（已实测可从 profile 目录解析）。
 *
 * 注册位置：同目录的 cordis.patch.yml
 * 卸载方式：删掉 cordis.patch.yml 里 id: serena-mcp 那段，重启 DSH 即可。
 */
import * as mcpClient from "@deepseek-ai/dsh-mcp-client";

export const name = "serena-mcp";
export const inject = [];

const SERENA_EXE = process.env.SERENA_EXE || "serena";

const MCP_CONFIG = {
  transport: "stdio",
  serverName: "serena",
  command: SERENA_EXE,
  args: [
    "start-mcp-server",
    // DSH 是通用 agent 形态，用 Serena 的 agent context（官方内置）
    "--context",
    "agent",
    // 不让 Serena 每次启动都弹浏览器控制台；需要时手动开 http://localhost:24282/dashboard/
    "--open-web-dashboard",
    "false",
  ],
  env: {},
  toolCallTimeoutMs: 120000,
};

/**
 * 挂载 Serena 的工具面。
 * 失败被收敛在这里：即使 Serena 起不来，也不影响 DSH 自身和其它插件。
 */
export function apply(ctx) {
  try {
    ctx.plugin(mcpClient, MCP_CONFIG);
  } catch (err) {
    try {
      ctx.logger?.warn?.(`serena-mcp: 挂载失败（不影响其它功能）：${err}`);
    } catch {
      /* 日志失败也不能让插件加载失败 */
    }
  }
}
