import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function FaqList({ faqs }) {
  return (
    <article>
      <ul>
        {faqs.map(({ question, slug, id }) => {
          return (
            <li key={id}>
              <Link href={`faqs/${slug}`}>{question}</Link>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

FaqList.propTypes = {
  faqs: PropTypes.array.isRequired,
}

export default FaqList
