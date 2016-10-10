import fetch from 'node-fetch'

const GIST_URL = 'https://api.github.com/gists'

export async function createGist(indexFile) {

  const body = {
    description: 'a lagom.js presentation',
    public: true,
    files: {
      'lagom.html': {
        content: indexFile
      }
    }
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
    const htmlFile = json.files['lagom.html']
    const rawUrl = htmlFile.raw_url

    return rawUrl
  })
}