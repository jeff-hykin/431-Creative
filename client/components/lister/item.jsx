import React from 'react'
import * as PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SkillChips from '../skills'
import CardHeader from '@material-ui/core/CardHeader'
import { CardActionArea, IconButton } from '@material-ui/core'
import { colors } from '../../theme'

const styles = theme => ({
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
      <Card elevation={10}>
        <CardActionArea onClick={() => onView(_id)}>
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
            {showDelete && <IconButton onClick={this.onDeleteWrapper}>
              <DeleteIcon />
            </IconButton>}
            {showEdit && <IconButton onClick={() => onEdit(_id)}>
              <Edit />
            </IconButton>}
          </div>
        </CardActions>
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

export default withStyles(styles)(Item)
