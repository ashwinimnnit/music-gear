import React from "react";
import axios from "axios"
import UpdateUserItem from "./component-update-user-item"
import MyItemsContainer from "../containers/myitem-container"
var MyItems = React.createClass({

  onItemUpdation: function(updateItem){
  	var id = updateItem.id
  	var temp = this.state.items
  	temp[id] = updateItem
  	this.setState({items: temp,
    itemtoupdate: "",
    IsEditClicked: false
  	})
  },

  handleEdit: function(e){
  	 var temp = this.state.items[e.target.id]
     this.setState({
       IsEditClicked: true,
       itemtoupdate: temp
     })
  },

  
  geteditform: function() {
    return (<div className = "edit-form" >
            <UpdateUserItem itemtoupdate = {this.state.itemtoupdate} 
                            onItemUpdation = {this.onItemUpdation}/>
            </div>
    )
  },

  render: function(){
    return(
      <div className="item-list">
       <MyItemsContainer/>
      </div>
    )
  }
})
export default MyItems