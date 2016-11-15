import React from "react";
import { Router, Route, Link } from 'react-router'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ClearItemAction from "../actions/clear-item-details"


var Layout = React.createClass({


   header: function(){
    return(
    <div className = "header">   
      <div className="dropdown">
        <span className="select-span">More</span>
        <div className="dropdown-content">
        <ul onClick = {this.props.clearItemAction}>
          <li><Link to="/myitems" >My Items</Link></li>
          <li><Link to="/additem" > Add item</Link></li>
          <li><Link to="/admin" > Administration</Link></li>
          <li><Link to="/" > Home</Link></li>
        </ul>
      </div>
    </div>    
    
    </div>
    )
  },

  render: function () {
   return(
    <div>
      {this.header()}
      {this.props.children}
    </div>
   	)
  }

})

export default connect(mapStateToProps, matchDispatchToProps)(Layout)

function matchDispatchToProps(dispatch) {

  return bindActionCreators({clearItemAction: ClearItemAction}, dispatch) 
}

function mapStateToProps (state){
    return {
    };
}