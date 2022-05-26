import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/contexts/SidePanelContext'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'

import MissingScopesMessage from '@/elements/MissingScopesMessage'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesConnectMore = ({
  auth,
  errors,
  setErrors,
  isSidePanel,
}) => {
  const { missingScopes: { ads: missingScopes } } = auth
  const { setSidePanelButton, sidePanelOpen } = React.useContext(SidePanelContext)
  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    if (!sidePanelOpen || isDesktopLayout) return

    setSidePanelButton(<ConnectFacebookButton
      errors={errors}
      setErrors={setErrors}
      buttonText="Connect more"
      trackComponentName="ConnectProfilesConnectMore"
      className="w-full xs:w-1/2"
    />)
  }, [sidePanelOpen, isDesktopLayout, setSidePanelButton, errors, setErrors])

  return (
    <div>
      {errors.map((error, index) => {
        return <Error error={error} messagePrefix="Error: " key={index} className="mb-10" />
      })}

      {missingScopes.length > 0 && (
        <MissingScopesMessage
          scopes={missingScopes}
          showButton={false}
        />
      )}

      {isSidePanel && <h2>Connect more</h2>}
      <MarkdownText
        className={[
          'text-lg',
          !isSidePanel ? 'font-bold' : null,
        ].join(' ')}
        markdown={copy.connectMoreTitle}
      />
      <MarkdownText markdown={copy.connectMoreInstructions} className="mb-6" />
      {isSidePanel && <p className="text-xs italic">Steps 3 and 4 may be reversed by Facebook</p>}
      {!isSidePanel && (
        <ConnectFacebookButton
          errors={errors}
          setErrors={setErrors}
          buttonText="Connect more"
          trackComponentName="ConnectProfilesConnectMore"
          className="w-full xs:w-2/3"
        />
      )}
    </div>
  )
}

ConnectProfilesConnectMore.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  isSidePanel: PropTypes.bool,
}

ConnectProfilesConnectMore.defaultProps = {
  errors: [],
  isSidePanel: false,
}

export default ConnectProfilesConnectMore
