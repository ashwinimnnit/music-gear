import { combineReducers } from 'redux'
import SearchResult from "./search-result"
//import TestReducer from "./test-reducer"
const allReducers = combineReducers({

	searchResult: SearchResult
})
console.log("--------m in al reducer----------------")
export default allReducers