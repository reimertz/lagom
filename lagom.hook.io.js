var https = require('https')
var request = require('request')

function fetchContent(url) {
  return https.request(url, function(newRes) {
    var headers = newRes.headers
        headers['Content-Type'] = 'text/html charset=utf-8'
        delete headers['content-security-policy']
        delete headers['x-frame-options']
        delete headers['strict-transport-security']

    if (newRes.statusCode !== 200) return hook.res.end('<h1>presentation not found</h1>')

    hook.res.writeHead(newRes.statusCode, headers)
    newRes.pipe(hook.res)
  }).on('error', function(err) {
    hook.res.statusCode = 500
    hook.res.end()
  })
}

module['exports'] = function lagomRenderer (hook) {
  var isRawUrl = false, url

  if (hook.params.c) url = 'https://git.io/' + hook.params.c
  else if (hook.params.h1 && hook.params.h2) {
    var h1 = hook.params.h1
    var h2 = hook.params.h2

    isRawUrl = true

    url = 'https://gist.githubusercontent.com/anonymous/' + h1 + '/raw/' + h2 + '/lagom.html'
  }
  else return hook.res.end('<h1>the url is malformed.</h1>')


  if (isRawUrl) hook.req.pipe(fetchContent.call(this, url))
  else {
    request({ url: url, followRedirect: false }, function (err, res, body) {
      if (err) hook.res.end('<h1>the url is malformed.</h1>')
      hook.req.pipe(fetchContent.call(this, res.headers.location))
    })
  }
}