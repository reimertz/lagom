import hljs from '../vendor/highlight'

export const renderCodeBlocks = () => {
  const codes = document.getElementsByTagName('code')

  Array.prototype.forEach.call(codes, (code) => {
    code.innerHTML = code.innerHTML.replace(/</g, '&lt;')
    hljs.highlightBlock(code)
  })
}
