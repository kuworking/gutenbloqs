const { useEffect, useState } = wp.element
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'

const GlobalStyles = () => (
  <Global
    styles={css`
      html {
        background-size: cover;
        box-sizing: border-box;
        height: 100%;
        min-height: 100%;
        font-size: 62.5%;
      }
      body {
        font-family: 'Open Sans';
        font-family: 'Source Sans Pro', sans-serif;
        text-rendering: optimizeLegibility;
        margin: 0;
        font-size: 16px; /* fallback for rem */
        font-size: 1.6rem;
      }
    `}
  />
)

export const Layout = () => {
  const [gb, setGb] = useState()

  useEffect(() => {
    setGb(window.gutenbloqs_theme_base)
  }, [])

  return (
    <Div>
      <GlobalStyles />

      <div className="layout">
        <h1>[ GUTENBLOQS THEME BASE ]</h1>
        <div>{JSON.stringify(gb)}</div>
      </div>
    </Div>
  )
}

const Div = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  transition: 0.2s all ease-in;

  & .layout {
    max-width: 800px;
    width: 100%;
  }
`
