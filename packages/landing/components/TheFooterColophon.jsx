import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import Link from 'next/link'

import MarkdownText from '@/elements/MarkdownText'

const TheFooterColophon = ({
  colophon,
  className,
  legalLinks,
}) => {
  const year = moment().format('YYYY')
  const sentence = `© ${year} ${colophon}`

  return (
    <>
      <MarkdownText markdown={sentence} className={[className, 'small--p'].join(' ')} />
      <div className="text--block small--p text-center pt-2">
        <p>
          {legalLinks.map(({ title, href }, index) => {
            const isLast = index === legalLinks.length - 1
            return (
              <React.Fragment key={href}>
                <Link href={href}>
                  <a className="underline">{title}</a>
                </Link>
                {!isLast && ' | '}
              </React.Fragment>
            )
          })}
        </p>
      </div>
    </>
  )
}

TheFooterColophon.propTypes = {
  colophon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  legalLinks: PropTypes.array.isRequired,
}

export default TheFooterColophon
