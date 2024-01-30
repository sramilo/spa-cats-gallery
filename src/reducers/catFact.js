import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const CAT_FACT_API_URL = 'https://catfact.ninja/fact'

const initialState = {
  isFactLoading: false,
  fact: '',
  factLoadingError: ''
}

export const fetchFact = createAsyncThunk('cats/getFact', async () => {
  const response = await axios.get(CAT_FACT_API_URL)
  return response.data
})

const catFactSlice = createSlice({
  name: 'catFact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFact.pending, (state, action) => {
        state.isFactLoading = true
      })
      .addCase(fetchFact.fulfilled, (state, action) => {
        state.isFactLoading = false
        state.fact = action.payload?.fact
      })
      .addCase(fetchFact.rejected, (state, action) => {
        state.isFactLoading = false
        state.factLoadingError = 'Error has ocurred when fetching cat fact'
      })
  }
})

export default catFactSlice.reducer

export const getFact = state => state.catFact.fact
export const isFactLoading = state => state.catFact.isFactLoading
export const getFactLoadingError = state => state.catFact.factLoadingError
