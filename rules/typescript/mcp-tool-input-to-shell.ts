import { exec, execFile, execSync, spawn } from "node:child_process";
import * as cp from "node:child_process";

server.tool("run", "Runs a git command", { args: z.string() }, async ({ args }) => {
  // ruleid: mcp-tool-input-to-shell
  const out = execSync(`git ${args}`).toString();
  return { content: [{ type: "text", text: out }] };
});

server.registerTool("ping", { description: "Ping a host" }, async (input) => {
  const host = input.host;
  // ruleid: mcp-tool-input-to-shell
  cp.exec("ping -c 1 " + host, () => {});
  // ruleid: mcp-tool-input-to-shell
  spawn(host, [], { shell: true });
  // ok: mcp-tool-input-to-shell
  execFile("ping", ["-c", "1", host], () => {});
  // ok: mcp-tool-input-to-shell
  exec("uptime", () => {});
  return { content: [] };
});

function notATool(x: string) {
  // ok: mcp-tool-input-to-shell
  execSync(x);
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const cmd = String(request.params.arguments?.command);
  // ruleid: mcp-tool-input-to-shell
  const out = execSync(cmd, { encoding: "utf8" });
  return { content: [{ type: "text", text: out }] };
});
