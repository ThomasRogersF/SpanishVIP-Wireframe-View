# SDK Configuration Schema

This document describes the SDK configuration structure used throughout the SpanishVIP application.

## Overview

The SDK configuration system manages all dynamic content and styling for the application. Configuration values are managed through the `SDKContext` and accessed via the `useSDKConfig` hook.

## Configuration Properties

### Text Properties

#### `hero_headline`
- **Type**: `string`
- **Default**: `"Continue Unit 1: Cafe Culture"`
- **Description**: Main headline displayed in the hero card
- **Affected Components**: `HeroCard`
- **Example**: `"Continue Unit 1: Cafe Culture"`

#### `hero_subheadline`
- **Type**: `string`
- **Default**: `"Lesson 4: Ordering with Politeness"`
- **Description**: Subtitle displayed below the hero headline
- **Affected Components**: `HeroCard`
- **Example**: `"Lesson 4: Ordering with Politeness"`

#### `hero_button`
- **Type**: `string`
- **Default**: `"Resume Class"`
- **Description**: Text displayed on the hero card's resume button
- **Affected Components**: `HeroCard`
- **Example**: `"Resume Class"`

#### `sofia_nudge`
- **Type**: `string`
- **Default**: `"You left off at the Roleplay. Let's finish ordering that coffee."`
- **Description**: Sofia's personalized message/nudge in the hero card
- **Affected Components**: `HeroCard`
- **Example**: `"You left off at the Roleplay. Let's finish ordering that coffee."`

#### `quick_win_headline`
- **Type**: `string`
- **Default**: `"Short on time?"`
- **Description**: Headline for the quick win card
- **Affected Components**: `QuickWinCard`
- **Example**: `"Short on time?"`

#### `quick_win_action`
- **Type**: `string`
- **Default**: `"Do a 2-Min Vocab Drill ⚡"`
- **Description**: Call-to-action text for the quick win card
- **Affected Components**: `QuickWinCard`
- **Example**: `"Do a 2-Min Vocab Drill ⚡"`

#### `upsell_text`
- **Type**: `string`
- **Default**: `"Stuck on a concept?"`
- **Description**: Main text displayed in the upsell banner
- **Affected Components**: `UpsellBanner`
- **Example**: `"Stuck on a concept?"`

#### `upsell_action`
- **Type**: `string`
- **Default**: `"Book a Human Tutor ($15)"`
- **Description**: Call-to-action text for booking a tutor
- **Affected Components**: `UpsellBanner`
- **Example**: `"Book a Human Tutor ($15)"`

### Color Properties

#### `hero_card_bg`
- **Type**: `hex color string`
- **Default**: `"#14B8A6"`
- **Description**: Background color of the hero card
- **Affected Components**: `HeroCard`, MUI theme primary color
- **SDK Integration**: Recolorable via Element SDK color picker
- **Example**: `"#14B8A6"` (teal)

