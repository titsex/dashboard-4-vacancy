/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-theme': '#191919',
                'light-theme': '#e6e6e6',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
