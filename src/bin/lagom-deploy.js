import fsp from 'fs-promise'
import { createGist } from './helpers/create-gist'
import { urlShortener } from './helpers/url-shortener'
import chalk from 'chalk'
import ansi from 'ansi-escapes'
import Inliner from 'inliner'



async function printStatus(status) {
  process.stdout.write(`◩         status: ${status}\n`)
}

async function getInlinedFile(fileName) {
  const options = {
    'images': false,
    'compressJS': false,
    'collapseWhitespace': false,
    'compressCSS': false,
    'preserveComments': true,
  }

  return new Promise(( resolve, reject ) => {

    return new Inliner(fileName, options, (error, html) => {
      if (error) reject(error)
      else resolve(html)
    }).on('progress', printStatus)

  })
}

export async function deploy(fileName = 'index.html') {
  let fileExists, inlinedHTML, rawGistURL, shortenedUrl
  process.stdout.write(chalk.green(`◩         lagom: deploy\n`))

  try {
    fileExists = await fsp.exists(`./${fileName}`)

    if (!fileExists) throw new Error(`${fileName} doesn't exist`)

    inlinedHTML = await getInlinedFile(`./${fileName}`)

    printStatus('creating gist')

    rawGistURL = await createGist(inlinedHTML)

    printStatus('shortening url')

    shortenedUrl = await urlShortener(rawGistURL)

    process.stdout.write(chalk.green(`◩         deployed: http://lagom.hook.io/?c=${shortenedUrl}\n`))
  }

  catch(e) {
    process.stdout.write(chalk.red(`◩         error: ${e.message}\n`))
  }
}
