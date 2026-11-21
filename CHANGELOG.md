# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning: [SemVer](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-11-21

### Added
- 14 rules (8 TypeScript/JavaScript, 6 Python): tool-description injection (tool poisoning), tool input to shell (taint), and the code changes required by the 2026 MCP SDK advisories (expectedIssuer / issuer=, expectedResource / validate_token_resource, shared transports and servers, redirect following, experimental taskStore, transport security settings).
- `dist/mcp.yaml` release bundle for `semgrep --config <url>`, with a CI self-check that every annotated test line is hit and nothing else.
