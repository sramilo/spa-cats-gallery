import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFact, getFact, getFactLoadingError, isFactLoading as isFactLoadingSelector } from '../../reducers/catFact'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Atropos from 'atropos/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './App.scss'

export function App () {
  // const [catImgUrl, setCatImgUrl] = useState(null)
  const [catImgUrlList, setCatImgUrlList] = useState(['https://cataas.com/cat/cute', 'https://cataas.com/cat/orange', 'https://cataas.com/cat/white'])

  // const dispatch = useDispatch()

  // const fact = useSelector(getFact)
  // const isFactLoading = useSelector(isFactLoadingSelector)
  const factLoadingError = useSelector(getFactLoadingError)

  useEffect(() => {
    // setCatImgUrlList([...catImgUrlList, 'https://cataas.com/cat'])
  }, [])

  // useEffect(() => {
  //   if (!fact) return
  //   const queryText = fact.split(' ', 3).join(' ')
  //   setCatImgUrl(`https://cataas.com/cat/says/${fact}?size=50&color=red`)
  // }, [fact])

  const callNextCat = (e) => {
    // console.log(e)
    // console.log(e?.touchesDirection)
    // console.log(e?.isEnd)
    // console.log(catImgUrlList)
    if (e?.touchesDirection === 'next' && e?.isEnd) {
      setCatImgUrlList(prevCatImgUrlList => [...prevCatImgUrlList, 'https://cataas.com/cat/cute'])
    }
  }

  return (
    <main>
      <Atropos
        className='my-atropos'
        activeOffset={40}
        shadowScale={1.05}
      >
        <h1>CATS GALLERY</h1>
        {factLoadingError && <p>{factLoadingError}</p>}
        {catImgUrlList?.length
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
                  {catImgUrlList.map((catImgUrl, index) => (
                    <SwiperSlide key={index}>
                      {!catImgUrl ? 'Loading cat image...' : <img src={`${catImgUrl}`} data-atropos-offset='-5' alt='fetched cat img from cataas.com' />}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
            )
          : <p>Not cats yet</p>}
      </Atropos>
    </main>
  )
}
