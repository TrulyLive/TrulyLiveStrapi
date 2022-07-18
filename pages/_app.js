import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NextNprogress from 'nextjs-progressbar'
import AuthState from '../context/AuthState'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color="#ee1f26" height={2} />
      <AuthState>
      <Component {...pageProps} />
      <ToastContainer />
      </AuthState>
    </>
  )
}

export default MyApp
