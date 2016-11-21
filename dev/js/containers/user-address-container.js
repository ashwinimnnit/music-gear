import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GetUserAddress from "../actions/get-user-address"

var UserAddressesContainer = React.createClass({
    getInitialState: function() {
    return { 
      IsEditClicked: false,
      WhichFormIsClicked: ""
    };
  },

	componentDidMount: function(){
	  var userid = 1
      this.props.getUserAddress(userid)
	},

	updateButton: function(formId){
      
     if (this.state.IsEditClicked && (this.state.WhichFormIsClicked == "form-"+formId+"")){
     	return (
     		 <div className ="update-address"> Update </div>
     	)
     }
	},

	displayAddresss: function (){
       var addressArray = []
       var array = []
       addressArray = this.props.userAddresses.addresses
       console.log("adddress ki id ", addressArray)
       if (typeof addressArray != "undefined"){
        for (var address in addressArray) {
        	array.push(
                <div key = {address} className = "address">
                <form id = {"form-"+address+""}>
                <div className = "row">
                  Name: <input type="text" name = "name" defaultValue = "ashwini" disabled className ="disabled inputs"/>
                </div>
        		<div className = "row">
        		  House No: <input type="text" name = "house_no" defaultValue = {addressArray[address].house_no}  disabled />
        		</div>
                <div className = "row">
                  Street: <input type="text" name = "street" defaultValue = {addressArray[address].street} disabled />
                </div>
                <div className = "row"> 
                  State: <input type="text" name = "city" defaultValue = {addressArray[address].city} disabled />
                </div>
                <div className = "row">
                  Pin: <input type="text" name = "state" defaultValue = {addressArray[address].state} disabled />
                </div>
                <div className = "row">
                  Phone: <input type="text" name = "pin" defaultValue = {addressArray[address].pin} disabled />
                </div>
                   <img src="http://localhost:3000/images/edit-image.jpg" 
                       className="edit-image-button" 
                       onClick = {this.displayEditableFields.bind(this, addressArray[address])}/>
                      {this.updateButton(addressArray[address].id)}
                </form>   
                </div>
        		)
        }
      }
      return (<div className = "user-address"> {array}</div>)
	},

    displayEditableFields: function(userAddress){
    	this.setState({IsEditClicked: true,
    		            WhichFormIsClicked: "form-"+userAddress.id+""
    	             })
        var form = document.getElementById("form-"+userAddress.id+"");
        var elements = form.elements;
         for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].disabled = false;
            elements[i].className = "editable-form"
           } 
    },
   
	render: function(){
      return(
      	<div>{this.displayAddresss()} </div>
      )
	}
})

export default connect(mapStateToProps, matchDispatchToProps)(UserAddressesContainer)


function matchDispatchToProps(dispatch) {

  return bindActionCreators({getUserAddress: GetUserAddress },dispatch) 
}

function mapStateToProps (state){
    return {
     userAddresses: state.userAddress
    };
}