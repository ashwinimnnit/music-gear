
// this action is not in use, after react select implemnetaion

import axios from "axios"

export default function getUserSearchResult(value){
  
  console.log("action get usersearch ", value)
    return function (dispatch){
      if (value != ""){
        fetchingData(value).then( function (response) {
        dispatch(fetchingDone(response.data.result))
        })
        dispatch(isFetching())  
      }
      else {
       dispatch(initialSate())
      }
    }
}


