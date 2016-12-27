import axios from "axios"
var CryptoJS = require("crypto-js");

export default class CookieExtractor {

   getUserCredentials(){
     var localStorageHash = []
     var userCredentials = localStorage.getItem('clienttoken');
     if (userCredentials != null){
       var decrpteduserCredentials = this.decryptUserCredential(userCredentials)
   	   var userInfoArray = decrpteduserCredentials.split(":")
       for( var i=0; i< userInfoArray.length; i++){
          var temp = userInfoArray[i].split("=")
          localStorageHash[temp[0]] = temp[1]
       }
     }

     axios.defaults.headers.accesstoken = localStorageHash['accesstoken'];
     axios.defaults.headers.uid = localStorageHash['uid'];
     axios.defaults.headers.client = localStorageHash['client'];
     return localStorageHash 
   }

   encryptUserCredential(userCredentails){
     var encryptedUsercredentials = CryptoJS.AES.encrypt(userCredentails, 'secret key');
      return encryptedUsercredentials   
   }

   decryptUserCredential(userCredentails){
    var bytes  = CryptoJS.AES.decrypt(userCredentails.toString(), 'secret key');
    var userInfo = bytes.toString(CryptoJS.enc.Utf8);
    return userInfo
   }
}

