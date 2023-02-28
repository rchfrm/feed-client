import moment from 'moment'
import Button from '@/elements/Button'
import LinkIcon from '@/icons/LinkIcon'
import PropTypes from 'prop-types'
import { capitalise } from '@/helpers/utils'
import React from 'react'
import brandColors from '@/constants/brandColors'

const formatDate = (date) => moment(date).format('DD MMMM YYYY')

const BillingInvoiceListItem = ({ invoice, handleClick }) => {
  const {
    id,
    created_at: createdAt,
    invoice_pdf: link,
    updated_at: updatedAt,
    status,
  } = invoice

  const daysSinceInvoiceUpdated = moment().diff(moment(updatedAt), 'days')
  const shouldRefreshInvoice = daysSinceInvoiceUpdated >= 60

  return (
    <li key={id} className={['flex h-7 last:mb-0', shouldRefreshInvoice ? 'mb-2' : 'mb-3'].join(' ')}>
      {! link ? (
        <p className="mb-0 text-grey-dark flex items-center cursor-not-allowed">
          <LinkIcon className="w-5 h-auto mr-1" fill={brandColors.greyDark} style={{ transform: 'translateY(0.1rem)' }} />
          {formatDate(createdAt)}
          <span
            className={[
              'bg-grey-light',
              'h-full',
              'items-center',
              'flex',
              'px-1',
              'rounded-dialogue',
              'text-grey-dark',
              'ml-2',
            ].join(' ')}
          >
            {capitalise(status)}
          </span>
        </p>
      ) : shouldRefreshInvoice ? (
        <Button
          version="text"
          onClick={() => handleClick(id)}
          trackComponentName="BillingInvoiceListItem"
          className="hover:text-green"
        >
          <LinkIcon className="w-5 h-auto mr-1" style={{ transform: 'translateY(0.1rem)' }} />
          {formatDate(createdAt)}
        </Button>
      ) : (
        <a href={link} className="flex items-center" target="_blank" rel="noreferrer noopener">
          <LinkIcon className="w-5 h-auto" style={{ transform: 'translateY(0.1rem)' }} />
          <p className="ml-1 mb-0">{formatDate(createdAt)}</p>
        </a>
      )}
    </li>
  )
}

BillingInvoiceListItem.propTypes = {
  invoice: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default BillingInvoiceListItem
