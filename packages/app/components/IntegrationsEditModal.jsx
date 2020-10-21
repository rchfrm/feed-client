import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'

import Input from '@/elements/Input'

import * as utils from '@/helpers/utils'

const IntegrationsEditModal = ({
  integration,
  modalButtons,
  action,
  runSaveIntegration,
}) => {
  const { title: integrationTitle, placeholderUrl } = integration
  const [link, setLink] = React.useState('')

  // MAKE SURE HREF IS VALID
  const [hasHrefError, setHasHrefError] = React.useState(false)
  const [showHrefError, setShowHrefError] = React.useState(false)
  React.useEffect(() => {
    const sanitisedLink = utils.enforceUrlProtocol(link, true)
    const hasError = !utils.testValidUrl(sanitisedLink)
    setHasHrefError(hasError)
  }, [link])

  // IS SAVING ENABLED
  const [saveEnabled, setSaveEnabled] = React.useState(false)
  React.useEffect(() => {
    const saveEnabled = !!link && !hasHrefError
    setSaveEnabled(saveEnabled)
  }, [link, hasHrefError])

  // UPDATE MODAL SAVE BUTTON
  const { setButtons } = useAlertModal()
  React.useEffect(() => {
    const newButtons = produce(modalButtons, draftButtons => {
      // Update save/delete button
      draftButtons[0].onClick = () => runSaveIntegration(integration, link, action)
      draftButtons[0].disabled = action === 'delete' ? false : !saveEnabled
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [link, setButtons, action, saveEnabled])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!saveEnabled) return
        runSaveIntegration(integration, link, action)
      }}
      noValidate
    >
      <Input
        placeholder={placeholderUrl}
        type="url"
        version="box"
        label={`Link to your ${integrationTitle} account`}
        name="link-url"
        handleChange={(e) => {
          const { target: { value } } = e
          setLink(value)
          if (showHrefError && !hasHrefError) {
            setShowHrefError(false)
          }
        }}
        onBlur={() => {
          if (hasHrefError) return setShowHrefError(true)
          setShowHrefError(false)
        }}
        value={link}
        error={showHrefError}
        errorMessage="Please use a valid URL"
        required
      />
    </form>
  )
}

IntegrationsEditModal.propTypes = {
  integration: PropTypes.object.isRequired,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveIntegration: PropTypes.func.isRequired,
}

export default IntegrationsEditModal
