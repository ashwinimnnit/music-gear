import { combineReducers } from 'redux'
import SearchResult from "./search-result"
import DisplayItem from "./reducer-show-item"
import RecommendedItems from "./reducer-recommended-items"
import MyItems from "./myitems"
import UserAddress from "./user-address-reducer"
import UserLoginStatus from "./set-user-status"

const allReducers = combineReducers({

	searchResult: SearchResult,
	displayItem: DisplayItem,
    recommendedItems: RecommendedItems,
    myitems: MyItems,
    userAddress: UserAddress,
    userLoginStatus: UserLoginStatus
})
export default allReducers