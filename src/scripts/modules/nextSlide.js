let presentationWindow = false;

const getNextSlideIframe = () => {
  return document.getElementById('lagom-next-slide')
}

export const updateNextSlideIframe = (id) => {
  getNextSlideIframe().contentWindow._lagom_setSlide(id+1)
}

  if(!!window.opener) return

  if (!!presentationWindow) {
    return presentationWindow.focus()
  }
  else {
    presentationWindow = window.open.apply(this, options)

    presentationWindow.onload = () => {
      const body = presentationWindow.document.body

      body.setAttribute('data-lagom-is-presentation-window', true)
      body.innerHTML = `${body.innerHTML}<iframe id="lagom-next-slide" src="${window.location.href}"></iframe>`
      updatePresentationWindow(id)
    }

    presentationWindow.onbeforeunload = () => {
      presentationWindow = false
    }
  }

}

export const updatePresentationWindow = (id) => {
  if (presentationWindow && presentationWindow._lagom_setSlide) {
    presentationWindow._lagom_setSlide(id)

  }
}