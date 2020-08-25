import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import * as ROUTES from '@/app/constants/routes'

const ResultsPostsPagePopup = () => {
  const markdown = `This version of the results page will soon be replaced.

To view the aggregated results of promoting each post, head to the new [Posts page](${ROUTES.POSTS}) and filter by **Running** or **Inactive**.

And a new version this page, with a more detailed breakdown of how each ad has performed, is coming soon!`

  return (
    <MarkdownText markdown={markdown} />
  )
}

export default ResultsPostsPagePopup
