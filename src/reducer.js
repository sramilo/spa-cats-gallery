import { combineReducers } from 'redux'

import catsReducer from './reducers/catImageList'

const rootReducer = combineReducers({
  cats: catsReducer
})

export default rootReducer
