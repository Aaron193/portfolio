/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}', './app/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {
                glow: {
                    orange: '#f97316',
                    amber: '#f59e0b',
                    yellow: '#eab308',
                },
            },
            animation: {
                blob: 'blob 7s infinite',
                float: 'float 6s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'glow-pulse': {
                    '0%': {
                        'box-shadow': '0 0 20px rgba(139, 92, 246, 0.3)',
                        opacity: '0.7',
                    },
                    '100%': {
                        'box-shadow': '0 0 40px rgba(139, 92, 246, 0.6)',
                        opacity: '1',
                    },
                },
            },
        },
        fontFamily: {
            Montserrat: ['Montserrat', 'sans-serif'],
            Inter: ['Inter', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
};
