export const image = (props = {}) => {
  let fieldName = 'image'
  let imgixParams = 'auto: format'
  if (typeof props === 'string') {
    fieldName = props
  } else {
    fieldName = props.fieldName || fieldName
    imgixParams = props.imgixParams || imgixParams
  }
  return `
  ${fieldName} {
    url
    alt
    mimeType
    width
    height
    responsiveImage(imgixParams: {${imgixParams}}${props.sizes ? `, sizes: "${props.sizes}"` : ''}) {
      alt
      src
      srcSet
      webpSrcSet
      sizes
      width
      height
      aspectRatio
      title
      bgColor
      base64
    }
    focalPoint {
      x
      y
    }
  }
`
}

export const contentBlocks = (fieldName = 'content', type = 'blog') => `
  ${fieldName} {
    ... on CopyRecord {
      id
      _modelApiKey
      copy
    }
    ... on ImageRecord {
      id
      _modelApiKey
      breakoutWidth
      ${image()}
    }
    ${type === 'blog' || type === 'faq' ? `
    ... on EmbedRecord {
      id
      _modelApiKey
      externalVideo {
        providerUid
        provider
        url
        title
      }
    }
    ` : ''}
    ${type === 'blog' ? `
    ... on SectionHeaderRecord {
      id
      _modelApiKey
      header
    }
    ... on PullquoteRecord {
      id
      _modelApiKey
      quote
    }
    ... on CtaButtonRecord {
      id
      _modelApiKey
      colour
      buttonText
    }
    ... on NewsletterSignUpRecord {
      id
      _modelApiKey
      header
      cta
    }
    ` : ''}

  }
`

export const seo = () => `
  _seoMetaTags {
    attributes
    content
    tag
  }
`
