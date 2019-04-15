import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { colors } from '../theme'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import BusinessIcon from '@material-ui/icons/BusinessOutlined'
import PhoneIcon from '@material-ui/icons/PhoneOutlined'

let classes = {
  inputFields: {
    width: '11rem'
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
        placeholder='Email'
        className={classes.inputFields}
        value={state.email}
        onChange={handleChange('email')}
        disabled={readOnly}
        InputProps={{
          style: { color: readOnly ? colors.black : 'inherit' }
        }}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <BusinessIcon />
      </IconWrapper>
      <TextField
        id='company'
        placeholder='Company'
        className={classes.inputFields}
        value={state.company}
        onChange={handleChange('company')}
        disabled={readOnly}
        InputProps={{
          style: { color: readOnly ? colors.black : 'inherit' }
        }}
      />
    </div>
    <div className={classes.fieldWrapper}>
      <IconWrapper>
        <PhoneIcon />
      </IconWrapper>
      <TextField
        id='phone'
        placeholder='Phone'
        className={classes.inputFields}
        value={state.phone}
        onChange={handleChange('phone')}
        disabled={readOnly}
        InputProps={{
          style: { color: readOnly ? colors.black : 'inherit' }
        }}
      />
    </div>
  </Fragment>
}

export default withStyles(classes)(ContactInfo)
