/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        debugScreens: {
            position: ['bottom', 'right']
        },
        fontFamily: {
            sans: 'Red Hat Display, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            serif:
                'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
        },
        extend: {
            scale: {
                102: '1.02'
            },
            aspectRatio: {
                '3/4': '3 / 4'
            },
            colors: {
                zinc: {
                    100: 'rgba(208,233,255,0.2)',
                    200: 'rgba(255,255,255,0.3)',
                    400: '#908e97',
                    500: '#62626F',
                    600: '#52525e',
                    700: '#171926',
                    900: '#141724'
                },
                amber: {
                    400: '#e0a100'
                },
                blue: {
                    700: 'rgba(40,45,67,.8)',
                    800: '#1d2033',
                    900: '#15171e'
                }
            }
        }
    },
    plugins: [require('tailwindcss-debug-screens')]
}
