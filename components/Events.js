import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'

const Events = ({ event }) => {
  return (
    <div className="bg-white border p-2 rounded-md my-5 md:w-3/4 md:mx-auto">
      <div className="md:flex items-center">
        <Image
          src={event?.attributes?.eventImage?.data?.attributes?.url}
          blurDataURL={event?.attributes?.eventImage?.data?.attributes?.url}
          width={400}
          height={250}
          placeholder="blur"
          alt="event"
        />
        <div className="md:ml-14">
          <h1 className="text-lg md:text-xl mt-2 md:mt-0">{event?.attributes?.eventName}</h1>
          <p className="my-2 text-gray-600 text-sm">{event?.attributes?.eventBlurb}</p>
          <p className="my-3 text-gray-700 text-sm">
            {moment(event?.attributes?.eventDateAndTime).format('dddd DD MMM hh:mm')}
          </p>
          <Link href={`/events/${event?.attributes?.eventSlug}`}>
            <a className="bg-[#222222] text-white py-1 px-2 rounded-md">Details</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Events
