function setUserStatus(state ={}, action) {
    if (typeof action.type != 'undefined') {
      switch(action.type){
        case "IS_USER_IN_LOGGEDIN_MODE": {
          return action.payload
          break;
        }
      }
    }
 return state
}

export default setUserStatus