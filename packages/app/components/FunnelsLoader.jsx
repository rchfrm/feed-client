import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

// import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelView from '@/app/FunnelView'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import * as funnelHelpers from '@/app/helpers/funnelHelpers'

const { audienceTypes } = funnelHelpers

const FunnelsLoader = ({
  activeFunnelId,
  className,
  style,
}) => {
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [error, setError] = React.useState(null)

  // LOAD AUDIENCES
  const { data: activeFunnelData, isPending } = useAsync({
    promiseFn: funnelHelpers.fetchAudiences,
    watchFn: funnelHelpers.watchFunction,
    // The variable(s) to pass to promiseFn
    artistId,
    activeFunnelId,
    // When fetch finishes
    onResolve: () => {
      // Turn off global loading
      toggleGlobalLoading(false)
    },
    // Handle errors
    onReject(error) {
      setError(error)
      toggleGlobalLoading(false)
    },
  })

  return (
    <div
      className={className}
      style={style}
    >
      {artistLoading || isPending || !activeFunnelData ? (
        // LOADING SPINNER
        <Spinner />
      ) : (
        // FUNNEL
        <>
          <Error messagePrefix="Failed to load ads: " error={error} />
          <FunnelView
            funnelData={activeFunnelData}
            audienceTypes={audienceTypes}
            activeFunnelId={activeFunnelId}
            classNameInner="sm:max-w-xl lg:mx-auto"
          />
        </>
      )}
    </div>
  )
}

FunnelsLoader.propTypes = {
  activeFunnelId: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

FunnelsLoader.defaultProps = {
  className: null,
  style: null,
}

export default FunnelsLoader

