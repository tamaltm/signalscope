# SignalScope — Focused Research Brief

Date: 2026-09-14

## Research scope

This is a constrained hiring assignment rather than a commercial product, so broad market validation is unnecessary. Research is limited to decisions that reduce delivery risk: current Expo setup, typed navigation, installable Android APK generation, accessibility, and strict compliance with the supplied brief.

## Product and evaluator context

SignalScope is an original, mobile-first prototype for scanning fictional insider-activity signals. The primary audience is ArkLab AI's hiring team. The prototype must demonstrate React Native fundamentals, clear visual hierarchy, local state derivation, reusable components, navigation, accessibility, testing discipline, and honest AI-use disclosure.

StockInsider.io is only a high-level category reference. The project must not access, scrape, reproduce, or display its data, copy, layout, charts, or visual system. All companies, people, transactions, values, dates, chart points, signals, and educational copy will be created locally for this prototype.

## Technical recommendations

- Use the current `create-expo-app` TypeScript workflow. Expo officially supports Linux development and recommends its standard starter for new projects.
- Use React Navigation with a native stack and typed route parameters. The official Expo-compatible setup requires `@react-navigation/native`, `react-native-screens`, and `react-native-safe-area-context`.
- Keep all data in a typed local array. Use screen-level React state and memoized derived filtering; no backend, authentication, global state library, or financial API is warranted.
- Implement the seven-day chart with plain React Native `View` bars. This meets the brief while avoiding a charting dependency and reducing native build risk.
- Configure an EAS `preview` profile with `android.buildType: "apk"`. Expo documents that the default Android store artifact is an AAB, while an installable assignment artifact must explicitly be built as an APK.
- Add visible text alongside color and arrows for Purchase/Sale, accessible labels for icon-only controls, readable contrast, flexible layouts, and comfortable touch targets.

## MVP priorities

1. A runnable application with eight or more fictional typed trades.
2. Three connected screens: Market Pulse, Screener, and Trade Details.
3. Correct combined search and independent filters, result count, reset action, and empty state.
4. Accurate detail rendering, fictional chart, educational context, and exact disclaimer.
5. Narrow-screen polish, accessibility, tests, README, APK, screenshots, and demo video.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Accidental use of real or copied financial content | Use invented entities and local values only; include visible fictional-data labels and a repository-wide content review. |
| Filters appear to work but fail in combinations | Centralize filtering in one pure function and cover it with automated tests plus manual acceptance checks. |
| Summary totals disagree with activity data | Derive summary values directly from the same local array. |
| APK unavailable near the deadline | Configure EAS early, verify project health before the final day, and reserve credits only if queue priority becomes necessary. |
| Layout fails on narrow Android screens | Use flexible containers and test at 375–430 px widths. |
| AI disclosure is inaccurate | Record the actual role of Codex and any other tools in the README; retain human review and explanation responsibility. |

## Cost and ownership

The implementation can use open-source packages and local fictional data with no recurring application cost. EAS Build can produce an installable Android artifact; an Expo account is required for its hosted build workflow. The user has authorized limited credit spending if needed, but no paid service is required for the product itself. Source, assets, and mock data remain in the project repository and are portable away from hosted build services.

## AI and automation fit

AI is not part of the product. It is used only as a development assistant for planning, implementation, review, and troubleshooting. The final README must describe this accurately and the user must be able to explain all submitted code and design decisions. No user or financial data will be sent to an AI feature at runtime.

## Verification plan

- Static checks: TypeScript, linting, and focused tests for filtering and derived totals.
- Runtime checks: launch without red screens; traverse Home → Screener → Details and back.
- Behavioral checks: ticker/company search, every filter group, combined filters, result count, clear action, and empty state.
- Content checks: all records fictional, exact disclaimer present, no network/API use, and no copied source material.
- Deliverable checks: install the final APK, capture three legible screenshots, and record the required 1–3 minute walkthrough.

## Sources

- [Expo: Create a project](https://docs.expo.dev/get-started/create-a-project/) — accessed 2026-09-14.
- [Expo: TypeScript](https://docs.expo.dev/guides/typescript/) — accessed 2026-09-14.
- [React Navigation: Getting started](https://reactnavigation.org/docs/getting-started/) — accessed 2026-09-14.
- [Expo: Build APKs for Android devices](https://docs.expo.dev/build-reference/apk/) — accessed 2026-09-14.
- [Expo: EAS Build setup](https://docs.expo.dev/build/setup/) — accessed 2026-09-14.
- ArkLab AI, “React Native Developer Intern — Batch 04 Detailed Implementation & Submission Guide,” received 2026-09-12.

## Limitations

No competitor data or market-size claims were researched because they do not affect the assignment and the brief expressly prohibits using the reference product as a data or design source. Device behavior and APK installation remain unverified until implementation and runtime testing.

## Handoff Context
<!-- Machine-readable summary for the next workflow step. Do not delete; the next prompt in the workflow reads this block. -->
- Stage: research
- App name: SignalScope
- User level: C
- Target platform: Android-first mobile, reasonable iOS compatibility
- Budget: Mostly free; limited credits available if required for APK build
- Timeline: Seven-day implementation; approximate submission deadline 2026-09-22
- Mode: Guided
- AI in product scope: No; development assistance only
- Constraints: Exactly three connected screens; Expo + React Native + TypeScript; fictional local data only; no source-site access/copying; required APK, screenshots, video, README, disclaimer, and AI disclosure
- Decisions: React Navigation native stack; local typed data; screen-level state; dependency-light View-based chart; EAS preview APK profile
- Open questions: Final visual direction and exact package versions will be resolved during technical design/scaffolding
- Source files: docs/research-SignalScope.md
