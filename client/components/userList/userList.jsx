import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

function UserList ({ users }) {

  if (users.length === 0) {
    return <div style={{ textAlign: 'center', color: 'white', width: '100%' }}>
      No Users ¯\_(ツ)_/¯
    </div>
  }
  return <Paper>
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
        {users.map(row => (
          <TableRow key={row.id}>
            <TableCell component='th' scope='row'>
              {row.firstName+' '+row.lastName}
            </TableCell>
            <TableCell align='right'>{row.email}</TableCell>
            <TableCell align='right'>{row.admin}</TableCell>
            <TableCell align='right'>{row.delete}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
}

export default UserList
