import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect, useRef } from 'react'
import { serverUrl } from '../../utils'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider'

const Callback = () => {
  const called = useRef(false)
  const { checkLoginState, loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const refreshToken = window.location.href?.split('refresh_token=')[1].split('&')[0]

      if (loggedIn === false) {
        try {
          if (called.current) return // prevent rerender caused by StrictMode
          called.current = true
          await axios.get(`${serverUrl}/auth/token?refreshToken=${refreshToken}`)
          checkLoginState()
          navigate('/')
        } catch (err) {
          console.error(err)
          navigate('/')
        }
      } else if (loggedIn === true) {
        navigate('/')
      }
    })()
  }, [checkLoginState, loggedIn, navigate])
  return <></>
}

export default Callback
