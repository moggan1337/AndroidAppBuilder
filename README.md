# AI Android App Builder

An AI-powered platform that allows users to create fully functional Android applications using natural language prompts. Powered by **Claude**, **OpenAI**, or **Google Gemini**, the system generates UI, logic, navigation, and data handling automatically based on your description.

## ✨ Features

- **AI-Powered App Generation**: Convert natural language descriptions into working Android apps
- **Multiple AI Models**: Choose between Claude, OpenAI GPT-4o, or Google Gemini
- **Real-Time Preview**: See your app rendered instantly
- **Chat-Based Editing**: Refine your app through conversational instructions
- **Pre-built Templates**: Start from 12+ templates for common app types
- **Multi-Platform Export**: Export to Kotlin/Jetpack Compose (Android) or React Native (Cross-platform)
- **Full Automation**: CI/CD, Play Store upload, Google Play submission ready
- **Play Store Validation**: Automatic review to prevent rejection
- **Full Ownership**: You own everything you create

## 🤖 AI Providers

| Provider | Model | Description |
|----------|-------|-------------|
| **Claude** | Sonnet 4.5 | Anthropic's advanced AI |
| **OpenAI** | GPT-4o, GPT-4o Mini | OpenAI's latest models |
| **Google Gemini** | Gemini 2.0 Flash | Google's multimodal AI |
| **MiniMax** | abab 6.5S | MiniMax AI's model |
| **Z.ai** | GLM 4 | Zhipu AI's model |

## 📱 Supported Platforms

### Android (Kotlin/Jetpack Compose)
- Complete Android project generation
- 80+ UI components
- 30+ native Android features
- Material Design 3
- MVVM + Clean Architecture
- Hilt, Room, Retrofit

### Cross-Platform (React Native/Expo)
- Full React Native project export
- React Navigation
- TypeScript support
- Expo compatible

## 🛠️ Automation Suite

Built-in automation for the entire Google Play submission pipeline:

| Feature | Description |
|---------|-------------|
| **Gradle Integration** | Build automation |
| **GitHub Actions** | CI/CD pipelines |
| **Fastlane** | Build, upload, Play Store |
| **Screenshot Generator** | Auto-generate Play Store screenshots |
| **Play Store Upload** | Automatic upload via GitHub Actions |
| **Play Store API** | Metadata, submission automation |

### Automation Workflow
```
AI Generates App → Gradle Build → Test → Play Store → Review
```

**Automation Coverage: 90-95%**

## 🔍 Play Store Review Validation

Automatic validation to prevent Play Store rejection:

- ✅ Target SDK compliance (API 33+)
- ✅ Permission requirements
- ✅ Ad Policy compliance
- ✅ In-app purchase compliance
- ✅ Privacy policy requirements
- ✅ Data Safety section
- ✅ App signing verification

## 📦 Supported Capabilities

### Native Android Features (30+)
- **Health & Fitness**: Health Connect, Sensors
- **AR/VR**: ARCore, Sceneform
- **Machine Learning**: ML Kit, Text Recognition
- **Camera**: CameraX, Image capture
- **Maps & Location**: Google Maps, Fused Location
- **Notifications**: Push notifications, FCM
- **Billing**: Google Play Billing
- **Ads**: AdMob integration
- **Wear OS**: Watch companion apps
- **TV**: Android TV apps

### UI Components (80+)
- **Layout**: Column, Row, Box, LazyColumn, LazyRow, LazyVerticalGrid
- **Navigation**: Navigation Compose, Bottom Navigation, Drawer
- **Text**: Text, OutlinedTextField, TextButton
- **Buttons**: Button, FAB, IconButton, Switch, Checkbox
- **Display**: Card, Surface, Badge, Progress indicators
- **Dialogs**: AlertDialog, BottomSheet, Modal
- **Lists**: ListItem, SwipeToDismiss
- **Material3**: All Material3 components

### Templates (12+)
- Todo List, Weather App
- Fitness Tracker, Social Feed
- E-commerce, Food Delivery
- Messaging, News Reader
- Crypto Tracker, Language Learning
- AR Furniture, Video Player

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Authentication**: Supabase Auth

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- [Supabase account](https://supabase.com) (free tier available)
- **At least one** AI provider API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moggan1337/AndroidAppBuilder.git
   cd AndroidAppBuilder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` with your configuration:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # AI Providers (at least one required)
   ANTHROPIC_API_KEY=your-anthropic-api-key
   OPENAI_API_KEY=your-openai-api-key
   GEMINI_API_KEY=your-gemini-api-key

   # Default settings
   DEFAULT_AI_PROVIDER=claude
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## 📖 Usage

1. **Sign Up/Login** - Create an account
2. **Describe Your App** - "Create a fitness tracking app with Health Connect"
3. **AI Generates** - Watch your app be built in real-time
4. **Preview** - See it in the Android preview
5. **Edit** - Chat with AI to make changes
6. **Export** - Download Android project (Kotlin) or React Native
7. **Build & Submit** - Use automation for Play Store

## 🌐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `ANTHROPIC_API_KEY` | Yes* | Claude API key |
| `OPENAI_API_KEY` | No | OpenAI API key |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `DEFAULT_AI_PROVIDER` | No | Default AI (claude) |

*At least one AI provider is required

## 📁 Project Structure

```
src/
├── lib/
│   ├── ai/                    # AI generation logic
│   │   └── providers/          # AI provider integrations
│   ├── automation/            # CI/CD automation
│   │   └── playstore.ts
│   ├── validation/            # Play Store validation
│   │   └── playstore-review.ts
│   ├── export/                # Code export
│   │   ├── kotlin-generator.ts
│   │   └── react-native-generator.ts
│   └── templates/             # App templates
├── components/
│   ├── preview/               # Android preview
│   └── chat/                  # Chat interface
└── app/                       # Next.js pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file

---

**Built with ❤️ using Next.js, Claude, and Jetpack Compose**
