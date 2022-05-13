import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { baseUrl } from '../backend'

export default function Home({ navData, footerData, videoData }) {
  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <video
        src={videoData?.videoURL}
        controls
        className="min-w-full"
        poster={videoData?.videoThumbnail?.data?.attributes?.url}
      />
      <Footer footerData={footerData} />
    </>
  )
}

export const getStaticProps = async () => {
  const videRes = await fetch(`${baseUrl}/homes?populate=*`)
  const videoData = await videRes.json()
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      videoData: videoData.data[0].attributes,
      footerData: footerData.data[0].attributes
    },
    revalidate: 1
  }
}
