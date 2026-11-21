import httpx
from mcp.client.streamable_http import streamable_http_client


async def main():
    client = httpx.AsyncClient(headers={"X-API-Key": key}, follow_redirects=True)
    # ruleid: mcp-py-client-follow-redirects
    async with streamable_http_client(url, http_client=client) as (r, w, _):
        pass

    safe = httpx.AsyncClient(headers={"X-API-Key": key})
    # ok: mcp-py-client-follow-redirects
    async with streamable_http_client(url, http_client=safe) as (r, w, _):
        pass

    # ok: mcp-py-client-follow-redirects
    web = httpx.AsyncClient(follow_redirects=True)
    return web
