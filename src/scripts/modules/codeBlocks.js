import hljs from 'highlight.js'

export const renderCodeBlocks = () => {
  const codes = document.getElementsByTagName('code')

  Array.prototype.forEach.call(codes, (code) => {
    if (!code.classList.contains('noescape')) {
      code.innerHTML = code.innerHTML.replace(/</g, '&lt;')
    }

    hljs.highlightBlock(code)
  })
}
