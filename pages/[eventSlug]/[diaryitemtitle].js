import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { baseUrl } from '../../backend'
import cookie from 'cookie'

export default function Video({ navData, footerData, profileData, token, videoData }) {
  //   useEffect(() => {
  //     const addToDB = async () => {
  //       try {
  //         const res = await fetch(`${baseUrl}/visits`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${token}`
  //           },
  //           body: JSON.stringify({ data: { username: profileData?.username, email: profileData?.email } })
  //         })
  //         const data = await res.json()
  //       } catch (error) {
  //         console.log(error)
  // alert(error.response.data.message[0].messages[0].message)
  //       }
  //     }
  //     addToDB()
  //   }, [profileData?.username, profileData?.email, token])

  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <video
        src={videoData[0]?.videoURL}
        controls
        className="min-w-full"
        poster={videoData[0]?.videoPoster?.data?.attributes?.url}
      />
      <Footer footerData={footerData} />
    </>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

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
  const videoRes = await fetch(
    `${baseUrl}/events?populate[0]=eventDiary.videoPoster&filters[eventDiary][id][$eq]=${query.diaryitemtitle}`
  )
  const videoData = await videoRes.json()

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  const profileTickets = data?.purchases
    ?.filter((item) => item?.event?.id === videoData.data[0]?.id)
    ?.map((item) => item?.eventticket)
    ?.flat()

  const videoToShow = videoData.data[0].attributes?.eventDiary?.filter(
    (item) => item?.id === parseInt(query.diaryitemtitle)
  )

  const allowedToSee = videoToShow.filter((item) =>
    profileTickets.some((ticket) => ticket?.eventTicketType === item?.ticketLevel)
  )

  if (allowedToSee.length === 0) {
    return {
      redirect: {
        destination: '/events',
        permanent: false
      }
    }
  }

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      token,
      videoData: videoToShow,
      profileData: data
    }
  }
}
