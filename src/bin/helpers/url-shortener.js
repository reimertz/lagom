import fetch from 'node-fetch'
import FormData from 'form-data'
import { checkStatus } from './fetchUtils'

const GIT_IO_URL = 'https://git.io/create'

export async function urlShortener(gistUrl) {
  const form = new FormData()
        form.append('url', gistUrl)

  const response = await fetch(GIT_IO_URL, { method: 'post', body: form })
                   await checkStatus(response)
  const shortUrl = await response.text()

  return shortUrl

}