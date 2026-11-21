import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { NodeStreamableHTTPServerTransport } from "@modelcontextprotocol/node";
import { randomUUID } from "node:crypto";

// ruleid: mcp-shared-stateless-transport
const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

// ruleid: mcp-shared-stateless-transport
export const t2 = new NodeStreamableHTTPServerTransport({ enableJsonResponse: true });

// ok: mcp-shared-stateless-transport
const stateful = new NodeStreamableHTTPServerTransport({ sessionIdGenerator: () => randomUUID() });

app.post("/mcp", async (req, res) => {
  // ok: mcp-shared-stateless-transport
  const perRequest = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await perRequest.handleRequest(req, res, req.body);
});

function build() {
  // ok: mcp-shared-stateless-transport
  return new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
}

class Holder {
  make() {
    // ok: mcp-shared-stateless-transport
    return new StreamableHTTPServerTransport({});
  }
}

// ok: mcp-shared-stateless-transport
const s3 = new NodeStreamableHTTPServerTransport({ sessionIdGenerator });

// ok: mcp-shared-stateless-transport
const s4 = new StreamableHTTPServerTransport({ sessionIdGenerator() { return randomUUID(); } });
