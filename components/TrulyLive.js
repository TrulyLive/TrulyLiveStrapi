import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { buildUrl } from 'cloudinary-build-url'
import { cloudName } from '../backend'

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b)
}

const createBlurredUrl = (imageId) => {
  const url = buildUrl(imageId, {
    cloud: {
      cloudName: cloudName
    },
    transformations: {
      effect: {
        name: 'pixelate',
        value: 40
      }
    }
  })
  return url
}

function HomeDescription({ data }) {
  const { posts } = data
  // console.log(posts)
  return (
    <div className="container w-11/12 max-w-5xl mx-auto py-6 md:px-4">
      <div className="text-center">
        <h2 className="text-2xl lg:text-4xl w-max mx-auto font-bold relative before:absolute before:w-32 before:h-1 before:bg-gradient-to-r from-grad1 to-grad2 before:right-1/2 before:translate-x-1/2 before:-bottom-1.5 before:rounded-md before:lg:w-64 before:lg:right-0 before:lg:translate-x-0">
          {data.trulyLiveHeading}
        </h2>
      </div>
      <div>
        {posts.map((data, index) => (
          <div
            key={data.id}
            className={`homeDescriptionData flex flex-col items-center ${
              index % 2 == 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } my-16`}
          >
            <div className="w-full shadow-xl rounded-md lg:w-1/2 relative overflow-hidden">
              <Image
                src={data.image.data.attributes.url}
                blurDataURL={createBlurredUrl(data.image.data.attributes.hash)}
                placeholder="blur"
                width={
                  data.image.data.attributes.width /
                  gcd(data.image.data.attributes.width, data.image.data.attributes.height)
                }
                height={
                  data.image.data.attributes.height /
                  gcd(data.image.data.attributes.width, data.image.data.attributes.height)
                }
                layout="responsive"
                alt={data.image.data.attributes.alternativeText}
              />
            </div>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              className={`text-poppins w-full ${index % 2 == 0 ? 'lg:pr-8' : 'lg:pl-8'} lg:w-1/2`}
            >
              {data.postText}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeDescription
