# Tech Stack

Last verified: 2026-09

## Stack

| Area | Choice | Notes |
|------|--------|-------|
| Frontend | Expo + React Native + TypeScript + React Navigation | Required mobile stack with low configuration risk and typed three-screen routing |
| Backend | none | The assignment requires fictional local data and no external API |
| Database | typed local constants | Immutable TypeScript data bundled identically in development and the APK |
| Auth | none | No users, roles, or sessions are in scope |
| Styling | React Native StyleSheet with design tokens | Original dark mobile UI, flexible 375–430 px layouts, text/icon/color semantics |
| Deployment | EAS Build preview APK | `preview` explicitly uses Android APK output for direct installation |

## Commands

- Setup: `npm install`
- Dev: `npx expo start`
- Test: `npm test -- --runInBand`
- Typecheck: `npx tsc --noEmit`
- Lint/format: `npm run lint`
- Build: `npx eas-cli@latest build --platform android --profile preview`
- Browser/device check: `npx expo start --web` for fast layout checks, followed by Expo Go/emulator and final installed APK smoke test

## Important Patterns

- Data fetching: None; import typed local data
- State management: Screen-local React state and pure memoized selectors
- Forms/validation: Controlled search input and enumerated filter chips
- Error handling: Safe missing-trade fallback with back navigation; no remote errors
- Logging/monitoring: Development console only; no production telemetry
