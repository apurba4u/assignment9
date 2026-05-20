---
name: StudyNook
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444654'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757685'
  outline-variant: '#c5c5d6'
  surface-tint: '#3a50d0'
  primary: '#2039ba'
  on-primary: '#ffffff'
  primary-container: '#3e54d3'
  on-primary-container: '#d8dbff'
  inverse-primary: '#bbc3ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#004f72'
  on-tertiary: '#ffffff'
  tertiary-container: '#006895'
  on-tertiary-container: '#bee2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#000f5d'
  on-primary-fixed-variant: '#1c35b7'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is anchored in a **Corporate / Modern** aesthetic with a distinct **Tech-Forward** edge. It is designed to bridge the gap between traditional academic reliability and the efficiency of modern software tools. The UI evokes a sense of focus, productivity, and clarity.

The visual narrative relies on a modular, block-based architecture that feels organized and scalable. By utilizing generous white space, a disciplined type scale, and subtle motion cues, the design system ensures that students and administrators can navigate complex booking schedules without cognitive overload. It prioritizes functionality and legibility while maintaining a premium, "pro-tool" feel suitable for high-performance study environments.

## Colors
The palette is centered around **Scholar Indigo**, a deep, trustworthy blue that signals authority and academic focus. 

- **Primary (Scholar Indigo):** Used for main actions, active states, and brand-heavy components.
- **Secondary:** A lighter violet-indigo used for accents and secondary interactive elements.
- **Semantic Colors:** Success (Green) denotes confirmed bookings; Error (Red) identifies cancellations or system errors; Warning (Amber) indicates expiring sessions.
- **Neutral Palette:** A sophisticated range of cool grays. 
  - **Light Mode:** Uses high-luminance whites (#FFFFFF) and soft gallery grays (#F8FAFC) for backgrounds to maintain a "clean paper" feel.
  - **Dark Mode:** Transitions to a deep charcoal/navy base (#0F172A) with surface overlays (#1E293B) to reduce eye strain during late-night study sessions.

## Typography
This design system utilizes **Geist** for all typographic roles to emphasize a technical, precise, and modern aesthetic. The typeface's geometric clarity ensures high legibility in dense data environments like booking calendars and room directories.

The hierarchy is strictly enforced through weight and scale. Headlines use tighter letter-spacing and heavier weights to command attention, while body text maintains a generous line height for comfortable reading. Labels and utility text are occasionally rendered in semi-bold for immediate recognition in navigation and status indicators.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on an 8px spacing rhythm. This ensures mathematical harmony across all components and screen sizes.

- **Grid:** A 12-column system is used for desktop (1440px+), collapsing to 8 columns for tablets and 4 columns for mobile.
- **Container:** Maximum content width is capped at 1280px to maintain readability.
- **Rhythm:** Vertical spacing between sections should use `xl` or `2xl` units, while internal component spacing (like card padding) should stick to `md` or `lg`.
- **Responsive Behavior:** Sidebars are persistent on desktop but transform into bottom navigation or "hamburger" drawers on mobile to prioritize the workspace view.

## Elevation & Depth
Visual hierarchy in the design system is achieved through **Tonal Layers** supplemented by **Ambient Shadows**. This approach creates a clean, "layered paper" look without the heaviness of traditional skeuomorphism.

- **Level 0 (Base):** The background layer. In light mode, it's neutral-50; in dark mode, it's neutral-950.
- **Level 1 (Cards/Surfaces):** Raised slightly with a subtle border (1px) and a soft, low-opacity shadow (e.g., `0 4px 6px -1px rgba(0,0,0,0.1)`).
- **Level 2 (Modals/Dropdowns):** Higher elevation with a more pronounced shadow to indicate temporary interaction.
- **Dark Mode Elevation:** Depth is communicated via lighter surface fills (e.g., Surface-100 becomes Surface-200) rather than shadows, which are less visible on dark backgrounds. 
- **Transitions:** Use `0.2s ease-in-out` for all hover states and elevation shifts to mimic the smoothness of Framer Motion animations.

## Shapes
The design system employs a **Rounded** (Level 2) shape language. This provides a friendly, approachable feel that balances the "sharpness" of the technical typography.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Elements:** Featured containers and main dashboard cards use a 1rem (16px) radius.
- **Interactive States:** Hovering over elements may trigger a subtle expansion or increase in shadow, but the corner radius remains constant to maintain the modular grid's integrity.

## Components
Consistent component styling is critical for the "modular" aesthetic:

- **Buttons:** 
  - *Primary:* Solid Scholar Indigo with white text. 
  - *Secondary:* Outlined with a 1.5px border in Neutral-300 or Primary. 
  - *States:* Hover states should subtly darken the background; active states should slightly "press" down (scale 0.98).
- **Status Badges:** Use pill-shaped (Rounded-XL) backgrounds with low-opacity fills and high-contrast text (e.g., a soft green background with dark green text for "Confirmed").
- **Cards:** White or dark-gray containers with a 1px border. They should include a "hover lift" effect where the card moves 4px up on the Y-axis.
- **Input Fields:** Clean, minimalist borders that turn Primary color on focus. Labels sit consistently above the field in `label-sm` style.
- **Booking Calendar:** A uniform grid where individual time slots are represented as blocks. Available slots use subtle dashed borders; booked slots use solid primary fills.
- **Lists:** Clean rows separated by thin borders, with generous horizontal padding to accommodate the 8px grid.