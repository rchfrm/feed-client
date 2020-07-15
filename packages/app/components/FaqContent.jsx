// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
// IMPORT STYLES
import styles from '@/app/FaqPage.module.css'

function FaqContent({ faqs }) {
  return (
    <article>
      <ul>
        {faqs.map(({ question, answer, id }) => {
          return (
            <li className={styles.faqItem} key={id}>
              <h4>{question}</h4>
              <MarkdownText markdown={answer} className="mb-0" />
            </li>
          )
        })}
      </ul>
    </article>
  )
}

FaqContent.propTypes = {
  faqs: PropTypes.array.isRequired,
}

export default FaqContent
