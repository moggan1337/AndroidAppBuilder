/**
 * Kotlin/Jetpack Compose Code Generator
 * Generates complete Android projects from app definition
 */

import { AndroidAppDefinition } from '../../types/app';
import { generateTheme } from './theme';
import { generateNavigation } from './navigation';
import { generateScreens } from './screens';
import { generateViewModels } from './viewmodels';
import { generateDataLayer } from './data-layer';
import { generateBuildGradle } from './build-gradle';

export interface GeneratorOptions {
  includeRoom?: boolean;
  includeRetrofit?: boolean;
  includeHilt?: boolean;
  useMaterial3?: boolean;
}

export function generateCompleteAndroidApp(
  app: AndroidAppDefinition,
  options: GeneratorOptions = {}
): Map<string, string> {
  const files = new Map<string, string>();
  const pkg = app.packageName.replace(/\./g, '/');
  const basePath = `app/src/main/java/${pkg}`;

  // Build.gradle files
  files.set('build.gradle.kts', generateBuildGradle(app, options));
  files.set('settings.gradle.kts', generateSettingsGradle(app));
  files.set('gradle.properties', generateGradleProperties());
  files.set('app/build.gradle.kts', generateAppBuildGradle(app, options));

  // Android Manifest
  files.set('app/src/main/AndroidManifest.xml', generateManifest(app));

  // Theme
  files.set(`${basePath}/ui/theme/Theme.kt`, generateTheme(app.theme));
  files.set(`${basePath}/ui/theme/Color.kt`, generateColors(app.theme));
  files.set(`${basePath}/ui/theme/Type.kt`, generateTypography());

  // Navigation
  files.set(`${basePath}/navigation/NavGraph.kt`, generateNavigation(app));

  // Screens
  app.screens.forEach(screen => {
    files.set(
      \`\${basePath}/ui/\${screen.name.toLowerCase()}/\${screen.name}Screen.kt\`,
      generateScreen(screen)
    );
  });

  // ViewModels
  files.set(`${basePath}/viewmodel/AppViewModel.kt`, generateViewModels(app));

  // Data Layer
  if (app.dataModels.length > 0) {
    files.set(`${basePath}/data/local/Entity.kt`, generateDataEntities(app.dataModels));
    files.set(`${basePath}/data/local/Dao.kt`, generateDao(app.dataModels));
    files.set(`${basePath}/data/local/AppDatabase.kt`, generateDatabase(app));
  }

  // Repository
  files.set(`${basePath}/data/repository/Repository.kt`, generateRepository(app));

  // Dependency Injection
  files.set(`${basePath}/di/AppModule.kt`, generateHiltModule(app, options));
  files.set(`${basePath}/Application.kt`, generateApplication(app.packageName));

  // Main Activity
  files.set(`${basePath}/MainActivity.kt`, generateMainActivity(app));

  // Permissions
  if (app.permissions.length > 0) {
    files.set(`${basePath}/util/PermissionHandler.kt`, generatePermissionHandler(app.permissions));
  }

  return files;
}

function generateManifest(app: AndroidAppDefinition): string {
  const permissions = app.permissions.map(p => 
    \`<uses-permission android:name="\${p}" />\`
  ).join('\n    ');

  return \`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    \${permissions}

    <application
        android:name=".Application"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme=".Theme">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme=".Theme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
\`;
}

function generateTheme(theme: any): string {
  return \`package com.example.app.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Primary,
    secondary = Secondary,
    tertiary = Tertiary
)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    secondary = Secondary,
    tertiary = Tertiary
)

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
\`;
}

function generateColors(theme: any): string {
  return \`package com.example.app.ui.theme

import androidx.compose.ui.graphics.Color

val Primary = Color(0xFF\${theme?.primaryColor?.replace('#', '') || '6200EE'})
val Secondary = Color(0xFF\${theme?.secondaryColor?.replace('#', '') || '03DAC6'})
val Tertiary = Color(0xFF\${theme?.tertiaryColor?.replace('#', '') || '3700B3'})
val Background = Color(0xFF\${theme?.backgroundColor?.replace('#', '') || 'FFFFFF'})
val Surface = Color(0xFF\${theme?.surfaceColor?.replace('#', '') || 'FFFFFF'})
val Error = Color(0xFF\${theme?.errorColor?.replace('#', '') || 'B00020'})
\`;
}

function generateTypography(): string {
  return \`package com.example.app.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val Typography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 57.sp,
        lineHeight = 64.sp,
        letterSpacing = (-0.25).sp
    ),
    headlineLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 32.sp,
        lineHeight = 40.sp,
        letterSpacing = 0.sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    labelSmall = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Medium,
        fontSize = 11.sp,
        lineHeight = 16.sp,
        letterSpacing = 0.5.sp
    )
)
\`;
}

function generateNavigation(app: AndroidAppDefinition): string {
  const routes = app.navigation.routes.map(r => 
    \`\n    composable("\${r.route}") {
        \${r.screenName}Screen(navController = navController)
    }\`
  ).join('');

  return \`package com.example.app.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
\${app.screens.map(s => \`import com.example.app.ui.\${s.name.toLowerCase()}.\${s.name}Screen\`).join('\n')}

@Composable
fun NavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = "\${app.navigation.routes[0]?.route || 'home'}"
    ) {\n        \${routes}
    }
}
\`;
}

function generateScreen(screen: any): string {
  const components = screen.components.map((c: any) => {
    switch (c.type) {
      case 'Text':
        return \`Text("\${c.properties.text || 'Sample Text'}")\`;
      case 'Button':
        return \`Button(onClick = { /* Handle click */ }) { Text("\${c.properties.text || 'Button'}") }\`;
      case 'TextField':
        return \`OutlinedTextField(value = "", onValueChange = {}, label = { Text("\${c.properties.label || 'Input'}") })\`;
      case 'Column':
        return \`Column { }\`;
      case 'Row':
        return \`Row { }\`;
      default:
        return \`// \${c.type}\`;
    }
  }).join('\n        ');

  return \`package com.example.app.ui.\${screen.name.toLowerCase()}

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun \${screen.name}Screen(navController: androidx.navigation.NavHostController? = null) {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("\${screen.name}") })
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)\n        ) {\n            \${components}
        }
    }
}
\`;
}

function generateViewModels(app: AndroidAppDefinition): string {
  return \`package com.example.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class UiState(
    val isLoading: Boolean = false,
    val error: String? = null
)

class AppViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState

    // Add your state and functions here
}
\`;
}

function generateDataEntities(models: any[]): string {
  return \`package com.example.app.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey
\${models.map(m => \`
@Entity(tableName = "\${m.name.toLowerCase()}")
data class \${m.name}Entity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,\n    \${m.fields.map(f => 
      \`val \${f.name}: \${f.type} = \${f.defaultValue || (f.nullable ? 'null' : '""')}\`
    ).join(',\n    ')}
)\`).join('')}
\`;
}

function generateDao(models: any[]): string {
  return \`package com.example.app.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow
\${models.map(m => \`
@Dao
interface \${m.name}Dao {
    @Query("SELECT * FROM \${m.name.toLowerCase()}")
    fun getAll(): Flow<List<\${m.name}Entity>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(item: \${m.name}Entity)
    
    @Delete
    suspend fun delete(item: \${m.name}Entity)
}\`).join('')}
\`;
}

function generateDatabase(app: AndroidAppDefinition): string {
  return \`package com.example.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [\${app.dataModels.map(m => m.name + 'Entity').join(', ')}], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun \${app.dataModels[0]?.name || 'App'}Dao(): \${app.dataModels[0]?.name || 'App'}Dao
    
    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null
        
        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
\`;
}

function generateRepository(app: AndroidAppDefinition): string {
  return \`package com.example.app.data.repository

import com.example.app.data.local.*
import kotlinx.coroutines.flow.Flow

class Repository(
    private val database: AppDatabase
) {
    // Add repository methods here
}
\`;
}

function generateHiltModule(app: AndroidAppDefinition, options: any): string {
  return \`package com.example.app.di

import android.content.Context
import com.example.app.data.local.AppDatabase
import com.example.app.data.repository.Repository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return AppDatabase.getDatabase(context)
    }
    
    @Provides
    @Singleton
    fun provideRepository(database: AppDatabase): Repository {
        return Repository(database)
    }
}
\`;
}

function generateApplication(packageName: string): string {
  return \`package \${packageName}

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class Application : Application()
\`;
}

function generateMainActivity(app: AndroidAppDefinition): string {
  return \`package \${app.packageName}

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import \${app.packageName}.navigation.NavGraph
import \${app.packageName}.ui.theme.AppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    NavGraph(navController = androidx.navigation.compose.rememberNavController())
                }
            }
        }
    }
}
\`;
}

function generatePermissionHandler(permissions: string[]): string {
  return \`package com.example.app.util

import android.Manifest
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable

@Composable
fun PermissionHandler(
    permissions: List<String>,
    onGranted: @Composable () -> Unit,
    onDenied: @Composable () -> Unit
) {
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissionsMap ->
        if (permissionsMap.values.all { it }) {
            // All granted
        }
    }
    
    launcher.launch(permissions.toTypedArray())
}
\`;
}

function generateBuildGradle(app: AndroidAppDefinition, options: any): string {
  return \`// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id 'com.android.application' version '8.2.0' apply false
    id 'com.android.library' version '8.2.0' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.20' apply false
    id 'com.google.dagger.hilt.android' version '2.48.1' apply false
    id 'com.google.devtools.ksp' version '1.9.20-1.0.14' apply false
}
\`;
}

function generateAppBuildGradle(app: AndroidAppDefinition, options: any): string {
  return \`plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'com.google.dagger.hilt.android'
    id 'com.google.devtools.ksp'
}

android {
    namespace '\${app.packageName}'
    compileSdk \${app.buildConfig?.compileSdk || 34}

    defaultConfig {
        applicationId "\${app.packageName}"
        minSdk \${app.buildConfig?.minSdk || 24}
        targetSdk \${app.buildConfig?.targetSdk || 34}
        versionCode \${app.versionCode || 1}
        versionName "\${app.version || '1.0.0'}"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary true
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
    buildFeatures {
        compose true
    }
    composeOptions {
        kotlinCompilerExtensionVersion '1.5.5'
    }
    packaging {
        resources {
            excludes += '/META-INF/{AL2.0,LGPL2.1}'
        }
    }
}

dependencies {
    // Core Android
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    implementation 'androidx.activity:activity-compose:1.8.1'

    // Compose
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-graphics'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'
    implementation 'androidx.compose.material:material-icons-extended'

    // Navigation
    implementation 'androidx.navigation:navigation-compose:2.7.5'

    // Hilt
    implementation 'com.google.dagger:hilt-android:2.48.1'
    ksp 'com.google.dagger:hilt-compiler:2.48.1'
    implementation 'androidx.hilt:hilt-navigation-compose:1.1.0'

    // Room
    implementation 'androidx.room:room-runtime:2.6.1'
    implementation 'androidx.room:room-ktx:2.6.1'
    ksp 'androidx.room:room-compiler:2.6.1'

    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:4.12.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'

    // Coil for images
    implementation 'io.coil-kt:coil-compose:2.5.0'

    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation platform('androidx.compose:compose-bom:2023.10.01')
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4'
    debugImplementation 'androidx.compose.ui:ui-tooling'
    debugImplementation 'androidx.compose.ui:ui-test-manifest'
}
\`;
}

function generateSettingsGradle(app: AndroidAppDefinition): string {
  return \`pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "\${app.name}"
include ':app'
\`;
}

function generateGradleProperties(): string {
  return \`# Project-wide Gradle settings.
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
kotlin.code.style=official
android.nonTransitiveRClass=true
\`;
}

export { generateCompleteAndroidApp };
