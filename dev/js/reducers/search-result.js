
const initialState = {
 isFetching: false,
 payload: {}
}

function searchResult(state =initialState, action) {
    if (typeof action.type != 'undefined') {
      switch(action.type){
        case "IS_FETCHING": {
          return action
          break;
        }
        case "FETCHING_DONE": {
          return action
          break;
        }
        case "INIT_STATE": {
          return action
          break;
        }
      }
    }
 return state
}

export default searchResult