import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import getDatoData from '@/helpers/getDatoData'
import query from '@/app/graphQl/dummyPostsQuery'

import ResultsPage from '@/app/ResultsPage'

const headerConfig = {
  text: 'results',
}

const Page = ({ allDummyPosts }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      noArtistHeader={headerConfig}
      artistRequired
      controlsRequired
      hasNoProfilesPage
    >
      <ResultsPage dummyPostsImages={allDummyPosts} />
    </BasePage>
  )
}

export async function getStaticProps() {
  const forceLoad = false
  const { data: { allDummyPosts } } = await getDatoData(query, 'dummyPostsQuery', forceLoad)
  return {
    props: {
      allDummyPosts,
    },
  }
}

export default testPageReady('app')(Page)
