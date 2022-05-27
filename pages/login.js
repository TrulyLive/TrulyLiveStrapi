import loginImg from '../public/images/login.svg'
import googleIcon from '../public/images/google.png'
import facebookIcon from '../public/images/facebook.png'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { baseUrl } from '../backend'
import Image from 'next/image'
import Head from 'next/head'

const LoginPage = ({ navData, footerData }) => {
  return (
    <>
      <Head>
        <title>Truly Live | Login</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="container px-4 md:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center my-10">
          <div className="mt-20">
            <Image src={loginImg} alt="login" height={500} width={500} className="hidden md:block" />
          </div>
          <div className="bg-white shadow-2xl rounded-lg p-5">
            <h1 className="text-2xl md:text-3xl text-center">LOGIN</h1>

            <div className="md:flex justify-around gap-5">
              <div className="my-5 flex w-full border">
                <a
                  href="https://trulylive.herokuapp.com/api/connect/facebook"
                  className="text-center py-2 px-5 w-full rounded-md flex items-center gap-5 justify-center"
                >
                  <Image src={facebookIcon} alt="facebookIcon-login" height={23} width={23} />
                  LOGIN with FACEBOOK
                </a>
              </div>
              <div className="my-5 flex w-full border">
                <a
                  href="https://trulylive.herokuapp.com/api/connect/google"
                  className="text-center py-2 px-5 w-full rounded-md flex items-center gap-5 justify-center"
                >
                  <Image src={googleIcon} alt="google-login" height={19} width={19} />
                  LOGIN with GOOGLE
                </a>
              </div>
            </div>
            <p className="my-5">
              Don't have an account?{' '}
              <Link href="/register">
                <a className="underline">Register</a>
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
      <Footer footerData={footerData} />
    </>
  )
}

export const getStaticProps = async () => {
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()

  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes
    },
    revalidate: 1
  }
}

export default LoginPage
