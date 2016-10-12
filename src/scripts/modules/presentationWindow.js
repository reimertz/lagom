import { initMousePointer } from './mousePointer'

let presentationWindow = false

const onResize = () => {
  presentationWindow.resizeTo(window.innerWidth, window.innerHeight)
}

const injectIframeAndPrepAttributes = (done) => {
  let body;
  presentationWindow.onload = () => {
    body = presentationWindow.document.body

    body.setAttribute('data-lagom-is-presentation-window', true)
    body.innerHTML +=
       `<iframe name="lagom_next_slide" src="${window.location.href}"></iframe>
        <aside id="lagom_comments"></aside>`

    done()
  }

  presentationWindow.onbeforeunload = () => {
    presentationWindow = false;

    [window, presentationWindow].map(object => {
      object.removeEventListener('resize', onResize)
    })
  }

  window.onbeforeunload = () => {
    presentationWindow.close()
  }
}

export const openPresentationWindow = () => {
  const options = [
    `${window.location.href}`,
    'lagom_presentation_window',
    `_blank`,
    `toolbar=0,location=0,menubar=0,resizable=0,width=${window.innerWidth}, height=${window.innerWidth}`
  ]

  if (presentationWindow) {
    presentationWindow.focus()
  }
  else {
    presentationWindow = window.open.apply(this, options)
    injectIframeAndPrepAttributes();
    initMousePointer()

    window.presentationWindow = presentationWindow;

    [window, presentationWindow].map(object => {
      object.addEventListener('resize', onResize)
    })
  }
}

export const checkIfIsRefreshedPresentationWindow = (done) => {
  const isPresentationWindow = window.name === 'lagom_presentation_window'
  const alreadyHookedUp = !!presentationWindow

  if (isPresentationWindow && !alreadyHookedUp) {
    presentationWindow = window
    injectIframeAndPrepAttributes(done)
    initMousePointer()
  }
  else {
    done()
  }
}