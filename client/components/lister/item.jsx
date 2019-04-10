import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { colors } from '../../theme'
import Grid from '@material-ui/core/Grid'
import SkillChips from '../skills'

let padding = '1.2rem 3rem'
/* istanbul ignore next */
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
  titleWhite: {
    width: '100%',
    padding,
    fontSize: '21pt',
    borderBottom: `solid ${colors.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  titleColor: {
    width: '100%',
    padding,
    fontSize: '21pt',
    backgroundColor: colors.blue,
    color: 'white',
    borderBottom: `solid ${colors.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '&:hover': {
      opacity: 0.9
    }
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
  contact: {
    fontSize: '12pt',
    color: colors.offWhite
  },
  deleteIconOnWhite: {
    color: colors.red
  },
  editIconOnWhite: {
    color: colors.blue
  },
  deleteIconOnColor: {
    color: colors.offWhite
  },
  editIconOnColor: {
    color: colors.offWhite
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

/* istanbul ignore next */
export class Item extends React.Component {
  constructor (props) /* istanbul ignore next */ {
    super(props)
    this.state = {
      wasDeleted: false
    }
    let { _id, onDelete } = this.props
    this.onDelete = () => onDelete(_id)
  }

  onDeleteWrapper = (e) => /* istanbul ignore next */ {
    e.stopPropagation()
    let answer = window.confirm('Are you sure you want to delete this?')
    if (answer) {
      this.onDelete()
      this.setState({ wasDeleted: true })
    }
  }

  onEditWrapper = (e) => /* istanbul ignore next */ {
    e.stopPropagation()
    this.onEdit()
  }

  render () /* istanbul ignore next */ {
    let { classes, title, skills, description, _id, onDelete, onEdit, onView, showDelete, showEdit, ownerId, contactInfo, color, user } = this.props
    // if this one was just deleted then don't show it
    if (this.state.wasDeleted) {
      return <div key={_id} />
    }
    this.onDelete = () => onDelete(_id)
    this.onEdit = () => onEdit(_id)

    return <Grid item xs={10} zeroMinWidth>
      <Card elevation={9}>
        <div className={color ? classes.titleColor : classes.titleWhite} onClick={() => onView(_id)}>
          {title}
          <div style={{ display: 'flex' }}>
            {user && (user._id == ownerId || user.role == 'admin') ? (
              <div>
                <IconButton className='deleteIconWrapper' onClick={this.onDeleteWrapper}>
                  <DeleteIcon classes={{ root: color ? classes.deleteIconOnColor : classes.deleteIconOnWhite }} />
                </IconButton>
                <IconButton className='editIconWrapper' onClick={this.onEditWrapper}>
                  <Edit classes={{ root: color ? classes.editIconOnColor : classes.editIconOnWhite }} />
                </IconButton>
              </div>
            ) : (
              <div className={classes.contact} >
                {contactInfo.company}
              </div>
            )}
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

/* istanbul ignore next */
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

/* istanbul ignore next */
export default withStyles(classes)(Item)
