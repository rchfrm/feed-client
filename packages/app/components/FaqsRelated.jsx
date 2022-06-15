import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

export default function FaqsRelated({ slug, faqs }) {
  const filteredFaqs = faqs.filter(faq => faq.slug !== slug)
  if (filteredFaqs.length === 0) {
    return null
  }
  return (
    <div
      className={[
        'border-t',
        'border-grey-2',
        'border-solid',
        'pt-6',
        'md:col-span-4',
        'md:border-t-0',
        'md:pt-0',
        'md:border-l',
        'md:pl-6',
      ].join(' ')}
    >
      <h4>People also ask...</h4>
      <ul>
        {filteredFaqs.map((faq) => {
          const {
            question,
            slug,
          } = faq
          return (
            <li key={slug} className="pb-4">
              <Link href={`${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

FaqsRelated.propTypes = {
  slug: PropTypes.string.isRequired,
  faqs: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
}
