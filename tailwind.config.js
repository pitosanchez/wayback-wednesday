/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand colors (Red/Black/White/Gray)
                'fire-red': '#E64027',
                'rich-black': '#0a0a0a',
                'warm-white': '#ffffff',
                'platinum': '#e5e5e5',
                // Legacy alias mapped into grayscale for compatibility
                'denim-blue': '#6B7280', // gray-500
            },
            fontFamily: {
                'helvetica-compressed': ['Helvetica Neue', 'Arial', 'sans-serif'],
                'benton-modern': ['benton-modern-display-compre', 'sans-serif'],
            },
            backgroundColor: {
                'fire-red': '#E64027',
                'warm-white': '#ffffff',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
                'denim-blue': '#6B7280',
            },
            textColor: {
                'fire-red': '#E64027',
                'warm-white': '#ffffff',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
                'denim-blue': '#6B7280',
            },
            borderColor: {
                'fire-red': '#E64027',
                'warm-white': '#ffffff',
                'rich-black': '#0a0a0a',
                'platinum': '#e5e5e5',
                'denim-blue': '#6B7280',
            },
        },
    },
    plugins: [],
} 