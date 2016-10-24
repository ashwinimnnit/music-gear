import React from "react";
import axios from "axios";
import RecommendedItems from "./container-recomended-items"

var ShowItemContainer = React.createClass({

 getInitialState: function() {
    return { 
      itemToDisplay:"",
      flag: true
    };
  },

  displayItem: function(){
    var images = this.state.itemToDisplay.image
    var item = this.state.itemToDisplay
    var imageArr = []
      for(var img in images){
        imageArr.push(<img key= {images[img]} className = "item-img" src={"http://localhost:4000"+images[img]} className="item-images" />)
      }
      return(
     <div className= "item-desc"> 
     <h2> 
      {item.title}
      </h2>
      <div> {item.description}</div>
      <div className="divitem-img"> {imageArr}</div>
      <div className ="raise-btn"> Send Rent Request</div>
    </div>
   )
 },


componentDidMount: function() {
    var self = this;
    axios.get("http://localhost:4000/items/"+this.props.params.itemid+".json")
      .then(function (response) {   
          self.setState({
              itemToDisplay: response.data.item
          });
      })
  },

  render: function(){
   return (
   	<div>
   	{this.displayItem()}
   	<RecommendedItems parentItemId = {this.props.params.itemid}/>
    </div>
   	)
  }


})
export default ShowItemContainer