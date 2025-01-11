/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {},
        },
        fontFamily: {
            Montserrat: ['Montserrat', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
};
