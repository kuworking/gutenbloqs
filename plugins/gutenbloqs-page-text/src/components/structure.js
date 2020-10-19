const {} = wp.element
import styled from '@emotion/styled'

import { useReplace100vh } from '../hooks/usereplace100vh'
import { Header } from './header'
import { Image } from './image'

export const Structure = ({ attributes, name, gutenberg }) => {
  const resized = useReplace100vh()

  const {
    image_0,
    image_1,
    folder = '/',
    header_h1 = 'test',
    header_h2_0 = 'test',
    header_h2_1 = 'test',
    text_0 = 'test',
    text_1 = 'test',
    text_2 = 'test',
  } = attributes

  return (
    <>
      <Header gutenberg={gutenberg} content={[header_h1, header_h2_0, header_h2_1]} />
      <Image gutenberg={gutenberg} src={`${folder}/${image_0}`} icon={`${folder}/${image_1}`}>
        <div>{text_0}</div>
        <div>{text_1}</div>
        <div>{text_2}</div>
      </Image>
    </>
  )
}

const q = px => `@media (min-width: ${px}px)`
