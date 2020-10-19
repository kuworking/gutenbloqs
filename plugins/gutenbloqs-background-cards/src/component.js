const { render } = wp.element
import { Hall } from './hall'

function onload() {
  const anchor = document.getElementById(`gutenbloqs_background_cards`) || null
  if (!anchor) return
  render(<Hall />, anchor)
}

window.addEventListener
  ? window.addEventListener('load', onload, false)
  : window.attachEvent && window.attachEvent('onload', onload)
