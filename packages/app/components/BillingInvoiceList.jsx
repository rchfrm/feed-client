import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import LinkIcon from '@/icons/LinkIcon'

const formatDate = (date) => {
  return moment(date).format('DD MMM YYYY')
}

const BillingInvoiceList = ({
  invoices,
  className,
}) => {
  return (
    <ul
      className={[
        className,
      ].join(' ')}
    >
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
  )
}

BillingInvoiceList.propTypes = {
  invoices: PropTypes.array,
  className: PropTypes.string,
}

BillingInvoiceList.defaultProps = {
  invoices: [],
  className: null,
}

export default React.memo(BillingInvoiceList)
