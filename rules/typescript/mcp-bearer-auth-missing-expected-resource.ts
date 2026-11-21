import { requireBearerAuth, verifyBearerToken } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";

// ruleid: mcp-bearer-auth-missing-expected-resource
app.use("/mcp", requireBearerAuth({ verifier }));

// ruleid: mcp-bearer-auth-missing-expected-resource
const gate = requireBearerAuth({ verifier, requiredScopes: ["mcp"] });

// ruleid: mcp-bearer-auth-missing-expected-resource
const info = await verifyBearerToken(req.headers.authorization, { verifier });

// ok: mcp-bearer-auth-missing-expected-resource
app.use(requireBearerAuth({ verifier, expectedResource: new URL("https://mcp.example.com/mcp") }));

// ok: mcp-bearer-auth-missing-expected-resource
const ok2 = await verifyBearerToken(h, { verifier, expectedResource });

// ok: mcp-bearer-auth-missing-expected-resource
const ok3 = requireBearerAuth(options);

// ok: mcp-bearer-auth-missing-expected-resource
const ok4 = requireBearerAuth({ ...base, verifier });
