import axios from "axios"


export default function (itemid){
   return function (dispatch){
      if (itemid != ""){
        fetchingData(itemid).then( function (response) {
        dispatch(fetchingDone(response.data.recommended_itmes))
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

function fetchingData(itemid) {
    var url = "http://localhost:4000/items/"+itemid+"/recommended_item.json"
	  return(axios({
        method: 'get',
        url: url,
        data:  {query: itemid  },
      }))
}

function fetchingDone(recommended_items){
  return {
   type: "RECOMMENDED_ITEMS",
   payload: recommended_items

  }
}

function isFetching(){
  return {
   type: "IS_FETCHING",
   payload: {},
   isFetching: true
  }
}