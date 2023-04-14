import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Anchor from '@/landing/elements/Anchor'
import Image from 'next/image'

const MarkdownImage = (paragraph) => {
  const { node } = paragraph
  if (node.children[0].type === 'image') {
    const { url, alt: metastring } = node.children[0]
    const alt = metastring.match(/(?<={alt:)(.*?)(?=})/g)[0]
    const [width, height] = metastring.match(/(?<={dimensions:)(.*?)(?=})/g)[0].split('x')
    const isPriority = Boolean(metastring.match('{priority}'))

    return (
      <Image
        src={url}
        width={width}
        height={height}
        alt={alt}
        priority={isPriority}
      />
    )
  }
  return <p>{paragraph.children}</p>
}

const BlogMarkdown = ({
  markdown,
  className,
}) => {
  const renderers = {
    link: Anchor,
    paragraph: MarkdownImage,
  }

  return (
    <div className={['text--block', className].join(' ')}>
      <ReactMarkdown
        renderers={renderers}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

BlogMarkdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  className: PropTypes.string,
}

BlogMarkdown.defaultProps = {
  className: '',
}

export default BlogMarkdown
