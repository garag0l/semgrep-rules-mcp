import os
import subprocess

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("demo")


@mcp.tool()
def git(args: str) -> str:
    # ruleid: mcp-py-tool-input-to-shell
    return subprocess.check_output(f"git {args}", shell=True, text=True)


@mcp.tool()
async def ping(host: str) -> str:
    cmd = "ping -c 1 " + host
    # ruleid: mcp-py-tool-input-to-shell
    os.system(cmd)
    # ok: mcp-py-tool-input-to-shell
    subprocess.run(["ping", "-c", "1", host], check=False)
    # ok: mcp-py-tool-input-to-shell
    subprocess.run("uptime", shell=True)
    return "ok"


def not_a_tool(x):
    # ok: mcp-py-tool-input-to-shell
    os.system(x)
