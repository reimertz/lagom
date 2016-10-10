import chalk from 'chalk'

export const help = () => {
  process.stdout.write(chalk.green('lagom create              create a new presentation\n'))
  process.stdout.write(chalk.green('lagom server              start live-reloading server\n'))
  process.stdout.write(chalk.green('lagom deploy <filename>   deploy presentation to a gist \n'))
  process.stdout.write(chalk.green('lagom help                show this help\n'))
}

