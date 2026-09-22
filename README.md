# SignalScope

SignalScope is an original three-screen React Native prototype for exploring fictional insider-activity signals. It was created for the ArkLab AI Batch 04 final-screening assignment.

> All companies, people, tickers, transactions, values, dates, signals, and chart points in this project are invented local demo data. SignalScope does not fetch financial information or provide investment advice.

## What is included

- **Market Pulse:** derived demo totals, top signals, recent activity, and entry points to the Screener.
- **Latest Trades:** case-insensitive ticker/company search plus combinable transaction, role, and value filters.
- **Trade Details:** complete fictional transaction fields, a custom seven-day activity chart, educational context, and the required disclaimer.

The app intentionally contains exactly three connected screens and has no backend, authentication, analytics, live data, or in-product AI.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm start
```

Use the Expo terminal options to open Android, iOS, or web. For a direct web run:

```bash
npm run web
```

## Quality checks

```bash
npm run typecheck
npm test -- --runInBand
npm run lint
npx expo-doctor
```

## Android preview APK

The `preview` EAS profile is configured to produce an installable APK:

```bash
npx eas-cli@latest build --platform android --profile preview
```

This command requires an authenticated Expo account. A locally compiled preview APK was also installed and smoke-tested on an Android 36 emulator during final verification.

## Submission artifacts

- APK: [SignalScope-1.0.0-preview.apk](https://drive.google.com/file/d/1cIeZRL2ZX5SdxOWvhZNgzQqgD2gur-18/view?usp=sharing) (45 MB, locally built for `arm64-v8a` and `x86_64`)
- Demo: [SignalScope-demo.mp4](https://drive.google.com/file/d/19XM4c292_MkOKjdp39Cj7D_FnaFGFbRm/view?usp=sharing) (2 minutes 57 seconds)
- Screenshots: [1](https://drive.google.com/file/d/1_wXbb-1zDFES8KzrUQqJNKCWvI5A1yo4/view?usp=sharing), [2](https://drive.google.com/file/d/1GACwqs6g2Xprrvu-ZbFpbBYXbUCh3qTF/view?usp=sharing), and [3](https://drive.google.com/file/d/1Klwy9mtNaRyO0PEPzfsqNjmJ4TLeav8s/view?usp=sharing)
- APK SHA-256: `17180921ffb72baba5731a85ed770760f69f4298f1f838b835f606b3a4f81312`

The APK and video are intentionally excluded from Git history; downloadable copies live at the Drive links above.

## Design and implementation decisions

- Expo, TypeScript, and React Navigation keep the mobile implementation small and typed.
- One immutable local dataset powers summaries, filtering, cards, and details.
- Screen-local state and pure selectors make filter behavior predictable without a global state library.
- The chart uses React Native Views to avoid a chart dependency.
- Purchases and sales are distinguished with words, direction arrows, and color.
- Flexible card layouts and scrollable filter rows target phone widths from 375–430 px.

## Project structure

- `src/data/` — typed fictional records
- `src/screens/` — Market Pulse, Screener, and Trade Details
- `src/components/` — reusable cards, chips, screen shell, badge, and chart
- `src/utils/` — deterministic selectors, filters, and formatters
- `__tests__/` — filter, summary, formatter, content, and data-integrity checks
- `docs/` — product requirements and technical design

## Limitations

- Static demo records do not update.
- No real filings, accounts, alerts, portfolios, or remote services are included.
- The bar chart is illustrative demo content, not a market-data visualization.
- The local APK uses an internal debug certificate and is not intended for Play Store production release.

## AI-use disclosure

The following AI tools were used during development, each in a specific supporting role:

- **npx-vibeworkflow** — used to follow a structured, professional vibe-coding workflow throughout development, and to run proper testing on the implementation it produced at the end of each stage.
- **Codex** — used as a development assistant for requirements organization, technical planning, implementation support, code review, testing, and troubleshooting.

SignalScope itself contains no AI model, prompt, agent, telemetry, or AI-facing runtime integration. The candidate remains responsible for reviewing, understanding, testing, explaining, and submitting the work.

## Required disclaimer

This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.
