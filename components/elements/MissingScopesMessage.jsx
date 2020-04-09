import React from 'react'
import PropTypes from 'prop-types'

import firebase from '../helpers/firebase'

import MarkdownText from './MarkdownText'
import ButtonFacebook from './ButtonFacebook'

import copy from '../../copy/integrationErrorsCopy'

const MissingScopesMessage = ({ scopes, className }) => {
  const classes = ['missing--scopes', className].join(' ')
  const markdown = copy.missing_permission_scope(scopes)

  const reauthFb = () => {
    firebase.reauthFacebook(scopes)
  }

  return (
    <div className={classes}>
      <MarkdownText markdown={markdown} />
      <ButtonFacebook
        onClick={reauthFb}
      >
        Continue to Facebook
      </ButtonFacebook>
    </div>
  )
}

MissingScopesMessage.propTypes = {
  scopes: PropTypes.array.isRequired,
  className: PropTypes.string,
}

MissingScopesMessage.defaultProps = {
  className: '',
}


export default MissingScopesMessage
