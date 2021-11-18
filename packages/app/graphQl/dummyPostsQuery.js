import { image } from '@/graphQl/querySnippets'

export default `
  query {
    allDummyPosts(first: 5) {
      ${image()}
    }
  }
`
