import axios from "axios"


export default function userStatus(status){
	
   return {
     type: "IS_USER_IN_LOGGEDIN_MODE",
     payload: status
   }
 }