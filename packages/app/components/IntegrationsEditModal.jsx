import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'

import Input from '@/elements/Input'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/integrationsCopy'

import * as utils from '@/helpers/utils'
import { testValidIntegration } from '@/helpers/integrationHelpers'

import useAlertStore from '@/stores/alertStore'

const closeAlertState = (state) => state.close

const IntegrationsEditModal = ({
  integration,
  modalButtons,
  action,
  runSaveIntegration,
  cannotDelete,
  error,
}) => {
  const { platform, title: platformTitle, placeholderUrl, href } = integration
  const [link, setLink] = React.useState('')
  const closeAlert = useAlertStore(closeAlertState)

  // MAKE SURE HREF IS VALID
  const [hasHrefError, setHasHrefError] = React.useState(false)
  const [showHrefError, setShowHrefError] = React.useState(false)
  const [hrefValid, setHrefValid] = React.useState(false)
  React.useEffect(() => {
    const sanitisedLink = utils.enforceUrlProtocol(link, true)
    const hasError = !testValidIntegration(sanitisedLink, platform)
    setHrefValid(!hasError)
    setHasHrefError(hasError)
    if (!hasError) {
      setShowHrefError(false)
    }
  }, [link, platform])

  // IS SAVING ENABLED
  const [saveEnabled, setSaveEnabled] = React.useState(false)
  React.useEffect(() => {
    const saveEnabled = !!link && !hasHrefError
    setSaveEnabled(saveEnabled)
  }, [link, hasHrefError])

  // IS DELETABLE?
  const deleteCopy = React.useMemo(() => {
    return cannotDelete ? copy.cannotDelete(platformTitle) : copy.deleteConfirmation(platform)
  // eslint-disable-next-line
  }, [integration.platform])

  // UPDATE MODAL SAVE BUTTON
  const { setButtons } = useAlertModal()
  React.useEffect(() => {
    // Stop here if not deletable
    if (cannotDelete) return
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
        closeAlert()
      }}
      noValidate
    >
      <Error error={error} />
      {action === 'add' && !cannotDelete ? (
        <Input
          className="mb-5"
          placeholder={placeholderUrl}
          type="url"
          version="box"
          label={`Link to your ${platformTitle} account`}
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
          success={hrefValid}
          errorMessage="Please use a valid URL"
          required
        />
      ) : (
        <>
          <MarkdownText markdown={deleteCopy} />
          <p>
            <strong>Current integration: </strong>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="break-words"
            >
              {href}
            </a>
          </p>
        </>
      )}
    </form>
  )
}

IntegrationsEditModal.propTypes = {
  integration: PropTypes.object.isRequired,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveIntegration: PropTypes.func.isRequired,
  cannotDelete: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

IntegrationsEditModal.defaultProps = {
  error: null,
}


export default IntegrationsEditModal
