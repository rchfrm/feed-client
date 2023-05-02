const lineClampPlugin = require('@tailwindcss/line-clamp')

module.exports = (contentFiles) => ({
  content: contentFiles,
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
      body: ['Inter', 'sans-serif'],
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
        black: '#0D1311',
        anthracite: '#353938',
        grey: {
          light: '#E7E9E8',
          DEFAULT: '#C8CBCA',
          dark: '#7F8382',
        },
        offwhite: '#F4F4F4',
        green: {
          text: '#033131',
          dark: '#0C7F70',
          DEFAULT: '#19C89C',
          light: '#48D7AA',
          border: '#78E5BC',
          bg: {
            dark: '#ABF0D2',
            light: '#DFFAEC',
          },
          contrast: '#022222',
        },
        yellow: {
          text: '#373B0F',
          dark: '#9D9D2B',
          DEFAULT: '#FDE74C',
          light: '#FFE574',
          border: '#FFE79D',
          bg: {
            dark: '#FFEEC7',
            light: '#FFFAF2',
          },
          contrast: '#373B0F',
        },
        red: {
          text: '#4F2615',
          dark: '#A74231',
          DEFAULT: '#FA5450',
          light: '#FD777C',
          border: '#FF94A0',
          bg: {
            dark: '#FFBFCB',
            light: '#FFEFF4',
          },
        },
        fb: '#26547C',
        insta: '#E75A7C',
        twitter: '#5BC0EB',
        sc: '#FDE74C',
        gradient: {
          1: {
            light: '#D2EFFF',
            DEFAULT: '#B9E6FF',
            dark: '#5BC1FB',
          },
          3: {
            light: '#D0DBFF',
            DEFAULT: '#B8C9FF',
            dark: '#5B82FB',
          },
          5: {
            light: '#D4CFFF',
            DEFAULT: '#BBB4FF',
            dark: '#6858FF',
          },
          7: {
            light: '#E4CBFF',
            DEFAULT: '#D5AEFF',
            dark: '#A85BFB',
          },
          9: {
            light: '#FECCFF',
            DEFAULT: '#FEA5FF',
            dark: '#F95BFB',
          },
          11: {
            light: '#FFB7C5',
            DEFAULT: '#FF9BAF',
            dark: '#FB5B7C',
          },
        },
      },
      height: {
        22: '5.5rem',
        23: '5.75rem',
      },
      minHeight: {
        '2-lines': '2.4rem',
        '3-lines': '3.6rem',
        '4-lines': '4.8rem',
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
        width: 'width',
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
})
