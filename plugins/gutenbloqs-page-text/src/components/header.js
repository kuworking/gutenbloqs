import React from 'react'
import styled from '@emotion/styled'

export const Header = ({ gutenberg, content: [header_h1, header_h2_0, header_h2_1] }) => {
  return (
    <Container gutenberg={gutenberg}>
      <div>
        <Div>
          <h1>{header_h1}</h1>
          <h2>{header_h2_0}</h2>
          <h2>{header_h2_1}</h2>
        </Div>
      </div>
    </Container>
  )
}

const q = px => `@media (min-width: ${px}px)`

const Container = styled.div`
    ${props =>
      (props.gutenberg &&
        `
  min-height: 800px;
`) ||
      `
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
`}
  transition: min-height 0.2s ease;

  & > div {
    transition: min-height 0.2s ease;

    ${props =>
      (props.gutenberg &&
        `
        min-height: 800px;
`) ||
      `
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
`}

    display: flex;
    flex-direction: column;
    align-self: center;
    flex-grow: 1;
    justify-content: center;

    background-color: #f36451;
    font-family: 'Staatliches', cursive;
    font-size: 1.4rem;

    position: absolute;
    left: 0px;
    width: 100%;
  }
`

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;

  && h1,
  && h2 {
    line-height: 1;
    margin: 0px;
    padding: 0px;
  }

  && h2 {
    color: #000;
  }

  && > h1 {
    text-align: center;

    font-size: 8rem;
    ${q(600)} {
      font-size: 5rem;
    }
    font-weight: 900;
    width: auto;
    margin: 40px 0px 0px 0px;
  }

  && > h2:first-of-type {
    margin-top: 10px;
  }
`
