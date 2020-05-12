module.exports = {
  purge: [
    './components/**/*.jsx',
    './pages/**/*.jsx',
  ],
  theme: {
    screens: {
      xxs: '450px',
      xs: '600px',
      sm: '800px',
      md: '992px',
      lg: '1200px',
      bmw: '750px',
      xl: '1600px',
    },
    fontFamily: {
      display: ['SpaceGrotesk', 'sans-serif'],
      body: ['Inter', 'serif'],
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '3px',
      md: '6px',
      lg: '0.5rem',
      full: '9999px',
    },
    extend: {
      colors: {
        white: '#F4F4F4',
        black: '#0D1311',
        green: '#03D8B2',
        red: '#FA5450',
        grey: {
          1: '#E7E9E8',
          2: '#C8CBCA',
          3: '#7F8382',
        },
        fb: '#26547C',
        insta: '#E75A7C',
        twitter: '#5BC0EB',
        sc: '#FDE74C',
      },
    },
  },
  variants: {},
  plugins: [],
}
