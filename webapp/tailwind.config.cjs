/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height'
            },
            aria: {
                current: 'current="true"'
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                //Wunderschöner Kontrast
                pandasia: {
                    "primary": "#86c232",
                    "secondary": "#61892f",
                    "accent": "#6b6e70",
                    "neutral": "#474b4f",
                    "base-100": "#222629",
                },
                //Elegant und futuristisch
                futuristic: {
                    'primary': '#FFCB9A',
                    'secondary': '#D9B08C',
                	'accent': '#D1E8E2',
                	'neutral': '#116466',
                    'base-100': '#2C3531',
                },
                //Auffallend und einfach
                simple: {
                    'primary': '#66FCF1',
                    'secondary': '#45A29E',
                    'accent': '#C5C6C7',
                    'neutral': '#1F2833',
                	'base-100': '#0B0C10',
                },
                //Innovativ und kühn
                innovation: {
                    'primary': '#FF652F',
                    'secondary': '#FFE400',
                    'accent': '#14A76C',
                    'neutral': '#747474',
                    'base-100': '#272727',
                },
                //Sauber und modern
                modern: {
                    'primary': '#3AAFA9',
                	'secondary': '#2B7A78',
                	'accent': '#FEFFFF',
                    'neutral': '#DEF2F1',
                    'base-100': '#17252A',
                },
            },
            'bumblebee',
            'forest'
        ],
        darkTheme: "pandasia",
        lightTheme: 'retro',
    }
};