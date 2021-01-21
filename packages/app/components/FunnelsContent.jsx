import React from 'react'
// import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelsSelectionButtons from '@/app/FunnelsSelectionButtons'
import FunnelView from '@/app/FunnelView'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import * as funnelHelpers from '@/app/helpers/funnelHelpers'

const FunnelsContent = () => {
  const { funnelOptions, funnelHeats } = funnelHelpers
  // Import interface context
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)
  const [activeFunnelData, setActiveFunnelData] = React.useState(null)
  const [error, setError] = React.useState(null)

  const isSingleColumn = useBreakpointTest('lg')
  console.log('isSingleColumn', isSingleColumn)

  // LOAD HEATS
  const { isPending } = useAsync({
    promiseFn: funnelHelpers.fetchHeats,
    watchFn: funnelHelpers.watchFunction,
    // The variable(s) to pass to promiseFn
    artistId,
    activeFunnelId,
    // When fetch finishes
    onResolve: (data) => {
      // Turn off global loading
      toggleGlobalLoading(false)
      // Handle result...
      const dataFormatted = funnelHelpers.formatData(data)
      console.log('dataFormatted', dataFormatted)
      setActiveFunnelData(dataFormatted)
    },
    // Handle errors
    onReject(error) {
      setError(error)
      setActiveFunnelData(null)
      toggleGlobalLoading(false)
    },
  })

  return (
    <div>
      {/* INTRO */}
      <ResultsSummaryText
        className="mb-14"
        totalEngagements={3541}
        totalVisitors={1437}
        roasMultiplier={6}
      />
      {/* CONTENT */}
      <div className="lg:grid grid-cols-12">
        {/* SELECT FUNNEL BUTTONS */}
        <FunnelsSelectionButtons
          className={[
            'mb-16 lg:mb-0',
            'sm:max-w-xl lg:max-w-none',
            'col-span-4',
          ].join(' ')}
          options={funnelOptions}
          activeFunnelId={activeFunnelId}
          setActiveFunnelId={setActiveFunnelId}
        />
        <div className="col-span-8 bmw:col-span-8 lg:ml-10">
          {artistLoading || isPending || !activeFunnelData ? (
            // LOADING SPINNER
            <Spinner />
          ) : (
            // FUNNEL
            <>
              <Error messagePrefix="Failed to load ads: " error={error} />
              <FunnelView
                funnelData={activeFunnelData}
                funnelHeats={funnelHeats}
                classNameInner="sm:max-w-xl lg:mx-auto"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// FunnelsContent.propTypes = {

// }

export default FunnelsContent
