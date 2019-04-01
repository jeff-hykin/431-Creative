import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import EmailIcon from '@material-ui/icons/EmailOutlined'
import BusinessIcon from '@material-ui/icons/BusinessOutlined'
import PhoneIcon from '@material-ui/icons/PhoneOutlined'
import PeopleIcon from '@material-ui/icons/PeopleOutlined'

let classes = {
  inputFields: {

  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  contactHeader: {
    marginTop: '12px',
    fontSize: '20pt',
    paddingTop: '2em'
  }
}

let IconWrapper = ({ children }) => <div style={{ width: 'fit-content', paddingRight: '0.9em' }} >
  {children}
</div>

let ContactInfo = ({ classes, state, handleChange }) => {
  return <Fragment>
    <Typography color='textSecondary' gutterBottom className={classes.contactHeader}>
      Contact Information
    </Typography>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <EmailIcon />
      </IconWrapper>
      <TextField
        id='postEmail'
        label='Email'
        className={classes.inputFields}
        value={state.email}
        onChange={handleChange('email')}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <BusinessIcon />
      </IconWrapper>
      <TextField
        label='Company'
        className={classes.inputFields}
        value={state.company}
        onChange={handleChange('company')}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <PhoneIcon />
      </IconWrapper>
      <TextField
        label='Phone'
        className={classes.inputFields}
        value={state.phone}
        onChange={handleChange('phone')}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <PeopleIcon />
      </IconWrapper>
      <TextField
        label='LinkedIn'
        className={classes.inputFields}
        value={state.linkedin}
        onChange={handleChange('linkedin')}
      />
    </div>
  </Fragment>
}

export default withStyles(classes)(ContactInfo)
