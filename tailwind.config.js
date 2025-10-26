/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#5C4033",        // rich chocolate brown (Background/Main Panels)
        secondary : "#A67B5B",      // warm light brown / tan (Cards, Containers)
        accent : "#D9A066",         // soft golden beige (Buttons, Highlights)
        textColor : "#FFF8F0",      // cream/off-white (Text)
        interactive : "#8B5E3C",    // deeper brown (Hover effects)
        border : "#6F4E37",         // darker brown (Borders / Dividers)
        highlight : "#FFC870"       // golden glow (Active buttons or sliders)
      },
      fontFamily: {
        'vintage': ['"Courier New"', 'Courier', 'monospace'],
        'serif-vintage': ['Georgia', 'Garamond', 'serif'],
        'classic': ['"Times New Roman"', 'Times', 'serif']
      },
      boxShadow: {
        'vintage': '0 4px 6px rgba(0, 0, 0, 0.2)',
        'vintage-lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'vintage-xl': '0 20px 25px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}