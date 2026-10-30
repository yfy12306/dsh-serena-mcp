# dsh-serena-mcp

DSH 插件：把 [Serena](https://github.com/oraios/serena) 作为 MCP 服务器挂进 DSH，
获得符号级的代码检索/编辑工具面（find_symbol / replace_content / get_symbols_overview 等）。

- 用宿主自带的 `@deepseek-ai/dsh-mcp-client`，stdio 传输启动 Serena 的 MCP server
- 挂载失败只降级为「不挂载」，不影响 DSH 自身和其它插件

## 安装（单文件插件）

把 `serena-mcp.mjs` 放到 profile 目录（如 `~/.dsh/profiles/desktop/`），在
`cordis.patch.yml` 追加：

```yaml
- insert:
    - id: serena-mcp
      name: ./serena-mcp.mjs
```

重启 DSH 生效。

## 配置

Serena 可执行文件路径用环境变量 `SERENA_EXE` 指定；缺省取 PATH 上的 `serena`。

## License

MIT
