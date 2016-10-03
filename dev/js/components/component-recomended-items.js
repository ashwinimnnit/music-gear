import React from "react";
import axios from "axios"

var RecommendedItems = React.createClass({
  getInitialState: function() {
    return { 
      recommendedItems: []
    };
  },


  componentWillReceiveProps: function(){
   var self = this
   var url = "http://localhost:4000/items/"+this.props.parentItemId+"/recommended_item.json"
   axios({
      method: 'get',
      url: url,
   	}).then(function (response) {
         self.setState({ recommendedItems: response.data.recommended_itmes

         })
   	   })
  },

  displayRecomendedItem: function(){
   var itemArr = []
   var items = this.state.recommendedItems
    for(var item in items){
       itemArr.push(<div className="recom-itms">
        <img  className="recom-img" src={"http://localhost:4000/"+items[item].images[Object.keys(items[item].images)[0]]}/>
        <div  className="recom-itm-title"> {items[item].title}</div></div>
       )
    }
    return(<div className="recom-div">{itemArr}</div>)
  },

  render: function(){
    console.log("-----------------------------jk")
    console.log()
    if (Object.keys(this.state.recommendedItems).length > 0){
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

export default RecommendedItems;