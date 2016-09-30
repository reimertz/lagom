import {
  persistToLocalstorage,
  getFromLocalStorage,
  addStorageEventListener
} from './modules/localStorage'

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

const onKey = event => {
  const keyCode = (event || window.event).keyCode

  if      (keyCode == 37) previousSlide()
  else if (keyCode == 39) nextSlide()
  else if (keyCode == 80) openPresentationWindow()
}

const initLagom = () => {
  const initialSlide = getCurrentSlide() || 0;

  //;-; don't want to bring in promises just for this thing.
  checkIfIsRefreshedPresentationWindow(setSlide.bind(this, initialSlide))
  renderCodeBlocks()

  Array.prototype.forEach.call(slides, (slide, i, array) => {
    slide.id = i
  })

  document.addEventListener('keydown', onKey)
  window.addEventListener('mouseup', checkHighlighting)
  addStorageEventListener('current-slide', setSlide)
}

initLagom()
