/**
 * Android App Definition Types
 * Similar structure to iOS but for Android/Kotlin/Jetpack Compose
 */

export interface AndroidAppDefinition {
  id: string;
  name: string;
  packageName: string;
  version: string;
  versionCode: number;
  description: string;
  developer: DeveloperInfo;
  screens: Screen[];
  navigation: NavigationConfig;
  theme: ThemeConfig;
  features: string[];
  dataModels: DataModel[];
  permissions: string[];
  dependencies: Dependency[];
  buildConfig: BuildConfig;
}

export interface DeveloperInfo {
  name: string;
  email: string;
  website?: string;
  company?: string;
}

export interface Screen {
  id: string;
  name: string;
  type: ScreenType;
  components: Component[];
  route: string;
  arguments?: ScreenArgument[];
  viewModel?: string;
}

export type ScreenType = 
  | 'composable'
  | 'list'
  | 'detail'
  | 'form'
  | 'login'
  | 'register'
  | 'splash'
  | 'onboarding'
  | 'settings'
  | 'profile'
  | 'home'
  | 'search'
  | 'chat'
  | 'map';

export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  properties: Record<string, any>;
  children?: Component[];
  events?: EventHandler[];
  modifiers?: Modifier[];
}

export type ComponentType =
  // Layout
  | 'Column'
  | 'Row'
  | 'Box'
  | 'LazyColumn'
  | 'LazyRow'
  | 'LazyVerticalGrid'
  | 'Surface'
  | 'Card'
  | 'Scaffold'
  | 'ScrollView'
  | 'Spacer'
  | 'Divider'
  // Text
  | 'Text'
  | 'TextField'
  | 'OutlinedTextField'
  | 'TextButton'
  // Buttons
  | 'Button'
  | 'IconButton'
  | 'FloatingActionButton'
  | 'ExtendedFloatingActionButton'
  | 'RadioButton'
  | 'Checkbox'
  | 'Switch'
  // Navigation
  | 'NavigationBar'
  | 'NavigationRail'
  | 'TopAppBar'
  | 'BottomNavigationBar'
  | 'Drawer'
  | 'TabRow'
  // Display
  | 'Image'
  | 'AsyncImage'
  | 'Icon'
  | 'Badge'
  | 'CircularProgressIndicator'
  | 'LinearProgressIndicator'
  | 'CircularProgressIndicator'
  | 'Slider'
  | 'Snackbar'
  // Input
  | 'DatePicker'
  | 'TimePicker'
  | 'DropdownMenu'
  | 'ExposedDropdownMenuBox'
  | 'Slider'
  | 'RangeSlider'
  // Dialogs
  | 'AlertDialog'
  | 'BottomSheetDialog'
  | 'ModalBottomSheet'
  // Media
  | 'VideoPlayer'
  | 'CameraPreview'
  | 'GalleryPicker'
  // Maps
  | 'GoogleMap'
  | 'MapMarker'
  // Lists
  | 'ListItem'
  | 'SwipeToDismiss'
  // Web
  | 'WebView'
  // Charts (Accompanist)
  | 'PieChart'
  | 'BarChart'
  | 'LineChart'
  // Material3
  | 'Material3Button'
  | 'FilledButton'
  | 'OutlinedButton'
  | 'TextButton';

export interface EventHandler {
  event: string;
  action: string;
  handler?: string;
}

export interface Modifier {
  type: ModifierType;
  value: any;
}

export type ModifierType =
  | 'fillMaxWidth'
  | 'fillMaxHeight'
  | 'wrapContentSize'
  | 'padding'
  | 'margin'
  | 'background'
  | 'foreground'
  | 'clickable'
  | 'clip'
  | 'shadow'
  | 'cornerRadius'
  | 'border'
  | 'alpha'
  | 'rotate'
  | 'scale'
  | 'offset'
  | 'weight'
  | 'align';

export interface NavigationConfig {
  type: 'bottom-nav' | 'navigation-rail' | 'drawer' | 'stack';
  routes: NavRoute[];
  deepLinks?: DeepLink[];
}

export interface NavRoute {
  route: string;
  screenName: string;
  icon?: string;
  label?: string;
}

export interface DeepLink {
  uri: string;
  action?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
  backgroundColor: string;
  surfaceColor: string;
  errorColor: string;
  onPrimaryColor: string;
  onSecondaryColor: string;
  onBackgroundColor: string;
  onSurfaceColor: string;
  darkTheme: boolean;
  dynamicColors: boolean;
  fontFamily?: string;
}

export interface DataModel {
  name: string;
  fields: DataField[];
  relationships?: Relationship[];
}

export interface DataField {
  name: string;
  type: DataFieldType;
  nullable: boolean;
  primaryKey?: boolean;
  defaultValue?: any;
}

export type DataFieldType =
  | 'String'
  | 'Int'
  | 'Long'
  | 'Float'
  | 'Double'
  | 'Boolean'
  | 'Date'
  | 'DateTime'
  | 'UUID'
  | 'JSON'
  | 'Image'
  | 'File';

export interface Relationship {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  entity: string;
  fieldName: string;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'implementation' | 'api' | 'testImplementation' | 'kapt';
}

export interface BuildConfig {
  minSdk: number;
  targetSdk: number;
  compileSdk: number;
  kotlinVersion: string;
  composeVersion: string;
  gradleVersion: string;
  buildFeatures: BuildFeatures;
}

export interface BuildFeatures {
  viewBinding: boolean;
  dataBinding: boolean;
  compose: boolean;
  buildConfig: boolean;
}

export interface ScreenArgument {
  name: string;
  type: string;
  nullable?: boolean;
}

export { AndroidAppDefinition as default };
