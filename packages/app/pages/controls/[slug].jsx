import React from 'react'

import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ControlsContent from '@/app/ControlsContent'

import { CONTROLS, controlsPages } from '@/app/constants/routes'

const headerConfig = {
  text: 'controls',
}

const Page = ({ slug }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
    >
      <ControlsContent activeSlug={slug} />
    </BasePage>
  )
}

export function getStaticProps({ params: { slug } }) {
  return { props: { slug } }
}

export function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = controlsPages.map((path) => {
    const slug = path.replace(`${CONTROLS}/`, '')
    return {
      params: { slug },
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default testPageReady('app')(Page)
