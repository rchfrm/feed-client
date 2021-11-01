import { image } from '@/landing/graphQl/querySnippets'
import { blogIntro } from '@/landing/graphQl/blogArticlesQueries'

/* INCLUDES
 - Hero content
 - Testimonials
 - Features
 - Blog previews
*/

const queries = {
  home: `
    query {
      home {
        heroStraplineA
        heroStraplineB
        heroCopy
        ${image('heroImageMobile')}
        ${image('heroImageDesktop')}
        testimonialList {
          id
          handle
          copy
          bio
          ${image({ imgixParams: 'q: "50", auto: format, w: "600", h: "600", fit: crop', sizes: '10vw' })}
        }
        featureList {
          id
          header
          copy
          ${image({ imgixParams: 'q: "75", auto: format, w: "800"', sizes: '50vw' })}
        }
        featuredBlogArticles {
          ${blogIntro()}
        }
      }
    }
    `,
  default: `
    query {
      heroCopy(filter: {setAsDefault: {eq: true}}) {
        straplineA
        straplineB
        description
        ${image('mobileImage')}
        ${image('desktopImage')}
      }
    }
  `,
  arts: `
    query {
      heroCopy(filter: {name: {eq: "Arts"}}) {
        straplineA
        straplineB
        description
        ${image('mobileImage')}
        ${image('desktopImage')}
      }
    }
  `,
  music: `
    query {
      heroCopy(filter: {name: {eq: "Music"}}) {
        straplineA
        straplineB
        description
        ${image('mobileImage')}
        ${image('desktopImage')}
      }
    }
  `,
}

function getQuery(page) {
  return queries[page]
}

export default getQuery
