import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'

function FAQ({ head, desc, faqData }) {
  const [isOpen, setIsOpen] = useState(0)
  const [activeFaq, setActiveFaq] = useState(0)

  useEffect(() => {
    setIsOpen(activeFaq)
  }, [activeFaq])

  return (
    <section id="faq" className="py-8">
      <div className="container md:px-8 w-11/12 max-w-6xl mx-auto">
        <div className="text-center">
          <h4 className="uppercase text-xs font-bold tracking-widest">feeling stumped ?</h4>
          <h2 className="capitalize text-scBlack6 text-4xl font-bold my-1">{head}</h2>
          <span className="relative left-0 w-24 h-1.5 inline-block mb-12 rounded-md bg-gradient-to-r from-grad1 to-grad2"></span>
          <p className="text-scGray2 w-1/1 mx-auto text-base tracking-normal">{desc}</p>
        </div>
        <div className="w-full max-w-5xl mx-auto mt-10 space-y-6">
          {faqData.map((data, index) => (
            <details className="w-full" key={data.id} open={isOpen === index} onClick={() => setActiveFaq(index)}>
              <summary className="w-full bg-scWhite3 rounded-md text-lg py-3 px-4 hover:underline cursor-pointer flex justify-between items-center space-x-2">
                <p>{data.question}</p>
                <div className="w-sm">
                  <IoIosArrowDown fontSize="1.45rem" />
                </div>
              </summary>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="faq-ans">
                {data.answer}
              </ReactMarkdown>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
