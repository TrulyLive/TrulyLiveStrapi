import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import HomeDescription from '../components/HomeDescription'
import TrulyLive from '../components/TrulyLive'
import Grid from '../components/Grid'
import { baseUrl } from '../backend'
import Contact from '../components/Contact'
import Musicians from '../components/Musicians'
import FAQ from '../components/FAQ'
import LiveShow from '../components/LiveShow'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home({ navData, homeData, footerData }) {
  return (
    <>
      <Head>
        <title>Truly Live | Home</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <Banner homeData={homeData} />
      <HomeDescription data={homeData} />
      <Musicians />
      <TrulyLive data={homeData} />
      <LiveShow data={homeData} />
      <Grid gridData={homeData.gridData} heading={homeData.planingServiceHeading} />
      <FAQ head={homeData.faqHeading} desc={homeData.faqDescription} faqData={homeData.faq} />
      <Contact data={homeData} />
      <Footer footerData={footerData} />
    </>
  )
}

export const getStaticProps = async () => {
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const homeRes = await fetch(
    `${baseUrl}/homes?populate[0]=post.image&populate[1]=posts.image&populate[2]=bannerVideo,bannerText,gridData.svgImage,faq&populate[3]=liveShowImage`
  )
  const homeData = await homeRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      homeData: homeData.data[0].attributes,
      footerData: footerData.data[0].attributes
    },
    revalidate: 1
  }
}
