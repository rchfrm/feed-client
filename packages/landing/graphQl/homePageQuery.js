import { image } from '@/graphQl/querySnippets'
import { blogIntro } from '@/graphQl/blogArticlesQueries'

/* INCLUDES
 - Hero content
 - Testimonials
 - Features
 - Blog previews
*/
const getQuery = () => `
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
`

export default getQuery
