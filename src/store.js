import { configureStore } from '@reduxjs/toolkit'
import catImageList from './reducers/catImageList'

export default configureStore({
  reducer: {
    catImageList
  }
})
