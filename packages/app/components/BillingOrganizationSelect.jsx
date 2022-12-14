import React from 'react'
import PropTypes from 'prop-types'
import SwitchIcon from '@/icons/SwitchIcon'
import Button from '@/elements/Button'
import Select from '@/elements/Select'
import brandColors from '@/constants/brandColors'
import { track } from '@/helpers/trackingHelpers'
import { UserContext } from '@/app/contexts/UserContext'

const BillingOrganizationSelect = ({
  className,
  selectedOrgId,
  setSelectedOrgId,
}) => {
  const { user, userLoading } = React.useContext(UserContext)
  const [selectActive, setSelectActive] = React.useState(false)

  const selectedOrgName = React.useMemo(() => {
    const { organizations } = user
    if (! organizations) return ''
    return organizations[selectedOrgId].name
  }, [selectedOrgId, user])

  const selectOptions = React.useMemo(() => {
    const { organizations } = user
    if (! organizations) return []
    const userOrgs = Object.values(organizations) || []
    return userOrgs.map(({ name, id }) => {
      return { name, value: id }
    })
  }, [user])

  if (! selectedOrgId || userLoading || selectOptions.length < 2) {
    return null
  }

  return (
    <>
      {/* ORGANIZATION SELECT */}
      <div className={[className].join(' ')}>
        <div className="sm:flex items-start sm:h-buttonHeight">
          {selectActive ? (
            <>
              <Select
                name="organization"
                className="mb-6 sm:mb-0 sm:mr-6"
                options={selectOptions}
                selectedValue={selectedOrgId}
                handleChange={({ target: { value: organizationId } }) => {
                  track('billing_switch_organization', {
                    previousOrganizationId: selectedOrgId,
                    newOrganizationId: organizationId,
                  })
                  setSelectedOrgId(organizationId)
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
              <h3 className="font-display font-bold text-2xl mr-6 mb-6 sm:mb-0">{selectedOrgName}</h3>
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
    </>
  )
}

BillingOrganizationSelect.propTypes = {
  selectedOrgId: PropTypes.string.isRequired,
  setSelectedOrgId: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingOrganizationSelect.defaultProps = {
  className: null,
}

export default BillingOrganizationSelect
