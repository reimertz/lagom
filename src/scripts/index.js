import { addStorageEventListener } from './modules/localStorage'

import {
  slides,
  getCurrentSlide,
  setSlide,
  previousSlide,
  nextSlide
} from './modules/slides'

import {
  openPresentationWindow,
  checkIfIsRefreshedPresentationWindow
} from './modules/presentationWindow'

import { renderCodeBlocks } from './modules/codeBlocks'
import { checkHighlighting } from './modules/highlighting'
import { addSwipeListener } from './modules/swipeListener'
import * as isMobile from 'ismobilejs'

const onKey = event => {
  const keyCode = (event || window.event).keyCode

  if      (keyCode == 37) previousSlide()
  else if (keyCode == 39) nextSlide()
  else if (keyCode == 80 && !(event.metaKey || event.ctrlKey)) openPresentationWindow()
}

const initLagom = () => {

  const initialSlide = getCurrentSlide() || 0

  Array.prototype.forEach.call(slides, (slide, i) => {
    slide.id = i
  })

  //;-; don't want to bring in promises just for this thing.
  checkIfIsRefreshedPresentationWindow(() => {
    setSlide(initialSlide)
    renderCodeBlocks()
  })

  if(isMobile.any) addSwipeListener()

  document.addEventListener('keydown', onKey)
  window.addEventListener('mouseup', checkHighlighting)
  addStorageEventListener('current-slide', setSlide)
}

initLagom()
