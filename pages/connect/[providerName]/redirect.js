import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { baseUrl } from '../../../backend'
import cookie from 'js-cookie'
import Head from 'next/head'
import { toast } from 'react-toastify'

const LoginRedirect = () => {
  const router = useRouter()
  const tokens =
    router.query?.providerName === 'google'
      ? router?.asPath.slice(24, router.asPath.length)
      : router?.asPath.slice(26, router.asPath.length)

  const localRoute = typeof window !== 'undefined' && localStorage.getItem('route')
  useEffect(() => {
    const redirectTest = async () => {
      if (router?.query?.providerName && tokens) {
        try {
          const res = await fetch(`${baseUrl}/auth/${router?.query?.providerName}/callback${tokens}`)
          const data = await res.json()
          if (res.ok) {
            cookie.set('token', data.jwt, {
              expires: 5
            })
            setTimeout(() => (localRoute ? router.push(`/events/${localRoute}`) : router.push('/onboarding')), 1000)
            toast('Logged in successfully')
          } else {
            toast.error(data?.error?.message)
            router.push('/login')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    redirectTest()
  }, [router.query?.providerName, tokens])

  return (
    <>
      <Head>
        <title>Truly Live | Redirecting</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <p className="text-center h-screen">redirecting...</p>
    </>
  )
}

export default LoginRedirect
