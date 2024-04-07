/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],

	plugins: [
		require('flowbite/plugin')
	],

	darkMode: 'selector',

	theme: {
		extend: {
			transitionProperty: {
				'height': 'height'
			},
			aria: {
				current: 'current="true"'
			},
			colors: {
				////Auffallend und einfach
				//primary: {
				//	'secondary': '#0B0C10',
				//	'primary': '#1F2833',
				//	'background': '#C5C6C7',
				//	'accent-secondary': '#66FCF1',
				//	'accent': '#45A29E'
				//},
				////Elegant und futuristisch
				//primary2: {
				//	'secondary': '#2C3531',
				//	'primary': '#116466',
				//	'background': '#D9B08C',
				//	'accent-secondary': '#FFCB9A',
				//	'accent': '#D1E8E2'
				//},
				////Innovativ und kühn
				//primary3: {
				//	'secondary': '#272727',
				//	'primary': '#747474',
				//	'background': '#FF652F',
				//	'accent-secondary': '#FFE400',
				//	'accent': '#14A76C'
				//},
				////Sauber und modern
				//primary4: {
				//	'secondary': '#17252A',
				//	'primary': '#2B7A78',
				//	'background': '#3AAFA9',
				//	'accent-secondary': '#DEF2F1',
				//	'accent': '#FEFFFF'
				//},
				//Wunderschöner Kontrast
				primary: {
					'secondary': '#61892F',
					'primary': '#86C232',
					'background': '#222629',
					'accent-secondary': '#474B4F',
					'accent': '#6B6E70'
				}
			}
		}
	}
};

module.exports = config;