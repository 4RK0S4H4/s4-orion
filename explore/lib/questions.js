/* The questions for every review demo, in one place so the hub and the pages agree.
   A page adds behaviour (e.g. capturing tuned values) through S4Review.page(id, { capture: { 'qid:v': fn } }). */
window.S4_REVIEW_DEMOS = [
  {
    id: 'states-shape', title: 'States and Shape', href: 'explore/states-shape.html',
    questions: [
      { id: 'states', label: 'States', help: 'How hover, press, focus and selection look.',
        options: [{ v: 'A', label: 'M3, secondary focus ring' }, { v: 'B', label: 'Neutral focus and rows' }, { v: 'C', label: 'Primary-tinted' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'shape', label: 'Shape', help: 'The corner scale across components.',
        options: [{ v: 'A', label: 'Stock M3 Expressive' }, { v: 'B', label: 'S4 Material softer corners' }, { v: 'C', label: 'Expressive, rounder' }, { v: 'D', label: 'S4 Glass radii' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'color', label: 'Default color', help: 'The color S4 Orion uses when an app doesn’t pick its own seed.',
        options: [{ v: 'Mono', label: 'Black and white' }, { v: 'Mono + Red', label: 'Black and white with a red accent' }, { v: 'Indigo', label: '' }, { v: 'Teal', label: '' }, { v: 'Orange', label: '' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'motion', title: 'Motion Lab', href: 'explore/motion.html',
    questions: [
      { id: 'feel', label: 'Motion feel', help: 'Choose “My Tuned Values” to save the feel, stiffness and bounce currently set in the lab.',
        options: [{ v: 'A', label: 'Fluid' }, { v: 'B', label: 'Crisp' }, { v: 'C', label: 'Liquid Settle' }, { v: 'D', label: 'M3 Expressive' }, { v: 'Tuned', label: 'My tuned values' }] }
    ]
  }
  ,
  {
    id: 'transitions', title: 'Transitions Lab', href: 'explore/transitions.html',
    questions: [
      { id: 'menus', label: 'Menus', options: [{ v: 'A', label: 'Origin (S4 Material)' }, { v: 'B', label: 'Unfold' }, { v: 'C', label: 'Drop' }, { v: 'D', label: 'Fade' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'dialogs', label: 'Dialogs', options: [{ v: 'A', label: 'Origin (S4 Material)' }, { v: 'B', label: 'Container transform' }, { v: 'C', label: 'Lean' }, { v: 'D', label: 'Scale and fade' }, { v: 'E', label: 'Fade' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'sheets', label: 'Bottom sheets', options: [{ v: 'A', label: 'Origin (S4 Material)' }, { v: 'B', label: 'Container transform' }, { v: 'C', label: 'Slide from edge' }, { v: 'D', label: 'Short rise' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'peers', label: 'Switching views', options: [{ v: 'A', label: 'Shared axis' }, { v: 'B', label: 'Fade through' }, { v: 'C', label: 'Crossfade' }, { v: 'D', label: 'Push' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'detail', label: 'List to detail', options: [{ v: 'A', label: 'Origin (S4 Material)' }, { v: 'B', label: 'Container transform' }, { v: 'C', label: 'Shared axis Z' }, { v: 'D', label: 'Push' }, { v: 'E', label: 'Fade through' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'snackbar', label: 'Snackbars', options: [{ v: 'A', label: 'Origin' }, { v: 'B', label: 'Slide from edge' }, { v: 'C', label: 'Rise and fade' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'glass', title: 'Glass Lab', href: 'explore/glass.html',
    questions: [
      { id: 'material', label: 'Glass material', options: [{ v: 'A', label: 'Frosted (84%)' }, { v: 'B', label: 'Clear (72%)' }, { v: 'C', label: 'Very clear (60%), guaranteed' }, { v: 'D', label: 'Very clear (60%), unguarded' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'edge', label: 'Glass edge', options: [{ v: 'A', label: 'None' }, { v: 'B', label: 'Hairline' }, { v: 'C', label: 'Rim' }, { v: 'D', label: 'Specular' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'backdrop', label: 'Backdrop', options: [{ v: 'A', label: 'Flat' }, { v: 'B', label: 'Soft blooms' }, { v: 'C', label: 'Tonal wash' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'surfaces', label: 'Where glass goes', options: [{ v: 'A', label: 'Chrome and overlays' }, { v: 'B', label: 'Chrome only' }, { v: 'C', label: 'Overlays only' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'liquid', title: 'Liquid Glass Lab', href: 'explore/liquid-glass.html',
    questions: [
      { id: 'raised', label: 'Material with liquid glass: raised surfaces', options: [{ v: 'A', label: 'Bars, menus, sheets, dialogs' }, { v: 'B', label: 'Also the FAB' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'frost', label: 'Frost level', options: [{ v: 'A', label: 'Light frost' }, { v: 'B', label: 'Frosted' }, { v: 'C', label: 'Heavy frost' }, { v: 'Tuned', label: 'My tuned values' }] },
      { id: 'look', label: 'Refraction', options: [{ v: 'A', label: 'Subtle' }, { v: 'B', label: 'Liquid' }, { v: 'C', label: 'Extra liquid' }, { v: 'D', label: 'Keep today’s glass (no refraction)' }, { v: 'Tuned', label: 'My tuned values' }] },
      { id: 'text', label: 'Keeping text readable', options: [{ v: 'A', label: 'Fixed tint (today’s guarantee)' }, { v: 'B', label: 'Adaptive tint' }, { v: 'C', label: 'Apple-clear, not guaranteed' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'melt', label: 'Shapes melting together', options: [{ v: 'A', label: 'Melt' }, { v: 'B', label: 'Stay separate' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'where', label: 'Where liquid glass goes', options: [{ v: 'A', label: 'Every glass surface' }, { v: 'B', label: 'Floating pills and buttons only' }, { v: 'C', label: 'Opt-in per app' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'device', label: 'On your iPhone', options: [{ v: 'A', label: 'Smooth and right' }, { v: 'B', label: 'Looks right but slow' }, { v: 'C', label: 'Looks wrong or broken' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'icons', title: 'Icon Lab', href: 'explore/icons.html',
    questions: [
      { id: 'glyphs', label: 'Glyphs in controls', options: [{ v: 'A', label: 'Boxed (today)' }, { v: 'B', label: 'Plain' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'menu', label: 'Menu button', options: [{ v: 'A', label: 'Boxed hamburger' }, { v: 'B', label: 'Dots' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'style', title: 'Style Lab', href: 'explore/style.html',
    questions: [
      { id: 'field', label: 'Text fields', options: [{ v: 'A', label: 'Material (today)' }, { v: 'B', label: 'Quiet Box' }, { v: 'C', label: 'Underline' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'check', label: 'Checkboxes', options: [{ v: 'A', label: 'Material (today)' }, { v: 'B', label: 'Round Ink' }, { v: 'C', label: 'Soft Square' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'table', label: 'Tables', options: [{ v: 'A', label: 'Material (today)' }, { v: 'B', label: 'Hairline' }, { v: 'C', label: 'Soft Rows' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'tabs', label: 'Tab headers', options: [{ v: 'A', label: 'Material (today)' }, { v: 'B', label: 'Ink Pills' }, { v: 'C', label: 'Quiet Underline' }, { v: 'D', label: 'Segmented Tray' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'style2', title: 'Style Lab 2', href: 'explore/style2.html',
    questions: [
      { id: 'group', label: 'Button groups', options: [{ v: 'A', label: 'Connected (today)' }, { v: 'B', label: 'Capsule' }, { v: 'C', label: 'Squishy Pills' }, { v: 'D', label: 'Notched' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'slider', label: 'Sliders', options: [{ v: 'A', label: 'Material (today)' }, { v: 'B', label: 'Glass Bead' }, { v: 'C', label: 'Fine Line' }, { v: 'D', label: 'Fill Bar' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'sheet', label: 'Sheets on a phone', options: [{ v: 'A', label: 'Bottom Sheet (today)' }, { v: 'B', label: 'Floating Card' }, { v: 'C', label: 'Full Page' }, { v: 'D', label: 'Centered Card' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'glass', label: 'Glass edge', options: [{ v: 'A', label: 'Blur Only (today)' }, { v: 'B', label: 'Light Rim' }, { v: 'C', label: 'Thick Pane' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'liquid3', title: 'Liquid Glass Lab 3', href: 'explore/liquid3.html',
    questions: [
      { id: 'glass', label: 'Glass over moving content', options: [{ v: 'A', label: 'Blur Only (today)' }, { v: 'B', label: 'Magnified Rim' }, { v: 'C', label: 'Thick Pane' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'device', label: 'On your iPhone', options: [{ v: 'A', label: 'Smooth and right' }, { v: 'B', label: 'Looks right but slow' }, { v: 'C', label: 'Looks wrong or broken' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'liquid4', title: 'Liquid Glass Lab 4', href: 'explore/liquid4.html',
    questions: [
      { id: 'glass', label: 'WebGL glass over a real page', options: [{ v: 'A', label: 'Liquid Frost' }, { v: 'B', label: 'Heavy Frost' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'device', label: 'On your iPhone', options: [{ v: 'A', label: 'Shows and follows scrolling, smooth' }, { v: 'B', label: 'Shows but slow or laggy' }, { v: 'C', label: 'Glass missing, blank or wrong' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'liquid5', title: 'Liquid Glass Lab 5', href: 'explore/liquid5.html',
    questions: [
      { id: 'glass', label: 'Liquid glass on the real bars', options: [{ v: 'A', label: 'Today (blur only)' }, { v: 'B', label: 'Soft Liquid' }, { v: 'C', label: 'Liquid Lens' }, { v: 'D', label: 'Extra Lens' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'device', label: 'On your iPhone', options: [{ v: 'A', label: 'Bends, follows scrolling, smooth' }, { v: 'B', label: 'Bends but scrolling is laggy' }, { v: 'C', label: 'No bend (looks like plain blur)' }, { v: 'D', label: 'Broken (blank, misplaced or doubled)' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'transparency', title: 'Transparency Lab', href: 'explore/transparency.html',
    questions: [
      { id: 'glass', label: 'Glass transparency and edge (CSS only)', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Clearer' }, { v: 'C', label: 'Clearer + Lit Edge' }, { v: 'D', label: 'Light-Gathering Rim' }, { v: 'E', label: 'Specular Arcs' }, { v: 'F', label: 'Bevel Hairlines' }, { v: 'G', label: 'Prism Edge' }, { v: 'H', label: 'Bright Band' }, { v: 'I', label: 'Frost Bevel' }, { v: 'J', label: 'Everything Together' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'clarity', label: 'How clear should glass be', options: [{ v: 'A', label: 'More tint than shown' }, { v: 'B', label: 'About as shown' }, { v: 'C', label: 'Clearer than shown' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'transparency2', title: 'Transparency Lab 2', href: 'explore/transparency2.html',
    questions: [
      { id: 'edge', label: 'The thin, slightly frostier edge line', options: [{ v: 'A', label: 'No Edge' }, { v: 'B', label: 'Frost Hairline' }, { v: 'C', label: 'Fainter Hairline' }, { v: 'D', label: 'Hairline + Soft Inner Fade' }, { v: 'E', label: 'Hairline + Hint of Top Light' }, { v: 'F', label: 'Hairline + Outer Hairline' }, { v: 'G', label: 'Thicker Frost Line' }, { v: 'H', label: 'C + D: Tight' }, { v: 'I', label: 'C + D: Fainter' }, { v: 'J', label: 'C + D: Softer Fade' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'clarity', label: 'How clear should glass be', options: [{ v: 'A', label: 'More tint than shown' }, { v: 'B', label: 'About as shown' }, { v: 'C', label: 'Clearer than shown' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'transparency3', title: 'Transparency Lab 3', href: 'explore/transparency3.html',
    questions: [
      { id: 'edge', label: 'Thin frost line (no fade) on the real UI', options: [{ v: '20', label: 'Frost Line 20%' }, { v: '30', label: 'Frost Line 30%' }, { v: '40', label: 'Frost Line 40%' }, { v: '50', label: 'Frost Line 50%' }, { v: '30o', label: '30% + Outer Hairline' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'shadow', label: 'Shadows under raised things', options: [{ v: 'none', label: 'No Shadows' }, { v: 'glass', label: 'No Shadow on Glass Only' }, { v: 'today', label: 'Keep Today\'s Shadows' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'transparency4', title: 'Transparency Lab 4', href: 'explore/transparency4.html',
    questions: [
      { id: 'items', label: 'Outline-only items on glass (outlined button, unselected chips)', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Keep Their Own Outline' }, { v: 'C', label: 'Frost Line Outline' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'fill', label: 'How much of each item\'s color stays', options: [{ v: '70', label: '70%' }, { v: '55', label: '55%' }, { v: '40', label: '40%' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'transparency5', title: 'Transparency Lab 5', href: 'explore/transparency5.html',
    questions: [
      { id: 'frost', label: 'How frosted should glass be', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Calmer Color' }, { v: 'C', label: 'Frosted' }, { v: 'D', label: 'Heavy Frost' }, { v: 'E', label: 'Heavy Frost, Clearer' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  },
  {
    id: 'menumotion', title: 'Menu Motion Lab', href: 'explore/menu-motion.html',
    questions: [
      { id: 'motion', label: 'How a menu opens', options: [{ v: 'A', label: 'Quiet Unfold (before)' }, { v: 'D', label: 'Container Transform, Button Stays' }, { v: 'H', label: 'D, With the Shape Below the Button' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'direction', title: 'Direction Lab', href: 'explore/direction.html',
    questions: [
      { id: 'surface', label: 'Flat surfaces', options: [{ v: 'A', label: 'Tone Steps' }, { v: 'B', label: 'Hairlines' }, { v: 'C', label: 'Islands' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'corner', label: 'Corners', options: [{ v: 'A', label: 'Soft' }, { v: 'B', label: 'Round' }, { v: 'C', label: 'Squircle' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'controls', label: 'Controls', options: [{ v: 'A', label: 'Ink' }, { v: 'B', label: 'Tonal' }, { v: 'C', label: 'Ink and Ghost' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'depth', label: 'Depth (the blur)', options: [{ v: 'A', label: 'Frost (today)' }, { v: 'B', label: 'Deep Frost' }, { v: 'C', label: 'Blurred Page' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'nav', label: 'Navigation bar (phone)', options: [{ v: 'A', label: 'Floating Pill' }, { v: 'B', label: 'Full-Width Bar (today)' }, { v: 'C', label: 'Icon Dock' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'type', label: 'Type voice', options: [{ v: 'A', label: 'Plain (today)' }, { v: 'B', label: 'Tight and Bold' }, { v: 'C', label: 'Light Numbers, Caps Labels' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'motion', label: 'Motion', options: [{ v: 'A', label: 'Fade and Rise' }, { v: 'B', label: 'Fade and Settle' }, { v: 'C', label: 'Fade Only' }, { v: 'D', label: 'Slide' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'pack', label: 'Framework shape', options: [{ v: 'A', label: 'Drop-In CSS and JS (today)' }, { v: 'B', label: 'Plus Web Components' }, { v: 'C', label: 'Plus Framework Packages' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'names', label: 'Token names', options: [{ v: 'A', label: 'Own Names' }, { v: 'B', label: 'Keep Material Names (today)' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'direction-2', title: 'Design Direction', href: 'explore/review-direction.html',
    questions: [
      { id: 'direction', label: 'Overall direction', help: 'The general character of the design language. Once you pick, I apply it everywhere and take it from there.',
        options: [{ v: 'A', label: 'Keep as it is' }, { v: 'B', label: 'Bold and Graphic' }, { v: 'C', label: 'Soft and Quiet' }, { v: 'D', label: 'Expressive Shapes' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'icon-set', title: 'Icon Set', href: 'explore/review-icon-set.html',
    questions: [
      { id: 'iconset', label: 'Icon set', help: 'Phosphor has no bold duotone; C is composed to get closest to Solar.',
        options: [{ v: 'A', label: 'Solar Bold Duotone (today)' }, { v: 'B', label: 'Phosphor Duotone' }, { v: 'C', label: 'Phosphor Bold Duotone' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'button-group', title: 'Button Groups', href: 'explore/review-button-group.html',
    questions: [
      { id: 'group', label: 'Button group', help: 'A group where you pick a value. Rounded, filled, and not tabs.',
        options: [{ v: 'A', label: 'Rounded Tray (today)' }, { v: 'B', label: 'Pill Tray' }, { v: 'C', label: 'Separate Pills' }, { v: 'D', label: 'Soft Segments' }, { v: 'E', label: 'Joined Capsule' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'light-edge', title: 'Light Mode Glass Edge', href: 'explore/review-light-edge.html',
    questions: [
      { id: 'lightedge', label: 'Light mode glass edge', help: 'Dark mode is unchanged. How should the edge of glass read on a pale page?',
        options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Hairline Outline' }, { v: 'C', label: 'Shaded Rim' }, { v: 'D', label: 'Edge Shade' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
,
  {
    id: 'edge-refract', title: 'Glass Rim Line', href: 'explore/review-edge-refract.html',
    questions: [
      { id: 'refract', label: 'Glass rim line', help: 'Should the edge line be clear glass that shows and brightens the backdrop?',
        options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Clear Hairline' }, { v: 'C', label: 'Bright Clear Rim' }, { v: 'D', label: 'Wide Clear Rim' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
,
  {
    id: 'glass-depth', title: 'Depth With Glass', href: 'explore/review-depth.html',
    questions: [
      { id: 'gdepth', label: 'Glass and depth', help: 'How should glass and the solid base layer combine to show elevation?',
        options: [{ v: 'A', label: 'Chrome Only' }, { v: 'B', label: 'Base, Content, Glass' }, { v: 'C', label: 'One Glass Hero' }, { v: 'D', label: 'Glass Sheet' }, { v: 'Other', label: 'Describe in notes' }] }
    ]
  }
  ,
  {
    id: 'motion-liquid', title: 'Liquid Motion', href: 'explore/motion-liquid.html',
    questions: [
      { id: 'rows', label: 'Row hover and selection', help: 'Issue 7.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid' }, { v: 'C', label: 'More Liquid' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'chevron', label: 'Accordion and chevron', help: 'Issue 11.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid (bend over)' }, { v: 'C', label: 'More Liquid (fold flat)' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'radio', label: 'Radio buttons', help: 'Issue 19.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid' }, { v: 'C', label: 'More Liquid' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'snackbar', label: 'Snackbar', help: 'Issue 28.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid (glass, rises)' }, { v: 'C', label: 'More Liquid (glass drop spreads)' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'tooltip', label: 'Tooltip', help: 'Issue 29.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid (fast rise)' }, { v: 'C', label: 'More Liquid (grows from a drop)' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'menu', label: 'Menu', help: 'Issue 31.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid (pours from the button)' }, { v: 'C', label: 'More Liquid' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'loading', label: 'Skeleton and progress', help: 'Issues 25-27.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Subtle Liquid' }, { v: 'C', label: 'More Liquid' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'overall', label: 'Did I get "liquid but subtle" right?', help: 'Looking at B and C together.', options: [{ v: 'Yes', label: 'That is it' }, { v: 'Close', label: 'Close; see notes' }, { v: 'No', label: 'Not what I mean; see notes' }] }
    ]
  }
  ,
  {
    id: 'motion-liquid-2', title: 'Liquid Motion 2', href: 'explore/motion-liquid-2.html',
    questions: [
      { id: 'rows2', label: 'Row hover: the edges of the box', help: 'Issue 7.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Edges Settle' }, { v: 'C', label: 'Edges Lean' }, { v: 'D', label: 'Corners Melt' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'radio2', label: 'Radio: ink under the surface', help: 'Issue 19.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Ink Drop Under Windows' }, { v: 'C', label: 'Ink Disc Under Windows' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'menu2', label: 'Menu: glass, plain', help: 'Issue 31.', options: [{ v: 'A', label: 'Today' }, { v: 'B', label: 'Settle in Place' }, { v: 'C', label: 'Items Follow' }, { v: 'D', label: 'Fade Only' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'speed', label: 'How fast', help: 'Accordion and snackbar at three speeds.', options: [{ v: 'A', label: 'Lab 1 Speed' }, { v: 'B', label: '15% Faster' }, { v: 'C', label: '30% Faster' }] },
      { id: 'split', label: 'Liquid for ink, plain for glass?', help: 'Ink = fills that show state; glass = surfaces.', options: [{ v: 'Yes', label: 'Right' }, { v: 'No', label: 'Not quite; see notes' }] }
    ]
  },
  {
    id: 'orion-2', title: 'Overhaul Review', href: 'explore/review-orion-2.html',
    questions: [
      { id: 'color', label: 'Color with an accent', help: 'Issue 22.', options: [{ v: 'A', label: 'Neutral surfaces' }, { v: 'B', label: 'Tinted surfaces' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'density', label: 'Size on a computer', options: [{ v: 'A', label: 'Compact with a mouse, opt-in' }, { v: 'B', label: 'Touch size everywhere' }, { v: 'C', label: 'Compact by default on computers' }] },
      { id: 'chip', label: 'Selected chips', help: 'Issue 17.', options: [{ v: 'A', label: 'Accent fill' }, { v: 'B', label: 'Dot slot' }, { v: 'C', label: 'Soft tint' }, { v: 'Other', label: 'Describe in notes' }] },
      { id: 'panels', label: 'Floating panels instead of sheets', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'rail', label: 'Side navigation', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'onglass', label: 'Things on glass', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'errors', label: 'Error fields', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'controls', label: 'Checkbox, radio, switch, slider', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'date', label: 'Date picker', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] },
      { id: 'desktop', label: 'Desktop app template', options: [{ v: 'Yes', label: 'Keep it' }, { v: 'No', label: 'Not quite; see notes' }] }
    ]
  }
];
