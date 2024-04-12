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
                pandasia: {
                    "primary": "#86c232",
                    "secondary": "#61892f",
                    "accent": "#6b6e70",
                    "neutral": "#474b4f",
                    "base-100": "#222629",
                },
            },
            'bumblebee',
            'emerald',
            'retro',
            'forest'
        ],
        darkTheme: "pandasia",
        lightTheme: 'retro',
    }
};