import React from "react";
import axios from "axios"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cookie  from "../lib/cookie-extractor"
import Layout from "./component-layout"
import UserProfile from "./component-user-profile"
import { Router, Route, Link } from 'react-router'



axios.interceptors.response.use(function (response) {
  console.log("BEFORE IF STATEMENT IN INTERCEPTOR", response.headers)
  if (typeof response.headers.accesstoken != "undefined"){
    console.log("THIS WAS EXECUTED ON INTERCEPTYOR==on after interceptor axios===>", response.headers)
    var userInfo = "accesstoken="+response.headers.accesstoken+":uid="+response.headers.uid+":client="+response.headers.client+":userloginstatus="+true+""
    var encryptUserCredential = new Cookie().encryptUserCredential(userInfo)
    localStorage.setItem('clienttoken', ""+encryptUserCredential+"");
  }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


var UserLogin = React.createClass({

 getInitialState: function() {
    var cookieHash = new Cookie().getUserCredentials()
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
        <div className = "user-registration-link">
         <Link to="/users/sign-up" > Register here</Link>
       </div>
       </form>
       
      </div>
      )
  },
  
   componentDidMount: function() {
    var cookieHash = new Cookie().getUserCredentials();
    var self = this;
    axios.get(" https://rentmymusic.herokuapp.com/user_login.json", {
    }).then(function (response) {
      //if (typeof response.headers.accesstoken != "undefined" ){
      //console.log("after checking if user is in loggedin mode didmount", response)
      //document.cookie = "accesstoken" + "=" + response.headers.accesstoken + ":" + "uid" + "=" + response.headers.uid + ":" + "client" + "=" + response.headers.client + ":" + "userloginstatus=" + true 
      //}
    }).catch( function ( response){
       if (typeof response.headers.accesstoken != "undefined" && 1==2){
                  console.log("this was receieved==on componenetdidmount===>", response.headers)

        // document.cookie = "accesstoken" + "=" + response.headers.accesstoken + ":" + "uid" + "=" + response.headers.uid + ":" + "client" + "=" + response.headers.client + ":" + "userloginstatus=" + true 
       }
     self.setState({isUserLoggedIn: "false"})
    })
  },


  handleclick: function(){
      var url = " https://rentmymusic.herokuapp.com/auth/sign_in.json"
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
        //if (typeof response.headers.accesstoken != "undefined" ){
      //console.log("this was receieved==on handleclick===>", response.headers)
      //document.cookie = "accesstoken" + "=" + response.headers.accesstoken + ":" + "uid" + "=" + response.headers.uid + ":" + "client" + "=" + response.headers.client + ":" + "userloginstatus=" + true 
        //}
        self.setState({isUserLoggedIn: "true"})  // setting flag for only for rerender
     })
  },

  
	render: function(){
    var cookieHash = new Cookie().getUserCredentials()
    if (cookieHash['userloginstatus'] == "true" && this.state.isUserLoggedIn == "true" ){
      return(
        <div>
          <Layout/>
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




