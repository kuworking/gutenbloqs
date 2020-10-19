const { Fragment, useEffect, useState } = wp.element
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from './hall'

// change the theme folder name if needed
const folder = '/wp-content/plugins/gutenbloqs-background-cards/static'

registerBlockType('gutenbloqs/background-cards', {
  title: 'Background Cards',
  icon: <img src={folder + '/cards.svg'} />,
  category: 'gutenbloqs',
  attributes: {
    text_0: { type: 'string', default: '' },
    text_1: { type: 'string', default: '' },
    text_2: { type: 'string', default: '' },
    text_3: { type: 'string', default: '' },
    image_0: { type: 'string', default: '' },
    folder: { type: 'string', default: '' },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, part) => setAttributes({ ...attributes, [part]: newContent.target.value })

    const Icon = () => (
      <img
        style={{ width: '25px', height: '25px', marginRight: '10px' }}
        src={attributes.folder + '/accept.svg'}
        alt="emoji"
      />
    )

    const [space, setSpace] = useState({})

    useEffect(() => {
      const initialAttributes = {
        text_0: 'Background Cards',
        text_1: 'Luctus aliquet nascetur potenti tortor',
        text_2:
          'Velit etiam dis libero consequat class a sociis fames, habitant varius porta conubia mi id vehicula morbi lectus, porttitor mus cum viverra tellus convallis gravida',
        text_3:
          'Velit etiam dis libero consequat class a sociis fames, habitant varius porta conubia mi id vehicula morbi lectus, porttitor mus cum viverra tellus convallis gravida',
        image_0: '/icon.svg',
        folder: folder,
      }

      const defaultAttributes = {}
      for (const a in attributes) defaultAttributes[a] = attributes[a] || initialAttributes[a]
      setAttributes(defaultAttributes)

      const diff = i =>
        document.getElementById('block_' + (i + 1) + '_start').offsetTop -
        document.getElementById('block_' + i).offsetTop

      setSpace({ block_0: diff(0), block_1: diff(1), block_2: diff(2), block_3: diff(3) })
    }, [space.block_3])

    return (
      <Gutenberg>
        <HallGutenberg attributes={attributes} />

        <Grid>
          <div>
            <Icon />
            Text 1
          </div>
          <Textarea
            txa_height="200px"
            placeholder="Add text"
            className={className}
            value={attributes['text_0']}
            onChange={e => onChangeContent(e, 'text_0')}
          />
          <div id="block_0"></div>
          <div style={{ marginTop: space.block_0 + 'px' }}></div>

          <div>
            <Icon />
            Text 2
          </div>
          <Textarea
            txa_height="200px"
            placeholder="Add text"
            className={className}
            value={attributes['text_1']}
            onChange={e => onChangeContent(e, 'text_1')}
          />
          <div id="block_1"></div>
          <div style={{ marginTop: space.block_1 + 'px' }}></div>

          <div>
            <Icon />
            Text 3
          </div>
          <Textarea
            txa_height="200px"
            placeholder="Add text"
            className={className}
            value={attributes['text_2']}
            onChange={e => onChangeContent(e, 'text_2')}
          />
          <div id="block_2"></div>
          <div style={{ marginTop: space.block_2 + 'px' }}></div>

          <div>
            <Icon />
            Text 4
          </div>
          <Textarea
            txa_height="200px"
            placeholder="Add text"
            className={className}
            value={attributes['text_3']}
            onChange={e => onChangeContent(e, 'text_3')}
          />
          <div id="block_3"></div>
          <div style={{ marginTop: space.block_3 + 'px' }}></div>
          <div>
            <Icon />
            Images from the /static folder - Astronaut image
          </div>
          <Input
            placeholder="Add image url"
            className={className}
            value={attributes['image_0']}
            onChange={e => onChangeContent(e, 'image_0')}
          />
        </Grid>
      </Gutenberg>
    )
  },
  save: ({ attributes }) => {
    return (
      <Fragment>
        <div id="gutenbloqs_background_cards"></div>
        <script type="text/javascript">{`var gutenbloqs_background_cards = ${JSON.stringify(attributes)};`}</script>
      </Fragment>
    )
  },
})

const Gutenberg = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px;
  width: fit-content;
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
  }
`
