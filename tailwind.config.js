/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Classic Americana Retro Palette
                'denim-blue': '#3D5AFE',
                'fire-red': '#E64027',
                'sunshine-yellow': '#FFD292',
                'warm-white': '#F5E3CA',
                // Keep some original colors for compatibility
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
            },
            fontFamily: {
                'helvetica-compressed': ['Helvetica Neue', 'Arial', 'sans-serif'],
                'benton-modern': ['benton-modern-display-compre', 'sans-serif'],
            },
            backgroundColor: {
                'denim-blue': '#3D5AFE',
                'fire-red': '#E64027',
                'sunshine-yellow': '#FFD292',
                'warm-white': '#F5E3CA',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
            },
            textColor: {
                'denim-blue': '#3D5AFE',
                'fire-red': '#E64027',
                'sunshine-yellow': '#FFD292',
                'warm-white': '#F5E3CA',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
            },
            borderColor: {
                'denim-blue': '#3D5AFE',
                'fire-red': '#E64027',
                'sunshine-yellow': '#FFD292',
                'warm-white': '#F5E3CA',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
            },
        },
    },
    plugins: [],
} 