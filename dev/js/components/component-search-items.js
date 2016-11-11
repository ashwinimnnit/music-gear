import React from "react";	
require('../../scss/style.scss');
import UserSearchResult from "../containers/search-api-call"
var Search = React.createClass({
/* search box render*/
  render: function(){
	    return(<div>
               <UserSearchResult/> 
               {this.props.children}
             </div>
	    )
  }
})
export default Search
