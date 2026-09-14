# Technical Design: SignalScope MVP

## 1. Recommended approach

Build a full-code Expo application using React Native and TypeScript, organized around three typed native-stack routes and a single local dataset. Keep the architecture intentionally small: reusable presentational components, pure data selectors, screen-level filter state, and no backend or global state library.

This approach matches the assignment, the user's React and Flutter background, the seven-day schedule, and the need to explain every decision. It also minimizes APK build risk because it stays within Expo-compatible JavaScript dependencies.

## 2. Alternatives considered

| Option | Advantages | Disadvantages | Decision |
|---|---|---|---|
| Expo + React Navigation | Fast setup, familiar component model, typed routes, straightforward EAS APK | Requires navigation configuration | Selected |
| Expo Router | File-based routing and current Expo default | Adds conventions unnecessary for exactly three screens | Not selected |
| Bare React Native | Maximum native control | More native configuration and higher deadline risk | Not selected |
| Flutter | User already knows it | Violates the React Native assignment | Rejected |
| SVG/chart library | Smooth custom graphing | Adds a dependency for a simple required visual | Defer; use View bars |

## 3. System architecture

```text
App.tsx
  └── NavigationContainer
      └── NativeStackNavigator<RootStackParamList>
          ├── HomeScreen
          │   ├── SummaryCard
          │   ├── SignalBadge
          │   └── TradeCard
          ├── ScreenerScreen
          │   ├── FilterChip
          │   └── TradeCard
          └── TradeDetailsScreen
              ├── SignalBadge
              └── MockActivityChart

mockTrades.ts ──> selectors/formatters ──> screens/components
```

Data flows down through props. Home derives summary totals from `mockTrades`. Screener owns query and filter state and derives the visible records through one pure `filterTrades` function. Navigation passes only the selected trade ID; Details resolves that ID from the same immutable local dataset.

## 4. Project structure

```text
src/
  components/
    FilterChip.tsx
    MockActivityChart.tsx
    Screen.tsx
    SignalBadge.tsx
    SummaryCard.tsx
    TradeCard.tsx
  data/
    mockTrades.ts
  navigation/
    AppNavigator.tsx
    types.ts
  screens/
    HomeScreen.tsx
    ScreenerScreen.tsx
    TradeDetailsScreen.tsx
  theme/
    colors.ts
    spacing.ts
    typography.ts
  types/
    trade.ts
  utils/
    filterTrades.ts
    formatters.ts
__tests__/
  filterTrades.test.ts
  formatters.test.ts
```

## 5. Data model

```ts
export type InsiderTrade = {
  id: string;
  ticker: string;
  company: string;
  sector: string;
  insider: string;
  role: 'CEO' | 'CFO' | 'Director' | 'Officer';
  type: 'purchase' | 'sale';
  transactionCode: 'P' | 'S';
  shares: number;
  pricePerShare: number;
  value: number;
  transactionDate: string;
  filedAt: string;
  signal: string;
  signalStrength: 'High' | 'Medium' | 'Low';
  activity: readonly number[];
};
```

The seed data will contain at least eight invented companies and enough role/type/value variation to exercise every filter. Dates are stored as ISO strings; formatting occurs at the view boundary. `activity` contains exactly seven invented non-negative points.

## 6. Navigation design

```ts
export type RootStackParamList = {
  Home: undefined;
  Screener: { focusSearch?: boolean } | undefined;
  TradeDetails: { tradeId: string };
};
```

Use `@react-navigation/native-stack`. Hide the default header and render original screen headers for complete design control. The Details back action calls the navigator's back behavior. Passing a stable ID rather than the full object keeps route params small and guarantees a single source of truth.

## 7. Feature implementation

### Market Pulse

- Derive count, total purchase value, and total sale value from `mockTrades` with `reduce`.
- Render three summary cards in a flexible row/wrap layout.
- Derive top signals from the dataset or define original signal summaries tied to the same records.
- Render the four most recent records, sorted by `filedAt`.
- Home search is a pressable search affordance that navigates to Screener with `focusSearch: true`.

### Screener

- State: `query`, `transactionType`, `role`, and `minimumValue`.
- Normalize query with `trim().toLowerCase()`.
- Apply every active condition using AND semantics in `filterTrades`.
- Memoize results from data plus current controls.
- Use horizontal `ScrollView` rows for filter chips on narrow screens.
- Clear action restores query and all defaults.
- Use `FlatList` for records and its empty component for the required message.

### Trade Details

- Resolve `tradeId`; if absent from the dataset, show a safe fallback with back navigation rather than crashing.
- Format all numeric data through shared formatters.
- Normalize seven activity points against the largest value and render seven labeled vertical bars using Views.
- Render the exact assignment disclaimer as a constant to prevent accidental rewriting.

## 8. Visual system and responsiveness

- Background: deep navy; surfaces: layered slate; borders: muted blue-gray.
- Text: near-white primary and cool-gray secondary.
- Purchase: green plus upward arrow and the word “Purchase.”
- Sale: orange-red plus downward arrow and the word “Sale.”
- Analytics/selection: blue-violet.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32.
- Card radius: 16; chips: pill-shaped; minimum interactive height: approximately 44.
- Use Safe Area Context, flex layouts, bounded content width, and horizontal chip scrolling.
- Test representative 375 px and 430 px widths with large company strings.

