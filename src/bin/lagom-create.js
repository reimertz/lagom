import fsp from 'fs-promise'
import askForInput from './helpers/ask-for-input'
import askForSelection from './helpers/ask-for-selection'
import chalk from 'chalk'

const starterLocation = `${__dirname}/../starter`

async function getInput() {
  const title = await askForInput({question:            '◩         title: ' })
  //const theme = await askForSelection({question:        '◩         theme: ', options:['white', 'black']})
  //const transition = await askForSelection({question:   '◩   transitions: ', options:['yes', 'no']})
  const homepage = await askForInput({question:         '◩      your www: ' })
  const twitter = await askForInput({question:          '◩       twitter: ' })
  const github = await askForInput({question:           '◩        github: ' })

  return {
    title,
    homepage,
    twitter,
    github
  }
}

async function moveStarterToFolder(folderName) {
  return fsp.copy(starterLocation,  `./${folderName}`)
}

async function generateIndex(folderName, title, homepage, twitter, github) {
  const indexLocation = `./${folderName}/index.html`
  const header = `${title} ${ twitter ? ` | @${twitter}`: '' }`
  const template = await fsp.readFile(`./${folderName}/index.html`, `utf8`)
  const rendered = template
                    .replace(/{{title}}/g, title)
                    .replace(/{{header}}/g, header)
                    .replace(/{{homepage}}/g, homepage)
                    .replace(/{{twitter}}/g, twitter)
                    .replace(/{{github}}/g, github)

  return await fsp.outputFile(indexLocation, rendered)
}

export async function create() {
  process.stdout.write(chalk.green('◩         lagom: a simplistic presentation generator\n'))

  const { title, homepage, twitter, github } = await getInput()
  const folderName = title.replace(/\s+/g, '-')

  try {
    await moveStarterToFolder(folderName)
    await generateIndex(folderName, title, homepage, twitter, github)

    process.stdout.write(chalk.green('◩  presentation: ') + 'generated\n')
    process.stdout.write(chalk.green('◩          type: ') + `'cd ${title}; lagom server' `)
    process.stdout.write(chalk.green('to start\n'))
  }

  catch(e) {
    process.stdout.write(chalk.red('◩  something went wrong'))
  }
}