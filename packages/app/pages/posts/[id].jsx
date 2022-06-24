import React from 'react'

import PostLoader from '@/app/PostLoader'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

const Page = ({ id }) => {
  return (
    <BasePage
      headerConfig={{ text: '' }}
      artistRequired
      controlsRequired
      hasNoProfilesPage
    >
      <PostLoader postId={id} />
    </BasePage>
  )
}

export const getServerSideProps = async (context) => {
  const { query: { id } } = context

  return { props:
    { id },
  }
}

export default testPageReady('app')(Page)
