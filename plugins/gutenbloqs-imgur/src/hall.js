const { useEffect, useState } = wp.element
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import { Structure } from './components/structure'

export const Hall = () => {
  const [attributes, setWp] = useState({})

  useEffect(() => {
    if (!window.gutenbloqs_imgur) return
    setWp(window.gutenbloqs_imgur)
  }, [window.gutenbloqs_imgur])

  if (!attributes) return <></>

  return (
    <>
      <Global styles={css(base_css)} />
      <Structure attributes={attributes} />
    </>
  )
}

export const HallGutenberg = ({ attributes }) => {
  return (
    <Body>
      <Global styles={css(base_css)} />
      <Structure attributes={attributes} gutenberg="1" />
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    width: 100%;
    min-height: 500px;
  }
`

const base_css = `
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
