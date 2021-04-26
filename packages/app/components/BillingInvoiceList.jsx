import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import useAsyncEffect from 'use-async-effect'

import LinkIcon from '@/icons/LinkIcon'
import Error from '@/elements/Error'

import useBillingStore from '@/app/stores/billingStore'

import sidePanelStyles from '@/app/SidePanel.module.css'

import { fetchArchivedInvoices } from '@/app/helpers/invoiceHelpers'

const formatDate = (date) => moment(date).format('DD MMMM YYYY')

const getOrganisation = state => state.organisation

const BillingInvoiceList = ({
  setSidePanelLoading,
}) => {
  // START SIDEPANEL LOADING
  React.useEffect(() => {
    setSidePanelLoading(true)
  }, [setSidePanelLoading])
  // LOAD INVOICES
  const { id: organisationId } = useBillingStore(getOrganisation)
  const [invoices, setInvoices] = React.useState([])
  const [error, setError] = React.useState(null)
  useAsyncEffect(async (isMounted) => {
    const { res: invoices, error } = await fetchArchivedInvoices(organisationId)
    if (!isMounted()) return
    setError(error)
    if (!error) {
      setInvoices(invoices)
    }
    setSidePanelLoading(false)
  }, [])

  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Invoices</h2>
      <Error error={error} />
      <ul className="text-lg">
        {invoices.map(({ id, created_at: date, invoice_pdf: link }) => {
          return (
            <li key={id} className="flex mb-6 last:mb-0">
              <a href={link} className="flex items-baseline" target="_blank" rel="noreferrer noopener">
                <LinkIcon className="h-4 w-auto" style={{ transform: 'translateY(0.1rem)' }} />
                <p className="ml-4 mb-0">{formatDate(date)}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BillingInvoiceList.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
}

BillingInvoiceList.defaultProps = {

}

export default React.memo(BillingInvoiceList)
