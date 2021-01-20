import React from 'react'
// import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import Error from '@/elements/Error'

import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelsSelectionButtons from '@/app/FunnelsSelectionButtons'
import FunnelView from '@/app/FunnelView'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import * as funnelHelpers from '@/app/helpers/funnelHelpers'

const FunnelsContent = () => {
  const { funnelOptions, funnelHeats } = funnelHelpers
  // Import interface context
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)
  const [activeFunnelData, setActiveFunnelData] = React.useState({})
  const [error, setError] = React.useState(null)

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
      setActiveFunnelData(dataFormatted)
    },
    // Handle errors
    onReject(error) {
      setError(error)
      setActiveFunnelData({})
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
      <Error error={error} />
      {/* CONTENT */}
      <div className="grid grid-cols-12">
        {/* SELECT FUNNEL BUTTONS */}
        <FunnelsSelectionButtons
          className="col-span-4"
          options={funnelOptions}
          activeFunnelId={activeFunnelId}
          setActiveFunnelId={setActiveFunnelId}
        />
        {isPending ? (
          <p className="col-span-8 ml-10">loading</p>
        ) : (
          <>
            {/* FUNNEL */}
            <FunnelView
              className="col-span-8 ml-10"
              funnel={activeFunnelData}
              funnelHeats={funnelHeats}
            />
          </>
        )}
      </div>
    </div>
  )
}

// FunnelsContent.propTypes = {

// }

export default FunnelsContent
