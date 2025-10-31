Space Exploration Website - Assignment 7
=========================================

Domain: Space Exploration
Two Pages: Home (index.html) and Missions (missions.html)

SASS/SCSS Features Implemented:
--------------------------------
1. Variables - Colors, spacing, fonts defined in _variables.scss
2. Custom Properties - CSS variables in root for gradients and shadows
3. Nesting - Hierarchical style organization throughout all components
4. Interpolation - Dynamic heading selectors and utility class generation
5. Placeholder Selectors - Button base, card base, section padding templates
6. Mixins - Responsive breakpoints, flexbox center, glass effect, button variants
7. Functions - rem converter, color tint/shade, z-index management, spacing calculator
8. @each directive - Generating margin and padding utility classes
9. @for directive - Creating h1-h6 heading styles dynamically
10. @if directive - Conditional breakpoint checking in mixins
11. Maps - Breakpoints and z-index layer management

CSS Grid Layouts:
-----------------
- Features grid on homepage showing space exploration benefits
- Missions grid displaying all space missions
- Statistics grid with animated counters
- Footer grid layout on both pages

Flexbox Layouts:
----------------
- Navigation bar with mobile hamburger menu
- Timeline section showing space history
- Mission filter buttons
- Hero section content alignment

File Organization:
------------------
SCSS files organized into abstracts, base, layout, components, pages, and utilities folders
Total 17 SCSS partial files plus main.scss for imports
Modular structure for easy maintenance

How to Run:
-----------
1. Install SASS compiler: npm install -g sass
2. Compile SCSS: sass scss/main.scss css/main.css --watch
3. Open index.html in browser

Interactive Features:
---------------------
Mobile responsive navigation, animated statistics counters, mission filtering by status,
parallax scrolling effects, hover animations on cards, smooth page transitions