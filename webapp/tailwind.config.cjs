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
                	'secondary': '#0B0C10',
                	'primary': '#1F2833',
                	'accent': '#45A29E',
                    'neutral': '#66FCF1',
                    'base-100': '#C5C6C7',
                },
                //Innovativ und kühn
                innovation: {
                	'secondary': '#272727',
                	'primary': '#747474',
                	'accent': '#14A76C',
                    'neutral': '#FFE400',
                    'base-100': '#FF652F',
                },
                //Sauber und modern
                modern: {
                	'secondary': '#17252A',
                	'primary': '#2B7A78',
                	'accent': '#FEFFFF',
                    'neutral': '#DEF2F1',
                    'base-100': '#3AAFA9',
                },
            },
            'bumblebee',
            'forest'
        ],
        darkTheme: "pandasia",
        lightTheme: 'retro',
    }
};