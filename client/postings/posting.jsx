import React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import SkillChips from '../components/skills'
import PostDescriptions from './posting-description'
import { colors } from '../theme'

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
  }
})

/**
 * Posting displays a single posting in a Card format
 * @param {Object} classes
 * @param title
 * @param skills
 * @param descriptions
 * @returns {*}
 * @constructor
 */
function Posting ({ classes, title, skills, descriptions }) {
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
            <Button size='small' variant='contained' color='primary'>
              View More
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <CardActionArea>
        <CardContent>
          <PostDescriptions descriptions={descriptions} paperStyle={classes.paperStyle} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

Posting.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  descriptions: PostDescriptions.propTypes.descriptions,
  skills: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.number, label: PropTypes.string })
  )
}

Posting.defaultProps = {
  title: 'Odd job #1',
  id: 0,
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
  ]
}

export default withStyles(styles)(Posting)
