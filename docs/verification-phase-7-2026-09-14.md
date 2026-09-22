# Phase 7 Verification — 2026-09-14

Recovery checkpoint: pushed commit `787c4de`.

## Setup checked

- Expo cloud account: not authenticated; no EAS cloud build was claimed.
- Local toolchain: Java 21, Android SDK 36, Build Tools 35, NDK 27.1.12297006, Android 36 `x86_64` emulator.
- The release build was generated in a temporary native project so `/android` was not added to the source repository.

## Build checked

- `assembleRelease` passed for `arm64-v8a` and `x86_64`.
- Output: `deliverables/SignalScope-1.0.0-preview.apk`, 45 MB.
- Package: `com.tamaltm.signalscope`, version `1.0.0`, minimum SDK 24, target SDK 36.
- APK Signature Scheme v2 verification passed.
- SHA-256: `17180921ffb72baba5731a85ed770760f69f4298f1f838b835f606b3a4f81312`.
- The APK uses an internal debug certificate and is suitable for direct assignment review, not Play Store production.

## Behavior checked

- APK installation succeeded on Android 36 `x86_64` emulator.
- App launched as a standalone release process without Metro.
- App relaunched successfully with Wi-Fi and mobile data disabled, confirming the core experience is local/offline.
- Native touch journey exercised Home → Screener → filters → matching Trade Details → chart/disclaimer → back.
- Android UI hierarchy exposed the labeled search field, selected filter states, navigation buttons, trade buttons, and matching transaction values.
- No application crash or React Native red-screen occurred.
- Three 720×1560 PNG screenshots were captured from the installed APK.
- The final 2-minute-57-second MP4 walkthrough was visually spot-checked across the complete flow: Market Pulse, search plus combined filters, Trade Details, chart and educational/disclaimer content, preserved filter state after back navigation, empty-state recovery, the closing return to Market Pulse, and an opening caption explaining the Purchase/Sale text-arrow-color decision.
- Final demo SHA-256: `b583dee87ae73cd041eb6351b3b5a5cebd5d88736714881c26a833cd488a725d`.

## Not checked

- Physical ARM64 phone installation.
- TalkBack spoken-output quality.
- iOS runtime.
- EAS cloud build, because no Expo account is authenticated.
- Final external GitHub Release/Drive URLs.
