/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'selection-bg': '#f97316',  
        'selection-text': '#FFFFFF', 
      },
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'), 
    function ({ addBase, theme }) {
      addBase({
        '::selection': {
          backgroundColor: theme('colors.selection-bg'),
          color: theme('colors.selection-text'),
        },
      })
    }
  ],
};
