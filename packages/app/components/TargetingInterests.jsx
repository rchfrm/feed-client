import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingInterestsTabs from '@/app/TargetingInterestsTabs'
import TargetingInterestsList from '@/app/TargetingInterestsList'
import TargetingInterestsSearch from '@/app/TargetingInterestsSearch'
import DisabledSection from '@/app/DisabledSection'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/targetingPageCopy'
import { hasConnectedIntegration } from '@/app/helpers/artistHelpers'

const TargetingInterests = ({
  className,
}) => {
  const [platform, setPlatform] = React.useState('meta')
  const [interest, setInterest] = React.useState(null)
  const { artist } = React.useContext(ArtistContext)
  const { hasBasicPlan, hasSetUpProfile } = artist
  const hasConnectedTikTok = hasConnectedIntegration(artist, 'tiktok')

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader className="mb-5" header="Interests" />
      <MarkdownText markdown={copy.interestDescription} className="mb-8" />
      <DisabledSection
        section="interests"
        isDisabled={hasBasicPlan && hasSetUpProfile}
      >
        {hasConnectedTikTok && (
          <TargetingInterestsTabs
            platform={platform}
            setPlatform={setPlatform}
            setInterest={setInterest}
          />
        )}
        <TargetingInterestsList platform={platform} />
        <TargetingInterestsSearch
          platform={platform}
          interest={interest}
          setInterest={setInterest}
        />
      </DisabledSection>
    </section>
  )
}

TargetingInterests.propTypes = {
  className: PropTypes.string,
}

TargetingInterests.defaultProps = {
  className: null,
}

export default TargetingInterests
