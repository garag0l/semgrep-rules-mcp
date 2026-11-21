// ruleid: mcp-experimental-task-store
const store = new InMemoryTaskStore();

// ruleid: mcp-experimental-task-store
const s = new McpServer({ name: "x", version: "1" }, { capabilities: {}, taskStore: store });

// ok: mcp-experimental-task-store
const s2 = new McpServer({ name: "x", version: "1" }, { capabilities: {} });
