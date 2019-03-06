export let classes = {}
classes.vbox = {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  flexDirection: 'column'
}
classes.body = {
  ...classes.vbox,
  width: '100vw',
  minHeight: '100vh',
  overflow: 'visible',
  scrollBehavior: 'auto'
}

export const colors = {
  teal: '#4DB6AC',
  softRed: '#e57373',
  blue: '#2196f3',
  offWhite: 'whitesmoke',
  white: '#FFFFFF'
}
