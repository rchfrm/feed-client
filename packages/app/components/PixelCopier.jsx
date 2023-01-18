import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import ButtonNew from '@/elements/ButtonNew'

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
    color: 'black',
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
      <ButtonNew
        size="small"
        version="secondary"
        onClick={openModal}
        isDisabled={isLoading}
        trackComponentName="PixelCopier"
      >
        Copy pixel
      </ButtonNew>
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
