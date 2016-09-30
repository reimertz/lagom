const ansi = require('ansi-escapes')
const chalk = require('chalk')

//Cred to zeit.co and their email-input thingy. <3
export default function askForInput({
  question = '> Enter your email: ',
  options = ['yes', 'no'],
  appendNewline = true,
  forceLowerCase = true,
  suggestionColor = 'gray',
  autoCompleteChars = new Set([
    '\t' /* tab */,
    '\r' /* return */,
    '\u001b[C' /* right arrow */,
    ' ' /* spacebar */
  ]),
  resolveChars = new Set(['\r']),
  abortChars = new Set(['\u0003']),
} = {}) {
  return new Promise((resolve, reject) => {
    const isRaw = process.stdin.isRaw
    const isPaused = process.stdin.isPaused()
    const optionsString = options.map((option, index) => {
      if(index === 0) return `${chalk.bold(option)}`
      else return `${option}`
    }).join(' ')

    process.stdout.write(chalk.green(question) + optionsString)
    process.stdin.setRawMode(true)
    process.stdin.resume()

    let val = ''
    let suggestion = ''
    let caretOffset = 0

    const ondata = (v) => {
      const s = v.toString()

      // abort upon ctrl+C
      if (abortChars.has(s)) {
        restore()
        return reject(new Error('User abort'))
      }

      else if ('\u001b[D' === s) {
        if (val.length > Math.abs(caretOffset)) {
          caretOffset--
        }
      }
      else if ('\u001b[C' === s) {
        if (caretOffset < 0) {
          caretOffset++
        }
      }
      else if ('\x08' === s || '\x7f' === s) {
        // delete key needs splicing according to caret position
        val = val.substr(0, val.length + caretOffset - 1) +
          val.substr(val.length + caretOffset)
      }
      else {
        if (resolveChars.has(s)) {
          restore()
          return resolve(val)
        }

        const add = forceLowerCase ? s.toLowerCase() : s
        val = val.substr(0, val.length + caretOffset) + add +
          val.substr(val.length + caretOffset)
      }

      process.stdout.write(ansi.eraseLines(1) + chalk.green(question) + val)
      if (caretOffset) {
        process.stdout.write(ansi.cursorBackward(Math.abs(caretOffset)))
      }
    }

    const restore = () => {
      if (appendNewline) process.stdout.write('\n')

      process.stdin.setRawMode(isRaw)
      process.stdin.pause()
      process.stdin.removeListener('data', ondata)
    }

    process.stdin.on('data', ondata)
  })
}