import React from "react";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RecommendedItemAction from "../actions/recommended-item-action"

var RecommendedItems = React.createClass({
 
  componentDidMount: function(){
   var self = this
   var url = "http://localhost:4000/items/"+this.props.parentItemId+"/recommended_item.json"
   axios({
      method: 'get',
      url: url,
   	}).then(function (response) {
        self.props.recommendedItemAction(response.data.recommended_itmes)
   	   })
  },

  displayRecomendedItem: function(){
   var itemArr = []
   var items = this.props.recommendedItems
    for(var item in items){
       itemArr.push(<div className="recom-itms">
        <img  className="recom-img" src={"http://localhost:4000/"+items[item].images[Object.keys(items[item].images)[0]]}/>
        <div  className="recom-itm-title"> {items[item].title}</div></div>
       )
    }
    return(<div className="recom-div">{itemArr}</div>)
  },

  render: function(){
    if (Object.keys(this.props.recommendedItems).length > 0){
  	   return(
  	     <div>
  	      <div className="fo-ban"> You might also like these</div> 
  		        {this.displayRecomendedItem()}
  	     </div>
  	)
    }
    else{
      return(
         <div></div>
        )
    }
  }

})

export default connect(mapStateToProps, matchDispatchToProps)(RecommendedItems);


function matchDispatchToProps(dispatch) {
  return bindActionCreators({recommendedItemAction: RecommendedItemAction}, dispatch) 
}

function mapStateToProps (state){
    return {
        recommendedItems: state.recommendedItems
    };
}



