# Product Requirements Document: SignalScope MVP

## 1. Product overview

**Product:** SignalScope  
**Tagline:** Fictional insider-activity signals, organized for fast mobile research.  
**Goal:** Deliver a polished, fully working three-screen React Native prototype that satisfies the ArkLab AI Batch 04 final-screening brief.  
**Timeline:** Seven implementation days, with submission targeted no later than 2026-09-22.

SignalScope is an assessment prototype, not a production investing product. It demonstrates the candidate's ability to translate a constrained brief into an original, usable mobile experience using typed local data, clear navigation, deterministic filtering, reusable UI, accessibility, and reliable delivery artifacts.

## 2. Target users

### Primary persona

A mobile user who wants to scan notable fictional insider-activity signals, narrow a list by basic criteria, and understand one mock disclosure quickly.

### Evaluation persona

ArkLab AI reviewers assessing product judgment, React Native fundamentals, code organization, correctness, originality, accessibility, and the candidate's ability to explain the implementation.

### Needs

- Immediate understanding that all information is fictional demo data.
- A concise overview of activity and notable signal categories.
- Fast search by ticker or company.
- Predictable filtering with immediate feedback.
- Clear transaction details, educational context, and a non-advice disclaimer.

## 3. Problem statement

Dense financial-disclosure interfaces can be difficult to scan on a phone. This prototype demonstrates an original mobile flow that turns fictional insider-activity records into a clear overview, a searchable/filterable list, and an understandable detail view—without presenting real data or making investment claims.

## 4. Core user journey

1. The user launches directly into Market Pulse and sees a fictional-data badge, calculated summaries, top signals, and recent activity.
2. The user opens the Screener through search, “Browse trades,” or “View all.”
3. The user searches by ticker/company and combines transaction type, insider role, and value filters.
4. The visible result count and empty state explain the current result set; “Clear filters” restores defaults.
5. The user selects a card and sees the matching Trade Details, mock chart, educational explanation, and disclaimer.
6. Back navigation returns to the prior screen without surprising state loss.

## 5. MVP features and acceptance criteria

### Must have 1: Market Pulse home

**User story:** As a user, I want a concise market overview so I can identify fictional activity worth examining.

Acceptance criteria:

- Displays a Market Pulse header and visible “Fictional demo data” treatment.
- Provides a search entry that navigates to the Screener.
- Displays exactly three primary summary cards derived from the local dataset.
- Displays two or three original signal categories.
- Displays at least four recent trade cards.
- “View all”/“Browse trades” opens the Screener.
- Selecting a recent trade opens its matching Details view.

### Must have 2: Latest Trades / Screener

**User story:** As a user, I want to search and combine filters so I can find a relevant fictional transaction quickly.

Acceptance criteria:

- Search matches ticker or company case-insensitively.
- Type filter options: All, Purchases, Sales.
- Role filter options: All roles, CEO, CFO, Director; Officer records remain visible under All roles only.
- Value options: Any, $100K+, $500K+, $1M+.
- Search and all filters combine using AND behavior.
- Result count updates immediately.
- Default dataset contains at least eight fictional trades and normally shows at least six.
- An unmatched query shows “No fictional demo trades match those filters.”
- “Clear filters” resets query and all filter groups.
- Every result card opens its matching Details view.

### Must have 3: Trade Details

**User story:** As a user, I want a structured explanation of one transaction so I can understand the fictional signal within seconds.

Acceptance criteria:

- Shows back navigation, company, ticker, sector, and fictional-data badge.
- Shows signal, insider, role, type, code, shares, price per share, total value, transaction date, filed time, and strength.
- Shows a custom seven-day visualization labeled “Mock 7-day activity.”
- Shows original “Why this matters” educational copy without investment claims.
- Displays the exact required disclaimer:

> This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.

### Must have 4: Original local data and visual system

**User story:** As a reviewer, I want clear evidence of original work so I can assess the candidate fairly.

Acceptance criteria:

- All data lives locally and is typed.
- At least eight invented companies, people, transactions, values, dates, signals, and chart arrays are included.
- No network calls, scraping, source screenshots, copied records, or copied layouts exist.
- Summary values are derived from the same dataset displayed in the feed.
- Purchase and Sale are communicated with text, direction icon, and color.

### Must have 5: Submission-ready quality

**User story:** As a reviewer, I want a reliable installable package and concise documentation so I can evaluate it without setup friction.

Acceptance criteria:

- App launches without red-screen or console errors.
- Layout is readable across 375–430 px widths.
- Icon-only controls have accessibility labels and suitable touch areas.
- Repository includes setup instructions and an accurate AI-use disclosure.
- Final Android APK is installed and smoke-tested.
- Submission includes three legible screenshots and a 1–3 minute demo video.

## 6. Scope prioritization

### Should have

- Preserve search/filter state when returning from Details during the same session.
- Automatically focus Screener search when entered through the Home search field.
- Subtle press feedback and lightweight screen transitions.

### Could have

- Small signal-category helper descriptions.
- Basic unit coverage for currency/date formatters in addition to filter logic.
- Polished application icon and splash treatment if time remains.

### Explicitly out of scope

