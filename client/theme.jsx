export let classes = {}
classes.vbox = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  flexDirection: 'column'
}

export const colors = {
  teal: '#00BFA5',
  red: '#ff6868',
  blue: '#2196f3',
  offWhite: '#f5f3f3',
  white: '#FFFFFF',
  gray: 'gray',
  lightGray: '#e0e0e0'
}

classes.body = {
  ...classes.vbox,
  width: '100vw',
  minHeight: '100vh',
  overflow: 'visible',
  scrollBehavior: 'auto',
  backgroundColor: colors.offWhite
}
