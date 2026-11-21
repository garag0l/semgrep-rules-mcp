"""Bundle every rule under rules/ into dist/mcp.yaml (one config file for `semgrep --config`).

Also self-checks the bundle: every `ruleid:` annotation in the test files must be hit, and every rule
id must be unique. Usage: python scripts/bundle.py [--check SEMGREP_BIN]
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES = ROOT / "rules"
OUT = ROOT / "dist" / "mcp.yaml"


def bundle() -> list[str]:
    parts, ids = [], []
    for f in sorted(RULES.rglob("*.yaml")):
        text = f.read_text(encoding="utf-8")
        body = text.split("rules:\n", 1)[1]
        ids += re.findall(r"^  - id: (\S+)", body, re.M)
        parts.append(f"  # --- {f.relative_to(ROOT).as_posix()}\n" + body.rstrip() + "\n")
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        sys.exit(f"duplicate rule ids: {dupes}")
    OUT.parent.mkdir(exist_ok=True)
    header = ("# semgrep-rules-mcp: Semgrep rules for MCP servers and clients\n"
              "# https://github.com/garag0l/semgrep-rules-mcp  (MIT)\n")
    OUT.write_text(header + "rules:\n" + "\n".join(parts), encoding="utf-8", newline="\n")
    print(f"wrote {OUT.relative_to(ROOT)} with {len(ids)} rules")
    return ids


def check(semgrep: str) -> None:
    expected = set()
    for f in RULES.rglob("*"):
        if f.suffix in {".ts", ".py"}:
            lines = f.read_text(encoding="utf-8").splitlines()
            for i, line in enumerate(lines):
                m = re.search(r"ruleid:\s*(\S+)", line)
                if m:
                    expected.add((f.resolve().as_posix().lower(), i + 2, m.group(1)))
    semgrep = shutil.which(semgrep) or semgrep
    out = subprocess.run([semgrep, "--config", str(OUT), str(RULES), "--json", "--quiet", "--metrics", "off"],
                         capture_output=True, text=True, check=False)
    data = json.loads(out.stdout)
    got = {(Path(r["path"]).resolve().as_posix().lower(), r["start"]["line"], r["check_id"].split(".")[-1])
           for r in data["results"]}
    missing = expected - got
    extra = got - expected
    if missing or extra:
        for m in sorted(missing):
            print("MISSING", m)
        for e in sorted(extra):
            print("EXTRA  ", e)
        sys.exit(1)
    print(f"bundle self-check ok: {len(expected)} expected findings, all matched, no extras")


if __name__ == "__main__":
    bundle()
    if len(sys.argv) > 2 and sys.argv[1] == "--check":
        check(sys.argv[2])
