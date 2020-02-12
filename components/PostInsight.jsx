import React from 'react'
import helper from './helpers/helper'

function PostInsight({ title, number }) {
  const translateInsightNames = text => {
    // Swap underscores for spaces
    text = text.replace('_', ' ')

    // Swap the words 'forward' and 'back' for arrows
    text = text.replace('forward', '➡')
    text = text.replace('back', '⬅')

    // Capitalise first letter
    text = text[0].toUpperCase() + text.slice(1)

    return text
  }

  const titleTranslated = translateInsightNames(title)

  return (
    <div>
      <span className="post-insight">{titleTranslated}</span>
      {' '}
      {helper.abbreviateNumber(number)}
    </div>
  )
}

export default PostInsight
