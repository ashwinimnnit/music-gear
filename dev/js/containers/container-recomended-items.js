import React from "react";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RecommendedItemAction from "../actions/recommended-item-action"

var RecommendedItems = React.createClass({
 
  componentDidMount: function(){
   this.props.recommendedItemAction(this.props.parentItemId)
  },

  displayRecomendedItem: function(){
   var itemArr = []
   var items = this.props.recommendedItems
    for(var item in items){
       itemArr.push(<div className="recom-itms" key = {items[item].id}>
        <img  className = "recom-img" src={"http://localhost:4000/"+items[item].images[Object.keys(items[item].images)[0]]}/>
        <div  className = "recom-itm-title"> {items[item].title}</div></div>
       )
    }
    return(<div className="recom-div">{itemArr}</div>)
  },

  render: function(){
  	   return(
  	     <div>
  	      <div className="fo-ban"> You might also like these</div> 
  		        {this.displayRecomendedItem()}
  	     </div>
  	   )
  }

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({recommendedItemAction: RecommendedItemAction}, dispatch) 
}

function mapStateToProps (state){
    return {
        recommendedItems: state.recommendedItems
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(RecommendedItems);