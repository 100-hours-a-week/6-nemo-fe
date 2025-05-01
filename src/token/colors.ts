const PRIMITIVE_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  green: {
    50: "#eefaf8",           // greenLight
    100: "#e6f7f5",          // greenLightHover
    200: "#caefe9",          // greenLightActive
    300: "#55cbb9",          // greenNormal
    400: "#4db7a7",          // greenNormalHover
    500: "#44a294",          // greenNormalActive
    600: "#40988b",          // greenDark
    700: "#337a6f",          // greenDarkHover
    800: "#265b53",          // greenDarkActive
    900: "#1e4741",          // greenDarker
  },
  gray: {
    50: '#F9F8FD',
    100: '#F1F0F5',
    200: '#E7E6EB',
    300: '#D6D5DA',
    400: '#B2B1B6',
    500: '#929195',
    600: '#6A696D',
    700: '#56555A',
    800: '#38373B',
    900: '#18171B',
  },
  purple: {
    50: '#f4e8ff',
    100: '#e0c7fe',
    200: '#cba0fe',
    300: '#b575ff',
    400: '#a350fd',
    500: '#8f2bf3',
    600: '#8425ec',
    700: '#7519e3',
    800: '#6712db',
    900: '#5100cd',
  },
  pink: {
    50: '#ffe1ff',
    100: '#feafd9',
    200: '#ff75bf',
    300: '#fc28a1',
    400: '#f60087',
    500: '#f2006d',
    600: '#e1006a',
    700: '#ca0065',
    800: '#b30062',
    900: '#8b005b',
  },
  yellow: {
    400: '#ffd966',
  },
};

export const COLORS = {
  white: PRIMITIVE_COLORS.white,
  black: PRIMITIVE_COLORS.gray[900],

  primary: {
    main: PRIMITIVE_COLORS.green[300],
    hover: PRIMITIVE_COLORS.green[400],
    active: PRIMITIVE_COLORS.green[500],
    light: PRIMITIVE_COLORS.green[50],
    dark: PRIMITIVE_COLORS.green[700],
  },

  secondary: {
    main: PRIMITIVE_COLORS.purple[300],
    hover: PRIMITIVE_COLORS.purple[400],
    active: PRIMITIVE_COLORS.purple[500],
    light: PRIMITIVE_COLORS.purple[50],
    dark: PRIMITIVE_COLORS.purple[700],
  },

  lightGray: PRIMITIVE_COLORS.gray[400],
  darkGray: PRIMITIVE_COLORS.gray[700],
  grayContainer: PRIMITIVE_COLORS.gray[100],
  lightGrayContainer: PRIMITIVE_COLORS.gray[50],

  error: PRIMITIVE_COLORS.pink[200],
  errorContainer: PRIMITIVE_COLORS.pink[50],
  onErrorContainer: PRIMITIVE_COLORS.pink[300],
  warn: PRIMITIVE_COLORS.yellow[400],
  complete: PRIMITIVE_COLORS.green[300],

  kakao: '#FEE500',
  onKakao: '#181600',

  green: PRIMITIVE_COLORS.green,
  gray: PRIMITIVE_COLORS.gray,
  purple: PRIMITIVE_COLORS.purple,
  pink: PRIMITIVE_COLORS.pink,
  yellow: PRIMITIVE_COLORS.yellow,
};

export const PRIMARY_COLORS = PRIMITIVE_COLORS.green;