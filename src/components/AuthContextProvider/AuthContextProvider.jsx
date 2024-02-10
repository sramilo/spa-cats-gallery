import { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../../utils'
axios.defaults.withCredentials = true

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  const checkLoginState = useCallback(async () => {
    try {
      const { data: { loggedIn: logged_in, user } } = await axios.get(`${serverUrl}/auth/logged_in`)
      setLoggedIn(logged_in)
      user && setUser(user)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
