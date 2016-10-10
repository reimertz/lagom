var https = require('https')
var request = require('request')

module['exports'] = function lagomRenderer (hook) {
  request({ url: 'https://git.io/' + hook.params.c, followRedirect: false }, function (err, res, body) {

    var newReq = https.request(res.headers.location, function(newRes) {
      var headers = newRes.headers;
          headers['Content-Type'] = 'text/html; charset=utf-8';
          delete headers['content-security-policy'];
          delete headers ['x-frame-options'];

      hook.res.writeHead(newRes.statusCode, headers);
      newRes.pipe(hook.res);
    }).on('error', function(err) {
      hook.res.statusCode = 500;
      hook.res.end();
    });

    hook.req.pipe(newReq);
  })
}