import { createContext, useState } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import { baseUrl } from '../backend'

export const AuthContext = createContext()

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()
  const localRoute = typeof window !== 'undefined' && localStorage.getItem('route')

  // Register user
  const register = async (user) => {
    try {
      setError(null)
      const res = await fetch(`${baseUrl}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        setError(null)
        cookie.set('token', data.jwt, {
          expires: 5
        })
        localRoute ? router.push(`/events/${localRoute}`) : router.push('/onboarding')
      } else {
        setError(data.error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Login user
  const login = async (user) => {
    try {
      setError(null)
      const res = await fetch(`${baseUrl}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        setError(null)
        cookie.set('token', data.jwt, {
          expires: 5
        })
        localRoute ? router.push(`/events/${localRoute}`) : router.push('/onboarding')
      } else {
        setError(data.error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState