import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { api } from '../../../backend/setup-functions'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import { colors } from '../../theme'

export const classes = theme => ({
  delete: {
    color: colors.red
  }
})

export class PostList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
    api['get-admin-posts']({}).then(resp =>
      this.setState({
        posts: resp
      })
    )
  }

  removePost (_id) {
    let tempState = this.state
    tempState.post = tempState.posts.filter(post => post._id !== _id)
    this.setState(tempState)
  }

  deletePost = row => event => {
    try {
      api['delete-post'](row._id).then(console.log('Deleted post'))
      this.removePost(row._id)
    } catch (e) {
      /* istanbul ignore next */
      console.log(e)
    }
  }

  navigateToPost = _id => e => {
    e.preventDefault()
    this.props.history.push('/showposting/' + _id)
  }

  render () {
    if (this.state.posts.length === 0) {
      return <div style={{ textAlign: 'center', color: 'white', width: '100%' }}>
        No Posts ¯\_(ツ)_/¯
      </div>
    } else {
      return <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>User</TableCell>
              <TableCell align='right'>Description</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.posts.map(row => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'onClick={this.navigateToPost(row._id)}>{row.title}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.description}</TableCell>
                <TableCell align='right'>
                  <IconButton onClick={this.deletePost(row)} className={this.props.classes.delete}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    }
  }
}

export default withStyles(classes)(PostList)
