import fetch from 'node-fetch'
import formData from 'form-data'

const GIT_IO_URL = 'https://git.io/create'
const RENDERER = 'https://reimertz.github.io/lagom/renderer.html'

export async function urlShortener(gistUrl) {
  const url = `${RENDERER}?${gistUrl}`
  const form = new formData()
        form.append('url', url)

  return fetch(GIT_IO_URL, {
    method: 'post',
    body: form
  })
  .then(response => {
    return response.text()
  })
}