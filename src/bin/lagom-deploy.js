import fsp from 'fs-promise'
import askForInput from './helpers/ask-for-input'
import askForSelection from './helpers/ask-for-selection'
import { createGist } from './helpers/create-gist'
import { urlShortener } from './helpers/url-shortener'
import { encryptFile, generatePasswordProtectedTemplate } from './helpers/encrypt'
import chalk from 'chalk'
import Inliner from 'inliner'

const printStatus = async (status) => {
  process.stdout.write(`◩         status: ${status}\n`)
}

const getInlinedFile = async (fileName) => {
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

export const deploy = async (fileName = 'index.html') => {
  let fileExists, inlinedHTML, indexGistURL, shortenedUrl, encryptedHMTL, encryptedHTMLGist
  process.stdout.write(chalk.green(`◩         lagom: deploy\n`))

  try {

    fileExists = await fsp.exists(`./${fileName}`)

    if (!fileExists) throw new Error(`${fileName} doesn't exist`)

    inlinedHTML = await getInlinedFile(`./${fileName}`)

    let shouldEncrypt = await askForSelection({question:   '◩   password: ', options:['yes', 'no']})

    if (shouldEncrypt === 'yes') {
      const password = await askForInput({question:           '◩        password: ' })

      printStatus('uploading encrypted presentation as json')

      encryptedHMTL = await encryptFile(inlinedHTML, password)
      encryptedHTMLGist = await createGist(encryptedHMTL, 'encrypted', 'encrypted presentation')

      inlinedHTML = generatePasswordProtectedTemplate(encryptedHTMLGist)
    }

    printStatus('creating gist')

    indexGistURL = await createGist(inlinedHTML, 'lagom.html', 'a lagom.js presentation')

    printStatus('shortening url')

    shortenedUrl = await urlShortener(indexGistURL)

    process.stdout.write(chalk.green(`◩         deployed: http://lagom.hook.io/?c=${shortenedUrl}\n`))
  }

  catch(e) {
    process.stdout.write(chalk.red(`◩         error: ${e.message}\n`))
  }
}
