import axios from "axios"

export default function getUserAddress(userid){
     return function (dispatch){
        fetchingData(userid).then( function (response){
          dispatch(fetchingDone(response.data))
        })
     }
}

function fetchingData(userid){
  var url = "https://rentmymusic.herokuapp.com/user_profile/"+userid+"/address.json"
  return (
    axios({
       method: "get",
       url: url,
       data: {userid: userid}
    })
  )
}

function fetchingDone(addresses){
  return {
    type: "USER_ADDRESS_ARRIVED",
    payload: addresses
  }

}

function isFetching(){
  return {
  type: "DATA_FETCHING",
  payload: {}
}
}
