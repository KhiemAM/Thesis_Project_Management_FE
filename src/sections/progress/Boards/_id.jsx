import { useState } from 'react'
import { cloneDeep } from 'lodash'
// import AppBar from '~/components/AppBar/AppBar'
import { useDispatch, useSelector } from 'react-redux'

import Container from '@mui/material/Container'

import { mockData } from 'src/_mock/mock-data'
// import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
// import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
// import {
//   updateBoardDetailAPI,
//   updateColumnDetailAPI,
//   moveCardToDifferentColumnAPI
// } from '~/apis'
import {
  setCurrentActiveBoard,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from 'src/redux/activeBoard/activeBoardSlice'

// import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  dispatch(setCurrentActiveBoard(mockData.board))
  const board = useSelector(selectCurrentActiveBoard)

  // const { boardId } = useParams()

  // useEffect(() => {
  //   const boardId = '67a723a732097956604f1eb3'
  //   dispatch(fetchBoardDetailAPI(boardId))
  // }, [dispatch, boardId])


  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // updateBoardDetailAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds

    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    // moveCardToDifferentColumnAPI({
    //   currentCardId,
    //   prevColumnId,
    //   prevCardOrderIds,
    //   nextColumnId,
    //   nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    // })
  }

  // if (!board) {
  //   return <PageLoadingSpinner caption='Loading Board...'/>
  // }

  return (
    <>
      {/* <ActiveCard />
      <AppBar />
      <BoardBar board={board}/> */}
      <BoardContent
        board={board}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </>
  )
}

export default Board
