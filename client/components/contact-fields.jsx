import React, { Fragment } from 'react'
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
    alignItems: 'flex-end',
    paddingBottom: '0.9em'
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

let ContactInfo = ({ classes, state, handleChange, readOnly }) => {
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
        InputProps={{
          readOnly
        }}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <BusinessIcon />
      </IconWrapper>
      <TextField
        id='company'
        label='Company'
        className={classes.inputFields}
        value={state.company}
        onChange={handleChange('company')}
        InputProps={{
          readOnly
        }}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <PhoneIcon />
      </IconWrapper>
      <TextField
        id='phone'
        label='Phone'
        className={classes.inputFields}
        value={state.phone}
        onChange={handleChange('phone')}
        InputProps={{
          readOnly
        }}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <PeopleIcon />
      </IconWrapper>
      <TextField
        id='linkedIn'
        label='LinkedIn'
        className={classes.inputFields}
        value={state.linkedin}
        onChange={handleChange('linkedin')}
        InputProps={{
          readOnly
        }}
      />
    </div>
  </Fragment>
}

export default withStyles(classes)(ContactInfo)
