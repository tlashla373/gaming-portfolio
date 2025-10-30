# Custom Fonts Guide

## How to Add Custom Fonts

### Step 1: Download Your Font Files
- Download font files in `.woff2`, `.woff`, or `.ttf` format
- Popular sources: Google Fonts, Adobe Fonts, DaFont, Font Squirrel
- Recommended: Use `.woff2` for best performance

### Step 2: Add Files to This Folder
Place your font files here:
```
src/assets/fonts/
  ├── YourFont-Regular.woff2
  ├── YourFont-Bold.woff2
  ├── YourFont-Italic.woff2
  └── etc...
```

### Step 3: Declare Font in index.css
Uncomment and modify the @font-face rules in `src/index.css`:

```css
@font-face {
  font-family: 'YourCustomFont';
  src: url('./assets/fonts/YourFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourCustomFont';
  src: url('./assets/fonts/YourFont-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Step 4: Use the Font

**Option 1: Update body font in index.css**
```css
body {
  font-family: 'YourCustomFont', 'Inter', sans-serif;
}
```

**Option 2: Use in Tailwind classes**
Update `tailwind.config.js`:
```js
export default {
  theme: {
    extend: {
      fontFamily: {
        custom: ['YourCustomFont', 'sans-serif'],
      }
    }
  }
}
```

Then use: `className="font-custom"`

**Option 3: Use inline**
```tsx
<h1 style={{ fontFamily: 'YourCustomFont' }}>Title</h1>
```

## Recommended Gaming Fonts

For your Assassin's Creed / Cyberpunk aesthetic:

1. **Orbitron** - Futuristic/sci-fi
2. **Rajdhani** - Modern geometric
3. **Exo 2** - Technical/military
4. **Saira** - Clean futuristic
5. **Audiowide** - Retro-futuristic
6. **Chakra Petch** - Industrial/tech

Download from: https://fonts.google.com/

## Font Weight Reference
- 100: Thin
- 200: Extra Light
- 300: Light
- 400: Regular (Normal)
- 500: Medium
- 600: Semi Bold
- 700: Bold
- 800: Extra Bold
- 900: Black
