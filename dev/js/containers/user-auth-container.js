import React from "react";
import axios from "axios"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserStatus from "../actions/set-user-status"
import Cookie  from "../lib/cookie-extractor"

var UserAuthContainer = React.createClass({

  getInitialState: function() {
    var cookieHash = new Cookie().getCookies()
    return { 
      isUserLoggedIn: cookieHash['userloginstatus']
    };
  },

  loginForm: function(){
    return (
       <form className="new_user" id="new_user">
          <div className="field">
            <label for="user_email">Email</label><br/>
            <input  name="email" id="user_email" type="email"/>
          </div>

        <div className="field">
         <label for="user_password">Password</label><br/>
         <input name="password" id="user_password" type="password"/>
        </div>

        <div className="field">
            <input name="remember_me" value="0" type="hidden"/>
            <input value="1" name="remember_me" id="user_remember_me" type="checkbox"/>
            <label for="user_remember_me">Remember me</label>
        </div>

       <div className="actions">
            <input name="commit" value="Log in" type="button" onClick = {this.handleclick}/>
        </div>
       </form>

      )
  },
  
   componentDidMount: function() {
    console.log("=====component did mount here ====")
    var cookieHash = new Cookie().getCookies()
    console.log("***********", cookieHash)
    var self = this;
    axios.get("http://localhost:4000/user_login", {
      params: {
        access_token: cookieHash["access_token"],
        client: cookieHash["client"],
        uid: cookieHash["uid"]
      }
    }).then(function (response) {
      console.log("after checking if user is in loggedin mode", response)
      document.cookie = "access_token" + "=" + cookieHash["access_token"] + ":" + "uid" + "=" + cookieHash["uid"] + ":" + "client" + "=" + cookieHash["client"] + ":" + "userloginstatus=" + response.data.status
      console.log(document.cookie, "present cookie*****************")
      self.setState({isUserLoggedIn: response.data.status})
    }).catch( function ( response){
      console.log("error occured----", response)
     document.cookie = "access_token" + "=" + cookieHash["access_token"] + ":" + "uid" + "=" + cookieHash["uid"] + ":" + "client" + "=" + cookieHash["client"] + ":" + "userloginstatus=" + false
     console.log(document.cookie, "present cookie*****************")
    })
  },


  handleclick: function(){
      var url = "http://localhost:4000/auth/sign_in.json"
      var dataToSend = {}
      var formData = new FormData(document.getElementById("new_user"))
      for(var pair of formData.entries()) {
          dataToSend[pair[0]] = pair[1]
      }
      var self = this
     axios({
        method: "POST",
        url: url,
        data: { email: dataToSend['email'], password: dataToSend['password'] }
     }).then( function (response){
        console.log("-----------after login--------------")
        console.log(response.headers)
        document.cookie = "access_token" + "=" + response.headers.access_token + ":" + "uid" + "=" + response.headers.uid + ":" + "client" + "=" + response.headers.client + ":" + "userloginstatus=" + true
        console.log("cookies are")
        console.log(document.cookie)
     })
  },

  render: function(){
    var cookieHash = new Cookie().getCookies()
    if (cookieHash['userloginstatus'] == "true"){
    return(
       <div>{this.props.children} </div>
      )

    }
  	console.log("userlogin status", this.props.userLoginStatus)
  	  return(
       <div>{this.loginForm()} </div>
  	  )
  }

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({userStatus: UserStatus}, dispatch) 
}

function mapStateToProps (state){
	console.log("userlogin status****", state.userLoginStatus)
    return {};
}

export default connect(mapStateToProps, matchDispatchToProps)(UserAuthContainer)

//export default UserAuthContainer