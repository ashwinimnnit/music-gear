import axios from "axios"

export default class CookieExtractor {
  //contructor(){}

   getCookies(){
     var sessionstorageHash = []
   	/* //var allCookie = document.cookie
     var allCookie = sessionStorage.getItem('accesstoken');
     console.log("all cookies in lib: ", allCookie)
   	 var cookieArray = allCookie.split(":")
     for( var i=0; i< cookieArray.length; i++){
        var temp = cookieArray[i].split("=")
        sessionstorageHash[temp[0]] = temp[1]
     }*/
     sessionstorageHash["accesstoken"] = sessionStorage.getItem('accesstoken');
     sessionstorageHash["uid"] = sessionStorage.getItem('uid');
     sessionstorageHash["client"] = sessionStorage.getItem('client');
     sessionstorageHash["userloginstatus"] = sessionStorage.getItem('userloginstatus');
     axios.defaults.headers.accesstoken = sessionStorage.getItem('accesstoken');
     axios.defaults.headers.uid = sessionStorage.getItem('uid');
     axios.defaults.headers.client = sessionStorage.getItem('client');
     console.log("-----------------get cookies executed in lib foledr----", sessionstorageHash)
     return sessionstorageHash 
   }
}

