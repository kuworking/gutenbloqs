import { registerBlockType, registerBlockStyle } from '@wordpress/blocks'
import { useBlockProps, RichText } from '@wordpress/block-editor'
const { Fragment } = wp.element

// change the theme folder name if needed
const blockType = 'gutenbloqs/author'
const name = 'gutenbloqs_author'
const title = 'Author'

const camelCased = str =>
  str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })

const toJson = css =>
  css
    .split('\n')
    .filter(el => el)
    .reduce((acc, el) => {
      const [a, b] = el.split(':')
      acc[camelCased(a.trim())] = b.trim().slice(0, -1)
      return acc
    }, {})

registerBlockStyle(blockType, {})

registerBlockType(blockType, {
  apiVersion: 2,
  title: title,
  icon: {
    src: <img src="/wp-content/plugins/gutenbloqs-author/static/gutenbloqs-author.jpg" />,
    background: '#eaeaea',
  },
  category: 'gutenbloqs',
  attributes: {
    header: {
      type: 'string',
      source: 'text', // Use text to extract the inner text from markup
      selector: 'h2',
      default: 'Arty Apple',
    },
    subheader: {
      type: 'string',
      source: 'text', // Use text to extract the inner text from markup
      selector: 'h4',
      default: 'Work',
    },
    text: {
      type: 'array',
      source: 'text',
      selector: 'div',
      default: [
        <p>
          Zeitgeist. Come up with something buzzworthy exposing new ways to evolve our design language digital literacy
          pipeline sorry i didn't get your email. Strategic fit this is not the hill i want to die on. Strategic fit
          mumbo jumbo.
        </p>,
      ],
      //default: [{ type: 'p', props: { children: ['Lorem Ipsum Dolor Sit Amet'] } }],
    },
  },
  edit: ({ attributes: { header, subheader, text }, setAttributes }) => {
    const blockProps = useBlockProps({ className: name })

    return (
      <Fragment>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: css_box,
          }}
        ></style>
        <div {...blockProps}>
          <RichText
            tagName="h2"
            placeholder={'Header'}
            onChange={header => setAttributes({ header })}
            className="header"
            value={header}
          />
          <RichText
            tagName="h4"
            placeholder={'category'}
            onChange={subheader => setAttributes({ subheader })}
            className="subheader"
            value={subheader}
          />
          <RichText
            tagName="div"
            multiline="p"
            placeholder={'Write here the description'}
            onChange={text => setAttributes({ text })}
            className="text"
            value={text}
          />
        </div>
      </Fragment>
    )
  },
  save: ({ attributes: { header, subheader, text } }) => {
    const blockProps = useBlockProps.save({ className: name })

    return (
      <Fragment>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: css_box,
          }}
        ></style>
        <div {...blockProps}>
          <RichText.Content tagName="h2" className="header" value={header} />
          <RichText.Content tagName="h4" className="subheader" value={subheader} />
          <RichText.Content tagName="div" className="text" value={text} />
        </div>
      </Fragment>
    )
  },
})

const css_box = `
@import url('https://fonts.googleapis.com/css2?family=Staatliches&family=Open+Sans&display=swap');

.editor-styles-wrapper .${name},
.${name} {
  background: #f2f2f2;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.editor-styles-wrapper .${name} .header,
.${name} .header {
  font-family: Staatliches;
  text-align: center;
  font-size: 2.5em;
  margin: 20px 0 5px;
  color: #5b5b5b;
}

.editor-styles-wrapper .${name} .subheader,
.${name} .subheader {
  text-align: center;
  font-size: 0.8em;
  font-style: italic;
  font-weight: normal;
  margin: 0;
  font-size: 0.9em;
  line-height: 1;
  color: #888888;
}

.editor-styles-wrapper  .${name} .text,
.${name} .text {
  text-align: center;
  padding: 0px 50px;
  color: #5b5b5b;
}
`
