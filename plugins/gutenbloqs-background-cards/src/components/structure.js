const { useState, useEffect, useRef } = wp.element
import styled from '@emotion/styled'

import { useReplace100vh } from '../hooks/usereplace100vh'

export const Structure = ({ attributes, gutenberg }) => {
  // to show the cards as a height percentage, with a max-height though (for mobile then)
  useReplace100vh()

  const { image_0, folder = '/', text_0 = 'test', text_1 = 'test', text_2 = 'test', text_3 = 'test' } = attributes

  const stickValue = 30
  const stick = [...Array(5)].map((el, i) => i * stickValue)

  const backgrounds = ['#fff', '#fbadbb', '#afc9de', '#b092d8', '#85848a']
  const [background, setBackground] = useState({ position: 0, color: backgrounds[0] })

  const panelRef = useRef()
  const [panelHeight, setPanelHeight] = useState(800)

  useEffect(() => {
    // get the height of the total div, so that I can fix the height of the changing background
    setPanelHeight(panelRef.current.clientHeight)

    // about changing background color
    // set the initial position since it will change when they stick to the top
    const offSet = 500
    const initial_positions = [
      parseInt(document.getElementById('block_0_start').offsetTop + offSet),
      parseInt(document.getElementById('block_1_start').offsetTop - offSet),
      parseInt(document.getElementById('block_2_start').offsetTop - offSet),
      parseInt(document.getElementById('block_3_start').offsetTop - offSet),
      parseInt(document.getElementById('block_4_start').offsetTop - offSet),
    ]

    let recreated_background = background
    window.addEventListener('scroll', e => {
      const position =
        window.scrollY > initial_positions[4]
          ? 4
          : window.scrollY > initial_positions[3]
          ? 3
          : window.scrollY > initial_positions[2]
          ? 2
          : window.scrollY > initial_positions[1]
          ? 1
          : window.scrollY >= initial_positions[0]
          ? 0
          : 0

      if (recreated_background.position !== position) {
        setBackground({ position: position, color: backgrounds[position] })
        // the state is not available within this scope, so I recreate it here
        recreated_background = { position: position, color: backgrounds[position] }
      }
    })

    return () => {}
  }, [])

  return (
    <Wrap ref={panelRef}>
      {!gutenberg && <Background background={background} panelHeight={panelHeight} />}
      <Div onClick={() => (window.location = '/')} bg="#f3ba51" stick={stick[0]} id="block_0_start">
        <h1>{text_0}</h1>
      </Div>
      <Div bg="#f36451" stick={stick[1]} id="block_1_start">
        <h2>{text_1}</h2>
      </Div>
      <Div bg="#6987a0" stick={stick[2]} id="block_2_start">
        <h2>{text_2}</h2>
      </Div>
      <Div bg="#deaec2" stick={stick[3]} id="block_3_start">
        <h2>{text_3}</h2>
      </Div>
      <Div bg="linear-gradient(45deg,#feffe7,#0addff)" stick={stick[4]} id="block_4_start">
        <Img>
          <img src={`${folder}/${image_0}`} alt="" />
        </Img>
      </Div>
      <Space />
    </Wrap>
  )
}

const q = px => `@media (min-width: ${px}px)`

const Background = styled.div`
  transition: background 0.3s ease-in;
  will-change: background;
  background: ${props => props.background.color};
  position: absolute;
  left: 0px;
  width: 100%;

  height: ${props => props.panelHeight}px;
  margin: 5px;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Space = styled.div`
  margin-bottom: 500px;
`

const Div = styled.div`
  box-sizing: border-box;
  border: 5px solid #000;
  border-radius: 3px;
  margin: 5px 0px;
  padding: 20px;
  background: ${props => props.bg};
  height: calc(var(--vh, 1vh) * 80);
  max-height: 800px;
  max-width: 500px;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  position: sticky;
  top: ${props => props.stick}px;

  && h1,
  && h2,
  && h3,
  && h4,
  && h5 {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
  }

  && > h1 {
    font-family: 'Londrina Solid', cursive;
    color: #fff;
    text-align: center;
    font-size: 70px;
    ${q(500)} {
      font-size: 100px;
    }
    font-weight: 900;
    width: auto;
    margin: 40px 0px 0px 0px;
  }

  && > h2 {
    color: #fff;
    margin-top: 10px;
    font-weight: 100;
    font-size: 30px;
  }
`

const Img = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    max-width: 400px;
    max-height: 424px;
    width: 100%;
    height: 100%;
  }
`
