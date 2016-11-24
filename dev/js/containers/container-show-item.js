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
        imageArr.push(<img key= {images[img]}
                           src={"http://rentmymusic.herokuapp.com"+images[img]}
                           className="item-images" />
                     )
      }
      return(
        <div className= "item-desc"> 
          <h2> {item.title}</h2>
          <div> {item.description}</div>
          <div className="divitem-img"> {imageArr}</div>
          <div className ="raise-btn"> Send Rent Request</div>
        </div>
      )
  },

  // execute on page load
  componentDidMount: function() {
    var self = this;
    axios.get("http://rentmymusic.herokuapp.com/items/"+this.props.itemId+".json")
      .then(function (response) {
        self.props.displayItemAction(response.data.item)
      })
  },

  render: function() {
   if (this.props.itemToDisplay.itemReceived){
     return (
   	    <div>
   	       {this.displayItem()}
           <RecommendedItems parentItemId = {this.props.itemId}/>
        </div>
   	 )
   }
   else {
    	return(<div></div>)
    }
  }

})

function matchDispatchToProps(dispatch){
  return bindActionCreators({displayItemAction: DisplayItemAction}, dispatch) 
}

function mapStateToProps (state){
    return {
      itemToDisplay: state.displayItem
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(ShowItemContainer)
