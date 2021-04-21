import React from 'react'
import PropTypes from 'prop-types'

import BillingOpenFailedInvoice from '@/app/BillingOpenFailedInvoice'
import BillingOpenInvoices from '@/app/BillingOpenInvoices'

const getHeader = (date, failed) => {
  if (!date) return 'No upcoming invoice'
  if (failed) return 'There was a problem paying your last invoice'
  return `Next invoice: ${date}`
}

const BillingInvoiceSummary = ({
  nextInvoice,
  className,
}) => {
  const {
    date,
    invoiceSections = [],
    totalFee,
    failed,
    paymentMethod,
  } = nextInvoice || {}
  const header = getHeader(date, failed)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {failed && (
        <h4 className="font-body font-bold mb-2">{date}</h4>
      )}
      <h3 className={`font-body font-bold mb-6 ${failed ? 'text-red' : null}`}>{header}</h3>
      {/* INVOICE SECTIONS */}
      {invoiceSections.map((section, index) => {
        return (
          <ul key={index} className="bg-grey-1 rounded-dialogue p-5 mb-5">
            {section.map(({ slug, title, value }, index) => {
              const lastItem = index === section.length - 1
              const TextEl = lastItem ? 'strong' : 'span'
              return (
                <React.Fragment key={slug}>
                  {lastItem && (
                    <div className="w-full bg-black my-4" style={{ height: 1 }} />
                  )}
                  <li key={slug} className="flex justify-between mb-3 last:mb-0">
                    <TextEl>{title}</TextEl>
                    <TextEl>{value}</TextEl>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        )
      })}
      {/* TOTAL */}
      <p
        className={[
          'text-lg',
          'flex justify-between mb-0 py-3 px-5',
          'border-solid border-2 border-green rounded-dialogue',
        ].join(' ')}
      >
        <strong>TOTAL FEE</strong>
        <strong>{totalFee}</strong>
      </p>
      <div className="pt-6">
        {/* BUTTON FOR HANDLING FAILED INVOICE */}
        {failed && (
          <BillingOpenFailedInvoice className="mb-6" />
        )}
        {/* BUTTON (FOR SHOW ALL) */}
        <BillingOpenInvoices />
      </div>
    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  nextInvoice: PropTypes.object,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  nextInvoice: null,
  className: null,
}

export default BillingInvoiceSummary
