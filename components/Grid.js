import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

const Grid = ({ gridData, heading }) => {
  // console.log(gridData)
  return (
    <section className="bg-scWhite3 py-24 mt-20">
      <h2 className="text-2xl lg:text-4xl w-max mx-auto font-bold relative before:absolute before:w-32 before:h-1 before:bg-gradient-to-r from-grad1 to-grad2 before:right-1/2 before:translate-x-1/2 before:-bottom-1.5 before:rounded-md before:lg:w-64 before:lg:right-0 before:lg:translate-x-0">
        {heading}
      </h2>
      <div className="overview px-4">
        {/* <div className="overview" style={{ background: `url(${GridImage.data.attributes.url}) bottom center no-repeat` }}> */}
        <div className="overshade">
          {gridData.map((data, index) => (
            <div className="factbox text-scBlack2 p-8 relative" key={data.id}>
              <div className="w-12 h-12 rounded-full flex justify-center items-center bg-gradient-to-r from-grad1 to-grad2 shadow-xl">
                <div className="relative w-6 h-6">
                  <Image src={data.svgLink} alt="svg" layout="fill" className="invert" />
                </div>
              </div>
              <ReactMarkdown className="gridHeading mt-2 mb-1">{data.gridHeading}</ReactMarkdown>
              <p className="gridDesc">{data.gridDescription}</p>
              <p className="absolute text-6xl left-2 top-3 lg:text-7xl font-bold text-scWhite1">{index + 1}.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Grid
