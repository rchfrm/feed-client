import { useRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import ArtistLoader from '@/admin/ArtistLoader'

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
      <ArtistLoader
        id={id}
      />
    </BasePage>
  )
}

export default testPageReady('admin')(Artist)
