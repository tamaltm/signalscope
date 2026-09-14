# Phase 6 Verification — 2026-09-14

Environment: Expo 57 project, Node.js/npm local environment, Chromium browser. Recovery checkpoint before Phase 6: `30b892a`.

## Setup checked

- Exactly three stack screens are registered: Home, Screener, and Trade Details.
- `eas.json` preview configuration uses `android.buildType: "apk"`.
- Nine unique typed fictional records cover purchase/sale, every visible role filter, every value threshold, and seven chart values each.
- No `fetch`, Axios, or HTTP URL usage exists in application source.
- README documents setup, architecture choices, limitations, originality, APK command, and actual Codex assistance.

## Build checked

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm test -- --runInBand` | Passed: 3 suites, 15 tests |
| `npm run lint` | Passed |
| `npx expo-doctor` | Passed: 21/21 checks |
| `npx expo export --platform web` | Passed; `index.html` and bundle generated in a temporary directory |
| `npm audit --audit-level=high` | Passed threshold; 16 transitive moderate advisories remain |

The audit's automated force-fix proposes breaking downgrades of Expo and React Navigation, so it was not applied.

## Behavior checked

Verified in the running web app:

- Home renders all three derived summaries, three top signals, four recent records, and navigation entry points.
- Mixed-case ticker `nOvA` returns NovaGrid Systems.
- Mixed-case company query `hEaLtH lAbS` returns Elio Health Labs.
- Purchases + Director + $500K+ uses AND behavior and returns only VoltArc Energy.
- The VoltArc card opens the matching record and displays 14,000 shares, $1,120,000.00 total value, and the mock chart.
- Returning from Details preserves the combined Screener filters.
- An unmatched query displays the exact required empty-state message.
- Clear filters restores all nine records.
- Purchase and sale details were both checked for text, direction icon, color semantics, transaction code, educational copy, and exact disclaimer.
- Home was visually inspected at 375×812 and 430×932 browser viewports; content remained readable without horizontal overflow.

## Not checked

- Native Android compile, installed APK launch, device touch behavior, and device screen-reader output.
- iOS runtime behavior.
- Final three submission screenshots and 1–3 minute demo video.

These remaining Android and submission-artifact checks belong to Phase 7.
