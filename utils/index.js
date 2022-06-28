import cookie from 'js-cookie'

export const getCookie = (key) => {
  if (typeof window !== 'undefined') return cookie.get(key)
}

export const removeCookie = (key) => {
  if (typeof window !== 'undefined') cookie.remove(key)
}
