import React from "react";
import { Router, Route, Link } from 'react-router';
import axios from "axios"
import AdminSearch from "./manage-search-result"
import DisplayMappedItems from "./mapRecommendedItemsForm"

var ManageRecommendedItems = React.createClass({

  getInitialState: function() {
    return { 
      items:"",
      itemToShowToAdmin: "",
      parentstickers: [],
      recommendedItemstickers:[],
      showAdminRecommendedItems: false,
      recommendedItem: []
    };
  },

  clearParentRecommendedState: function(e){
   this.setState({
     parentstickers: [],
     recommendedItemstickers:[]
   })
  },  

    parentItemStickersGenerator: function(e){
  	var newArray = this.state.parentstickers.slice()
   if (e.target.checked){
   	newArray.push(e.target)
   	this.setState({parentstickers: newArray})
   }
   else{
   	var index = newArray.indexOf(e.target);
   	 if (index > -1) {
       newArray.splice(index, 1);
     }
   	this.setState({parentstickers: newArray})
   }

  },

  recommendedItemStickersGenerator: function(e){
   console.log(e.target)
   	var newArray = this.state.recommendedItemstickers.slice()
   if (e.target.checked){
   	newArray.push(e.target)
   	this.setState({recommendedItemstickers: newArray})
   }
   else{
   	var index = newArray.indexOf(e.target);
   	 if (index > -1) {
       newArray.splice(index, 1);
     }
   	this.setState({recommendedItemstickers: newArray})
   }

  },

  handleMouseOver: function(e) {
    document.getElementById("all-items").style.overflow = "visible";
    var hoverItem = this.state.items[e.target.id].recommended_item
    var array =[]
    for(var i in hoverItem){
      array.push(
       <div >
        <div> {hoverItem[i].title} </div>
        <div> {hoverItem[i].price}</div>
       </div>
      )
    }
   this.setState({
     showAdminRecommendedItems: true,
     recommendedItem: array,
     itemToShowToAdmin: e.target.id
   })
  },

 handleMouseOut: function(){
    document.getElementById("all-items").style.overflow = "scroll";
   this.setState({showAdminRecommendedItems: false,
                   recommendedItem: []             
       })

  },

  displayItems: function(){
    var items = this.state.items
    var array = []

    for(var i in items){
      array.push(
      	<div key = {items[i].id} className= "itm"  >
      	<input type="checkbox" name={items[i].title}
      	 value={items[i].id} onClick={this.parentItemStickersGenerator}/> {items[i].title}
         <span id = {items[i].id} 
      	 onMouseOver = {this.handleMouseOver}
      	 onMouseOut ={this.handleMouseOut}>
      	 ({Object.keys(items[i].recommended_item).length})
      	 </span>
      	 <br/>
         </div>
       )
        if (this.state.showAdminRecommendedItems &&  items[i].id == this.state.itemToShowToAdmin){
      array.push(<div className="recommendeditems-hover"> {this.state.recommendedItem}</div>
        )
      }
    
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
  		<div className ="all-items" id = "all-items">
  		 {this.displayItems()}</div>
         <AdminSearch recommendedItemStickers = {this.recommendedItemStickersGenerator}/>
         <DisplayMappedItems parentstickers = {this.state.parentstickers} 
           recommendeditems = {this.state.recommendedItemstickers}
           clearView = {this.clearParentRecommendedState}  />
        </div>
  		)
  }


})

export default ManageRecommendedItems;