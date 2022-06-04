import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { baseUrl } from '../backend'
import cookie from 'cookie'
import Image from 'next/image'

export default function Home({ navData, footerData, profileData }) {
  return (
    <>
      <Head>
        <title>Truly Live | Watching</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-32 px-4 md:px-20 container">
        <div className="grid grid-cols-1 md:grid-cols-4 my-2">
          {profileData?.map((item) => {
            return (
              <div key={item?.id}>
                {item?.image && (
                  <Image
                    blurDataURL={item?.image?.url}
                    src={item?.image?.url}
                    alt="pics"
                    height={300}
                    width={300}
                    placeholder="blur"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Footer footerData={footerData} />
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const videRes = await fetch(`${baseUrl}/homes?populate=*`)
  const videoData = await videRes.json()
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const res = await fetch(`${baseUrl}/users?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      videoData: videoData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      profileData: data
    }
  }
}
