import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import SkillChips from '../skills'
import CardHeader from '@material-ui/core/CardHeader'
import { CardActionArea, IconButton } from '@material-ui/core'

const styles = theme => ({
  cardHeader: {
    backgroundColor: '#2096F3',
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

  return (
    <Card>
      <CardActionArea onClick={onClick.bind(this, 'view')}>
        <CardHeader
          title={title}
          titleTypographyProps={{ align: 'center', color: 'inherit' }}
          className={classes.cardHeader}
        />
      </CardActionArea>
      <CardContent>
        <div className={classes.cardDesc}>
          <Typography variant='subtitle1' noWrap>
            {description}
          </Typography>
        </div>
      </CardContent>
      <CardActions >
        <SkillChips className={classes.skills} skills={skills} />
        <div className={classes.actionBtn}>
          {showDelete && <IconButton onClick={onClick.bind(this, 'delete')}>
            <DeleteIcon />
          </IconButton>}
          {showEdit && <IconButton onClick={onClick.bind(this, 'edit')}>
            <Edit />
          </IconButton>}
        </div>
      </CardActions>
    </Card>
  )
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

export default withStyles(styles)(Item)
