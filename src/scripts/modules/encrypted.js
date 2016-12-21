const firstChar = (s) => { return s.charCodeAt(0) }

const encrypt = (s, p) => {
  const b64S =  btoa(s).split('')
        pArray = p.split(''),
        sCodeArray =  b64S.map(firstChar),
        pCodeArray =  pArray.map(firstChar),
        pSum = pCodeArray.reduce((a,b) => { return a + b }),


        encryptedS = sCodeArray.map((s, index) => {
          return s + pSum + pCodeArray[index%(pArray.length-1)]
        })

  return btoa(encryptedS.join(' '))
}

export const checkIfEncrypted = (cb) => {
  const encryptedDOM = window.__lagom_encryptedDOM

  if (!encryptedDOM) return cb()
