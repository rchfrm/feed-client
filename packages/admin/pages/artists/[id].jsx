import { useRouter, withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import ArtistsLoader from '@/admin/ArtistsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'
import ArtistLoader from '@/admin/ArtistLoader'

const Artist = () => {
  const {
    query: {
      id,
    },
  } = useRouter()
  console.log('id', id)
  return (
    <BasePage
      header="artist"
    >
      <ArtistLoader
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
