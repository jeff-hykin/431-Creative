export const colors = {
  teal: '#00BFA5',
  red: '#ff6868',
  blue: '#2196f3',
  lightBlue: '#06cced',
  offWhite: '#f5f3f3',
  white: '#FFFFFF',
  gray: '#80808087',
  black: 'black',
  darkGray: 'gray',
  lightGray: '#e0e0e0'
}

export let style = {}

style.textEllipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

style.vbox = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  flexDirection: 'column'
}

style.shadow = {
  filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.4))'
}

style.paper = {
  filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.4))',
  backgroundColor: colors.white,
  padding: '2rem 2.5rem',
  margin: '1rem',
  textAlign: 'center',
  borderRadius: '0.4rem',
  ...style.vbox
}

style.body = {
  ...style.vbox,
  width: '100vw',
  minHeight: '100vh',
  overflow: 'visible',
  scrollBehavior: 'auto',
  backgroundColor: colors.offWhite
}