- Live filings, financial APIs, network requests, scraping, or downloaded datasets.
- Authentication, profiles, portfolios, alerts, push notifications, or settings.
- Backend, database, analytics collection, or global state library.
- Investment recommendations, predictions, or real-market claims.
- More than the three required application screens.
- In-product AI, chat, agents, or automation.

## 7. Success metrics

This is a delivery assessment, so success is binary and evidence-based rather than measured through retention or revenue:

- 100% of required checklist items can be demonstrated in the final walkthrough.
- All planned static checks pass with no TypeScript or lint errors.
- Search and filter acceptance cases pass, including a combined-filter case and empty state.
- Every tested card opens the correct detail record.
- Final APK installs and launches on an Android device or emulator.
- Reviewer can find the originality statement, limitations, setup steps, deliverables, and honest AI disclosure in the README.

## 8. Design direction

- **Vibe:** focused, credible, calm, data-rich, and unmistakably fictional.
- **Shell:** dark navy background with layered surfaces and subtle borders rather than heavy shadows.
- **Semantics:** green/up for purchases, orange-red/down for sales, blue-violet for neutral analytics.
- **Rhythm:** mobile-first 8-point spacing with flexible cards and 14–18 px radii.
- **Hierarchy:** high-contrast headings, compact secondary metadata, clear filter selection, and visible disclaimers.
- **Originality:** custom navigation, cards, copy, signals, and chart construction; no attempt to mirror the reference website.

## 9. Technical considerations

- Expo + React Native + TypeScript.
- Typed React Navigation native stack with three routes.
- Local immutable transaction data and pure derived selectors.
- Screen-level state; no backend or persisted personal data.
- Dependency-light View-based chart.
- Android-first validation with reasonable cross-platform primitives.
- EAS preview profile explicitly configured to produce an APK.

## 10. AI and automation scope

SignalScope contains no AI feature and exposes no runtime data to an AI service. Codex is being used as a development assistant for workflow planning, technical research, implementation support, verification, and troubleshooting. The final disclosure will be updated to reflect the actual work performed. All generated or suggested code and design decisions require candidate review, testing, understanding, and ownership.

## 11. Constraints

- Exactly three connected screens.
- Fictional local demo data only.
- No copied source content or real financial records.
- Android APK required.
- Seven-day working plan within the stated ten-day response window.
- Mostly free tooling; limited paid credits are available only if useful for final build delivery.
- The implementation must stay small, readable, and explainable by the candidate.

## 12. Definition of done

- [ ] All three screens meet their acceptance criteria.
- [ ] Eight or more fictional transactions cover every filter option.
- [ ] Search, combined filters, count, reset, empty state, and navigation are exercised.
- [ ] Summary numbers remain internally consistent with local data.
- [ ] All required detail fields, chart label, education text, and exact disclaimer appear.
- [ ] No external financial data or API access exists.
- [ ] TypeScript, lint, and targeted automated tests pass.
- [ ] Manual runtime journey passes at narrow and wide target widths.
- [ ] README includes setup, design decisions, limitations, deliverables, originality statement, and accurate AI disclosure.
- [ ] APK installs and launches.
- [ ] Three screenshots and a 1–3 minute demo video are captured from the working app.
- [ ] Repository and Drive deliverable links are ready for submission.

---

```json
{
  "schemaVersion": 1,
  "documentType": "prd",
  "appName": "SignalScope",
  "oneLiner": "An original mobile prototype for scanning, filtering, and understanding fictional insider-activity signals.",
  "targetUsers": "Mobile users and ArkLab AI assignment reviewers",
  "phase": "Foundation",
  "mustHave": [
    "Market Pulse dashboard",
    "Searchable and filterable trade screener",
    "Trade details with mock chart and disclaimer",
    "Typed fictional local data",
    "Submission-ready Android APK and documentation"
  ],
  "niceToHave": [
    "Preserved screener state",
    "Search autofocus",
    "Subtle interaction polish"
  ],
  "notInMvp": [
    "Live financial data",
    "Authentication or backend",
    "Alerts and portfolios",
    "In-product AI"
  ],
  "successMetrics": [
    "All assignment acceptance checks demonstrated",
    "Static checks and filter tests pass",
    "APK installs and launches"
  ]
}
```

## Handoff Context
<!-- Machine-readable summary for the next workflow step. Do not delete; the next prompt in the workflow reads this block. -->
- Stage: prd
- App name: SignalScope
- User level: C
- Target platform: Android-first mobile, reasonable iOS compatibility
- Budget: Mostly free; limited credits available if required for APK build
- Timeline: Seven-day implementation; approximate submission deadline 2026-09-22
- Mode: Guided
- AI in product scope: No; development assistance only
- Constraints: Exactly three connected screens; Expo + React Native + TypeScript; fictional local data only; no source-site access/copying; required APK, screenshots, video, README, disclaimer, and AI disclosure
- Decisions: Three required screens; typed local dataset; derived summaries; combined local filtering; no backend; no product AI
- Open questions: Exact package versions and test runner will be selected during technical design
- Source files: docs/research-SignalScope.md, docs/PRD-SignalScope-MVP.md
