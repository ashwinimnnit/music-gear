import axios from "axios"


export default function getUserSearchResult(e, dispatch){
  console.log("hey m an action ",e.target.value)
    return function (dispatch){
      if (e.target.value != ""){
        fetchingData(e).then( function (response) {
        dispatch(fetchingDone(response.data.result))
        })
        dispatch(isFetching())  
      }
      else {
       dispatch(initialSate())
      }
    }
}

function initialSate(){
  return {
  	type: "INIT_STATE",
  	isFetching: false,
    payload: {}
  }
}

function fetchingData(e) {
    var url = "http://localhost:4000/search.json"
	  return(axios({
        method: 'post',
        url: url,
        data:  {query: e.target.value  },
      }))
}

function fetchingDone(data){
	console.log("doneFetching called")
  return {
   type: "FETCHING_DONE",
   payload: data

  }
}

function isFetching(){
	console.log("isFetching called")
  return {
   type: "IS_FETCHING",
   payload: {},
   isFetching: true
  }
}