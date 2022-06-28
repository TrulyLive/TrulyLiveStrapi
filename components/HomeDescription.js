import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { buildUrl } from 'cloudinary-build-url'
import { cloudName } from '../backend'

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
  const { post } = data
  // console.log(post)
  return (
    <section className="container w-11/12 max-w-5xl mx-auto py-6 md:px-4 mt-8" id="about">
      <div className="text-center">
        <h2 className="text-2xl lg:text-4xl w-max mx-auto font-bold relative before:absolute before:w-32 before:h-1 before:bg-gradient-to-r from-grad1 to-grad2 before:right-1/2 before:translate-x-1/2 before:-bottom-1.5 before:rounded-md before:lg:w-64 before:lg:right-0 before:lg:translate-x-0">
          {data.homeheading}
        </h2>
        <p className="text-scGray5 text-xl mt-4">{data.homeDescription}</p>
      </div>
      <div>
        {post.map((data, index) => (
          <div
            key={data.id}
            className={`homeDescriptionData h-fit flex flex-col ${
              index % 2 == 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } my-16`}
          >
            {/* small to lg */}
            <div className="w-full relative rounded-md shadow-xl overflow-hidden lg:hidden">
              <Image
                src={data?.image?.data?.attributes?.url}
                blurDataURL={createBlurredUrl(data.image.data.attributes.provider_metadata.public_id)}
                placeholder="blur"
                width={4}
                height={3}
                layout="responsive"
                alt={data.image.data.attributes.alternativeText}
              />
            </div>
            {/* lg to xl */}
            <div className="hidden lg:block shadow-xl rounded-md w-1/2 relative overflow-hidden">
              <Image
                src={data.image.data.attributes.url}
                blurDataURL={createBlurredUrl(data.image.data.attributes.provider_metadata.public_id)}
                placeholder="blur"
                layout="fill"
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
    </section>
  )
}

export default HomeDescription
