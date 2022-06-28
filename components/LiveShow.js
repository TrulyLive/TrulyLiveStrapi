import Image from 'next/image'
import { buildUrl } from 'cloudinary-build-url'
import { cloudName } from '../backend'

const createBlurredUrl = (imageId) => {
  const url = buildUrl(imageId, {
    cloud: {
      cloudName: cloudName
    },
    transformations: {
      effect: 'blur:1000',
      quality: 1
    }
  })
  return url
}

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b)
}

function LiveShow({ data }) {
  return (
    <>
      <section id="liveshow" className="justify-center pt-12 max-w-screen-xl m-auto">
        <div className="text-center">
          <h2 className="capitalize text-scBlack6 text-4xl font-bold my-1">Live Show</h2>
          <span className="relative left-0 w-24 h-1.5 inline-block mb-12 rounded-md bg-gradient-to-r from-grad1 to-grad2"></span>
        </div>
        <div className="px-10">
          <Image
            blurDataURL={createBlurredUrl(data.liveShowImage.data.attributes.hash)}
            placeholder="blur"
            width={
              data.liveShowImage.data.attributes.width /
              gcd(data.liveShowImage.data.attributes.width, data.liveShowImage.data.attributes.height)
            }
            height={
              data.liveShowImage.data.attributes.height /
              gcd(data.liveShowImage.data.attributes.width, data.liveShowImage.data.attributes.height)
            }
            layout="responsive"
            src={data.liveShowImage.data.attributes.url}
            alt="truly live show"
          />
        </div>
      </section>
    </>
  )
}

export default LiveShow
