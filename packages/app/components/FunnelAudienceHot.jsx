import React from 'react'
// import PropTypes from 'prop-types'

import copy from '@/app/copy/funnelCopy'

import MarkdownText from '@/elements/MarkdownText'

const FunnelAudienceHot = () => {
  return (
    <section className="mt-10 bg-grey-2 p-5 rounded-dialogue">
      {/* HEADER */}
      <header className="-mt-1 mb-4 flex justify-between">
        <h4 className="font-body font-bold">{copy.hot.title}</h4>
        <p className="h4 font-body font-regular">coming soon</p>
      </header>
      <MarkdownText
        markdown={copy.hot.description}
      />
    </section>
  )
}

FunnelAudienceHot.propTypes = {

}

FunnelAudienceHot.defaultProps = {

}

export default React.memo(FunnelAudienceHot)
