
// IMPORT PACKAGES
import React from 'react'
import MarkdownText from '@/elements/MarkdownText'
import faqs from '@/app/copy/FaqPageCopy'


// IMPORT STYLES
import styles from '@/app/FaqPage.module.css'

function FaqContent() {
  return (
    <article>
      {faqs.map(([question, answer], index) => {
        const markdown = `${question}\n${answer}`
        return (
          <MarkdownText className={styles.faqItem} markdown={markdown} key={index} />
        )
      })}
    </article>
  )
}

export default FaqContent
