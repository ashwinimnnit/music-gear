import axios from "axios"

export default function displayItemAction(userid){
   return function (dispatch){
    fetchingUserItems(userid).then( function (response){
    	dispatch(fetchingDone(response.data.items))
    })
    dispatch(isFetching()) 
   }
 }


 function fetchingUserItems(userid){
   var self = this;
   var url = "http://localhost:4000/user_profile/"+userid+"/items.json"
   return (axios.get(url))
 }

 function fetchingDone(myItems){
  return {
   type: "MY_ITEMS",
   payload: myItems

  }
}

function isFetching(){
  return {
   type: "IS_FETCHING",
   payload: {},
   isFetching: true
  }
}