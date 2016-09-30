'#!/usr/bin/env node'

import { create } from './lagom-create'
import { server } from './lagom-server'
import { help } from './lagom-help'

if (process.argv.includes('create')){
  create()
}
else if (process.argv.includes('server')){
  server()
}
else {
  help()
}
