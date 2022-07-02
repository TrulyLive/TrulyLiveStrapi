import React, { useState, useEffect } from 'react'
import { baseUrl } from '../backend'
import cookie from 'cookie'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'
import { MdAccountCircle } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import Link from 'next/link'

const AccountPage = ({ navData, footerData, profileData, token }) => {
  const router = useRouter()

  const types = ['image/png', 'image/jpg', 'image/jpeg']

  const [image, setImage] = useState(null)
  const [number, setNumber] = useState('')
  const [username, setUsername] = useState('')
  const [mailBox, setMailBox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(false)

  useEffect(() => {
    setUsername(profileData?.username)
    setNumber(profileData?.phoneNo)
    setMailBox(profileData?.isSubscribeMail)
    setImage([profileData?.image])
  }, [profileData?.username, profileData?.phoneNo, profileData?.isSubscribeMail, profileData?.image])

  const uploadImg = async (formData) => {
    try {
      setImgLoading(true)
      const res = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
      const data = await res.json()
      setImage(data)
      setImgLoading(false)
    } catch (err) {
      alert(err)
    }
  }

  const updateProile = async (image, number, mailBox, username) => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/users/${profileData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image, phoneNo: number, onBoarded: true, isSubscribeMail: mailBox, username })
      })
      await res.json()
      if (res.ok) {
        setLoading(false)
        toast.success('Profile updated successfully')
        router.push('/')
      }
    } catch (err) {
      alert(err)
    }
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      const formData = new FormData()
      formData.append('files', selected)
      formData.append('ref', 'images')
      formData.append('field', 'image')
      uploadImg(formData)
    } else {
      toast.error('PLEASE SELECT (jpg,png or jpeg)')
    }
  }

  const handleProfileEdit = (e) => {
    e.preventDefault()
    updateProile(image, number, mailBox, username)
  }

  return (
    <>
      <Head>
        <title>Truly Live | Profile</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-20 md:px-20 px-4 container">
        <form onSubmit={handleProfileEdit}>
          <h1 className="text-center text-2xl font-semibold">User Profile</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center my-10">
            <p className="md:text-xl">Profile Picture</p>
            {imgLoading ? (
              <div>
                <Spinner />
              </div>
            ) : image ? (
              <label htmlFor="file-input" className="cursor-pointer">
                <img src={image[0]?.url} alt="profile-pic" height={170} width={170} className="rounded-2xl" />
                <FiEdit className="my-2" fontSize="1.2rem" />
              </label>
            ) : (
              <label htmlFor="file-input" className="cursor-pointer">
                <MdAccountCircle className="md:h-44 md:w-44 h-20 w-20" />
                <FiEdit className="my-2" fontSize="1.2rem" />
              </label>
            )}
            <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center my-10">
            <p className="md:text-xl">Username</p>
            <input
              type="text"
              name="username"
              className="p-1 my-in-clr rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center my-10">
            <p className="md:text-xl">Phone number</p>
            <input
              type="number"
              name="number"
              className="p-1 my-in-clr rounded-md"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 items-center my-10">
            <p className="md:text-xl">Subscribe to Emails</p>
            <input
              type="checkbox"
              name="mail-subscribe"
              className="p-1 rounded-md"
              checked={mailBox}
              onChange={(e) => setMailBox(e.target.checked)}
            />
          </div>
          <div className="flex justify-end">
            {loading === true ? (
              <button disabled className="bg-[#222222] opacity-50 text-white p-1 rounded-md md:w-2/4 w-full">
                loading...
              </button>
            ) : (
              <button className="bg-[#222222] text-white p-1 rounded-md md:w-2/4 w-full outline-none">Update</button>
            )}
          </div>
        </form>
        <div className="mt-10">
          <h1 className="my-5 font-semibold text-2xl">My Tickets</h1>
          {profileData?.purchases?.map((purchase) => {
            return (
              purchase?.event && (
                <div className="bg-white border-2 p-2 rounded-md my-5 md:w-2/4" key={purchase.id}>
                  <h1 className="text-xl">{purchase?.event?.eventName}</h1>
                  <p className="my-2">{purchase?.event?.eventBlurb}</p>
                  <p className="my-2">Level : {purchase?.eventticket[0]?.eventTicketType}</p>
                  <Link href={`/events/${purchase?.event?.eventSlug}`}>
                    <button className="bg-green-500 text-white p-1 my-2 rounded-md">Access</button>
                  </Link>
                </div>
              )
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

  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      profileData: data,
      token
    }
  }
}

export default AccountPage
