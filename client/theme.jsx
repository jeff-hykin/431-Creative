export let classes = {}
classes.vbox = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  flexDirection: 'column'
}

export const colors = {
  teal: '#00b3b3',
  softRed: '#e57373',
  blue: '#2196f3',
  offWhite: 'whitesmoke',
  white: '#FFFFFF',
  gray: '#808080'
}

classes.body = {
  ...classes.vbox,
  width: '100vw',
  minHeight: '100vh',
  overflow: 'visible',
  scrollBehavior: 'auto',
  backgroundColor: colors.offWhite
}

