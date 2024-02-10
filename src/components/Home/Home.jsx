import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { searchCatImages, getImageList, getLoadingErrorMessage, clearImageList } from '../../reducers/catImageList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Atropos from 'atropos/react'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider'
import { serverUrl } from '../../utils'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './Home.scss'

// axios.defaults.withCredentials = true

const Home = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(null)

  const dispatch = useDispatch()

  const catImageList = useSelector(getImageList)
  const loadingErrorMessage = useSelector(getLoadingErrorMessage)

  useEffect(() => {
    if (loggedIn) {
      setCurrentPage(1)
    }
  }, [loggedIn])

  useEffect(() => {
    if (currentPage) {
      dispatch(searchCatImages(currentPage))
    }
  }, [currentPage])

  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const { data: { url } } = await axios.get(`${serverUrl}/auth/url`)
      // window.location.assign(url)
      // Temporal trick as imgur api fails when opening in the same window...
      window.open(url, '_blank', 'noreferrer')
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`)
      dispatch(clearImageList())
      checkLoginState()
    } catch (err) {
      console.error(err)
    }
  }

  const callNextCat = (e) => {
    if (e?.touchesDirection === 'next' && e?.isEnd) {
      setCurrentPage(currentPage => currentPage + 1)
    }
  }

  return (
    <main>
      <button className='btn' onClick={loggedIn ? handleLogout : handleLogin}><span>{loggedIn ? 'Logout' : 'Login'}</span></button>
      <Atropos
        className='my-atropos'
        activeOffset={40}
        shadowScale={1.05}
      >
        <h1>CATS GALLERY</h1>
        {user && <p>{`Logged in as ${user.accountName}`}</p>}
        {loadingErrorMessage && <p>{loadingErrorMessage}</p>}
        {catImageList?.length
          ? (
            <>
              <div className='swiper-glow' />
              <div className='swiper-container'>
                <Swiper
                  grabCursor
                  slidesPerView={1}
                  spaceBetween={30}
                  pagination={{
                    clickable: true
                  }}
                  navigation={false}
                  loop
                  modules={[Pagination, Navigation]}
                  className='mySwiper'
                  onSlideNextTransitionEnd={(e) => callNextCat(e)}
                >
                  {catImageList.map((catImgUrl, index) => (
                    <SwiperSlide key={index}>
                      {catImgUrl.substring(catImgUrl.length - 4) === '.mp4'
                        ? <video autoplay muted width='288' height='316'><source src={`${catImgUrl}`} type='video/mp4' /></video>
                        : <img src={`${catImgUrl}`} data-atropos-offset='-5' alt={`Image at ${catImgUrl}`} />}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
            )
          : <p>Log in for cats!!</p>}
      </Atropos>
    </main>
  )
}

export default Home
