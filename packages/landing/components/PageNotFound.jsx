import React from 'react'
import Section from '@/landing/Section'
import MarkdownText from '@/elements/MarkdownText'

const PageNotFound = () => {
  return (
    <Section>
      <h1>Page not found</h1>
      <MarkdownText markdown="Sorry, we couldn't find the page you were looking for." />
    </Section>
  )
}

export default PageNotFound
