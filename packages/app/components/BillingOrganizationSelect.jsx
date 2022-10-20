import React from 'react'
import PropTypes from 'prop-types'

import SwitchIcon from '@/icons/SwitchIcon'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import brandColors from '@/constants/brandColors'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/helpers/trackingHelpers'

const getSelectOrganization = state => state.selectOrganization

const BillingOrganizationSelect = ({
  organization,
  allOrgs,
  className,
}) => {
  const selectOrganization = useBillingStore(getSelectOrganization)
  const [selectActive, setSelectActive] = React.useState(false)
  const selectOptions = React.useMemo(() => {
    return allOrgs.map(({ name, id }) => {
      return { name, value: id }
    })
  }, [allOrgs])
  return (
    <>
      {/* ORGANIZATION SELECT */}
      <div
        className={[
          className,
        ].join(' ')}
      >
        <div className="sm:flex items-start sm:h-buttonHeight">
          {selectActive ? (
            <>
              <Select
                name="organization"
                className="mb-6 sm:mb-0 sm:mr-6"
                options={selectOptions}
                selectedValue={organization.id}
                handleChange={({ target: { value: organizationId } }) => {
                  track('billing_switch_organization', {
                    previousOrganizationId: organization.id,
                    newOrganizationId: organizationId,
                  })
                  selectOrganization(organizationId)
                  setSelectActive(false)
                }}
              />
              <div>
                <Button
                  version="black x-small"
                  label="Cancel switch organization"
                  onClick={(e) => {
                    setSelectActive(false)
                    e.currentTarget.blur() // lose focus on the button
                  }}
                  trackComponentName="BillingOrganizationSelect"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-display font-bold text-2xl mr-6 mb-6 sm:mb-0">{organization.name}</h3>
              <div>
                <Button
                  version="green x-small"
                  label="Switch organization"
                  onClick={() => {
                    setSelectActive(true)
                  }}
                  trackComponentName="BillingOrganizationSelect"
                >
                  <SwitchIcon className="h-4 w-auto mr-2" fill={brandColors.white} />
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

BillingOrganizationSelect.propTypes = {
  organization: PropTypes.object.isRequired,
  allOrgs: PropTypes.array.isRequired,
  className: PropTypes.string,
}

BillingOrganizationSelect.defaultProps = {
  className: null,
}

export default BillingOrganizationSelect
