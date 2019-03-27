import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Info from '@material-ui/icons/Info'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import SkillChips from '../skills'
import ItemDescriptions from './item-description'
import { colors } from '../../theme'
import Fab from '@material-ui/core/Fab'

const styles = theme => ({
  card: {
    maxWidth: '800px'
  },
  media: {
    height: 140
  },
  cardAction: {
    background: colors.teal,
    '& h2': {
      color: colors.white,
      whiteSpace: 'normal'
    }
  },
  noWrap: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  paperStyle: {
    padding: 16,
    height: '100%'
  },
  fab: {
    margin: theme.spacing.unit
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
export function Item ({ classes, title, skills, descriptions, id, onDelete, onEdit, onView, showView, showDelete, showEdit }) {
  const onClick = type => {
    switch (type) {
      case 'delete':
        return onDelete(id)
      case 'edit':
        return onEdit(id)
      case 'view':
        return onView(id)
    }
  }

  return (
    <Card className={classes.card}>
      <CardActions className={classes.cardAction}>
        <Grid
          justify='space-between'
          alignItems='center'
          container
        >
          <Grid item xl={8}>
            <Typography gutterBottom variant='h2'>
              {title}
            </Typography>
            <Grid item xl={12}>
              <SkillChips skills={skills} />
            </Grid>
          </Grid>
          <Grid item xl={4}>
            {showDelete && <Fab color='primary' aria-label='delete' className={classes.fab} onClick={onClick.bind(this, 'delete')}>
              <DeleteIcon />
            </Fab>}
            {showEdit && <Fab color='primary' aria-label='edit' className={classes.fab} onClick={onClick.bind(this, 'edit')}>
              <Edit />
            </Fab>}
            { showView && <Fab color='primary' aria-label='view' className={classes.fab} onClick={onClick.bind(this, 'view')}>
              <Info />
            </Fab>}
          </Grid>
        </Grid>
      </CardActions>
      <CardContent>
        <ItemDescriptions descriptions={descriptions} paperStyle={classes.paperStyle} />
      </CardContent>
    </Card>
  )
}

Item.propTypes = {
  title: PropTypes.string,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  descriptions: ItemDescriptions.propTypes.descriptions,
  skills: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.number, label: PropTypes.string })
  )
}

Item.defaultProps = {
  title: '',
  showView: false,
  showEdit: false,
  showDelete: false,
  onDelete: console.log,
  onView: console.log,
  onEdit: console.log
}

export default withStyles(styles)(Item)
