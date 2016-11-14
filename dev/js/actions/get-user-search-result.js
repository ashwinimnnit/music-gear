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

/*function initialSate(){
  return {
  	type: "INIT_STATE",
  	isFetching: false,
    payload: {} 

  }
}

function fetchingData(value) {
    var url = "http://localhost:4000/search.json"
	  return(axios({
        method: 'post',
        url: url,
        data:  {query: value  },
      }))
}

function fetchingDone(data){
  return {
   type: "FETCHING_DONE",
   payload: data

  }
}

function isFetching(){
  return {
   type: "IS_FETCHING",
   payload: {},
   isFetching: true
  }
}*/
