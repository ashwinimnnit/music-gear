import axios from "axios"

export default function updateUserAddress(userAddress){
  console.log("hey user adress is", userAddress)
  /*return{
    type: "UPDATE_USER_ADDRESS",
    payload: dataToSend
  } */

  return function (dispatch) {
    dispatch (sendDataToServer (userAddress).then( function (response){
    console.log("response from server", response)

   }))
  }
}


function sendDataToServer(useraddress){
  var url = "http://localhost:4000/apis/user_address/update_user_address.json"
  return(
  axios({
    method: "POST",
    url: url,
    data: { updated_address: useraddress }
  }))
}