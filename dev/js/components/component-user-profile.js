import React from "react";	
import {connect} from "react-redux"
import axios from "axios"
import ReactDOM from "react-dom";
import UserItems from "./component-user-items"
import AddUserItem from "./component-add-user-item"
import SearchItems from "./component-search-items"
require('../../scss/style.scss');

var api_domain = "http://localhost:4000/user/"

var UserProfile = React.createClass({

  getInitialState: function() {
    return {
      items: '', 
      isUpdateClick: false,
      isAddItemClicked: false
    };
  },

  setAddItemFalg: function(){
    this.setState({isAddItemClicked: true})
  },

   headerBanner: function(){
    return(
    <div className = "header">
      <div>
        <div className ="my-item" 
          onClick={() => this.handleClick()}>
          My Items
        </div>
        <span className ="usr-name" > Hi ashwini </span>
      </div>
    </div>
    )
   },

   userItemList: function(){
     return(
      <div className = "item-list"> 
         <UserItems  onUserclick={this.handleClick}
          items = {this.state.items}  itemUpdated = {this.itemUpdated} />
      </div>
      )
    },

  itemUpdated: function(newItem){
    var temp = Array.new
    temp = this.state.items
    temp[newItem.id] = newItem
    this.setState({items: temp})
  },


  handleClick: function() {
    var self = this;
    axios.get("http://localhost:4000/user_profile/1/items.json")
    .then(function (response) {   
        self.setState({
            items: response.data.items,
            isAddItemClicked: false
        });
     })
  },


  render: function() {
  if (this.state.isAddItemClicked){
    return(
      <div>
      {this.headerBanner()}
       <AddUserItem itemCreated ={this.itemUpdated}/>
      </div>
    )
  }
  else {
    return (
      <div>
       {this.headerBanner()}
       <SearchItems/>
      <div className="add-itm" onClick ={() => this.setAddItemFalg()}> Add Item</div>
       {this.userItemList()}
      </div>
    );
   }

  }
});

export default UserProfile;