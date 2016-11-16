export default function (state = {}, action){
  switch(action.type){
  	case "MY_ITEMS":{
  		return action.payload
  	}
  	case "IS_FETCHING": {
  		return action.payload
  	}
  	case "UPDATE_MY_ITEM": {
  		return action.payload
  	}
  }
  return state
}