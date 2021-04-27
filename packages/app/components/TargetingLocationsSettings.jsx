import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import CheckboxButtons from '@/elements/CheckboxButtons'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

import copy from '@/app/copy/targetingPageCopy'

const checkboxOptions = [
  {
    value: 'growth-nurture',
    name: 'Growth and Nurture',
    label: 'Growth and Nurture',
  },
  {
    value: 'retargeting',
    name: 'Retargeting',
    label: 'Retargeting',
  },
]

const TargetingLocationsSettings = ({
  className,
}) => {
  const [selectedValues, setSelectedValues] = React.useState([checkboxOptions[0].value])
  return (
    <section
      className={[
        className,
      ].join(' ')}
    >
      <header>
        <TargetingSectionHeader className="mb-5" header="Location Targeting Settings" />
        <MarkdownText markdown={copy.locationSettingsIntro} />
      </header>
      <div>
        <CheckboxButtons
          buttonOptions={checkboxOptions}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </div>
    </section>
  )
}

TargetingLocationsSettings.propTypes = {
  className: PropTypes.string,
}

TargetingLocationsSettings.defaultProps = {
  className: null,
}

export default TargetingLocationsSettings
