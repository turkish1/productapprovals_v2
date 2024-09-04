/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui')],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        // spacing: {
        //     1: '8px',
        //     2: '12px',
        //     3: '16px',
        //     4: '24px',
        //     5: '32px',
        //     6: '48px'
        // },
        colors: {
            blue: '#1fb6ff',
            purple: '#7e5bef',
            pink: '#ff49db',
            orange: '#ff7849',
            green: '#13ce66',
            yellow: '#ffc82c',
            'gray-dark': '#273444',
            gray: '#8492a6',
            'gray-light': '#d3dce6',
            brown: {
                50: '#fdf8f6',
                100: '#f2e8e5',
                200: '#eaddd7',
                300: '#e0cec7',
                400: '#d2bab0',
                500: '#bfa094',
                600: '#a18072',
                700: '#977669',
                800: '#846358',
                900: '#43302b'
            },
            cyan: {
                50: '#ecfeff',
                700: '#0e7490',
                800: '#155e75'
            },
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            purple: '#3f3cbb',
            midnight: '#121063',
            metal: '#565584',
            tahiti: '#3ab7bf',
            silver: '#ecebff',
            'bubble-gum': '#ff77e9',
            bermuda: '#78dcca'
        },
        extend: {
            spacing: {
                13: '3.25rem',
                15: '3.75rem',
                128: '32rem',
                144: '36rem'
            },
            borderRadius: {
                '4xl': '2rem'
            }
        }
    }
};
