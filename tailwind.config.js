/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			transitionProperty: {
				height: 'height',
				width: 'width',
				spacing: 'margin, padding',
			},
			colors: {
				footer: {
					50: '#44474b',
					100: '#3a3d41',
					200: '#303337',
					300: '#26292d',
					400: '#1c1f23',
					500: '#121519',
					600: '#080b0f',
					700: '#000105',
					800: '#000000',
					900: '#000000',
				},
				primary: {
					50: '#b3daff',
					100: '#a9d0f6',
					200: '#9fc6ec',
					300: '#95bce2',
					400: '#8bb2d8',
					500: '#81a8ce',
					600: '#779ec4',
					700: '#6d94ba',
					800: '#638ab0',
					900: '#5980a6',
				},
				background: {
					700: '#121825',
					800: '#16212C',
					900: '#222233',
				},
				card: {
					800: '#1E242E',
					900: '#111418',
				},
				eth: '#B3FFFF',
				btc: '#FF8D8F',
				ric: '#7B7EFF',
				usdc: '#2775CA',
				stIbAlluoEth: '#75E276',
				stIbAlluoUsd: '#E9DF89',
			},
		},
	},
	plugins: [],
};
