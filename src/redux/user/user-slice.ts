
import { toast } from 'react-toastify'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import instance from 'src/axios/config'

// Định nghĩa interface cho dữ liệu đầu vào
interface IFormInputLogin {
  user_name: string;
  password: string;
}

// Định nghĩa interface cho user
interface IUser {
  access_token: string;
}

// Định nghĩa trạng thái ban đầu
interface UserState {
  currentUser: IUser | null;
}

const initialState: UserState = {
  currentUser: null
}

// Thunk để đăng nhập
export const loginUserAPI = createAsyncThunk<IUser, IFormInputLogin>(
  'user/loginUserAPI',
  async (data) => {
    const response = await instance.post('/auth/login', data)
    return response.data
  }
)

// Thunk để đăng xuất
export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (payload?: { showSuccessMessage?: boolean }) => {
    const showSuccessMessage = payload?.showSuccessMessage ?? true
    const response = await instance.post('/auth/logout')
    if (showSuccessMessage) {
      toast.success('Đăng xuất thành công!')
    }
    return response.data
  }
)

// Thunk để cập nhật người dùng
export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data: Partial<IUser>) => {
    const response = await instance.put('/v1/users/update', data)
    return response.data
  }
)

// Slice của người dùng
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Selector để lấy người dùng hiện tại
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser

export const userReducer = userSlice.reducer
