function userAddresses(state = {}, action){
  switch(action.type){
  	case "USER_ADDRESS_ARRIVED":{
  		return action.payload
  	}
  }
  return state
}

export default userAddresses