import React from "react";	
require('../../scss/style.scss');
import UserSearchContainer from "../containers/search-container"

var Search = React.createClass({
  render: function(){
	    return(<div>
               <UserSearchContainer/> 
             </div>
	    )
  }
})
export default Search
