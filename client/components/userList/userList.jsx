import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { api } from '../../../backend/setup-functions'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import { colors } from '../../theme'

const classes = theme => ({
  delete: {
    color: colors.red
  },
  checkbox: {
    color: colors.blue
  }
})

/* istanbul ignore next */
export class UserList extends React.Component {
  constructor (props) /* istanbul ignore next */ {
    super(props)
    this.state = {
      users: []
    }
    api['get-users']({}).then(resp => (
      this.setState({
        users: resp
      }))
    )
  }

  updateRole (id, newRole) {
    let tempState = this.state
    this.state.users.find(user => user._id === id).role = newRole
    this.setState(tempState)
  }

  removeUser (_id) {
    let tempState = this.state
    tempState.users = tempState.users.filter(user => user._id !== _id)
    this.setState(tempState)
  }

  changeRole = row => event => {
    if (row.role === 'admin') {
      try {
        api['make-not-admin'](row._id).then(console.log('User no longer admin'))
        this.updateRole(row._id, '')
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        api['make-admin'](row._id).then(console.log('User now an admin'))
        this.updateRole(row._id, 'admin')
      } catch (e) {
        console.log(e)
      }
    }
  }

  deleteUser = row => event => {
    try {
      api['delete-user'](row._id).then(console.log('Deleted user'))
      this.removeUser(row._id)
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    if (this.state.users.length === 0) {
      return <div style={{ textAlign: 'center', color: 'white', width: '100%' }}>
        No Users ¯\_(ツ)_/¯
      </div>
    } else {
      return <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Admin</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(row => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row.firstName + ' ' + row.lastName}
                </TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>
                  <Checkbox
                    checked={row.role === 'admin'}
                    onChange={this.changeRole(row)}
                    className={this.props.classes.checkbox}
                    color='default'
                  />
                </TableCell>
                <TableCell align='right'>
                  <IconButton onClick={this.deleteUser(row)} className={this.props.classes.delete}>
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

export default withStyles(classes)(UserList)
