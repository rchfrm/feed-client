import React from 'react'
// import PropTypes from 'prop-types'

import ControlsContentOptions from '@/app/ControlsContentOptions'

const ControlsContent = () => {
  return (
    <div className="md:grid grid-cols-12 gap-4">
      <ControlsContentOptions
        className="col-span-5"
      />
    </div>
  )
}

ControlsContent.propTypes = {

}

export default ControlsContent
