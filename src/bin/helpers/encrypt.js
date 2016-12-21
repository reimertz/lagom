import btoa from 'btoa'

export function generatePasswordProtectedTemplate(gistURL) {
return `<!DOCTYPE html>
<html>
<head>
  <title>lagom - encrypted password</title>
  <style>
    body { font-family: monospace; }
    input {
      background: black;
      border: none;
      color: white;
      padding: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
<h1>lagom: this presentation is encrypted.</h1>

<form method="GET">
  <input type="password" name="password">
  <input type="submit" value="decrypt presentation">
</form>

<script>
var form = document.querySelector('form');
var xhr = new XMLHttpRequest();

function decrypt(s, p) {
  const sCodeArray = atob(s).split(' ').map(s => { return parseInt(s) })

  const pArray = p.split('')
  const pCodeArray =  pArray.map(s => { return s.charCodeAt(0) })
  const pSum = pCodeArray.reduce((a,b) => { return a + b })

  const dSCodeArray = sCodeArray.map((s, index) => {
    return s - pSum - pCodeArray[index%(pArray.length-1)]
  })

  const dS = dSCodeArray.map(code => { return String.fromCharCode(code) })
  const dBase64S = dS.join('')

  return atob(dBase64S)
}

xhr.onreadystatechange = function() {
  var password = form.querySelector('input[type="password"]').value;

  if (xhr.readyState == XMLHttpRequest.DONE) {
    try {
      document.write(decrypt(xhr.responseText, password));
    }
    catch (e) {
     document.body.innerHTML = '<h1>lagom: wrong password.</h1>'
     console.log(e)
    }
  }
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  document.body.innerHTML = '<h1>lagom: decrypting(might take a while)..</h1>'
  xhr.open('GET', '${gistURL}', true);
  xhr.send(null);
});

</script>
</body>
</html>`
}

export async function encryptFile(s, p) {
  const b64S =  btoa(s).split('')
  const pArray = p.split('')
  const sCodeArray =  b64S.map(s => { return s.charCodeAt(0) })
  const pCodeArray =  pArray.map(s => { return s.charCodeAt(0) })
  const pSum = pCodeArray.reduce((a,b) => { return a + b })


  const encryptedS = sCodeArray.map((s, index) => {
    return s + pSum + pCodeArray[index%(pArray.length-1)]
  })
  return new Promise((resolve, reject) => {
    try {
      let encryptedDOM = btoa(encryptedS.join(' '))
      resolve(encryptedDOM)
    }
    catch(e) {
      reject('Couldn\'t encrypt the presentation')

    }
  })
}

