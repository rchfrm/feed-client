import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingInterestsList from '@/app/TargetingInterestsList'
import TargetingInterestsSearch from '@/app/TargetingInterestsSearch'
import DisabledSection from '@/app/DisabledSection'
import MarkdownText from '@/elements/MarkdownText'

const TargetingInterests = ({
  className,
}) => {
  const { artist: { hasBasicPlan, hasSetUpProfile } } = React.useContext(ArtistContext)

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader className="mb-5" header="Interests" />
      <MarkdownText markdown="Facebook interest targeting is the process of targeting ads to an audience of Facebook users based on their assumed interests." />
      <DisabledSection
        section="interests"
        isDisabled={hasBasicPlan && hasSetUpProfile}
      >
        <TargetingInterestsList />
        <TargetingInterestsSearch />
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
