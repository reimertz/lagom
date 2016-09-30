import {
  persistToLocalstorage,
  getFromLocalStorage,
  addStorageEventListener
} from './localStorage'

let mousePointerEl;

export const onExternalMousePointerMoved = mousePointer => {
  if (!mousePointer) return
  mousePointerEl.style.left = mousePointer.x;
  mousePointerEl.style.top = mousePointer.y;
}

export const onMouseMoved = event => {
  const { clientX, clientY } = event
  persistToLocalstorage('mousepointer', {
    x: clientX - 8,
    y: clientY + 30
  })
}

export const initMousePointer = () => {
  if (window.name === 'lagom_presentation_window') {
    window.addEventListener('mousemove', onMouseMoved)
  }
  else if (window.name !== 'lagom_next_slide') {
    document.body.innerHTML += '<span id="lagom-mousepointer">☝<span/>'
    mousePointerEl = document.getElementById('lagom-mousepointer')

    addStorageEventListener('mousepointer', onExternalMousePointerMoved)
    onExternalMousePointerMoved(getFromLocalStorage('mousepointer'))

  }
}
