import { isEmpty } from 'lodash'
// import { mapOrder } from '~/utils/sorts'
// import { API_ROOT } from '~/utils/constants'
// import authorizedAxiosInstance from '~/utils/authorizeAxios'
// import { generatePlaceholderCard } from '~/utils/formatters'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  currentActiveBoard: null
}

// export const fetchBoardDetailAPI = createAsyncThunk(
//   'activeBoard/fetchBoardDetailAPI',
//   async (boardId) => {
//     const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return response.data
//   }
// )

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    setCurrentActiveBoard: (state, action) => {
      const board = action.payload

      state.currentActiveBoard = board
    },

    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      state.currentActiveBoard = board
    },

    updateCardInBoard: (state, action) => {
      const incomingCard = action.payload
      const column = state.currentActiveBoard.columns.find(i => i._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(i => i._id === incomingCard._id)
        if (card) {
          Object.keys(incomingCard).forEach(key => {
            card[key] = incomingCard[key]
          })
        }
      }
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
    //   let board = action.payload

    //   board.FE_allUsers = board.owners.concat(board.members)

    //   //Logic data
    //   board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

    //   board.columns.forEach(column => {
    //     if (isEmpty(column.cards)) {
    //       column.cards = [generatePlaceholderCard(column)]
    //       column.cardOrderIds = [generatePlaceholderCard(column)._id]
    //     }
    //     else {
    //       column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
    //     }
    //   })

    //   state.currentActiveBoard = board
    // })
  }
})

export const { setCurrentActiveBoard, updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard

export const activeBoardReducer = activeBoardSlice.reducer