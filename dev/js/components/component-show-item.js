import React from "react";
import axios from "axios"
import RecommendedItems from "./component-recomended-items"
import { browserHistory } from 'react-router';

var ShowItem = React.createClass({
  
 getInitialState: function() {
    return { 
      itemToDisplay:"",
      flag: true
    };
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
  
 displayItem: function(){
    var images = this.state.itemToDisplay.image
    var item = this.state.itemToDisplay
    var imageArr = []
      for(var img in images){
        imageArr.push(<img className = "item-img" src={"http://localhost:4000"+images[img]} className="item-images" />)
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

render: function(){ 
  return(
    <div className="item-desc-wrapper">
      {this.displayItem()}
     <RecommendedItems parentItemId = {this.props.params.itemid}/>
  </div>
  )
}

})

export default ShowItem