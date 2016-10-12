import fsp from 'fs-promise'
import askForInput from './helpers/ask-for-input'
//import askForSelection from './helpers/ask-for-selection'
import chalk from 'chalk'
import Mustache from 'mustache'

const starterLocation = `${__dirname}/../starter`

const getInput = async () => {
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

const checkIfFolderExists = async (folderName) => {
  return fsp.exists(`./${folderName}`)
}


const moveStarterToFolder = async (folderName) => {
  return fsp.copy(starterLocation,  `./${folderName}`)
}

const generateIndex = async (folderName, title, homepage, twitter, github) => {
  const indexLocation = `./${folderName}/index.html`
  const template = await fsp.readFile(`./${folderName}/index.html`, `utf8`)
  const rendered = Mustache.render(template, {
    title,
    homepage,
    twitter,
    github
  })

  return await fsp.outputFile(indexLocation, rendered)
}

export const create =  async () => {
  process.stdout.write(chalk.green('◩         lagom: a simplistic presentation generator\n'))

  const { title, homepage, twitter, github } = await getInput()
  const folderName = title.replace(/\s+/g, '-')

  try {
    const folderExists = await checkIfFolderExists(folderName)

    if (folderExists) throw new Error('folder already exists.')

    await moveStarterToFolder(folderName)
    await generateIndex(folderName, title, homepage, twitter, github)

    process.stdout.write(chalk.green('◩  presentation: ') + 'generated\n')
    process.stdout.write(chalk.green('◩          type: ') + chalk.bold(`cd ${folderName}; lagom server`))
    process.stdout.write(chalk.green(' to start\n'))
  }

  catch(e) {
    process.stdout.write(chalk.red(`◩         ${e}\n`))
  }
}
