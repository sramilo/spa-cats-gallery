import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFact, getFact, getFactLoadingError, isFactLoading as isFactLoadingSelector } from '../../reducers/catFact'
import './App.css'

export function App () {
  const [catImgUrl, setCatImgUrl] = useState(null)

  const dispatch = useDispatch()

  const fact = useSelector(getFact)
  const isFactLoading = useSelector(isFactLoadingSelector)
  const factLoadingError = useSelector(getFactLoadingError)

  useEffect(() => {
    dispatch(fetchFact())
  }, [])

  useEffect(() => {
    if (!fact) return
    const queryText = fact.split(' ', 3).join(' ')
    setCatImgUrl(`https://cataas.com/cat/says/${queryText}?size=50&color=red`)
  }, [fact])

  return (
    <main>
      <h1>CAT'S APP</h1>
      {factLoadingError
        ? <p>{factLoadingError}</p>
        : <section>
          <p>{isFactLoading ? 'Loading cat fact...' : fact}</p>
          {!catImgUrl ? 'Loading cat image...' : <img src={`${catImgUrl}`} alt='fetched cat img from cataas.com' />}
          </section>}
    </main>
  )
}
