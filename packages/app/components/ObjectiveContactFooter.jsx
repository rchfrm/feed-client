import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import EmailIcon from '@/icons/EmailIcon'
import copy from '@/app/copy/getStartedCopy'

const ObjectiveContactFooter = ({ className }) => {
  return (
    <div className={['flex items-center', className].join(' ')}>
      <EmailIcon className="w-4 h-auto mr-1" />
      <MarkdownText markdown={copy.objectiveContact} className="text-sm mb-0" />
    </div>
  )
}

ObjectiveContactFooter.propTypes = {
  className: PropTypes.string,
}

ObjectiveContactFooter.defaultProps = {
  className: null,
}

export default ObjectiveContactFooter
