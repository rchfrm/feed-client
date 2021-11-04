import getQuery from '@/landing/graphQl/homePageQueries'
import getDatoData from '@/landing/helpers/getDatoData'
import HomePage from '@/landing/HomePage'

export default function Landing({ pageData }) {
  return (
    <HomePage
      pageData={pageData}
    />
  )
}

export async function getStaticProps() {
  const query = getQuery()
  const forceLoad = true
  const { data } = await getDatoData(query, 'home', forceLoad)
  const { heroCopy: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
