import React from "react";
import axios from "axios";
import { Router, Route, Link } from 'react-router'

var Admin = React.createClass({
  getInitialState: function() {
    return { 
      isRecommendedClicked: false
    } 
  },

  adminActions: function(){
    var actionitems = {
          'manage-recomeded-items': 'Manage Recomended Items',
          'manage-catagories'     : 'Manage Catagories',
          'manage-action-1'       : 'Manage Action one',
          'manage-action-2'       : 'Manage Action Two',
          'manage-action-3'       : 'Manage Action Three',
          'manage-action-4'       : 'Manage Action four',
          'manage-action-5'       : 'Manage Action five',
          'manage-action-6'       : 'Manage Action six',
          'manage-action-7'       : 'Manage Action seven',
          'manage-action-8'       : 'Manage Action eight',
          'manage-action-9'       : 'Manage Action nine'
    }
    return (actionitems)
  },

  actionLilstings: function() {
    var array = []
    var actions = this.adminActions()
    for (var i in actions) {
      array.push(
       	<span key={i}><li > 
       		<Link to={"/admin/"+i} >{actions[i]}</Link>
       		</li><hr/>
       	</span>
      )
    }
    return (
      <div className="admin-action-itms">
        <ul>{array}</ul> 
      </div>
   	)
  },

  render: function(){

   return(<div className="admin">
           {this.props.children}
           {this.actionLilstings()}
           </div>
         )
  }
})
export default Admin