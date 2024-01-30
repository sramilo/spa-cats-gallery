import { combineReducers } from 'redux'

import catsReducer from './reducers/catFact'

const rootReducer = combineReducers({
  cats: catsReducer
})

export default rootReducer
