import React from "react";
import axios from "axios"
import ReactDOM from "react-dom";
import SearchItems from "./component-search-items"
require('../../scss/style.scss');
import { Router, Route, Link } from 'react-router'

var UserProfile = React.createClass({
 /* getInitialState: function() {
    return { 
      isUpdateClick: false,
      isAddItemClicked: false,
      isHomePage: true
    };
  },*/

  header: function(){
    return(
    <div className = "header">   
      <div className="dropdown">
        <span className="select-span">More</span>
        <div className="dropdown-content">
        <ul>
          <li><Link to="/myitems" >My Items</Link></li>
          <li><Link to="/additem" > Add item</Link></li>
           <li><Link to="/" > Home</Link></li>
        </ul>
      </div>
    </div>    
    
    </div>
    )
  },
   
  searchBox: function(){
      return(<SearchItems/>)
  },

  render: function() {
      return (
        <div>
          {this.header()}
          {this.searchBox()}
          {this.props.children}
        </div>
      );
  }
});
export default UserProfile;