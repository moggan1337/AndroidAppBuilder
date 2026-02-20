/**
 * React Native Export for Cross-Platform Apps
 */

import { AndroidAppDefinition } from '../../types/app';

export function generateReactNativeApp(app: AndroidAppDefinition): Map<string, string> {
  const files = new Map<string, string>();

  // package.json
  files.set('package.json', generatePackageJson(app));
  
  // App.tsx
  files.set('App.tsx', generateAppTsx(app));
  
  // Navigation
  files.set('src/navigation/AppNavigator.tsx', generateNavigation(app));
  
  // Screens
  app.screens.forEach(screen => {
    files.set(\`src/screens/\${screen.name}.tsx\`, generateScreen(screen));
  });
  
  // Components
  files.set('src/components/Button.tsx', generateButton());
  files.set('src/components/TextField.tsx', generateTextField());
  files.set('src/components/Card.tsx', generateCard());
  
  // Theme
  files.set('src/theme/colors.ts', generateColors(app.theme));
  files.set('src/theme/index.ts', generateThemeIndex());
  
  // API
  files.set('src/api/client.ts', generateApiClient());
  
  // Storage
  files.set('src/utils/storage.ts', generateStorage());
  
  // Types
  files.set('src/types/index.ts', generateTypes(app));
  
  // Config
  files.set('app.json', generateAppJson(app));
  files.set('babel.config.js', generateBabel());
  files.set('tsconfig.json', generateTsConfig());

  return files;
}

function generatePackageJson(app: AndroidAppDefinition): string {
  return \`{
  "name": "\${app.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "\${app.version || '1.0.0'}",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-screens": "~3.29.0",
    "react-native-safe-area-context": "4.8.2",
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.4",
    "@expo/vector-icons": "^14.0.0",
    "expo-status-bar": "~1.11.1",
    "axios": "^1.6.0",
    "@react-native-async-storage/async-storage": "1.21.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "typescript": "^5.1.3"
  }
}
\`;
}

function generateAppTsx(app: AndroidAppDefinition): string {
  return \`import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
\`;
}

function generateNavigation(app: AndroidAppDefinition): string {
  return \`import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
\${app.screens.map(s => \`import \${s.name}Screen from '../screens/\${s.name}';\`).join('\n')}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      {\${app.navigation?.routes?.map(r => \`
      <Tab.Screen
        name="\${r.route}"
        component={\${r.screenName}Screen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />\`).join('')}}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}
\`;
}

function generateScreen(screen: any): string {
  return \`import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function \${screen.name}Screen() {
  return (
    <View style={styles.container}>
      <Text>\${screen.name} Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
\`;
}

function generateButton(): string {
  return \`import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#6200EE', padding: 16, borderRadius: 8 },
  text: { color: '#FFF', fontWeight: 'bold' }
});
\`;
}

function generateTextField(): string {
  return \`import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TextField({ value, onChangeText, placeholder }: any) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#CCC', padding: 12, borderRadius: 8 }
});
\`;
}

function generateCard(): string {
  return \`import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }
});
\`;
}

function generateColors(theme: any): string {
  return \`export const colors = {
  primary: '#\${theme?.primaryColor?.replace('#', '') || '6200EE'}',
  secondary: '#\${theme?.secondaryColor?.replace('#', '') || '03DAC6'}',
  background: '#\${theme?.backgroundColor?.replace('#', '') || 'FFFFFF'}',
  surface: '#\${theme?.surfaceColor?.replace('#', '') || 'FFFFFF'}',
  error: '#\${theme?.errorColor?.replace('#', '') || 'B00020'}',
  text: '#000000',
  textSecondary: '#666666'
};
\`;
}

function generateThemeIndex(): string {
  return \`import React, { createContext, useContext } from 'react';
import { colors } from './colors';

const ThemeContext = createContext(colors);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
export { colors };
\`;
}

function generateApiClient(): string {
  return \`import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  error => console.error(error)
);

export default api;
\`;
}

function generateStorage(): string {
  return \`import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  get: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  set: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  }
};
\`;
}

function generateTypes(app: AndroidAppDefinition): string {
  return \`export interface \${app.name.replace(/\s/g, '')}App {
  name: string;
  version: string;
}
\`;
}

function generateAppJson(app: AndroidAppDefinition): string {
  return \`{
  "expo": {
    "name": "\${app.name}",
    "slug": "\${app.name.toLowerCase().replace(/\s+/g, '-')}",
    "version": "\${app.version || '1.0.0'}",
    "platforms": ["android", "ios"],
    "icon": "./assets/icon.png",
    "splash": { "image": "./assets/splash.png" }
  }
}
\`;
}

function generateBabel(): string {
  return \`module.exports = function(api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};
\`;
}

function generateTsConfig(): string {
  return \`{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
\`;
}

export { generateReactNativeApp };
