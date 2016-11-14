import React from "react";
import axios from "axios";
import RecommendedItems from "./container-recomended-items"
import DisplayItemAction from "../actions/display-item"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

var ShowItemContainer = React.createClass({

  displayItem: function(){
    var images = this.props.itemToDisplay.payload.image
    var item = this.props.itemToDisplay.payload
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
  console.log("0000000000", this.props.params.itemid)
    var self = this;
    axios.get("http://localhost:4000/items/"+this.props.params.itemid+".json")
      .then(function (response) {
        self.props.displayItemAction(response.data.item)
      })
  },

  render: function(){
    console.log("----show container")
   if (this.props.itemToDisplay.itemReceived){
     return (
   	    <div>
   	       {this.displayItem()}
        </div>
   	 )
   }
   else {
    	return(<div></div>)
    }
   } 
})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({displayItemAction: DisplayItemAction}, dispatch) 
}

function mapStateToProps (state){
    return {
        itemToDisplay: state.displayItem
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowItemContainer)