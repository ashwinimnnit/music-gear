import React from "react";
import { Router, Route, Link } from 'react-router'
var Layout = React.createClass({
  
   header: function(){
    return(
    <div className = "header">   
      <div className="dropdown">
        <span className="select-span">More</span>
        <div className="dropdown-content">
        <ul>
          <li><Link to="/myitems" >My Items</Link></li>
          <li><Link to="/additem" > Add item</Link></li>
          <li><Link to="/admin" > Administration</Link></li>
           <li><Link to="/" > Home</Link></li>
        </ul>
      </div>
    </div>    
    
    </div>
    )
  },

  render: function () {
   return(
    <div>
    {this.header()}
    {this.props.children}
    </div>


   	)
  }

})

export default Layout