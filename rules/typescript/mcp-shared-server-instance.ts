import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "demo", version: "1.0.0" });

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  // ruleid: mcp-shared-server-instance
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

router.all("/mcp", function (req, res) {
  // ruleid: mcp-shared-server-instance
  server.server.connect(makeTransport(req));
});

app.post("/mcp2", async (req, res) => {
  // ok: mcp-shared-server-instance
  const perRequest = new McpServer({ name: "demo", version: "1.0.0" });
  await perRequest.connect(new StreamableHTTPServerTransport({}));
});

async function main() {
  // ok: mcp-shared-server-instance
  await server.connect(new StdioServerTransport());
}
