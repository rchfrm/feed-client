import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import Button from '@/elements/Button'

import PixelCopierModal from '@/app/PixelCopierModal'

const PixelCopier = ({
  pixelId,
  pixelEmbed,
  isLoading,
  trackLocation,
  className,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()

  const alertButtons = [{
    text: 'Done',
    onClick: closeAlert,
  }]

  // OPEN MODAL
  const openModal = () => {
    const children = <PixelCopierModal pixelId={pixelId} pixelEmbed={pixelEmbed} trackLocation={trackLocation} />
    showAlert({ children, buttons: alertButtons })
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <Button
        size="small"
        version="secondary"
        onClick={openModal}
        isDisabled={isLoading}
        trackComponentName="PixelCopier"
      >
        Copy pixel
      </Button>
    </div>
  )
}

PixelCopier.propTypes = {
  pixelId: PropTypes.string.isRequired,
  pixelEmbed: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PixelCopier.defaultProps = {
  pixelEmbed: '',
  className: null,
}


export default PixelCopier
