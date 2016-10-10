import fsp from 'fs-promise'
import { createGist } from './helpers/create-gist'
import { urlShortener } from './helpers/url-shortener'
import chalk from 'chalk'
var Inliner = require('inliner');


async function getInlinedFile() {
  return new Promise(( resolve, reject) => {
    return new Inliner('./index.html', function (error, html) {
      if (error) return reject(error)
      else return resolve(html)
    })
  })
}

export async function deploy() {
  try {
    const inlinedHTML = await getInlinedFile()
    const rawGistURL = await createGist(inlinedHTML)
    const code = await urlShortener(rawGistURL)

    console.log(`deployed to http://git.io/${code}`)
  }

  catch(e) {
    process.stdout.write(chalk.red(`◩         ${e}\n`))
  }
}