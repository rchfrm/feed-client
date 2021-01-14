import React from 'react'
import PropTypes from 'prop-types'

import Input from '@/elements/Input'
import Error from '@/elements/Error'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'

const PixelCreatorModal = ({
  modalButtons,
  savePixel,
  error,
}) => {
  const { setButtons } = useAlertModal()

  const [pixelName, setPixelName] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)

  // ENABLE/DISABLE
  React.useEffect(() => {
    // Update state
    const isDisabled = !pixelName
    setDisabled(isDisabled)
    // Update buttons
    const newButtons = produce(modalButtons, draftButtons => {
      // Update save button
      draftButtons[0].disabled = isDisabled
      draftButtons[0].onClick = () => savePixel(pixelName)
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [pixelName])

  const onSubmit = (e) => {
    e.preventDefault()
    if (disabled) return
    savePixel(pixelName)
  }
  return (
    <div className="pt-3">
      {/* ERROR */}
      {error && <Error error={error} messagePrefix="Error creating pixel folder: " />}
      {/* FORM */}
      <form onSubmit={onSubmit}>
        <Input
          placeholder=""
          type="text"
          version="box"
          label="Pixel name"
          name="pixel-name"
          updateValue={setPixelName}
          value={pixelName}
          required
        />
      </form>
    </div>
  )
}

PixelCreatorModal.propTypes = {
  modalButtons: PropTypes.array.isRequired,
  savePixel: PropTypes.func.isRequired,
  error: PropTypes.object,
}

PixelCreatorModal.defaultProps = {
  error: null,
}


export default PixelCreatorModal
