
export default function (state = {}, action){
  switch(action.type){
  	case "RECOMMENDED_ITEMS":{
  		return action.payload
  	}
  }
  return state
}