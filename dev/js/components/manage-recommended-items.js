import React from "react";
import { Router, Route, Link } from 'react-router';
import axios from "axios"
import AdminSearch from "./manage-search-result"
var ManageRecommendedItems = React.createClass({

  getInitialState: function() {
    return { 
      items:""
    };
  },

  showSearchBox: function(e){
   console.log(e.target)

  },  

  displayItems: function(){
    var items = this.state.items
    var array = []

    for(var i in items){
      array.push(
      	<div key = {items[i].id} className= "itm" onClick={this.showSearchBox} >
      	<input type="checkbox" name={items[i].title} value={items[i].id}/> {items[i].title}<br/>
       </div>)
    }
    return (array)
  },

  componentDidMount: function(){
    var self = this;
    axios.get("http://localhost:4000/apis/items/index/col1/title/col2/description/col4/id/offset/0/limit/20.json")
      .then(function (response) {   
          self.setState({
              items: response.data.items
          });
      })


  },
 
  render: function(){
    console.log("manage")
  	return(
  		<div>
  		<div className ="all-items">
  		 {this.displayItems()}</div>
         <AdminSearch/>
        </div>
  		)
  }


})

export default ManageRecommendedItems;