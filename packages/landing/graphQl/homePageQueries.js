import { image } from '@/graphQl/querySnippets'
import { blogIntro } from '@/landing/graphQl/blogArticlesQueries'

function getFilter(page) {
  switch (page) {
    case 'music':
      return 'heroCopy(filter: {name: {eq: "Music"}})'
    case 'arts':
      return 'heroCopy(filter: {name: {eq: "Arts"}})'
    default:
      return 'heroCopy(filter: {setAsDefault: {eq: true}})'
  }
}
export function getAllTestimonies() {
  return `
    query {
      allTestimonies {
        id
        handle
        quote
        bio
        ${image({ imgixParams: 'q: "50", auto: format, w: "600", h: "600", fit: crop', sizes: '10vw' })}
      }
    }
  `
}

export function getQuery(page) {
  return `
    query {
      ${getFilter(page)} {
        strapLine
        description
        ${image('mobileImage')}
        ${image('desktopImage')}
        testimonies {
          id
          handle
          quote
          bio
          ${image({ imgixParams: 'q: "50", auto: format, w: "600", h: "600", fit: crop', sizes: '10vw' })}
        }
        partners {
          website
          ${image({ fieldName: 'logo', imgixParams: 'q: "50", auto: format, w: "600", h: "600"' })}
        }
        features {
          id
          header
          copy
          ${image({ imgixParams: 'q: "75", auto: format, w: "800"', sizes: '50vw' })}
        }
        featuredArticles {
          ${blogIntro()}
        }
      }
    }
  `
}
