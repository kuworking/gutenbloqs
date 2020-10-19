// v2020.10.19

import { useLayoutEffect  } from 'react'
import { useWindowResize } from './usewindowresize'

export const useReplace100vh = () => {
  const setCssVar = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  useLayoutEffect (() => setCssVar(), [])
  const resized = useWindowResize(setCssVar, 500)
  return resized
}
