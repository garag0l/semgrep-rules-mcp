// ruleid: mcp-redirect-policy-follow
const t = new StreamableHTTPClientTransport(new URL(u), { authProvider, redirectPolicy: "follow" });

// ruleid: mcp-redirect-policy-follow
const opts = { redirectPolicy: 'follow' };

// ok: mcp-redirect-policy-follow
const t2 = new StreamableHTTPClientTransport(new URL(u), { authProvider });

// ok: mcp-redirect-policy-follow
const t3 = new StreamableHTTPClientTransport(new URL(u), { redirectPolicy: "same-origin" });
