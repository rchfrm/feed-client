import React from 'react'
import PropTypes from 'prop-types'

import ControlsContentOptions from '@/app/ControlsContentOptions'
import ControlsContentView from '@/app/ControlsContentView'

const ControlsContent = ({ activeSlug }) => {
  return (
    <div className="md:grid grid-cols-12 gap-8">
      {/* SETTINGS MENU */}
      <ControlsContentOptions
        activeSlug={activeSlug}
        className="col-span-6 col-start-1"
      />
      {/* SETTINGS VIEW */}
      <ControlsContentView
        activeSlug={activeSlug}
        className="col-span-6 col-start-7"
      />
    </div>
  )
}

ControlsContent.propTypes = {
  activeSlug: PropTypes.string,
}

ControlsContent.defaultProps = {
  activeSlug: 'targeting',
}

export default ControlsContent
