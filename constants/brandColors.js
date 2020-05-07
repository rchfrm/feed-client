const white = '#F4F4F4'
const black = '#0D1311'
const green = '#03D8B2'
const red = '#FA5450'
const greyLight = '#E7E9E8'
const grey = '#C8CBCA'
const greyDark = '#7F8382'

const brandColors = {
  // Base colors
  white,
  black,
  green,
  red,
  greyLight,
  grey,
  greyDark,
  // Interface colors
  bgColor: white,
  textColor: black,
  successColor: green,
  loaderColor: green,
  errorColor: red,
  disabledColorBg: greyLight,
  disabledColorText: greyDark,
  // Platform colors
  facebook: {
    bg: '#26547C',
    text: white,
  },
  instagram: {
    bg: '#E75A7C',
    text: white,
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
    text: white,
  },
}

export default brandColors
