import React from 'react'
import PropTypes from 'prop-types'
import { filterUnique } from '@/helpers/utils'
import FaqList from '@/app/FaqList'

const createFaqsByCategoryObject = (categories, faqs) => {
  return categories.reduce((acc, category) => {
    acc[category] = faqs.filter((faq) => faq.category === category)
    return acc
  }, {})
}

export default function FaqCategories({ faqs }) {
  const categories = filterUnique(faqs.map((faq) => faq.category))
  const faqsByCategory = createFaqsByCategoryObject(categories, faqs)
  return (
    <div
      className={[
        'sm:grid',
        'sm:grid-cols-12',
        'sm:gap-4',
      ].join(' ')}
    >
      {categories.map((category) => {
        return <FaqList key={category} category={category} faqs={faqsByCategory[category]} />
      })}
    </div>
  )
}

FaqCategories.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
}
