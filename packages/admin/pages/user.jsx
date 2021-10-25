import { withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import UsersLoader from '@/admin/UsersLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const User = ({ router: { pathname, query } }) => {
  const { id } = query
  const pageRequiresLoading = !!(id)
  return (
    <BasePage
      header="user"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading ? (
        <UsersLoader
          id={id}
        />
      ) : (
        <PageQuerySetter
          intro="This page is missing some parameters"
          pathname={pathname}
          queries={[
            {
              label: 'User ID',
              queryName: 'userId',
            },
          ]}
          filledQueries={[id]}
        />
      )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(User))
