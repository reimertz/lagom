import {
  persistToLocalstorage,
  getFromLocalStorage,
  addStorageEventListener
} from './localStorage'

export const getElementPath = (current, pathArray = []) => {
  const parent = current.parentNode
  let childIndex

  if (!parent) {
    return pathArray
  }
  else {
    childIndex = Array.prototype.indexOf.call(parent.children, current)
    return getElementPath(parent, pathArray.concat(childIndex))
  }
}

const getElementFromPath = (path) => {
  return path.reduceRight((node, childIndex) => {
    return node.children[childIndex]
  }, document)
}


export const checkHighlighting = event => {
  const selection = window.getSelection()
  let highlightObject, range

  if (selection) {
    if (!selection.anchorNode.parentNode || !selection.focusNode.parentNode)
      return persistToLocalstorage('highlight', false)

      let startNode = getElementPath(selection.anchorNode.parentNode)
      let endNode = getElementPath(selection.focusNode.parentNode)

      highlightObject = {
        start: {
          node: getElementPath(selection.anchorNode.parentNode),
          offset: selection.anchorOffset
        },
        end: {
          node: getElementPath(selection.focusNode.parentNode),
          offset: selection.focusOffset
        }
      }

      //is the selection right to left? If so, let's do some magic
      range = document.createRange()
      range.setStart(selection.anchorNode, selection.anchorOffset)
      range.setEnd(selection.focusNode, selection.focusOffset)
      range.detach()

    if (range.collapsed) {
      let tempStart = highlightObject.start

      highlightObject.start = highlightObject.end
      highlightObject.end = tempStart
    }

    return persistToLocalstorage('highlight', highlightObject)
  }
}

const onHighlighting = persistedSelection => {
  if (!persistedSelection) return

  const selection = window.getSelection()
  const range = document.createRange();
  const startNode = getElementFromPath(persistedSelection.start.node)
  const endNode = getElementFromPath(persistedSelection.end.node)

  try {
    range.setStart(startNode.firstChild, persistedSelection.start.offset)
    range.setEnd(endNode.firstChild, persistedSelection.end.offset)
    selection.removeAllRanges()
    selection.addRange(range)
  } catch(e) {
    selection.removeAllRanges()
  }

}

addStorageEventListener('highlight', onHighlighting)
setTimeout(() => {
  onHighlighting(getFromLocalStorage('highlight'))
}, 500)

