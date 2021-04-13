import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import brandColors from '@/constants/brandColors'

import useBillingStore from '@/app/stores/billingStore'

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
    <div
      className={[
        className,
      ].join(' ')}
    >
      <div className="flex items-start h-buttonHeight">
        {selectActive ? (
          <>
            <Select
              className="mb-0 mr-6"
              options={selectOptions}
              selectedValue={organisation.id}
              handleChange={({ target: { value } }) => {
                selectOrganisation(value)
                setSelectActive(false)
              }}
            />
            <div>
              <Button
                version="black x-small"
                label="Cancel switch organisation"
                onClick={() => {
                  setSelectActive(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-display font-bold text-2xl mr-6 mb-0">{organisation.name}</h3>
            <div>
              <Button
                version="green x-small"
                label="Switch organisation"
                onClick={() => {
                  setSelectActive(true)
                }}
              >
                <PencilIcon className="h-5 w-auto mr-2" fill={brandColors.white} />
                Switch organisation
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
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
