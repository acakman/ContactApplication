# ContactApplication

A simple React Native contacts app (SQLite storage, contact photos, search, swipe-to-delete and multi-select delete).

## Android support

| | |
|---|---|
| React Native | 0.87 (New Architecture, Hermes) |
| `compileSdk` / `targetSdk` | 37 (Android 17) |
| `minSdk` | 24 (Android 7.0) |
| Targeted releases | Android 15 (API 35), Android 16 (API 36), Android 17 (API 37) |

Notes for recent Android releases:

- **Edge-to-edge** (enforced from Android 15, no opt-out from Android 16): enabled via `edgeToEdgeEnabled=true`; screens pad their content with the safe-area insets.
- **Photo Picker**: choosing an existing photo uses the system Photo Picker, so no storage permission is needed. The `READ/WRITE_EXTERNAL_STORAGE` permissions have been removed.
- **Camera**: `CAMERA` is requested at runtime when taking a photo.
- **INTERNET** is declared explicitly, which apps targeting Android 17 must do.
- **16 KB page sizes** (required by Google Play for apps targeting Android 15+): React Native 0.77+ and current releases of the native dependencies support them.

## Getting started

Requirements: Node 22.11+, JDK 17+, Android SDK with platform 37 and build-tools 37.0.0, NDK 27.1.12297006.

```sh
npm install
npm start          # Metro
npm run android    # build & install on a device/emulator
npm test
npm run lint
```

### Building on Windows

New Architecture builds create C++ object paths longer than Windows' 260-character limit
(`ninja: error: ... Filename longer than 260 characters`). To build on Windows:

1. Enable long paths (PowerShell as Administrator), then restart:
   `New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force`
2. The build uses CMake 3.31.1 from the Android SDK (see `cmakeVersion` in `android/build.gradle`), whose Ninja
   supports long paths. Gradle downloads it automatically; you can also install it from
   Android Studio > SDK Manager > SDK Tools > CMake (tick "Show Package Details").
   Set the `CMAKE_VERSION` environment variable to use a different SDK CMake version.
3. After changing either of these, delete `android/app/.cxx` and `android/app/build` before rebuilding.

### Release signing

Keystore credentials are no longer stored in the repository. Add them to `~/.gradle/gradle.properties`
(or pass them with `-P`):

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=...
MYAPP_RELEASE_KEY_PASSWORD=...
```

Without them, release builds are signed with the debug keystore.
