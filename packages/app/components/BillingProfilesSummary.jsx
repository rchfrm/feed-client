import React from 'react'
import PropTypes from 'prop-types'

import BillingOpenProfiles from '@/app/BillingOpenProfiles'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/billingCopy'

const BillingProfilesSummary = ({
  organisation,
  className,
}) => {
  const artists = Object.values((organisation || {}).artists || {})
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <h3 className="font-body font-bold mb-6">Profiles</h3>
      <MarkdownText markdown={copy.profilesIntro} />
      {/* SUMMARY */}
      {artists.length === 0 ? (
        <span>{copy.noProfiles}</span>
      ) : (
        <ul>
          {artists.map((artist, index) => (
            <React.Fragment key={index}>
              <li className="flex ml-5 mb-3 last:mb-0">
                <span>{artist.name}</span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
      {/* BUTTON (MANAGE PROFILES) */}
      {artists.length === 0 ? null : <BillingOpenProfiles className="pt-2" />}
    </div>
  )
}

BillingProfilesSummary.propTypes = {
  organisation: PropTypes.object,
  className: PropTypes.string,
}

BillingProfilesSummary.defaultProps = {
  organisation: null,
  className: null,
}

export default BillingProfilesSummary
