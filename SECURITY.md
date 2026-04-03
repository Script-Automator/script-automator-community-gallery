# Security Policy

## Supported Versions
Only the latest major branch receives security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in a Script Automator community script, please do NOT file a public issue. We take security seriously.

Email: security@scriptautomator.com

We will respond within 48 hours.

## Sandboxing Architecture

Script Automator uses Apple's JavaScriptCore (iOS) and QuickJS (Android) in a strictly sandboxed environment.
When reviewing PRs, we enforce these architectural constraints:

1. **No direct DOM/Node access:** Scripts cannot access `window`, `document`, or Node.js primitives.
2. **Strict API Surface:** Only system-polyfilled APIs (`fetch`, `console`, `Keychain`, `Device`) are available.
3. **No Dynamic Execution:** `eval()`, `new Function()`, and `setTimeout(string)` are blocked at the engine level. 

## Banned Patterns

Any script submission containing the following patterns will be immediately rejected and potentially flagged:
- Accessing local network: `localhost`, `127.0.0.1`, `192.168.*`, `10.*`
- Attempting prototype pollution attacks.
- Attempting to exploit FFI bindings.
- Exfiltrating telemetry data without explicit UI disclosure.
- Malicious Keychain payload insertion.
