# Testing

## Required Before Completion

- [ ] Relevant tests pass.
- [ ] Typecheck/build passes.
- [ ] User-visible changes are checked in a browser or device when applicable.
- [ ] No tests were skipped or weakened without human approval.
- [ ] Evidence is reported in the final response.

## Commands

- All tests: `npm test -- --runInBand`
- Single test: `npm test -- --runInBand`
- Typecheck: `npx tsc --noEmit`
- Lint/format: `npm run lint`
- Build: `npx eas-cli@latest build --platform android --profile preview`
- Browser/device check: Start with `npx expo start --web`; then exercise the same journey in Expo Go/emulator and the installed preview APK

## What To Test

| Change type | Minimum check |
|-------------|---------------|
| Pure logic | Unit test |
| API/data flow | Integration test |
| UI behavior | Browser/device check |
| Auth, billing, migrations, deployment | Human review plus focused test |
| AI/tool behavior | Prompt/tool eval plus data-boundary check |

## Required acceptance journeys

- Home → Browse trades → combine type, role, and value filters → open a result → return.
- Search for a ticker and a company name using mixed case; both should match.
- Enter a deliberately unmatched search; verify the required empty message and Clear filters recovery.
- Open several cards; verify every displayed detail against the local source record.
- Confirm all content is fictional, no application network calls exist, and the exact disclaimer is visible.
