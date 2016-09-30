'#!/usr/bin/env node'

import chalk from 'chalk'
const liveServer = require("live-server")

const params = {
    port: 3000,
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    logLevel: 0, // 0 = errors only, 1 = some, 2 = lots
};

export const server = () => {
  process.stdout.write(chalk.green('◩  lagom-server is running'))
  liveServer.start(params)
}
