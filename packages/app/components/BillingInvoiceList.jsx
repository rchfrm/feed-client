import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import LinkIcon from '@/icons/LinkIcon'

import sidePanelStyles from '@/app/SidePanel.module.css'

const formatDate = (date) => moment(date).format('DD MMM YYYY')

const BillingInvoiceList = ({
  invoices,
}) => {
  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Invoices</h2>
      <ul>
        {invoices.map(({ date, link }) => {
          return (
            <li key={date} className="flex mb-4 last:mb-4">
              <a href={link} className="flex" target="_blank" rel="noreferrer noopener">
                <LinkIcon className="h-4 w-auto" />
                <p className="mb-0">Invoice</p>
                <p className="mb-0">{formatDate(date)}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BillingInvoiceList.propTypes = {
  invoices: PropTypes.array,
}

BillingInvoiceList.defaultProps = {
  invoices: [],
}

export default React.memo(BillingInvoiceList)
