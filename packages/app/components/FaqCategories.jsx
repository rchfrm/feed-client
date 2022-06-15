import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { filterUnique } from '@/helpers/utils'
import FaqList from '@/app/FaqList'

const createFaqsByCategoryObject = (categories, faqs) => {
  return categories.reduce((acc, category) => {
    acc[category] = faqs.filter(faq => faq.category === category)
    return acc
  }, {})
}

export default function FaqCategories({ faqs }) {
  const categories = filterUnique(faqs.map(faq => faq.category))
  const faqsByCategory = createFaqsByCategoryObject(categories, faqs)
  return (
    <>
      {categories.map(category => {
        return <FaqList key={category} category={category} faqs={faqsByCategory[category]} />
      })}
    </>
  )
}

FaqCategories.propTypes = {
  faqs: PropTypes.array.isRequired,
}
