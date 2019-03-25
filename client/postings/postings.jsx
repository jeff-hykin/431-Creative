import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Page from '../page'
import Lister from '../components/lister'

const styles = theme => ({
  root: {
    margin: '50px auto',
    width: '100%',
    maxWidth: '800px'
  }
})

function Postings ({ classes }) {
  return (
    <section className={classes.root}>
      <Lister list={[{
        title: 'Odd job #1',
        id: 0,
        showView: true,
        descriptions: [
          { title: 'Description', body: 'really long dumb stuff', id: 1212 },
          { title: 'Description', body: 'really long dumb stuff saldkfj aslkdfjlk aslkdfjllkj  laksdjf', id: 121234 },
          { title: 'Description', body: 'really long dumb stuff', id: 1213245 },
          { title: 'Description', body: 'really long dumb stuff', id: 12451 },
          { title: 'Description', body: 'really long dumb stuff', id: 123 }
        ],
        skills: [
          { key: 222, label: 'Angular' },
          { key: 11212, label: 'jQuery' },
          { key: 2234234, label: 'Polymer' },
          { key: 3234, label: 'React' },
          { key: 234, label: 'Vue.js' }
        ],
        onDelete: console.log,
        onView: console.log,
        onEdit: console.log
      }]} />
    </section>
  )
}

export default Page(withStyles(styles)(Postings))
