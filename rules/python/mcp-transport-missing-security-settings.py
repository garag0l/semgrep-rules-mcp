from mcp.server.sse import SseServerTransport
from mcp.server.streamable_http_manager import StreamableHTTPSessionManager

# ruleid: mcp-py-transport-missing-security-settings
manager = StreamableHTTPSessionManager(app=server, stateless=True)

# ruleid: mcp-py-transport-missing-security-settings
sse = SseServerTransport("/messages/")

# ok: mcp-py-transport-missing-security-settings
m2 = StreamableHTTPSessionManager(app=server, security_settings=TransportSecuritySettings(allowed_hosts=["localhost:8000"]))

# ok: mcp-py-transport-missing-security-settings
sse2 = SseServerTransport("/messages/", security)
