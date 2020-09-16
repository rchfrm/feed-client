import React from 'react'
import PropTypes from 'prop-types'

import ArrowHeadIcon from '@/icons/ArrowHeadIcon'

import CheckboxButtons from '@/elements/CheckboxButtons'

import {
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from 'react-accessible-accordion'

const TargetingLocationsCountry = ({
  country,
  selectedCountries,
  setSelectedCountries,
  hasCities,
}) => {
  const { key, name, audiencePercent } = country
  return (
    <AccordionItemState>
      {({ expanded }) => (
        <div className="flex items-top">
          <CheckboxButtons
            buttonOptions={[{
              value: key,
              name,
              label: '',
            }]}
            selectedValues={selectedCountries}
            setSelectedValues={setSelectedCountries}
            checkboxClassname="mb-0"
          />
          <AccordionItemHeading
            className={['w-full', !expanded || !hasCities ? 'pb-2' : null].join(' ')}
            style={{ transform: 'translateY(-0.1em)' }}
          >
            <AccordionItemButton>
              <div className="flex w-full items-baseline justify-between relative text-lg">
                <div className="flex items-top">
                  <p className="mb-0"><strong>{name}</strong></p>
                  {hasCities && (
                    <ArrowHeadIcon
                      className="ml-2"
                      style={{
                        width: '0.5rem',
                        height: 'auto',
                        transform: expanded ? 'rotate(0deg) translateY(0.08em)' : 'rotate(-90deg) translateX(-0.05em)',
                      }}
                    />
                  )}
                </div>
                <p className="text-xs mb-0">
                  {audiencePercent ? (
                    <strong><em>{audiencePercent}% of audience</em></strong>
                  ) : (
                    <strong className="text-red"><em>{'< 1%'} of audience</em></strong>
                  )}
                </p>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
        </div>
      )}
    </AccordionItemState>
  )
}

TargetingLocationsCountry.propTypes = {
  country: PropTypes.object.isRequired,
  selectedCountries: PropTypes.array.isRequired,
  setSelectedCountries: PropTypes.func.isRequired,
  hasCities: PropTypes.bool.isRequired,
}

export default TargetingLocationsCountry
