const { Fragment } = wp.element
import { registerBlockType } from '@wordpress/blocks'
import styled from '@emotion/styled'

import { HallGutenberg } from './hall'

registerBlockType('gutenbloqs/background-imgur', {
  title: 'Imgur',
  icon: {
    src: <img src="/wp-content/plugins/gutenbloqs-imgur/static/gutenbloqs-imgur.jpg" />,
    background: '#eaeaea',
  },
  category: 'gutenbloqs',
  attributes: {
    tag: { type: 'string', default: null },
    api: { type: 'string', default: null },
    day: { type: 'string', default: 'day' },
    viral: { type: 'string', default: 'viral' },
    folder: { type: 'string', default: null },
  },
  edit: ({ attributes, setAttributes, className }) => {
    const onChangeContent = (newContent, key) => setAttributes({ ...attributes, [key]: newContent.target.value })

    return (
      <div className={className}>
        <Options>
          <Input placeholder="imgur api..." value={attributes.api} onChange={e => onChangeContent(e, 'api')} />
          <Input placeholder="insert a tag..." value={attributes.tag} onChange={e => onChangeContent(e, 'tag')} />
          <Select onChange={e => onChangeContent(e, 'viral')}>
            <option value="top" selected>
              top
            </option>
            <option value="viral">viral</option>
            <option value="epic">epic</option>
          </Select>
          <Select onChange={e => onChangeContent(e, 'day')}>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month" selected>
              month
            </option>
            <option value="year">year</option>
            <option value="all">all</option>
          </Select>
        </Options>
        <HallGutenberg attributes={attributes} />
      </div>
    )
  },
  save: ({ attributes }) => {
    return (
      <Fragment>
        <div id="gutenbloqs_imgur"></div>
        <script type="text/javascript">{`var gutenbloqs_imgur = ${JSON.stringify(attributes)};`}</script>
      </Fragment>
    )
  },
})

const Options = styled.div`
  margin-bottom: 20px;
`

const Input = styled.input`
  && {
    background: #f1f1f1;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 10px;
  }
`

const Select = styled.select`
  && {
    background: #e5e1d9;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 10px;
    vertical-align: top;
  }
`
