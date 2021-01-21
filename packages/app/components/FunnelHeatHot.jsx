import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const FunnelHeatHot = () => {
  const copy = 'Soon there will be....'
  return (
    <section className="mt-10 bg-grey-2 p-5 rounded-dialogue">
      {/* HEADER */}
      <header className="-mt-1 mb-4 flex justify-between">
        <h4 className="font-body font-bold">hot</h4>
        <p className="h4 font-body font-regular">coming soon</p>
      </header>
      <MarkdownText
        markdown={copy}
      />
    </section>
  )
}

FunnelHeatHot.propTypes = {

}

FunnelHeatHot.defaultProps = {

}

export default React.memo(FunnelHeatHot)
