import { ClientCredentialsProvider, PrivateKeyJwtProvider } from "@modelcontextprotocol/sdk/client/auth-extensions.js";

// ruleid: mcp-oauth-provider-missing-expected-issuer
const a = new ClientCredentialsProvider({ clientId: "agent", clientSecret: process.env.SECRET });

// ruleid: mcp-oauth-provider-missing-expected-issuer
const b = new PrivateKeyJwtProvider({
  clientId: "agent",
  privateKey: key,
  algorithm: "RS256",
});

// ok: mcp-oauth-provider-missing-expected-issuer
const c = new ClientCredentialsProvider({ clientId: "agent", clientSecret: s, expectedIssuer: "https://auth.example.com" });

const expectedIssuer = "https://auth.example.com";
// ok: mcp-oauth-provider-missing-expected-issuer
const d = new PrivateKeyJwtProvider({ clientId: "x", privateKey: k, algorithm: "ES256", expectedIssuer });

// ok: mcp-oauth-provider-missing-expected-issuer
const e = new ClientCredentialsProvider({ ...opts });

// ok: mcp-oauth-provider-missing-expected-issuer
const f = new SomeOtherProvider({ clientId: "x" });
