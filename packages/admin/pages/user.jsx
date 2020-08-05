import { withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import UsersLoader from '@/admin/UsersLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const User = ({ router: { pathname, query } }) => {
  const { userId } = query
  const pageRequiresLoading = !!(userId)
  return (
    <BasePage
      headerConfig="User"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading ? (
        <UsersLoader
          userId={userId}
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
          filledQueries={[userId]}
        />
      )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(User))
