/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: 'var(--gold)',
        bggray: 'var(--bggray)',
        bgsoft:"var(--bgsoft)"
      },
      lineClamp: {
        4: '4',
        5: '5', 
        6: '6',
        8: '8',
        12: '12', 
      },
      screens: {
        'sm': '480px',
        'f': '550px',    
        'md': '768px',   
        'lg': '1024px', 
        'xl': '1456px', 
        
      },
      borderWidth: {
        '0.25': '0.25px',
      },
    },
  
  },
  plugins: [],
};
