from mcp.server.auth.settings import AuthSettings

# ruleid: mcp-py-auth-settings-missing-resource-validation
settings = AuthSettings(issuer_url="https://auth.example.com", resource_server_url="https://mcp.example.com/mcp")

# ok: mcp-py-auth-settings-missing-resource-validation
ok = AuthSettings(issuer_url=i, resource_server_url=r, validate_token_resource=True)

# ok: mcp-py-auth-settings-missing-resource-validation
ok2 = AuthSettings(**cfg)


# ok: mcp-py-auth-settings-missing-resource-validation
class AuthSettings(BaseModel):
    pass
