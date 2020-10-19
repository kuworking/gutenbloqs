const { useState, useEffect } = wp.element
import styled from '@emotion/styled'

export const Structure = ({ attributes, gutenberg }) => {
  const tag = attributes.tag
  const api = attributes.api
  const viral = attributes.viral || 'viral'
  const day = attributes.day || 'day'

  const request = {
    crossDomain: true,
    referrerPolicy: 'origin-when-cross-origin',
    method: 'GET',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Client-ID ${api}`,
    },
  }

  const [data, setData] = useState({ c1: [], c2: [], c3: [], c4: [] })
  useEffect(() => {
    if (!tag) return
    ;(async () => {
      const url = `https://api.imgur.com/3/gallery/search/${viral}/${day}/?q=${tag}`
      const response = await (await fetch(url, request)).json()
      const str = { c1: [], c2: [], c3: [], c4: [] }
      let index = 1
      response.data.forEach((el, i) => {
        str[`c${index}`].push(el)
        index++
        if (index > 4) index = 1
      })
      setData(str)
    })()
  }, [tag])

  const Display = ({ url }) =>
    url.endsWith('mp4') ? (
      <video width="100px" controls muted autoplay="true" preload="none">
        <source src={url} type="video/mp4" />
        Nope
      </video>
    ) : (
      <img src={url} loading="lazy" alt="imgur image" />
    )

  return (
    <div>
      <h2 style={{ fontWeight: '700' }}>[Imgur] {tag}</h2>
      <Grid>
        <div>
          {data.c1.map(el => (
            <Display url={el.images ? el.images[0].link : el.link} />
          ))}
        </div>
        <div>
          {data.c2.map(el => (
            <Display url={el.images ? el.images[0].link : el.link} />
          ))}
        </div>
        <div>
          {data.c3.map(el => (
            <Display url={el.images ? el.images[0].link : el.link} />
          ))}
        </div>
        <div>
          {data.c4.map(el => (
            <Display url={el.images ? el.images[0].link : el.link} />
          ))}
        </div>
      </Grid>
    </div>
  )
}

const q = px => `@media (min-width: ${px}px)`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
  & > div {
    display: flex;
    flex-direction: column;
    & > div {
      border-radius: 8px;
    }
    & img,
    & video {
      width: 100%;
    }
  }
`
