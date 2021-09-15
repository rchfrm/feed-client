/* eslint-disable quotes */

import React from 'react'

import BasicTextPage from '@/landing/BasicTextPage'

const PageNotFound = () => {
  return (
    <BasicTextPage pageData={{
      title: 'Page not found',
      introCopy: `Sorry, we couldn't find the page you were looking for.`,
    }}
    />
  )
}

export default PageNotFound
