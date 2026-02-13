# Cookdex

A cozy recipe theme for Hugo with an index card aesthetic and picnic table vibe. Features recipe filtering, search functionality, multilingual support, customizable cursors, and a customizable gingham background pattern.

## Features

- **Recipe Organization**: Filter recipes by category (meal, snack, topping, drink)
- **Advanced Filtering**: Tag-based filtering by flavor profile and cooking method
- **Search Functionality**: Real-time recipe search
- **Multilingual Support**: Built-in internationalization (English and Spanish included)
- **Custom Cursors**: Fun food-themed cursor options for desktop users
- **Gingham Customizer**: Personalize the background pattern color, opacity, and stripe thickness
- **Responsive Design**: Simple recipe cards that work on all devices
- **Recipe Metadata**: Display prep time, cook time, total time, and yield
- **Clean Typography**: Custom Leila font for a handwritten aesthetic
- **Accessible**: Built with accessibility standards in mind

## Requirements

- Hugo **0.120.0** or later

## Installation

### Option 1: Git Submodule (Recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/turkeystar142/cookdex.git themes/cookdex
```

### Option 2: Clone

```bash
cd your-hugo-site/themes
git clone https://github.com/turkeystar142/cookdex.git
```

### Option 3: Download

Download the latest release and extract it into your `themes/` directory.

## Configuration

### Basic Configuration

Add or update your `hugo.toml`:

```toml
baseURL = 'https://example.com/'
theme = 'cookdex'
defaultContentLanguage = 'en'
title = 'My Recipe Collection'

[languages.en]
  languageCode = 'en-us'
  languageName = 'English'
  title = 'My Recipe Collection'
  weight = 1
  contentDir = 'content/en'

[languages.es]
  languageCode = 'es'
  languageName = 'Español'
  title = 'Mi Colección de Recetas'
  weight = 2
  contentDir = 'content/es'
```

### Single Language Setup

If you only want one language, simplify to:

```toml
baseURL = 'https://example.com/'
theme = 'cookdex'
languageCode = 'en-us'
title = 'My Recipe Collection'
```

## Content Structure

### Creating Recipes

Create recipe files in your content directory:

```bash
hugo new content/en/chocolate-chip-cookies.md
```

### Recipe Front Matter

Each recipe should include the following front matter:

```yaml
---
title: "Chocolate Chip Cookies"
date: 2026-02-12
draft: false
description: "Classic homemade chocolate chip cookies"
prepTime: "15 minutes"
cookTime: "12 minutes"
totalTime: "27 minutes"
yield: "24 cookies"
categories:
  - snack
tags:
  - sweet
  - oven
---
```

### Available Categories

- `meal` - Main dishes and entrees
- `snack` - Snacks, desserts, and light bites
- `topping` - Sauces, spreads, and toppings
- `drink` - Teas, coffees, cocktails and shakes

### Available Tags

**Flavor profiles:**
- `savory` - Savory/salty dishes
- `sweet` - Sweet dishes
- `neutral` - Neither particularly sweet nor savory
- `sour` - Sour dishes

**Cooking methods:**
- `stovetop` - Cooked on the stovetop
- `oven` - Baked or roasted in the oven
- `specialized` - Requires specialized equipment (waffle iron, bread machine, etc.)
- `as-is` - No cooking required

### Recipe Content Structure

Organize your recipe markdown with standard sections:

```markdown
## Ingredients

- 2 cups flour
- 1 cup sugar
- 1/2 cup butter

## Instructions

1. Preheat oven to 350°F
2. Mix dry ingredients
3. Add wet ingredients
4. Bake for 12 minutes

## Tips

- Use room temperature butter for best results
- Don't overbake - cookies continue cooking after removal
```

## Customization

### Custom Fonts

The theme uses the Leila font family for a handwritten aesthetic. The fonts are included in `static/fonts/`.

### Gingham Pattern Customizer

Desktop users can personalize the gingham background pattern using the palette button in the bottom right corner (stacked above the cursor selector). Customization options include:

- **Color**: Choose any color using the color picker
- **Opacity**: Adjust from 0-100% for subtle or bold patterns
- **Stripe Thickness**: Control the size of the gingham checks (10-50px)
- **Live Preview**: See changes in real-time before applying
- **Reset**: Restore default pattern (red at 15% opacity, 20px stripes)

Settings are automatically saved to localStorage and persist across sessions. A hard refresh (Ctrl+Shift+R / Cmd+Shift+R) will reset to defaults.

### Custom Cursors

Desktop users can choose from several food-themed cursors:
- Default arrow
- Apple
- Berry
- Cake
- Cherry
- Coffee
- Muffin
- Pear

Cursor images are located in `static/images/cursors/`.

### Mascot Graphics

The header features animated food mascot graphics located in `static/images/mascots/`.

### Styling

The main stylesheet is located at `static/css/style.css`. To override styles, create a `assets/css/custom.css` in your site root and add:

```toml
[params]
  customCSS = ["css/custom.css"]
```

## Multilingual Setup

The theme includes complete translations for English and Spanish. Language persistence is handled automatically - users' language selections are saved across sessions.

To add additional languages:

1. Create a new language file in `i18n/` (e.g., `i18n/fr.yaml`)
2. Copy the structure from `i18n/en.yaml` and translate all keys
3. Add the language configuration to your `hugo.toml`

## Development

### JavaScript Modules

The theme includes four main JavaScript modules:

- `filter.js` - Recipe filtering and search functionality
- `cursor-selector.js` - Custom cursor selection interface
- `gingham-customizer.js` - Background pattern customization interface
- `language-persistence.js` - Language preference management

### External Dependencies

- **Font Awesome 6.5.1** - Icon library (loaded from CDN)

## Credits

- Font Awesome icons: https://fontawesome.com/ (Font Awesome Free License)
- Leila/Leilali fonts: Created with Calligraphr

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for JavaScript features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

## Screenshots

**TODO**: Add screenshots of your recipe site here showing:
- Home page with recipe grid
- Recipe detail page
- Filter tray
- Cursor selector
- Gingham customizer

## Support

For bugs, feature requests, or questions, please open an issue on GitHub.
