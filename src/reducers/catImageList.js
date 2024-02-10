import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { serverUrl } from '../utils'

const initialState = {
  isLoading: false,
  loadingErrorMessage: '',
  all: []
}

export const searchCatImages = createAsyncThunk('cats/getImageList', async (pageNumber) => {
  const response = await axios.get(`${serverUrl}/gallery/search${pageNumber ? `?page=${pageNumber}` : ''}`)
  return response.data
})

const catImageListSlice = createSlice({
  name: 'catImageList',
  initialState,
  reducers: {
    clearImageList (state, action) {
      state.isLoading = initialState.isLoading
      state.loadingErrorMessage = initialState.loadingErrorMessage
      state.all = initialState.all
    }
  },
  extraReducers: builder => {
    builder
      .addCase(searchCatImages.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(searchCatImages.fulfilled, (state, action) => {
        state.isLoading = false
        Array.prototype.push.apply(state.all, action.payload?.cats?.flatMap(e => e.images).map(e => e.link))
      })
      .addCase(searchCatImages.rejected, (state, action) => {
        state.isLoading = false
        state.loadingErrorMessage = 'Error has ocurred when fetching more cat images'
      })
  }
})

export default catImageListSlice.reducer
export const { clearImageList } = catImageListSlice.actions

export const getImageList = state => state.catImageList.all
export const getIsLoading = state => state.catImageList.isLoading
export const getLoadingErrorMessage = state => state.catImageList.loadingErrorMessage
