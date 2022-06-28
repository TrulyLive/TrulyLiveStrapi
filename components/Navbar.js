import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

function Navbar({ navData }) {
  const classStr =
    'absolute left-0 top-full pl-20 py-8 w-full space-y-6 bg-black lg:py-0 lg:pl-0 lg:space-y-0 lg:w-max lg:static lg:flex gap-6 justify-between items-center text-scGray6'
  const [open, setOpen] = useState(false)
  const [navClass, setNavClass] = useState(classStr)

  const [token, setToken] = useState(cookie.get('token'))

  useEffect(() => {
    if (open) setNavClass(classStr)
    else setNavClass(`hidden ${classStr}`)
  }, [open])

  function formatLink(link) {
    return link.toLowerCase().replace(/ /g, '-')
  }

  const router = useRouter()

  return (
    <nav className="bg-pureBlack text-pureWhite fixed top-0 w-full z-50">
      <div className="container px-8 w-11/12 max-w-6xl mx-auto lg:px-0 flex justify-between items-center">
        <Link href="/">
          <a>
            <div className="w-32 h-20 relative">
              <Image layout="fill" src={navData.navLogo.data.attributes.url} alt="Truly Live" />
            </div>
          </a>
        </Link>
        <ul className={navClass}>
          {navData.navlink.map((link) => (
            <li key={link.id}>
              <Link href={`/#${formatLink(link.navlink)}`}>
                <a onClick={() => setOpen(false)} className="text-gray-300 hover:text-pmRed1 font-light">
                  {link.navlink}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/events">
              <a onClick={() => setOpen(false)} className="text-gray-300 hover:text-pmRed1 font-light">
                Events
              </a>
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link href="/login">
                  <a onClick={() => setOpen(false)} className="text-gray-300 hover:text-pmRed1 font-light">
                    Login
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account">
                  <a className="text-gray-300 hover:text-pmRed1 font-light cursor-pointer">Account</a>
                </Link>
              </li>
              <li>
                <Link href="/watching">
                  <a className="text-gray-300 hover:text-pmRed1 font-light cursor-pointer">Watching</a>
                </Link>
              </li>
              <li
                className="text-gray-300 hover:text-pmRed1 font-light cursor-pointer"
                onClick={() => {
                  cookie.remove('token')
                  router.push('/')
                  typeof window !== 'undefined' && localStorage.removeItem('route')
                }}
              >
                Logout
              </li>
            </>
          )}
        </ul>
        <FaBars onClick={() => setOpen((prev) => !prev)} className="lg:hidden text-pureWhite text-3xl cursor-pointer" />
      </div>
    </nav>
  )
}

export default Navbar
