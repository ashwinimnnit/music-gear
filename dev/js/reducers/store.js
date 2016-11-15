import { combineReducers } from 'redux'
import SearchResult from "./search-result"
import DisplayItem from "./reducer-show-item"
import RecommendedItems from "./reducer-recommended-items"
const allReducers = combineReducers({

	searchResult: SearchResult,
	displayItem: DisplayItem,
    recommendedItems: RecommendedItems
})
export default allReducers