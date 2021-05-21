import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import brandColors from '@/constants/brandColors'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/app/helpers/trackingHelpers'

const getSelectOrganisation = state => state.selectOrganisation

const BillingOrganisationSelect = ({
  organisation,
  allOrgs,
  className,
}) => {
  const selectOrganisation = useBillingStore(getSelectOrganisation)
  const [selectActive, setSelectActive] = React.useState(false)
  const selectOptions = React.useMemo(() => {
    return allOrgs.map(({ name, id }) => {
      return { name, value: id }
    })
  }, [allOrgs])
  return (
    <>
      {/* ORGANISATION SELECT */}
      <div
        className={[
          className,
        ].join(' ')}
      >
        <div className="sm:flex items-start sm:h-buttonHeight">
          {selectActive ? (
            <>
              <Select
                name="organisation"
                className="mb-6 sm:mb-0 sm:mr-6"
                options={selectOptions}
                selectedValue={organisation.id}
                handleChange={({ target: { value: organisationId } }) => {
                  track('billing_switch_organisation', {
                    previousOrganisationId: organisation.id,
                    newOrganisationId: organisationId,
                  })
                  selectOrganisation(organisationId)
                  setSelectActive(false)
                }}
              />
              <div>
                <Button
                  version="black x-small"
                  label="Cancel switch organisation"
                  onClick={(e) => {
                    setSelectActive(false)
                    e.currentTarget.blur() // lose focus on the button
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-display font-bold text-2xl mr-6 mb-6 sm:mb-0">{organisation.name}</h3>
              <div>
                <Button
                  version="green x-small"
                  label="Switch organisation"
                  onClick={() => {
                    setSelectActive(true)
                  }}
                >
                  <PencilIcon className="h-5 w-auto mr-2" fill={brandColors.white} />
                  Switch
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* PLACEHOLDER FOR THE 2-nd COLUMN */}
      <div />
    </>
  )
}

BillingOrganisationSelect.propTypes = {
  organisation: PropTypes.object.isRequired,
  allOrgs: PropTypes.array.isRequired,
  className: PropTypes.string,
}

BillingOrganisationSelect.defaultProps = {
  className: null,
}

export default BillingOrganisationSelect
