import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import PostLinksSelect from '@/app/PostLinksSelect'
import DefaultLinkInput from '@/app/DefaultLinkInput'

import { splitLinks } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const DefaultLinkForm = ({
  link,
  setLink,
  updateLink,
  objective,
  platform,
  error,
  setError,
  setIsDisabled,
  isLoading,
}) => {
  const hasGrowthObjective = objective === 'growth'

  const {
    nestedLinks,
  } = useControlsStore(getControlsStoreState)

  const [shouldShowSelect, setShouldShowSelect] = React.useState(false)
  const { looseLinks } = splitLinks(nestedLinks)

  React.useEffect(() => {
    if (isLoading) return

    // Render either a select element or text input field based on this boolean
    setShouldShowSelect(! hasGrowthObjective && looseLinks.length > 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hide select element and show text input field
  const toggleSelect = () => {
    if (shouldShowSelect) {
      setLink({})
    }

    setShouldShowSelect((shouldShowSelect) => ! shouldShowSelect)
  }

  return (
    <div className="flex w-full">
      {shouldShowSelect ? (
        <PostLinksSelect
          currentLinkId={link.id}
          updateParentLink={updateLink}
          shouldSaveOnChange={false}
          shouldShowAddLinkModal={false}
          onAddNewLink={toggleSelect}
          componentLocation="defaultLink"
          includeIntegrationLinks={false}
          includeAddLinkOption
          className="w-full"
        />
      ) : (
        <DefaultLinkInput
          link={link}
          setLink={setLink}
          error={error}
          setError={setError}
          objective={objective}
          platform={platform}
          setIsDisabled={setIsDisabled}
          toggleSelect={toggleSelect}
        />
      )}
    </div>
  )
}

DefaultLinkForm.propTypes = {
  link: PropTypes.object.isRequired,
  setLink: PropTypes.func.isRequired,
  updateLink: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

DefaultLinkForm.defaultProps = {
  error: null,
}

export default DefaultLinkForm
