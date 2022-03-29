import UserAgent from '../../helpers/userAgent'

export default function LinkPage() {
  return null
}

export async function getServerSideProps(context) {
  const { linkId } = context.query
  const userAgentString = context.req.headers['user-agent']
  const userAgent = new UserAgent(userAgentString)

  if (userAgent.isIOS) {
    return {
      redirect: {
        destination: `instagram://user?username=${linkId}`,
        permanent: true,
      },
    }
  }

  if (userAgent.isAndroid) {
    return {
      redirect: {
        destination: `intent://www.instagram.com/${linkId}#Intent;package=com.instagram.android;scheme=https;end`,
        permanent: true,
      },
    }
  }

  return {
    redirect: {
      destination: `https://instagram.com/${linkId}`,
      permanent: false,
    },
  }
}
