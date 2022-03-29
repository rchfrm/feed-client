export default function LinkPage({ linkId }) {
  return <p>Link : {linkId}</p>
}

export async function getServerSideProps(context) {
  const { linkId } = context.query
  return {
    props: {
      linkId,
    },
  }
  // return {
  //   redirect: {
  //     destination: `https://instagram.com/${linkId}`,
  //     permanent: false,
  //   },
  // }
}
