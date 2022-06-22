import { useRouter, withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import ArtistsLoader from '@/admin/ArtistsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Artist = () => {
  const {
    query: {
      id,
    },
  } = useRouter()
  return (
    <BasePage
      header="artist"
    >
      <ArtistsLoader
        id={id}
      />
    </BasePage>
  )
  // return (
  //   <BasePage
  //     header="artist"
  //     staticPage={!pageRequiresLoading}
  //   >
  //     {pageRequiresLoading ? (
  //       <ArtistsLoader
  //         id={id}
  //       />
  //     ) : (
  //       <PageQuerySetter
  //         intro="This page is missing some parameters"
  //         pathname={pathname}
  //         queries={[
  //           {
  //             label: 'Artist ID',
  //             queryName: 'artistId',
  //           },
  //         ]}
  //         filledQueries={[id]}
  //       />
  //     )}
  //   </BasePage>
  // )
}

export default testPageReady('admin')(Artist)
