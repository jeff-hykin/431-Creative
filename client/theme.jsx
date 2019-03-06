export const colors = {
  teal: '#00b3b3',
  softRed: '#e57373',
  blue: '#2196f3',
  offWhite: 'whitesmoke',
  white: '#FFFFFF',
  gray: '#808080'
}

const theme = {
  'palette': {
    'common': { 'black': '#000', 'white': '#fff' },
    'background': { 'paper': '#fff', 'default': '#fafafa' },
    'primary': {
      'light': 'rgba(2, 140, 222, 1)',
      'main': 'rgba(5, 135, 209, 1)',
      'dark': 'rgba(0, 76, 120, 1)',
      'contrastText': '#fff'
    },
    'secondary': {
      'light': 'rgba(0, 236, 206, 1)',
      'main': 'rgba(0, 191, 166, 1)',
      'dark': 'rgba(0, 156, 136, 1)',
      'contrastText': '#fff'
    },
    'error': { 'light': '#e57373', 'main': '#f44336', 'dark': '#d32f2f', 'contrastText': '#fff' },
    'text': {
      'primary': 'rgba(0, 0, 0, 0.87)',
      'secondary': 'rgba(0, 0, 0, 0.54)',
      'disabled': 'rgba(0, 0, 0, 0.38)',
      'hint': 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    useNextVariants: true
  },
  spacing: {
    unit: 8
  }
}

export default theme
