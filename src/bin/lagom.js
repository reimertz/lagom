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
  deploy()
}
else {
  help()
}
