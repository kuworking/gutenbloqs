const { useEffect, useState } = wp.element
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import { Structure } from './components/structure'

export const Hall = ({name}) => {
  const [attributes, setWp] = useState({})

  useEffect(() => {
    if (!window[name]) return
    setWp(window[name])
  }, [window[name]])

  if (!attributes) return <></>

  return (
    <>
      <Global styles={css(base_css)} />
      <Structure attributes={attributes} name={name} />
    </>
  )
}

export const HallGutenberg = ({ attributes, name }) => {
  return (
    <Body>
      <Global styles={css(base_css)} />
      <Structure attributes={attributes} name={name} gutenberg="1" />
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
  }
`

const base_css = `
@import url('https://fonts.googleapis.com/css2?family=Staatliches&family=Open+Sans&display=swap');

html {
    background-size: cover;
    box-sizing: border-box;
    height: 100%;
    min-height: 100%;
  }

  body {
    text-rendering: optimizeLegibility;
    margin: 0;
    transition: background-color 1s ease, opacity 5s ease;
    min-height: 100%;

    overflow-y: scroll;
    /* overflow to prevent ethernal loop with masonry */
    margin: 0;
  }

  *,
  *:before,
  *:after,
  :after,
  :before {
    box-sizing: inherit;
  }
`
