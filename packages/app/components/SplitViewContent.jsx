import React from 'react'
import PropTypes from 'prop-types'

const SplitViewContent = ({ activeOption, contentComponents, className }) => {
  return (
    <div className={className}>
      {contentComponents[activeOption]}
    </div>
  )
}

SplitViewContent.propTypes = {
  activeOption: PropTypes.string.isRequired,
  contentComponents: PropTypes.object.isRequired,
  className: PropTypes.string,
}

SplitViewContent.defaultProps = {
  className: null,
}

export default SplitViewContent
