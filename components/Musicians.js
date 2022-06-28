import React from 'react'

function Musicians() {
  return (
    <section className="bg-scWhite3 flex py-10">
      <div className="max-w-screen-xl flex flex-wrap mx-auto lg:flex-row sm:flex-col">
        <span className="w-20 h-1.5 lg:inline-block mb-12 rounded-md bg-gradient-to-r my-5 from-grad1 to-grad2 hidden"></span>
        <h2 className="text-2xl lg:text-4xl lg:w-1/3 md:w-max mx-auto font-bold py-5">
          Built by Musicians For Musicians
        </h2>
        <p className="lg:w-1/3 md:w-max mx-auto py-5 text-scGray5 text-xl font-light">
          We’ve been there and understand the world of artists and venues. We want to make it better.
        </p>
      </div>
    </section>
  )
}

export default Musicians
