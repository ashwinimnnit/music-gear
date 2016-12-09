
export default class CookieExtractor {
  //contructor(){}

   getCookies(){
     var cookieHash = []
   	 var allCookie = document.cookie
   	 var cookieArray = allCookie.split(":")
     for( var i=0; i< cookieArray.length; i++){
        var temp = cookieArray[i].split("=")
        cookieHash[temp[0]] = temp[1]
     }
     return cookieHash 
   }
}