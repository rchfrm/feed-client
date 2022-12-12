import React from 'react'
import PropTypes from 'prop-types'

import LabelOptions from '@/elements/LabelOptions'
import CopyTextButton from '@/elements/CopyTextButton'

import { track } from '@/helpers/trackingHelpers'

const PixelCopierModal = ({ pixelId, pixelEmbed, trackLocation }) => {
  // SHOULD WE SHOW TWO OPTIONS?
  const hasEmbedOption = !! pixelEmbed
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
      {hasEmbedOption && (
        <LabelOptions
          options={labelOptions}
          activeOptionId={activeOptionId}
          setActiveOptionId={setActiveOptionId}
          trackLabel="Select pixel to copy"
          trackLocation="Pixel selector"
        />
      )}
      <CopyTextButton
        text={activeOptionId === 'id' ? pixelId : pixelEmbed}
        textAlt={activeOptionId === 'id' ? pixelId : 'Pixel embed code'}
        size="large"
        label={hasEmbedOption ? '' : 'Pixel ID'}
        type={activeOptionId === 'id' ? 'text' : 'code'}
        onCopied={() => {
          const trackAction = activeOptionId === 'id' ? 'copy_pixel_id' : 'copy_pixel_embed'
          track(trackAction, {
            pixelId,
            location: trackLocation,
          })
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
  trackLocation: PropTypes.string,
}

PixelCopierModal.defaultProps = {
  pixelEmbed: '',
  trackLocation: '',
}


export default PixelCopierModal
