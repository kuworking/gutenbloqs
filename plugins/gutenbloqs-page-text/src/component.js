const { render } = wp.element
import { Hall } from './hall'

const name = 'gutenbloqs_page_text'

function onload() {
  const anchor = document.getElementById(name) || null
  if (!anchor) return
  render(<Hall name={name} />, anchor)
}

window.addEventListener
  ? window.addEventListener('load', onload, false)
  : window.attachEvent && window.attachEvent('onload', onload)
