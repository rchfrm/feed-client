import React from 'react'
import PropTypes from 'prop-types'

import BillingOpenInvoices from '@/app/BillingOpenInvoices'

const BillingInvoiceSummary = ({
  nextInvoice,
  className,
}) => {
  const { date, invoiceSections = [], totalFee } = nextInvoice || {}
  const header = nextInvoice ? `Next invoice: ${date}` : 'No upcoming invoice'
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3 className="font-body font-bold mb-6">{header}</h3>
      {/* INVOICE SECTIONS */}
      {invoiceSections.map((section, index) => {
        return (
          <ul key={index} className="bg-grey-1 rounded-dialogue p-5 mb-5">
            {section.map(({ slug, title, value }, index) => {
              const lastItem = index === section.length - 1
              const TitleEl = lastItem ? 'strong' : 'span'
              return (
                <React.Fragment key={slug}>
                  {lastItem && (
                    <div className="w-full bg-black my-4" style={{ height: 1 }} />
                  )}
                  <li key={slug} className="flex justify-between mb-3 last:mb-0">
                    <TitleEl>{title}</TitleEl>
                    <strong>{value}</strong>
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
      {/* BUTTON (FOR SHOW ALL) */}
      <BillingOpenInvoices className="pt-8" />
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
