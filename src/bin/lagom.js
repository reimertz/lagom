import { create } from './lagom-create'
import { server } from './lagom-server'
import { deploy } from './lagom-deploy'
import { help } from './lagom-help'

if (~process.argv.indexOf('create')){
  create()
}
else if (~process.argv.indexOf('server')){
  server()
}

else if (~process.argv.indexOf('deploy')){
  const possibleFileName = process.argv[process.argv.indexOf('deploy') + 1]

  deploy(possibleFileName)
}
else {
  help()
}
