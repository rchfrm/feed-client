import { withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import ArtistsLoader from '@/admin/ArtistsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Artist = ({ router: { pathname, query } }) => {
  const { artistId } = query
  const pageRequiresLoading = !!(artistId)
  return (
    <BasePage
      headerConfig="Artist"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading ? (
        <ArtistsLoader
          artistId={artistId}
        />
      ) : (
        <PageQuerySetter
          intro="This page is missing some parameters"
          pathname={pathname}
          queries={[
            {
              label: 'Artist ID',
              queryName: 'artistId',
            },
          ]}
          filledQueries={[artistId]}
        />
      )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Artist))
