
// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import FaqPageList from '../FaqPageList'
// IMPORT HELPERS
// IMPORT STYLES
import styles from '../FaqPage.module.css'

function FAQPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  const faqsWithIds = FaqPageList.map((faq, index) => {
    return {
      ...faq,
      id: index,
    }
  })

  const faqList = faqsWithIds.map(({ question, answer, id }) => {
    return <FAQ question={question} answer={answer} key={`faq_${id}`} id={`faq_${id}`} />
  })

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="faq" />

      <ul className={styles['faq-list']}>{faqList}</ul>

    </div>
  )
}

export default FAQPage

function FAQ({ id, question, answer }) {
  return (
    <li className={styles.li} key={id}>
      <h3 className={styles.h3}>{question}</h3>
      {answer}
    </li>
  )
}
