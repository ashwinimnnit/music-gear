import React from "react";
import axios from "axios"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cookie  from "../lib/cookie-extractor"
import Layout from "./component-layout"
import UserProfile from "./component-user-profile"



var UserLogin = React.createClass({

 getInitialState: function() {
    var cookieHash = new Cookie().getCookies()
    return { 
      isUserLoggedIn: cookieHash['userloginstatus']
    };
  },

  loginHeader: function(){
    return(
      <div className = "header">
        <div className="dropdown">
          <div className="dropdown-content">
         </div>
      </div>    
    </div>
      )
  },

  loginForm: function(){
    return (
       <div>
       {this.loginHeader()}     

       <form className="new_user" id="new_user">
          <div className="field">
            <input  name="email" id="user_email" type="text" placeholder ="email"/>
          </div>
          <br/>
        <div className="field">
         <input name="password" id="user_password" type="password" placeholder ="password"/>
        </div>

       <div className="actions">
            <div className = "login" onClick = {this.handleclick}> Login </div>
        </div>
         <br/>
         <div className="fields">
            <input name="remember_me" value="0" type="hidden"/>
            <input value="1" name="remember_me" id="user_remember_me" type="checkbox"/>
            <label for="user_remember_me">Remember me</label>
        </div>
       </form>
      </div>
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
    }).catch( function ( response){
      console.log("error occured----", response)
     document.cookie = "access_token" + "=" + cookieHash["access_token"] + ":" + "uid" + "=" + cookieHash["uid"] + ":" + "client" + "=" + cookieHash["client"] + ":" + "userloginstatus=" + false
     console.log(document.cookie, "present cookie*****************")
     self.setState({isUserLoggedIn: "false"})
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
        document.cookie = "access_token" + "=" + response.headers.access_token + ":" + "uid" + "=" + response.headers.uid + ":" + "client" + "=" + response.headers.client + ":" + "userloginstatus=" + true
        console.log("cookies are")
        console.log(document.cookie)
         window.history.pushState("", "", "/dashboard");
         self.setState({isUserLoggedIn: "true"})
     })
  },

  
	render: function(){
    var cookieHash = new Cookie().getCookies()
    console.log("logo**************", cookieHash['userloginstatus'], this.state.isUserLoggedIn)
      if (cookieHash['userloginstatus'] == "true" && this.state.isUserLoggedIn == "true"){

        return(
          <div>
            <Layout/>
            <UserProfile/>
            {this.props.children}
          </div>
        )
      }
      else{
        return(
           <div> 
            {this.loginForm()}
           </div>
        )
      }
	}

	

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({userStatus: UserStatus}, dispatch) 
}

function mapStateToProps (state){
  console.log("userlogin status****", state.userLoginStatus)
    return {};
}

 export default UserLogin