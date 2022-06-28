import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress color="#ee1f26" height={2} />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default MyApp
