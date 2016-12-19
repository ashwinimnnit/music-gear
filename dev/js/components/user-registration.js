import React from "react";
import axios from "axios"

var UserRegistration = React.createClass({

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

	render: function(){
	  return(
        <div> 
        {this.loginHeader()}   
         <form className="new_user" action="/users" id ="new_user" >
           <div className="field">
             <label for="user_email">Email</label><br/>
             <input autofocus="autofocus"  name="email" id="user_email" type="email"/>
          </div>

         <div className="field">
           <label for="user_password">Password</label>
           <em>(8 characters minimum)</em>
           <br/>
           <input autocomplete="off" name="password" id="user_password" type="password"/>
        </div>

        <div className="field">
           <label for="user_password_confirmation">Password confirmation</label><br/>
           <input autocomplete="off" name="password_confirmation" id="user_password_confirmation" type="password"/>
        </div>
       
        <div className="actions">
          <input value="Sign up" type="button" onClick = {this.handleclick}/>
        </div>
      </form>
      </div> 
	)
	},
 
  handleclick: function(){
  	var url = "http://localhost:4000/auth.json"
    var dataToSend = {}
    var formData = new FormData(document.getElementById("new_user"))
    for(var pair of formData.entries()) {
          dataToSend[pair[0]] = pair[1]
    }
    console.log("data to send ", dataToSend['email'])
     axios({
        method: "POST",
        url: url,
        data: { email: dataToSend['email'], password: dataToSend['password'], password_confirmation: dataToSend['password_confirmation'], confirm_success_url: "localhost:3000" }
     }).then(function (response){

     })
  }

})

export default UserRegistration