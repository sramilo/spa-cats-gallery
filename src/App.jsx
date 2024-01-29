import { useEffect, useState } from 'react'
import './App.css'

const CAT_FACT_API_URL = 'https://catfact.ninja/fact'
// const CAT_IMG_API_URL_PREFIX = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState(null)
  const [catImgUrl, setCatImgUrl] = useState(null)

  useEffect(() => {
    fetch(CAT_FACT_API_URL)
      .then(res => res.json())
      .then(data => {
        setFact(data?.fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    const queryText = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${queryText}?size=50&color=red`)
      .then(data => {
        if (!data?.ok) { throw new Error('Error while fetching data') }
        setCatImgUrl(data?.url)
      })
      .catch(err => {
        console.log(err)
      })
  }, [fact])

  return (
    <main>
      <h1>CAT'S APP</h1>
      <section>
        <p>{fact && fact}</p>
        {catImgUrl && <img src={`${catImgUrl}`} alt='fetched cat img from cataas.com' />}
      </section>
    </main>
  )
}
