import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { colors } from '../../theme'
import Grid from '@material-ui/core/Grid'
import SkillChips from '../skills'
import { IconButton } from '@material-ui/core'

let padding = '1.2rem 3rem'
const classes = theme => ({
  cardHeader: {
    backgroundColor: colors.blue,
    color: 'white'
  },
  cardDesc: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2
  },
  actionBtn: {
    marginLeft: 'auto'
  },
  title: {
    width: '100%',
    padding,
    fontSize: '21pt',
    borderBottom: `solid ${colors.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  body: {
    padding,
    display: 'flex',
    flexDirection: 'column',
    color: colors.darkGray,
    '&:hover': {
      backgroundColor: colors.offWhite
    }
  },
  deleteIcon: {
    color: colors.red
  },
  editIcon: {
    color: colors.blue
  }
})

/**
 * Item displays a single posting in a Card format
 * @param {Object} classes
 * @param title
 * @param skills
 * @param descriptions
 * @returns {*}
 * @constructor
 */

export class Item extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      wasDeleted: false
    }
    let { _id, onDelete } = this.props
    this.onDelete = () => onDelete(_id)
  }

  onDeleteWrapper = () => {
    let answer = window.confirm('Are you sure you want to delete this?')
    if (answer) {
      this.onDelete()
      this.setState({ wasDeleted: true })
    }
  }
  render () {
    let { classes, title, skills, description, _id, onDelete, onEdit, onView, showDelete, showEdit } = this.props
    // if this one was just deleted then don't show it
    if (this.state.wasDeleted) {
      return <div key={_id} />
    }
    this.onDelete = () => onDelete(_id)

    return <Grid item xs={10} zeroMinWidth>
      <Card elevation={9}>
        <div className={classes.title}>
          {title}
          <div style={{ display: 'flex' }}>
            {showDelete && <IconButton onClick={this.onDeleteWrapper}>
              <DeleteIcon classes={{ root: classes.deleteIcon }} />
            </IconButton>}
            {showEdit && <IconButton onClick={() => onEdit(_id)}>
              <Edit classes={{ root: classes.editIcon }} />
            </IconButton>}
          </div>
        </div>
        <div className={classes.body} onClick={() => onView(_id)}>
          {description}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
            <SkillChips className={classes.skills} skills={skills} />
          </div>
        </div>
      </Card>
    </Grid>
  }
}
Item.propTypes = {
  title: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  _id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  description: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string)
}

Item.defaultProps = {
  title: '',
  description: '',
  showView: false,
  showEdit: false,
  showDelete: false,
  onDelete: console.log,
  onView: console.log,
  onEdit: console.log
}

export default withStyles(classes)(Item)
