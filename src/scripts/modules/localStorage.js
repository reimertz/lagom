const PREFIX = `lagom-`
let listeners = []

export const persistToLocalstorage = (key, val) => {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(val))
}

export const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(`${PREFIX}${key}`))
}

export const addStorageEventListener = (event, func) => {
  if (!listeners[`${PREFIX}${event}`]) {
    listeners[`${PREFIX}${event}`] = []
  }

  listeners[`${PREFIX}${event}`].push(func)
}

const onStorageEvent = event => {
  const { key, newValue} = event

  if(listeners[key])
    listeners[key].map(f => {
      f(JSON.parse(newValue))
    })
}

window.addEventListener('storage', onStorageEvent)