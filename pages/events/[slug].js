import { baseUrl } from '../../backend'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookie from 'cookie'
import { toast } from 'react-toastify'

const OnBoardingPage = ({ navData, footerData, eventData, profileData, token, eventId }) => {
  const router = useRouter()

  const checkBought = profileData?.purchases?.find((item) => item?.event?.id === eventId)

  const handleBuy = async () => {
    try {
      const res = await fetch(`${baseUrl}/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          data: {
            event: {
              id: eventId
            },
            user: {
              id: profileData?.id
            }
          }
        })
      })
      await res.json()
      if (res.ok) {
        toast('Purchased Successfully')
        router.reload()
      } else {
        toast.error('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <title>Truly Live | Events</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-20 md:px-20 px-4 container">
        <h1 className="mt-[8rem] text-xl md:text-3xl">{eventData?.eventName}</h1>
        <p className="my-3 text-gray-700 text-sm">{new Date(eventData?.eventDateAndTime).toLocaleString()}</p>
        <Image
          src={eventData?.eventImage?.data?.attributes?.url}
          blurDataURL={eventData?.eventImage?.data?.attributes?.url}
          width={800}
          height={550}
          placeholder="blur"
          className="my-5"
          alt="event"
        />
        <p className="my-3 text-gray-700 text-sm">{eventData?.eventType}</p>
        <p className="my-3 text-gray-700">{eventData?.eventDescription}</p>
        <span>
          {eventData?.eventTicket} · {eventData?.eventPrice}$
        </span>

        {!token && (
          <div className="my-5">
            <Link href="/login">
              <a className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none">Log in to buy</a>
            </Link>
          </div>
        )}

        {!checkBought && token ? (
          <div className="my-5">
            <button className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none" onClick={handleBuy}>
              Buy Now
            </button>
          </div>
        ) : (
          token && (
            <div>
              <h2 className="my-5 text-xl">Exclusive Assets</h2>
              {eventData?.eventAssets?.map((item, i) => {
                return (
                  <Image
                    key={i}
                    src={item?.eventMedia?.data?.attributes?.url}
                    blurDataURL={item?.eventMedia?.data?.attributes?.url}
                    width={300}
                    height={350}
                    placeholder="blur"
                    className="my-5"
                    alt="event"
                  />
                )
              })}
            </div>
          )
        )}
      </div>

      <Footer footerData={footerData} />
    </>
  )
}

export const getServerSideProps = async ({ req, query: { slug } }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  const eventRes = await fetch(
    `${baseUrl}/events?populate[0]=eventImage,eventAssets.eventMedia,purchases&filters[eventSlug][$eq]=${slug}`
  )
  const eventData = await eventRes.json()

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      eventData: eventData?.data[0]?.attributes,
      eventId: eventData?.data[0]?.id,
      profileData: data,
      token: token ? token : ''
    }
  }
}

export default OnBoardingPage
