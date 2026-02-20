/**
 * Google Play Store Automation
 * Automates build, upload, and metadata for Google Play
 */

export interface PlayStoreConfig {
  packageName: string;
  serviceAccountJson: string;
  track: 'internal' | 'alpha' | 'beta' | 'production';
}

// GitHub Actions workflow for Android CI/CD
export function generateAndroidCIWorkflow(): string {
  return `name: Android Build

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Setup Android SDK
        uses: android-actions/setup-android@v2
      
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: \${{ runner.os }}-gradle-\${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
      
      - name: Grant execute permission
        run: chmod +x gradlew
      
      - name: Build debug APK
        run: ./gradlew assembleDebug
      
      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-debug
          path: app/build/outputs/apk/debug/app-debug.apk
`;
}

// Play Store upload workflow
export function generatePlayStoreUploadWorkflow(): string {
  return `name: Upload to Play Store

on:
  workflow_dispatch:
    inputs:
      track:
        description: 'Release track'
        required: true
        default: 'internal'

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '17'
      
      - name: Build release APK
        run: ./gradlew assembleRelease
      
      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          service-account-json: \${{ secrets.SERVICE_ACCOUNT_JSON }}
          package-name: com.example.app
          release-files: app/build/outputs/apk/release/*.apk
          track: \${{ github.event.inputs.track }}
          whats-new-directory:/whats-new
`;
}

// Fastlane for Android
export function generateAndroidFastfile(): string {
  return `default_platform(:android)

platform :android do
  desc "Build debug APK"
  lane :build_debug do
    gradle(
      task: "assembleDebug",
      build_type: "Debug"
    )
  end

  desc "Build release APK"
  lane :build_release do
    gradle(
      task: "assembleRelease",
      build_type: "Release"
    )
  end

  desc "Upload to Play Store Internal"
  lane :upload_internal do
    supply(
      package_name: "com.example.app",
      json_key: "play-store-key.json",
      track: "internal",
      apk: "app/build/outputs/apk/release/app-release.apk"
    )
  end

  desc "Upload to Play Store Alpha"
  lane :upload_alpha do
    supply(
      package_name: "com.example.app",
      json_key: "play-store-key.json",
      track: "alpha",
      apk: "app/build/outputs/apk/release/app-release.apk"
    )
  end

  desc "Upload to Play Store Production"
  lane :upload_production do
    supply(
      package_name: "com.example.app",
      json_key: "play-store-key.json",
      track: "production",
      apk: "app/build/outputs/apk/release/app-release.apk"
    )
  end

  desc "Submit for review"
  lane :submit do
    supply(
      package_name: "com.example.app",
      json_key: "play-store-key.json",
      track: "production",
      submit_as_draft: false
    )
  end
end
`;
}

export { generateAndroidCIWorkflow, generatePlayStoreUploadWorkflow, generateAndroidFastfile };
