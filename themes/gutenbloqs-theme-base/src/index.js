const { render } = wp.element
import { Layout } from './components/layout'

const onload = () => render(<Layout />, document.getElementById(`gutenbloqs-theme-base`))

window.addEventListener
  ? window.addEventListener('load', onload, false)
  : window.attachEvent && window.attachEvent('onload', onload)
