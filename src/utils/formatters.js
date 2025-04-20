export const capitalizeFirstLetter = (value) => {
  if (!value) return ''
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

export const generatePlaceholderCard = (column) => ({
  _id: `${column._id}-placeholder-card`,
  boardId: column.boardId,
  columnId: column._id,
  FE_PlaceholderCard: true
})

export const interceptorLoadingElement = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}