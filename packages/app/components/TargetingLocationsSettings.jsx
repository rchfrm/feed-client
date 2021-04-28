import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import CheckboxButtons from '@/elements/CheckboxButtons'
import Error from '@/elements/Error'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

import copy from '@/app/copy/targetingPageCopy'

const checkboxOptions = [
  {
    value: 'Y',
    name: 'apply',
    label: 'Use geographical targeting for "Nurture" audiences',
  },
]

const TargetingLocationsSettings = ({
  className,
}) => {
  const [selectedValues, setSelectedValues] = React.useState([checkboxOptions[0].value])
  const [value] = selectedValues
  const error = value ? { message: copy.locationSettingsWarning } : null

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
      <Error error={error} />
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
