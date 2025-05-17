/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        galindo: ['Galindo', 'sans-serif'],
        rye: ['Rye', 'cursive'],
        limelight: ['Limelight', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-none': {
            '-ms-overflow-style': 'none', /* Hide scrollbar for IE */
            'scrollbar-width': 'none', /* Hide scrollbar for Firefox */
          },
          '.scrollbar-none::-webkit-scrollbar': {
            display: 'none', /* Hide scrollbar for Webkit browsers */
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
