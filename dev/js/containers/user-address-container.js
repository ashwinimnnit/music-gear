import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GetUserAddress from "../actions/get-user-address"

var UserAddressesContainer = React.createClass({


	componentDidMount: function(){
	  var userid = 1
      this.props.getUserAddress(userid)
	},

	displayAddresss: function (){
       var addressArray = []
       addressArray = this.props.userAddresses.addresses
       if (typeof addressArray != "undefined"){
       	console.log("-----address", addressArray)
        for (var address in addressArray) {
        	console.log("----0000", addressArray[address])
        }
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