
export const checkForSlideComment = (id) => {
  const commentsContainer = document.getElementById('lagom_comments')
  const childNodes = document.querySelector(`section[id="${id}"]`).childNodes
  const comments = Array.prototype.filter.call(childNodes, node => {
    return node.nodeType === 8
  })

  commentsContainer.innerHTML = ''

  comments.map(comment => {
    commentsContainer.innerHTML += comment.textContent
  })
}