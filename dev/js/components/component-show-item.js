import React from "react";
import ShowItemContainer from "../containers/container-show-item"

var ShowItem = React.createClass({
  
render: function(){
  return(
    <div className="item-desc-wrapper">
     <ShowItemContainer params = {this.props.params} />
   </div>
  )
}

})

export default ShowItem