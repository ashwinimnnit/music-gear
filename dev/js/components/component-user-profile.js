import React from "react";
import axios from "axios"
import ReactDOM from "react-dom";
import SearchItems from "./component-search-items"
require('../../scss/style.scss');
import { Router, Route, Link } from 'react-router'

var UserProfile = React.createClass({

   
  searchBox: function(){
      return(<SearchItems/>)
  },

  render: function() {
      return (
        <div>
          {this.searchBox()}
          {this.props.children}
        </div>
      );
  }
});
export default UserProfile;