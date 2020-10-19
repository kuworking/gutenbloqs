import React from 'react'
import styled from '@emotion/styled'

export const Image = ({ gutenberg, src, icon, children }) => {
  return (
    <Background gutenberg={gutenberg} src={src} id="second_block_start">
      <div>
        <Div gutenberg={gutenberg}>
          <div>
            <img src={icon} alt="" />
          </div>
          <div>{children}</div>
        </Div>
      </div>
    </Background>
  )
}

const q = px => `@media (min-width: ${px}px)`

const Background = styled.div`
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

    background: url("${props => props.src}") no-repeat center center;
    background-size: cover;
    width: 100%;

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
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 0px;
    width: 100%;
  }
`

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${q(600)} {
    grid-template-columns: 2fr 1fr;
  }

  max-width: 800px;
  font-size: 2rem;
  font-family: 'Staatliches', cursive;
  color: #fff;
  padding: 10px;
  ${q(600)} {
    padding: 40px;
  }

  & > div:nth-of-type(1) {
    & img {
      position: absolute;
      z-index: 1;
      
    ${props =>
      (props.gutenberg &&
        `
        max-width: 300px;
      max-height: 424px;
`) ||
      `
      max-width: 400px;
      max-height: 424px;
`}
    }
  }

  & > div:nth-of-type(2) {
    z-index: 10;

    & div {
      line-height: 1.3;
      margin: 20px 0px;
    }
    & > div:nth-of-type(2) {
      font-size: 60px;
      font-weight: 700;
      line-height: 1;
    }
    & > div:nth-of-type(3) {
      margin-bottom: 200px;
      ${q(600)} {
        margin-bottom: unset;
      }
    }
  }
`
