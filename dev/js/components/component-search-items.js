import React from "react";	
require('../../scss/style.scss');
import UserSearchContainer from "../containers/search-container"

var Search = React.createClass({

  render: function(){
  	
  	if (typeof this.props.params== "undefined"){
  		var itemId = 0 
  	}
  	else {
  		var itemId = this.props.params.itemid 
  	}
	    return(<div>
               <UserSearchContainer itemId = {itemId}/> 
             </div>
	    )
  }
})
export default Search
