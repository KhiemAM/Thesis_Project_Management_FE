import { toast } from 'react-toastify'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from 'src/axios/config'

const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await instance.post('/v1/users/login', data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await instance.delete('/v1/users/logout')
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await instance.put('/v1/users/update', data)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

// export const {} = userSlice.actions

export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer