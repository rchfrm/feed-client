import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'



const TargetingNoDefaultLink = ({}) => {
  return (
    <div>
      <MarkdownText markdown={copy.noDefaultLinkCopy} />
    </div>
  )
}

TargetingNoDefaultLink.propTypes = {

}

export default TargetingNoDefaultLink
