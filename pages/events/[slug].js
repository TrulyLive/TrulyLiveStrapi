import { baseUrl } from '../../backend'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookie from 'cookie'
import { toast } from 'react-toastify'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { BiArrowBack } from 'react-icons/bi'
import rehypeRaw from 'rehype-raw'

const OnBoardingPage = ({ navData, footerData, eventData, profileData, token, eventId }) => {
  const router = useRouter()


  const checkBought = profileData?.purchases?.find((item) => item?.event?.id === eventId)

  const profileTickets = profileData?.purchases
    ?.filter((item) => item?.event?.id === eventId)
    ?.map((item) => item?.eventticket)
    ?.flat()
  const allTickets = eventData?.eventTicket

  const notBoughtTickets = allTickets.filter(
    (x) => !profileTickets?.some((y) => x?.eventTicketType === y?.eventTicketType)
  )

  // console.log('bought tickets : ', profileTickets)
  // console.log('all tickets : ', eventData?.eventTicket)

  // console.log('not bought tickets : ', notBoughtTickets)

  const handleBuy = async (type, price) => {
    try {
      const res = await fetch(`${baseUrl}/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          data: {
            event: {
              id: eventId
            },
            eventticket: [
              {
                eventTicketType: type,
                price
              }
            ],
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

  const filterBasedOnTicket = (arrOfObj) => {
    return arrOfObj.filter((item) => profileTickets?.some((ticket) => ticket?.eventTicketType === item?.ticketLevel))
  }

  const filterBasedOnPublic = (arrOfObj) => {
    return arrOfObj.filter((item) => item?.isPublic === true)
  }

  const imageAssets = filterBasedOnTicket(eventData?.imageEventAssets)
  const publicImageAssets = filterBasedOnPublic(eventData?.imageEventAssets)
  const videoAssets = filterBasedOnTicket(eventData?.videoEventAssets)
  const documentAssets = filterBasedOnTicket(eventData?.document)
  const publicDocumentAssets = filterBasedOnPublic(eventData?.document)

  // const allowedToSee = eventData?.eventDiary.filter((item) =>
  //   profileTickets.some((ticket) => ticket?.eventTicketType === item?.ticketLevel)
  // )

  const documentsLength = publicDocumentAssets?.length >= 1 || documentAssets?.length >= 1

  return (
    <>
      <Head>
        <title>Truly Live | {eventData?.eventName}</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-20 md:px-20 px-4 container">
        <div className="mt-[7rem]">
          <Link href="/events">
            <button className="mt-5 bg-[#222222] text-white py-1 px-2 rounded-md outline-none flex items-center gap-4">
              <BiArrowBack />
              <span>See all events</span>
            </button>
          </Link>
        </div>
        <h1 className="mt-3 text-xl md:text-3xl">{eventData?.eventName}</h1>
        <p className="my-3 text-gray-700 text-sm">{moment(eventData?.eventDateAndTime).format('dddd DD MMM HH:mm')}</p>
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
        <div className="my-5 text-gray-800">{eventData?.eventBlurb}</div>
        <div className="my-3 mkd">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{eventData?.eventDescription}</ReactMarkdown>
        </div>
        {eventData?.eventDiary.length >= 1 && <h4 className="text-xl my-3 mb-5 font-semibold">Event Diary</h4>}
        {eventData?.eventDiary?.map((item) => {
          return (
            <div className="my-3" key={item.id}>
              <p className="font-semibold">{moment(item?.dateAndTime).format('dddd DD MMM HH:mm')}</p>
              <div className="flex items-center gap-3">
                <p className="my-2 text-gray-700">{item?.title}</p>
                {profileArrTickets?.includes(item?.ticketLevel) ? (
                  <Link href={`/${eventData?.eventSlug}/${item?.id}`}>
                    <a className="bg-green-500 text-white p-1 my-2 rounded-md">Watch Now</a>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <button disabled className="bg-red-700 text-white p-[0.15rem] my-2 rounded-md">
                      {`Access - restricted (${item?.ticketLevel} ticket required)`}
                    </button>
                    {!token ? (
                      <Link href="/login">
                        <a
                          className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none"
                          onClick={() =>
                            typeof window !== 'undefined' && localStorage.setItem('route', eventData?.eventSlug)
                          }
                        >
                          Log in to buy
                        </a>
                      </Link>
                    ) : (
                      <button
                        className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none mr-2"
                        onClick={() => handleBuy(item?.ticketLevel, 300)}
                      >
                        Buy {item?.ticketLevel} ticket
                      </button>
                    )}
                  </div>
                )}
              </div>
              <p>{item?.description}</p>
            </div>
          )
        })}
        <h4 className="text-xl my-3 mb-5 font-semibold">Ticket Pricing</h4>
        <div className="mt-5">
          {eventData?.eventTicket?.map((item) => {
            return profileArrTickets?.includes(item?.eventTicketType) ? (
              <p className="my-1" key={item?.id}>
                {item?.eventTicketType} · £{item?.price} <span className="font-semibold">(Purchased)</span>
              </p>
            ) : (
              <p className="my-1" key={item?.id}>
                {item?.eventTicketType} · £{item?.price}
              </p>
            )
          })}
        </div>

        {!token && (
          <div className="my-5">
            <Link href="/login">
              <a
                className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none"
                onClick={() => typeof window !== 'undefined' && localStorage.setItem('route', eventData?.eventSlug)}
              >
                Log in to buy
              </a>
            </Link>
          </div>
        )}

        {!checkBought && token && (
          <div className="my-5">
            {eventData?.eventTicket?.map((item) => {
              return (
                <button
                  key={item?.id}
                  className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none mr-2"
                  onClick={() => handleBuy(item?.eventTicketType, item?.price)}
                >
                  Buy {item?.eventTicketType} ticket
                </button>
              )
            })}
          </div>
        )}

        {profileTickets?.length >= 1 && notBoughtTickets && (
          <div className="my-5">
            {notBoughtTickets.map((item) => {
              return (
                <button
                  key={item?.id}
                  className="bg-[#222222] text-white py-1 px-2 rounded-md outline-none mr-2"
                  onClick={() => handleBuy(item?.eventTicketType, item?.price)}
                >
                  Buy {item?.eventTicketType} ticket
                </button>
              )
            })}
          </div>
        )}

        {documentsLength && <h4 className="text-xl my-3 mb-5 font-semibold">Documents</h4>}
        {documentAssets?.map((item) => {
          return (
            <div key={item?.id} className="my-3">
              <h1>{item?.title}</h1>
              {item?.image?.data && (
                <div className="my-2">
                  <Image
                    src={item?.image?.data?.attributes?.url}
                    blurDataURL={item?.image?.data?.attributes?.url}
                    width={400}
                    height={250}
                    placeholder="blur"
                    alt="event"
                  />
                </div>
              )}
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item?.content}</ReactMarkdown>
            </div>
          )
        })}
        {publicDocumentAssets?.map((item) => {
          return (
            <div key={item?.id} className="my-3">
              <h1>{item?.title}</h1>
              {item?.image?.data && (
                <div className="my-2">
                  <Image
                    src={item?.image?.data?.attributes?.url}
                    blurDataURL={item?.image?.data?.attributes?.url}
                    width={400}
                    height={250}
                    placeholder="blur"
                    alt="event"
                  />
                </div>
              )}
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item?.content}</ReactMarkdown>
            </div>
          )
        })}
        <hr className="mt-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <div>
            {publicImageAssets?.length >= 1 && (
              <h4 className="text-xl my-3 text-center mb-5 font-semibold">Public assets</h4>
            )}
            {eventData?.imageEventAssets?.map((item) => {
              return (
                <div key={item?.id}>
                  {item?.isPublic && item?.imageEventMedia?.data && (
                    <div className="my-2">
                      <Image
                        src={item?.imageEventMedia?.data?.attributes?.url}
                        blurDataURL={item?.imageEventMedia?.data?.attributes?.url}
                        width={400}
                        height={250}
                        placeholder="blur"
                        alt="event"
                      />
                      <p className="my-5 text-gray-700">{item?.description}</p>
                    </div>
                  )}
                </div>
              )
            })}

            {eventData?.videoEventAssets?.map((item) => {
              return (
                <div key={item?.id}>
                  {item?.isPublic && (
                    <div className="my-2">
                      <video controls loop width={400} height={250}>
                        <source src={item?.videoEventMedia?.data?.attributes?.url} type="video/mp4" />
                      </video>
                      <p className="my-5 text-gray-700">{item?.description}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {checkBought && token && (
            <div>
              {imageAssets?.length >= 1 && (
                <h4 className="text-xl my-3 text-center mb-5 font-semibold">Ticket only assets</h4>
              )}
              {checkBought &&
                token &&
                eventData?.imageEventAssets?.map((item) => {
                  return (
                    <div key={item?.id}>
                      {!item?.isPublic && item?.imageEventMedia?.data && (
                        <div className="my-2">
                          <Image
                            src={item?.imageEventMedia?.data?.attributes?.url}
                            blurDataURL={item?.imageEventMedia?.data?.attributes?.url}
                            width={400}
                            height={250}
                            placeholder="blur"
                            alt="event"
                          />
                          <p className="my-5 text-gray-700">{item?.description}</p>
                        </div>
                      )}
                    </div>
                  )
                })}

              {checkBought &&
                token &&
                eventData?.videoEventAssets?.map((item) => {
                  return (
                    <div key={item?.id}>
                      {!item?.isPublic && (
                        <div className="my-2">
                          <video controls loop width={400} height={250}>
                            <source src={item?.videoEventMedia?.data?.attributes?.url} type="video/mp4" />
                          </video>
                          <p className="my-5 text-gray-700">{item?.description}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )}
        </div>
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
    `${baseUrl}/events?populate[0]=eventImage,imageEventAssets.imageEventMedia,videoEventAssets.videoEventMedia,eventTicket&filters[eventSlug][$eq]=${slug}`
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
