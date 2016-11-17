import React from "react";
import axios from "axios"
import MyItemsContainer from "../containers/myitem-container"
var MyItems = React.createClass({

  render: function(){
    return(
      <div className="item-list">
       <MyItemsContainer/>
      </div>
    )
  }
})
export default MyItems