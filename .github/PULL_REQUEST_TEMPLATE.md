## Script Submission Checklist

Before submitting a PR for a new script, verify:
- [ ] Only standard JavaScript ES6+ features used (no node modules, no `require()`).
- [ ] No remote code execution (e.g., `eval()`, `new Function()`).
- [ ] Network requests ONLY use the provided `fetch()` polyfill context.
- [ ] Follows UI constraints: Native JSON Passthrough components or basic primitive tags.
- [ ] `metadata.json` is provided and passes JSON schema validation.

## Changes Proposed
- (List script intent and widget UI goals)

## Testing
- [ ] Tested on iOS (JavaScriptCore)
- [ ] Tested on Android (QuickJS)
- [ ] Live preview renders successfully in Script Automator editor.

## Screenshots / Screen Recordings
(Attach visuals of the widget output here)
