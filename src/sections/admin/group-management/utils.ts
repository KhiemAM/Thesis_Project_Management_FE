export const getColorByPriority = (priority: string) => {
  switch (priority) {
  case 'Thấp':
    return 'success'
  case 'Trung bình':
    return 'warning'
  case 'Cao':
    return 'error'
  default:
    return 'default'
  }
}