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
  totalCitiesSelected,
  initiallyPicked,
}) => {
  const { code, name, audience_pct } = country
  const percent = audience_pct ? Math.round(audience_pct * 100) : 0
  return (
    <AccordionItemState>
      {({ expanded }) => (
        <div className="flex items-top">
          <CheckboxButtons
            buttonOptions={[{
              value: code,
              name,
              label: '',
              highlight: initiallyPicked,
            }]}
            selectedValues={selectedCountries}
            setSelectedValues={setSelectedCountries}
            checkboxClassname="mb-0"
          />
          <AccordionItemHeading
            className={['w-full', ! expanded || ! hasCities ? 'pb-2' : null].join(' ')}
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
                        height: '6px',
                        width: 'auto',
                        transform: expanded ? 'rotate(0deg) translate(0, 0.6em)' : 'rotate(-90deg) translate(-0.62em, 0em)',
                      }}
                    />
                  )}
                </div>
                <p className="text-xs mb-0">
                  {percent ? (
                    <strong><em>{percent}% of audience</em></strong>
                  ) : (
                    <strong className="text-red"><em>{'< 1%'} of audience</em></strong>
                  )}
                </p>
                {! expanded && hasCities && !! totalCitiesSelected && (
                  <div
                    className={[
                      'absolute top-0 left-0 whitespace-nowrap mt-6 pt-1 text-xs',
                      totalCitiesSelected > 0 ? 'text-black' : 'text-grey-dark',
                    ].join(' ')}
                  >
                    {totalCitiesSelected} {totalCitiesSelected === 1 ? 'city' : 'cities'} selected
                  </div>
                )}
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
  totalCitiesSelected: PropTypes.number.isRequired,
  initiallyPicked: PropTypes.bool.isRequired,
}

export default TargetingLocationsCountry