#### `hero_card_text`
- **Type**: `hex color string`
- **Default**: `"#FFFFFF"`
- **Description**: Text color for all text within the hero card
- **Affected Components**: `HeroCard` (headline, subheadline, Sofia's nudge)
- **SDK Integration**: Recolorable via Element SDK color picker
- **Example**: `"#FFFFFF"` (white)

#### `surface_color`
- **Type**: `hex color string`
- **Default**: `"#FFFFFF"`
- **Description**: Background color for the main app surface and desktop frame background
- **Affected Components**: `DashboardScreen`, `MobileFrame`, MUI theme background
- **SDK Integration**: Recolorable via Element SDK color picker
- **Example**: `"#FFFFFF"` (white)

#### `text_color`
- **Type**: `hex color string`
- **Default**: `"#111827"`
- **Description**: Primary text color used throughout the app
- **Affected Components**: All text elements outside hero card, MUI theme text color
- **SDK Integration**: Recolorable via Element SDK color picker
- **Example**: `"#111827"` (dark gray)

#### `primary_action_color`
- **Type**: `hex color string`
- **Default**: `"#FFFFFF"`
- **Description**: Color for primary action buttons and accents
- **Affected Components**: `HeroCard` button, progress bar, MUI theme primary color
- **SDK Integration**: Recolorable via Element SDK color picker
- **Example**: `"#FFFFFF"` (white)

## SDK Integration Points

### Element SDK Initialization

The SDK is initialized in `SDKContext.jsx` on component mount:

```javascript
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  })
}
```

### Configuration Updates

When the Element SDK calls `onConfigChange`, the new configuration is merged with defaults and triggers React state updates:

```javascript
const onConfigChange = (newConfig) => {
  setConfig((prevConfig) => ({
    ...defaultConfig,
    ...prevConfig,
    ...newConfig
  }))
}
```

### Recolorable Capabilities

The `mapToCapabilities` function exposes color properties to the Element SDK color picker:

- `hero_card_bg` - Hero card background
- `hero_card_text` - Hero card text
- `surface_color` - App background
- `text_color` - Primary text
- `primary_action_color` - Button/accent color

Each recolorable has `get` and `set` functions that sync with the SDK.

### Edit Panel Values

The `mapToEditPanelValues` function exposes text properties to the Element SDK edit panel:

- `hero_headline`
- `hero_subheadline`
- `hero_button`
- `sofia_nudge`
- `quick_win_headline`
- `quick_win_action`
- `upsell_text`
- `upsell_action`

## Usage in Components

### Accessing Configuration

Use the `useSDKConfig` hook to access configuration in any component:

```javascript
import useSDKConfig from '../hooks/useSDKConfig.js'

function MyComponent() {
  const config = useSDKConfig()
  
  return (
    <Box sx={{ backgroundColor: config.surface_color }}>
      <Typography sx={{ color: config.text_color }}>
        {config.hero_headline}
      </Typography>
    </Box>
  )
}
```

### Dynamic Theme

The MUI theme is dynamically generated based on SDK config:

```javascript
const config = useSDKConfig()
const dynamicTheme = useMemo(() => createMuiTheme(config), [config])
```

## Fallback Behavior

If `window.elementSdk` is not available:

1. The app initializes with `defaultConfig` values
2. Configuration changes are not possible
3. All components render with default styling
4. No errors are thrown - the app remains fully functional

## Known Limitations

1. **Color Format**: Only hex color strings are supported (e.g., `#FFFFFF`)
2. **Text Length**: Very long text values may cause layout issues in some components
3. **Real-time Updates**: Configuration changes require a full re-render of affected components
4. **SDK Availability**: The app gracefully degrades if Element SDK is not available

## Future Enhancements

- Support for RGB/RGBA color formats
- Component-level configuration overrides
- Configuration persistence to localStorage
- A/B testing support for configuration variants
- Analytics tracking for configuration changes

## Examples

### Example 1: Changing Hero Card Colors

```javascript
// Via Element SDK color picker
window.elementSdk.setConfig({
  hero_card_bg: '#FF6B6B',
  hero_card_text: '#FFFFFF'
})
```

### Example 2: Updating Text Content

```javascript
// Via Element SDK edit panel
window.elementSdk.setConfig({
  hero_headline: 'Start Unit 2: Restaurant Etiquette',
  hero_button: 'Continue Lesson'
})
```

### Example 3: Full Configuration Update

```javascript
window.elementSdk.setConfig({
  hero_headline: 'New Unit',
  hero_subheadline: 'New Lesson',
  hero_button: 'Start',
  sofia_nudge: 'New message',
  quick_win_headline: 'Quick Activity',
  quick_win_action: 'Try It',
  upsell_text: 'Need Help?',
  upsell_action: 'Book Tutor',
  hero_card_bg: '#0AA6A6',
  hero_card_text: '#FFFFFF',
  surface_color: '#F3F4F6',
  text_color: '#111827',
  primary_action_color: '#FFFFFF'
})
```

## Testing

### Testing SDK Integration

1. Verify app loads without errors when `window.elementSdk` is undefined
2. Test that configuration changes trigger component re-renders
3. Verify color changes apply to all affected components
4. Test text updates propagate correctly
5. Confirm theme updates reflect in MUI components

### Testing Fallback Behavior

1. Comment out SDK initialization in `SDKContext.jsx`
2. Verify app renders with default configuration
3. Confirm no console errors appear
4. Test all navigation and interactions work normally
