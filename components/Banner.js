import Button from './Button'

function Banner({ homeData }) {
  // console.log('HomeData: ', homeData)
  return (
    <div className="pt-20 md:pt-8">
      <video autoPlay loop muted className="w-full">
        <source src={homeData.bannerVideo.data.attributes.url} type="video/mp4" />
      </video>
      {/* mobile to medium */}
      <div className="w-11/12 max-w-2xl mx-auto flex flex-col items-center lg:hidden">
        {homeData.bannerText.map((text) => (
          <div key={text.id} className="my-4">
            <h2 className="font-semibold text-2xl text-center">{text.heading}</h2>
            <p className="text-center mt-4">{text.subHeading}</p>
          </div>
        ))}
        <Button text="DISCOVER MORE" link="#about" />
      </div>
      {/* medium to larger */}
      <div className="hidden lg:flex max-w-xl absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 flex-col items-center">
        {homeData.bannerText.map((text) => (
          <div key={text.id} className="my-4 text-pureWhite">
            <h2 className="font-semibold text-4xl text-center">{text.heading}</h2>
            <p className="text-center  mt-4">{text.subHeading}</p>
          </div>
        ))}
        <Button text="DISCOVER MORE" link="#about" />
      </div>
    </div>
  )
}

export default Banner
