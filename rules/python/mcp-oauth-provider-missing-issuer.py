from mcp.client.auth.extensions.client_credentials import ClientCredentialsOAuthProvider, PrivateKeyJWTOAuthProvider

# ruleid: mcp-py-oauth-provider-missing-issuer
provider = ClientCredentialsOAuthProvider(server_url="https://tools.example.com/mcp", storage=storage, client_id="a", client_secret=s)

# ruleid: mcp-py-oauth-provider-missing-issuer
p2 = PrivateKeyJWTOAuthProvider(
    server_url=url,
    storage=storage,
    client_id="a",
    assertion_provider=ap,
)

# ok: mcp-py-oauth-provider-missing-issuer
p3 = ClientCredentialsOAuthProvider(server_url=url, storage=storage, client_id="a", client_secret=s, issuer="https://auth.example.com")

# ok: mcp-py-oauth-provider-missing-issuer
p4 = ClientCredentialsOAuthProvider(**config)


# ok: mcp-py-oauth-provider-missing-issuer
class ClientCredentialsOAuthProvider(OAuthClientProvider):
    pass
