import React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 8 / 2
  },
  chip: {
    margin: 8 / 2
  }
})

export function SkillChips ({ classes, skills }) {
  return (
    <>
      {skills.map(data => {
        return (
          <Chip
            key={data}
            label={data}
            className={classes.chip}
          />
        )
      })}
    </>
  )
}

SkillChips.propTypes = {
  classes: PropTypes.object,
  skills: PropTypes.arrayOf(PropTypes.string)
}

SkillChips.defaultProps = {
  skills: []
}

/**
 * SkillChips is a basic collection of chips for skills
 * @param {Array.<Object>} skills - Array of skills
 */
export default withStyles(styles)(SkillChips)
