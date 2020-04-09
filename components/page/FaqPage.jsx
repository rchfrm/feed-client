
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'

import MarkdownText from '../elements/MarkdownText'
import faqs from '../../copy/FaqPageCopy'


// IMPORT STYLES
import styles from '../FaqPage.module.css'

function FAQPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  return (
    <div className={`page--container  ${className}`}>

      <PageHeader heading="faq" />

      {/* All the FAQs */}
      <div className="ninety-wide">
        {faqs.map(([question, answer], index) => {
          const markdown = `${question}\n${answer}`
          return (
            <MarkdownText className={styles.faqItem} markdown={markdown} key={index} />
          )
        })}
      </div>

    </div>
  )
}

export default FAQPage