## 9. Storage, networking, privacy, and security

There is no database, device persistence, authentication, secrets, or application network layer. All records ship as source-controlled fictional constants. This eliminates runtime data exposure and financial-data provenance risk. External links are unnecessary in the app.

Repository checks should verify that no `fetch`, HTTP client, real ticker feed, or copied source content was added. Development/build services may receive source code as part of their standard workflow; no personal or financial user data exists in the product.

## 10. Testing and verification

### Automated

- TypeScript no-emit check.
- Expo ESLint.
- Jest tests for case-insensitive search, type/role/value filters, combined filters, empty results, reset defaults, summaries, and formatters.

### Runtime

- Launch with Expo and inspect the initial screen.
- Exercise Home → Screener → Details and back.
- Search by ticker and full company name with mixed case.
- Exercise each filter group, one combined-filter path, empty state, and clear action.
- Open multiple records and compare every displayed field to the local source record.
- Inspect at 375–430 px widths and verify scrollability, truncation behavior, contrast, and touch targets.

### Delivery

- Configure EAS `preview` with `android.buildType: "apk"`.
- Build the preview APK, install it on an Android device/emulator, and repeat the smoke journey.
- Capture screenshots only from the running app.

## 11. AI assistance strategy

Codex may help convert requirements into checkpoints, scaffold explainable code, review logic, run checks, and diagnose failures. The candidate remains responsible for reviewing, understanding, testing, and explaining the work. No development subagents or complex agent orchestration are required; a single sequential workflow reduces merge risk for this small project.

The final README disclosure will name Codex and describe only its actual contribution. SignalScope itself contains no model calls, prompts, telemetry, or AI-facing tools.

## 12. Build and deployment plan

1. Scaffold the Expo TypeScript source in the existing planned workspace.
2. Install Expo-compatible navigation dependencies.
3. Add application code, tests, configuration, and documentation.
4. Run TypeScript, lint, unit tests, and Expo diagnostics.
5. Exercise the application through the required runtime journeys.
6. Log into EAS only when an authenticated build is required.
7. Configure a preview APK profile and build for Android.
8. Install and smoke-test the generated APK before sharing it.

Backup: if hosted EAS service timing becomes problematic, use a local Android build only when the machine already has the necessary Android toolchain; do not switch architecture late solely for packaging.

## 13. Cost breakdown

- Application dependencies: free/open source.
- Runtime hosting/database/API: none.
- EAS preview build: use the account's available plan/credits; limited credits are authorized if needed.
- Google Play account: unnecessary because the deliverable is a directly installable APK, not a store submission.
- Screenshots/video: local emulator or physical device tools.

## 14. Scaling and evolution

Scaling is deliberately out of scope. If this concept later became a real product, provenance, licensing, backend ingestion, authentication, caching, financial disclaimers, compliance review, observability, and privacy controls would require a new design. The prototype architecture should not be presented as suitable for live financial data.

## 15. Limitations

- Static records do not update between sessions.
- No real filings, alerts, watchlists, accounts, or remote configuration.
- Bar visualization is illustrative rather than a general-purpose chart system.
- Automated unit checks do not replace manual device inspection or APK installation.

---

```json
{
  "schemaVersion": 1,
  "documentType": "techdesign",
  "appName": "SignalScope",
  "stack": {
    "frontend": "Expo + React Native + TypeScript + React Navigation",
    "backend": "none",
    "database": "typed local constants",
    "auth": "none",
    "styling": "React Native StyleSheet with design tokens",
    "deployment": "EAS Build preview APK"
  },
  "commands": {
    "setup": "npm install",
    "dev": "npx expo start",
    "test": "npm test -- --runInBand",
    "typecheck": "npx tsc --noEmit",
    "lint": "npm run lint",
    "build": "npx eas-cli@latest build --platform android --profile preview"
  },
  "aiScope": "none"
}
```

## Handoff Context
<!-- Machine-readable summary for the next workflow step. Do not delete; the next prompt in the workflow reads this block. -->
- Stage: techdesign
- App name: SignalScope
- User level: C
- Target platform: Android-first mobile, reasonable iOS compatibility
- Budget: Mostly free; limited credits available if required for APK build
- Timeline: Seven-day implementation; approximate submission deadline 2026-09-22
- Mode: Guided
- AI in product scope: No; development assistance only
- Constraints: Exactly three connected screens; Expo + React Native + TypeScript; fictional local data only; no source-site access/copying; required APK, screenshots, video, README, disclaimer, and AI disclosure
- Decisions: React Navigation native stack; local typed data; screen-level state; View-based chart; Jest logic tests; EAS preview APK profile; single-agent sequential implementation
- Open questions: Exact dependency versions will be selected by Expo-compatible installers during scaffolding; authenticated EAS build requires the user's Expo account later
- Source files: docs/research-SignalScope.md, docs/PRD-SignalScope-MVP.md, docs/TechDesign-SignalScope-MVP.md
