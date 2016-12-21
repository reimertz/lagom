import fetch from 'node-fetch'

const GIST_URL = 'https://api.github.com/gists'

export async function createGist(file, fileName, description) {
  let files = {}

  files[fileName] = {
    content: file
  }
  const body = {
    description: description,
    public: false,
    files: files
  }

  return fetch(GIST_URL, {
    headers: {
      'User-Agent': 'lagom.js'
    },
    method: 'post',
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json()
  })
  .then(json => {
    const uploadedFile = json.files[fileName]
    const rawUrl = uploadedFile.raw_url

    return rawUrl
  })
}