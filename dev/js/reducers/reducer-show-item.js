export default function displayItemReducer(state = {}, action){
	switch(action.type){
      case "DISPLAY_SELECTED_ITEM": {
       return action
       break;
      }
      case "CLEAR_ITEM_FROM_STORE": {
       return action
       break;
      }
	}

  return state

}