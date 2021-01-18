import React from 'react'
import PropTypes from 'prop-types'

import LabelOptions from '@/elements/LabelOptions'
import CopyTextButton from '@/elements/CopyTextButton'

import { track } from '@/app/helpers/trackingHelpers'

const PixelCopierModal = ({ pixelId, pixelEmbed }) => {
  // SHOULD WE SHOW TWO OPTIONS?
  const showTwoOptions = !!pixelEmbed
  // HANDLE TWO OPTIONS
  const labelOptions = [
    {
      id: 'id',
      title: 'Pixel ID',
    },
    {
      id: 'embed',
      title: 'Pixel embed code',
    },
  ]
  const [activeOptionId, setActiveOptionId] = React.useState(labelOptions[0].id)
  return (
    <div>
      <p>Copy your pixel ID or Embed code.</p>
      {showTwoOptions && (
        <LabelOptions
          options={labelOptions}
          activeOptionId={activeOptionId}
          setActiveOptionId={setActiveOptionId}
          trackLabel="Select pixel to copy"
        />
      )}
      <CopyTextButton
        text={activeOptionId === 'id' ? pixelId : pixelEmbed}
        size="large"
        label={showTwoOptions ? '' : 'Pixel ID'}
        onCopied={() => {
          console.log('TRACK')
          // track({
          //   action: 'copy_fb_pixel',
          //   category: 'pixel',
          //   label: 'clipboard',
          // })
        }}
        className={[
          'w-full',
        ].join(' ')}
      />
    </div>
  )
}

PixelCopierModal.propTypes = {
  pixelId: PropTypes.string.isRequired,
  pixelEmbed: PropTypes.string,
}

PixelCopierModal.defaultProps = {
  pixelEmbed: '',
}


export default PixelCopierModal
