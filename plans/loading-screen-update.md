# Implementation Plan - Loading Screen & Splash Screen Update

## Objective
Update the application's loading screen to use the SpanishVIP brand logo, ensure it appears as a splash screen on startup, and adjust the timing to serve as a visible mockup during transitions (like logging in).

## Proposed Changes

### 1. Update `src/components/shared/LoadingScreen.jsx`
- **Replace Avatar**: Remove the `SofiaAvatar` component.
- **Add Logo**: Insert an `img` tag pointing to `/brand/spanishvip_logo.png`.
- **Styling**:
  - Set the logo width to a contained size (e.g., `200px`) to ensure it is "small" as requested.
  - Maintain aspect ratio (auto height).
  - Ensure it is centered.
  - Keep the `CircularProgress` spinner below the logo.

### 2. Update `src/context/NavigationContext.jsx`
- **Splash Screen Logic**: 
  - Initialize `isLoading` state to `true` (currently `false`) to show the loading screen immediately upon app launch.
  - Add a `useEffect` to turn off `isLoading` after the `MIN_LOADING_TIME` has passed on initial mount.
- **Adjust Timing**:
  - Increase `MIN_LOADING_TIME` from `150` to `1500` (1.5 seconds). This ensures the loading screen is visible long enough to be appreciated as a mockup during login and startup, as requested.

### 3. Verification
- **Startup**: Verify the logo appears immediately when the app loads.
- **Login**: Verify the logo appears when clicking "Log In" before the dashboard appears.
- **Appearance**: Check that the logo is not distorted and is appropriately sized (handling the 2215x525 dimensions correctly).

## Technical Details
- **Logo Path**: `/brand/spanishvip_logo.png` (served from `public/`).
- **Dimensions**: Original is 2215x525 (~4.2:1 ratio). Constraining width will preserve this.
