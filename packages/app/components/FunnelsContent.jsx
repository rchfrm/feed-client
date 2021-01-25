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
import useAnimateScroll from '@/hooks/useAnimateScroll'

import * as funnelHelpers from '@/app/helpers/funnelHelpers'

const FunnelsContent = () => {
  const { funnelOptions, audienceTypes } = funnelHelpers
  // Import interface context
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)
  const [activeFunnelData, setActiveFunnelData] = React.useState(null)
  const [error, setError] = React.useState(null)

  const isTwoColumns = useBreakpointTest('lg')

  const contentRef = React.useRef(null)
  const scrollTo = useAnimateScroll()
  const isInitialLoad = React.useRef(true)
  React.useEffect(() => {
    if (isTwoColumns || !activeFunnelId || isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    const { current: contentEl } = contentRef
    const top = contentEl.offsetTop
    scrollTo(top - 16)
  // eslint-disable-next-line
  }, [activeFunnelId])

  // LOAD AUDIENCES
  const { isPending } = useAsync({
    promiseFn: funnelHelpers.fetchAudiences,
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
      <div
        ref={contentRef}
        className="lg:grid grid-cols-12"
      >
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
        <div
          className="col-span-8 bmw:col-span-8 lg:ml-10"
          style={{ minHeight: '30rem' }}
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
      </div>
    </div>
  )
}

// FunnelsContent.propTypes = {

// }

export default FunnelsContent
