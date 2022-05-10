import { FaDribbble, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoIosContact } from 'react-icons/io'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Contact({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/mail`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        toast('we will reach out to you very soon!')
      }
    } catch (e) {
      toast.error('Failed To Submit!!')
    }
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const formInputClass =
    'mb-4 bg-transparent border border-scGray7 border-solid rounded shadow-none h-11 text-scBlack1 text-sm px-3 py-3 hover:border-pmRed2 trasition duration-150 ease-in-out'
  return (
    <>
      <section className="bg-scWhite3 pt-6 pb-24" id="contact">
        <div className="container md:px-8 w-11/12 max-w-6xl mx-auto">
          <div className="text-center pb-12">
            <h4 className="uppercase text-xs font-bold tracking-widest">drop us a note</h4>
            <h2 className="capitalize text-scBlack6 text-4xl font-bold my-1">{data.contactUsHeading}</h2>
            <span className="relative left-0 w-24 h-1.5 inline-block mb-12 rounded-md bg-gradient-to-r from-grad1 to-grad2"></span>
            <p className="text-scGray2 w-2/3 mx-auto text-base tracking-normal">{data.contactDescription}</p>
          </div>

          <div className="flex-auto mb-10">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                required={true}
                placeholder="Your Name"
                className={formInputClass}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
                id="email"
                placeholder="Your Email"
                className={formInputClass}
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required={true}
                id="subject"
                placeholder="Subject"
                className={formInputClass}
              />
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required={true}
                rows="6"
                placeholder="Message"
                style={{ height: '144px' }}
                className={formInputClass}
              ></textarea>
              <input
                type="submit"
                id="submit"
                className="bg-pmRed2 text-pureWhite uppercase py-3.5 cursor-pointer text-sm rounded-sm"
              />
            </form>
          </div>

          <div className="flex flex-wrap lg:flex-row md:flex-row flex-col">
            <div className="max-w-full basis-1/2 rounded px-4">
              <div className="mt-8 py-10 h-60 text-center bg-pureWhite shadow-md">
                <FaEnvelope className="block text-5xl mb-5 mx-auto" />
                <h4 className="font-semibold text-2xl">Email</h4>
                <a href="mailto:info@trulylive.com" className="font-light">
                  {data.email}
                </a>
              </div>
            </div>

            <div className="max-w-full basis-1/2 rounded px-4">
              <div className="mt-8 py-10 h-60 text-center bg-pureWhite shadow-md">
                <IoIosContact className="block text-5xl mb-5 mx-auto" />
                <h4 className="font-semibold text-2xl mb-3">We are social</h4>
                <ul className="text-pmRed2 flex w-2/5 m-auto justify-between h-8 items-center">
                  <li>
                    <a href={data.fbLink}>
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href={data.twitterLink}>
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href={data.linkedinLink}>
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href={data.dribbleLink}>
                      <FaDribbble />
                    </a>
                  </li>
                  <li>
                    <a href={data.instaLink}>
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
