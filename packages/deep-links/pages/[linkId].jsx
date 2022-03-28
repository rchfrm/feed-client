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
}
