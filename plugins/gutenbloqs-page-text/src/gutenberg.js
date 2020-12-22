const { Fragment, useState, useEffect } = wp.element
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from './hall'

// change the theme folder name if needed
const folder = '/wp-content/plugins/gutenbloqs-page-text/static'
const blockType = 'gutenbloqs/page-text'
const name = 'gutenbloqs_page_text'
const title = 'Page Text'

registerBlockType(blockType, {
  title: title,
  icon: {
    src: <img src="/wp-content/plugins/gutenbloqs-page-text/static/gutenbloqs-page-text.jpg" />,
    background: '#eaeaea',
  },
  category: 'gutenbloqs',
  attributes: {
    folder: { type: 'string', default: null },
    header_h1: { type: 'string', default: '' },
    header_h2_0: { type: 'string', default: '' },
    header_h2_1: { type: 'string', default: '' },
    image_0: { type: 'string', default: '' },
    image_1: { type: 'string', default: '' },
    text_0: { type: 'string', default: '' },
    text_1: { type: 'string', default: '' },
    text_2: { type: 'string', default: '' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, key) => setAttributes({ ...attributes, [key]: newContent.target.value })
    const Icon = () => (
      <img
        style={{ width: '25px', height: '25px', marginRight: '10px' }}
        src={attributes.folder + '/accept.svg'}
        alt="emoji"
      />
    )

    const [space_1, setSpace_1] = useState()
    useEffect(() => {
      const initialAttributes = {
        header_h1: 'Page Text',
        header_h2_0: 'Luctus aliquet nascetur potenti tortor',
        header_h2_1: 'Habitant varius porta',
        image_0: 'image.jpg',
        image_1: 'icon.svg',
        text_0: 'Lorem ipsum dolor',
        text_1: 'Luctus aliquet nascetur potenti tortor',
        text_2: 'Velit etiam dis libero consequat class',
        folder: folder,
      }
      const defaultAttributes = {}
      for (const a in attributes) defaultAttributes[a] = attributes[a] || initialAttributes[a]
      setAttributes(defaultAttributes)

      const start = document.getElementById('first_block_end').offsetTop
      const end = document.getElementById('second_block_start').offsetTop
      setSpace_1(end - start)
    }, [])

    return (
      <Gutenberg className={className}>
        <HallGutenberg attributes={attributes} name={name} />
        <Grid>
          <div>
            <Icon />
            Header
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h1']}
            onChange={e => onChangeContent(e, 'header_h1')}
          />
          <div>
            <Icon />
            SubHeader 1
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_0']}
            onChange={e => onChangeContent(e, 'header_h2_0')}
          />
          <div>
            <Icon />
            SubHeader 2
          </div>
          <Input
            placeholder="Add text..."
            className={className}
            value={attributes['header_h2_1']}
            onChange={e => onChangeContent(e, 'header_h2_1')}
          />
          <div id="first_block_end" style={{ marginTop: space_1 + 'px' }}></div>
          <div>
            <Icon />
            Images from the /static folder - Background image
          </div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_0']}
            onChange={e => onChangeContent(e, 'image_0')}
          />
          <div>
            <Icon />
            Images from the /static folder - Astronaut image
          </div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_1']}
            onChange={e => onChangeContent(e, 'image_1')}
          />
          <div>
            <Icon />
            First text
          </div>
          <Textarea
            txa_height="100px"
            placeholder="Add text"
            className={className}
            value={attributes['text_0']}
            onChange={e => onChangeContent(e, 'text_0')}
          />
          <div>
            <Icon />
            Second text
          </div>
          <Textarea
            txa_height="100px"
            placeholder="Add text"
            className={className}
            value={attributes['text_1']}
            onChange={e => onChangeContent(e, 'text_1')}
          />
          <div>
            <Icon />
            Third text
          </div>
          <Textarea
            txa_height="100px"
            placeholder="Add text"
            className={className}
            value={attributes['text_2']}
            onChange={e => onChangeContent(e, 'text_2')}
          />
        </Grid>
      </Gutenberg>
    )
  },
  save: ({ attributes }) => {
    return (
      <Fragment>
        <div id={name}></div>
        <script type="text/javascript">{`var ${name} = ${JSON.stringify(attributes)};`}</script>
      </Fragment>
    )
  },
})

const Gutenberg = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px;
`

const Grid = styled.div`
  display: grid;
  align-content: baseline;
  padding: 10px;
  margin-right: -300px;

  & > div {
    margin: 10px 0px;
    display: flex;
    align-items: center;
    line-height: 1;
  }
`

const Input = styled.input`
  && {
    border: 0px;
    border-radius: 8px;
    padding: 8px;
    margin: 2px 2px 20px 2px;
    width: 100%;
    min-width: 300px;
    background: #f3f3f2;
  }
`

const Textarea = styled.textarea`
  && {
    border: 0px;
    border-radius: 8px;
    padding: 8px;
    margin: 2px;
    width: 100%;
    min-width: 300px;
    background: #f3f3f2;
    min-height: ${props => props.txa_height || '100px'};
    font-size: 16px;
    font-family: 'Open Sans';
  }
`
