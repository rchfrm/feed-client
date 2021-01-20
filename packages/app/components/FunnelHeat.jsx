import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import FunnelHeatAd from '@/app/FunnelHeatAd'
import FunnelHeatDivider from '@/app/FunnelHeatDivider'

import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'

const heatColors = {
  cold: brandColors.blue,
  cool: brandColors.yellow,
  warm: brandColors.red,
  hot: brandColors.red,
}

const FunnelHeat = ({
  heat,
  nextHeatSlug,
  heatAds,
  heatIndex,
  totalHeats,
  className,
}) => {
  console.log('heatAds', heatAds)
  console.log('heat', heat)
  const { slug: heatSlug } = heat
  const adScores = heatAds.map(({ engagement_score = 0 }) => {
    return engagement_score
  })
  // Ad placements
  const isSingleAd = heatAds.length === 1
  // Color
  const heatColor = heatColors[heatSlug]
  const nextHeatColor = nextHeatSlug ? heatColors[nextHeatSlug] : null
  // Divider
  const basePercetageWidth = 45
  const dividerPercentageWidth = basePercetageWidth - (basePercetageWidth * (heatIndex / totalHeats))
  return (
    <>
      <section
        className={[
          'p-5 border-solid border-4 rounded-dialogue',
          className,
        ].join(' ')}
        style={{
          borderColor: heatColors[heatSlug],
        }}
      >
        {/* HEADER */}
        <header className="-mt-1">
          <h4 className="font-body font-bold">{heat.title}</h4>
          <MarkdownText className="-mt-1" markdown={heat.description} />
        </header>
        {/* ADS */}
        <div
          className={[
            'flex items-center',
            'mb-6',
            isSingleAd ? 'justify-center' : 'justify-between',
          ].join(' ')}
        >
          {isSingleAd ? (
            // SINGLE AD
            <FunnelHeatAd
              adData={heatAds[0]}
              score={adScores[0]}
              winner
            />
          ) : (
            // DOUBLE AD
            <>
              <FunnelHeatAd
                adData={heatAds[0]}
                score={adScores[0]}
                winner={adScores[0] > adScores[1]}
                className={[
                  // 'flex flex-grow justify-center',
                ].join(' ')}
              />
              <p className="mb-0">
                <strong><em>vs</em></strong>
              </p>
              <FunnelHeatAd
                adData={heatAds[1]}
                score={adScores[1]}
                winner={adScores[1] > adScores[0]}
                className={[
                  // 'flex flex-grow justify-center',
                ].join(' ')}
              />
            </>
          )}
        </div>
        {/* VIEW MORE */}
        <div className="flex justify-center mb-4">
          <Link href={ROUTES.TOURNAMENTS}>
            <Button
              className="w-36"
              version="x-small green"
              wrapper="a"
            >
              View More
            </Button>
          </Link>
        </div>
      </section>
      {nextHeatSlug && (
        <div>
          <FunnelHeatDivider
            heatSlug={heatSlug}
            startColor={heatColor}
            stopColor={nextHeatColor}
            className="mx-auto"
            style={{ width: `${dividerPercentageWidth}%`, height: '3.5rem' }}
          />
        </div>
      )}
    </>
  )
}

FunnelHeat.propTypes = {
  heat: PropTypes.object.isRequired,
  nextHeatSlug: PropTypes.string,
  heatAds: PropTypes.array.isRequired,
  heatIndex: PropTypes.number.isRequired,
  totalHeats: PropTypes.number.isRequired,
  className: PropTypes.string,
}

FunnelHeat.defaultProps = {
  nextHeatSlug: '',
  className: null,
}

export default FunnelHeat
