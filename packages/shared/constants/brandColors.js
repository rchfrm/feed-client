const black = '#0D1311'
const anthracite = '#353938'
const greyLight = '#E7E9E8'
const grey = '#C8CBCA'
const greyDark = '#7F8382'
const offwhite = '#F4F4F4'
const white = '#FFFFFF'
const greenText = '#033131'
const greenDark = '#0C7F70'
const green = '#19C89C'
const greenLight = '#48D7AA'
const greenBorder = '#78E5BC'
const greenBgDark = '#ABF0D2'
const greenBgLight = '#DFFAEC'
const greenContrast = '#022222'
const yellowText = '#373B0F'
const yellowDark = '#9D9D2B'
const yellow = '#FDE74C'
const yellowLight = '#FFE574'
const yellowBorder = '#FFE79D'
const yellowBgDark = '#FFEEC7'
const yellowBgLight = '#FFFAF2'
const yellowContrast = '#373B0F'
const redText = '#4F2615'
const redDark = '#A74231'
const red = '#FA5450'
const redLight = '#FD777C'
const redBorder = '#FF94A0'
const redBgDark = '#FFBFCB'
const redBgLight = '#FFEFF4'

const brandColors = {
  // Base colors
  black,
  anthracite,
  greyLight,
  grey,
  greyDark,
  offwhite,
  white,
  // Greens
  greenText,
  greenDark,
  green,
  greenLight,
  greenBorder,
  greenBgDark,
  greenBgLight,
  greenContrast,
  // Yellows
  yellowText,
  yellowDark,
  yellow,
  yellowLight,
  yellowBorder,
  yellowBgDark,
  yellowBgLight,
  yellowContrast,
  // Reds
  redText,
  redDark,
  red,
  redLight,
  redBorder,
  redBgDark,
  redBgLight,
  // Gradient
  gradient: {
    1: {
      light: '#B9E6FF',
      regular: '#D2EFFF',
      dark: '#5BC1FB',
    },
    3: {
      light: '#B8C9FF',
      regular: '#D0DBFF',
      dark: '#5B82FB',
    },
    5: {
      light: '#BBB4FF',
      regular: '#D4CFFF',
      dark: '#6858FF',
    },
    7: {
      light: '#D5AEFF',
      regular: '#E4CBFF',
      dark: '#A85BFB',
    },
    9: {
      light: '#FEA5FF',
      regular: '#FECCFF',
      dark: '#F95BFB',
    },
    11: {
      light: '#FF9BAF',
      regular: '#FFB7C5',
      dark: '#FB5B7C',
    },
  },
  // Platform colors
  facebook: {
    bg: '#26547C',
    text: offwhite,
  },
  instagram: {
    bg: '#E75A7C',
    text: offwhite,
  },
  twitter: {
    bg: '#5BC0EB',
    text: black,
  },
  spotify: {
    bg: '#03D8B2',
    text: black,
  },
  soundcloud: {
    bg: '#FDE74C',
    text: black,
  },
  youtube: {
    bg: '#FA5450',
    text: offwhite,
  },
  tiktok: {
    bg: black,
    text: offwhite,
  },
}

export default brandColors
