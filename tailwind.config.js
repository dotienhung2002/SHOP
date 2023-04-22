module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	plugins: [
		require('@tailwindcss/forms')
	
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '2rem',
				sm: '5rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			  },
		  },
	// 	screens: {
	// 	  'tablet': '640px',
	// 	  // => @media (min-width: 640px) { ... }
	
	// 	  'laptop': '1524px',
	// 	  // => @media (min-width: 1024px) { ... }
	
	// 	  'desktop': '1280px',
	// 	  // => @media (min-width: 1280px) { ... }
	// 	},
	
	fontFamily: {
		sans: ['Graphik', 'sans-serif'],
		serif: ['Merriweather', 'serif'],
	  },
	   extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
	  ,
	  extend: {
		transitionDelay: {
		  '0': '0ms',
		  '2000': '2000ms',
		}
	  }
    }
	  }
};
