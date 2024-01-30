import { configureStore } from '@reduxjs/toolkit'
import catFact from './reducers/catFact'

export default configureStore({
  reducer: {
    catFact
  }
})
