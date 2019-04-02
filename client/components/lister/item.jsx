import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { colors } from '../../theme'
import SkillChips from '../skills'
import CardHeader from '@material-ui/core/CardHeader'
import { CardActionArea, IconButton } from '@material-ui/core'

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
    color: colors.gray,
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
export function Item ({ classes, title, skills, description, _id, onDelete, onEdit, onView, showView, showDelete, showEdit }) {
  const onClick = type => {
    switch (type) {
      case 'delete':
        return onDelete(_id)
      case 'edit':
        return onEdit(_id)
      case 'view':
        return onView(_id)
    }
  }
  return <Card elevation={9}>
    <div className={classes.title}>
      {title}
      <div style={{ display: 'flex' }}>
        {showDelete && <IconButton onClick={onClick.bind(this, 'delete')}>
          <DeleteIcon classes={{ root: classes.deleteIcon }} />
        </IconButton>}
        {showEdit && <IconButton onClick={onClick.bind(this, 'edit')}>
          <Edit classes={{ root: classes.editIcon }} />
        </IconButton>}
      </div>
    </div>
    <div className={classes.body} onClick={onClick.bind(this, 'view')}>
      {description}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
        <SkillChips className={classes.skills} skills={skills} />
      </div>
    </div>
  </Card>
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
