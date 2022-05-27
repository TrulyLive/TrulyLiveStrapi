import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { baseUrl } from '../../../backend'
import cookie from 'js-cookie'
import Head from 'next/head'

const LoginRedirect = () => {
  const router = useRouter()
  const tokens =
    router.query?.providerName === 'google'
      ? router?.asPath.slice(24, router.asPath.length)
      : router?.asPath.slice(26, router.asPath.length)

  useEffect(() => {
    const redirectTest = async () => {
      try {
        const res = await fetch(`${baseUrl}/auth/${router?.query?.providerName}/callback${tokens}`)
        const data = await res.json()
        if (res.ok) {
          cookie.set('token', data.jwt, {
            expires: 5
          })
          setTimeout(() => router.push('/onboarding'), 1000)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
        // alert(error.response.data.message[0].messages[0].message)
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
