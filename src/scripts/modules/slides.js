import {
  persistToLocalstorage,
  getFromLocalStorage,
} from './localStorage'

import { checkForSlideComment } from './comments'

export const slides = document.querySelectorAll('body > section')
export const nrOfSlides = slides.length

document.body.setAttribute('data-lagom-total-slides', nrOfSlides)

const setHash = id => {
  window.location.hash = id
}

const setProgress = id => {
  document.body.setAttribute('data-lagom-progress', Math.floor((id / nrOfSlides) * 100))
}

const setCurrentSlide = id => {
  document.body.setAttribute('data-lagom-current-slide', id)
}

const updateViews = id => {
  setHash(id)
  setProgress(id)
  setCurrentSlide(id)
}

export const getCurrentSlide = () => {
  return getFromLocalStorage('current-slide')
}

export const setSlide = id => {
  if (window.name === 'lagom_next_slide') {
    updateViews(id + 1)
  }
  else {
    if (window.name === 'lagom_presentation_window') {
      checkForSlideComment(id)
    }
    updateViews(id)
    persistToLocalstorage('current-slide', id)
  }
}

export const previousSlide = () => {
  return setSlide(Math.max(getCurrentSlide() - 1,  1))
}

export const nextSlide = () => {
  return setSlide(Math.min(getCurrentSlide() + 1,  nrOfSlides))
}