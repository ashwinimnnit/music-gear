import React from "react";
import axios from "axios";
import {bindActionCreators} from 'redux';
import MyItemsActionCreator from "../actions/get-myitems"
import UpdateUserItem from "../components/component-update-user-item"
import UpdateMyItem from "../actions/update-my-items"
import {connect} from 'react-redux';
import $ from "jquery"

var MyItemsContainer = React.createClass({

   getInitialState: function() {
    return {
      items: '',
      itemtoupdate: "",
      IsEditClicked: false,
      isItemUpdated: false
    };
  },

   componentDidMount: function() {
    this.props.getMyItems(1)
   },

   itemlisting: function() {
    console.log("******my*itemlisting**********", this.props.myitems)
    var user_item = this.props.myitems
    var itemdiv = []
    for( var itemId in user_item) {
      var indents = [];
        indents.push(<h4  key = {user_item[itemId].id} className ="itm-title">
                     {user_item[itemId].title}</h4>)
          
      var item_images = user_item[itemId].images
      for(var img_path in item_images) {
        indents.push(<div className ="itm-up" key = {img_path}>
                     <img src={"https://rentmymusic.herokuapp.com"+item_images[img_path]} className="item-images"
                          id={"itmimg-"+img_path} onMouseOver = {this.mouseOver}  />
                     </div>   
        )
      }
        indents.push(<div className ="desc" > 
                          {user_item[itemId].description}
                     </div>
        )
      indents.push(<div>
                   <div className="btn ed" type="button"
                           onClick={this.handleEdit.bind(this, itemId)} id ={itemId} > 
                           Edit Item</div>
                   <br/></div>
      )
      itemdiv.push(<div rel={itemId}>
                        {indents}
                   </div>
      )
      if (this.state.itemtoupdate.id == itemId) {
        itemdiv.push(this.geteditform())                
      }
      itemdiv.push(<hr/>)
    }
    console.log("my-item-div", itemdiv)
    return itemdiv;
  },
  
   onItemUpdation: function(updateItem){
  	var id = updateItem.id
  	var temp = this.props.myitems
  	temp[id] = updateItem
  	this.props.updateMyItem(temp)
  	this.setState({
    itemtoupdate: "",
    IsEditClicked: false
  	})
  },

  handleEdit: function(itemId){
  	 var temp = this.props.myitems[itemId]
     this.setState({
       IsEditClicked: true,
       itemtoupdate: temp
     })
  },

  
  geteditform: function() {
    return (<div className = "edit-form" id = "edit-form">
            <UpdateUserItem itemtoupdate = {this.state.itemtoupdate} 
                            onItemUpdation = {this.onItemUpdation}/>
            </div>
    )
  },

   render: function(){
     return (
       <div> {this.itemlisting()}
       </div>

     )
   }

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getMyItems: MyItemsActionCreator,
                             updateMyItem: UpdateMyItem}, dispatch) 
}

function mapStateToProps (state){
    return {
        myitems: state.myitems
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(MyItemsContainer)
