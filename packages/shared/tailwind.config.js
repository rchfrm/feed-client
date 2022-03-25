module.exports = (purgeFiles) => ({
  purge: purgeFiles,
  theme: {
    screens: {
      iphone8: '375px',
      xxs: '450px',
      minContent: '540px',
      xs: '600px',
      sm: '800px',
      md: '992px',
      lg: '1200px',
      bmw: '1440px',
      xl: '1600px',
    },
    fontFamily: {
      display: ['SpaceGrotesk', 'sans-serif'],
      body: ['Inter', 'serif'],
      mono: ['monospace'],
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      button: '3px',
      dialogue: '6px',
      pill: '30px',
      lg: '0.5rem',
      full: '9999px',
    },
    extend: {
      colors: {
        white: '#F4F4F4',
        black: '#0D1311',
        green: '#03D8B2',
        red: '#FA5450',
        redLight: '#E75A7C',
        yellow: '#FDE74C',
        blue: '#5BC0EB',
        purple: '#CC7CFD',
        blackHover: '#343434',
        greenHover: '#05C7A4',
        redHover: '#F73F3B',
        yellowHover: '#FFDA1A',
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
      height: {
        22: '5.5rem',
        23: '5.75rem',
      },
      spacing: {
        7: '1.75rem',
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        15: '3.75rem',
        25: '6.25rem',
        26: '6.5rem',
        28: '7rem',
        30: '7.5rem',
        36: '9rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
        112: '28rem',
        128: '32rem',
        buttonHeight: '3.5rem',
        buttonWidthWide: '150px',
      },
      width: {
        fit: 'fit-content',
      },
      transitionProperty: {
        height: 'height',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  variants: {
    margin: ['responsive', 'last', 'first', 'odd', 'even'],
    padding: ['responsive', 'odd', 'even'],
    borderStyle: ['responsive', 'last', 'first'],
    flexDirection: ['responsive', 'even'],
  },
  plugins: [],
})
