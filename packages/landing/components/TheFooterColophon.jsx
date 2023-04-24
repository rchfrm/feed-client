import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import MarkdownText from '@/elements/MarkdownText'

const legalLinks = [
  {
    title: 'Terms of Service',
    slug: 'terms',
  },
  {
    title: 'Cookie Policy',
    slug: 'cookies',
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy',
  },
]

const TheFooterColophon = () => {
  const year = moment().format('YYYY')
  const sentence = `© ${year} **Feed**`

  return (
    <>
      <MarkdownText markdown={sentence} className={['pt-6', 'text-center', 'mb-4', 'small--p'].join(' ')} />
      <div className="text--block small--p text-center pt-2">
        <p>
          {legalLinks.map(({ title, slug }, index) => {
            const isLast = index === legalLinks.length - 1
            return (
              <React.Fragment key={slug}>
                <Link href={`/legal/${slug}`} className="underline">
                  {title}
                </Link>
                {! isLast && ' | '}
              </React.Fragment>
            )
          })}
        </p>
      </div>
    </>
  )
}

export default TheFooterColophon
