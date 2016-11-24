import React from "react";
import axios from "axios";
import UpdateUserItem from "./component-update-user-item"

var UserItems = React.createClass({
  getInitialState: function() {
    return {
      IsEditClicked: false,
      itemtoupdate: ""
    };
  },

  resetEditClick: function(){
    this.setState({IsEditClicked: false})
  },

  handleEdit: function(e){
   var itemtoupdate = this.props.items[e.target.id]
   this.setState({
            IsEditClicked: true,
            itemtoupdate: itemtoupdate
        });
  },


  prepareHtml: function() {
    var user_item = this.props.items
    var itemdiv = []
    for( var itemId in user_item) {
      var indents = [];
      if (!this.state.IsEditClicked) {
        indents.push(<h4 className ="itm-title">
                     {user_item[itemId].title}</h4>)
         
      }  
      var item_images = user_item[itemId].images
      for(var img_path in item_images) {
        indents.push(<div className ="itm-up">
                     <img src={"http://rentmymusic.herokuapp.com"+item_images[img_path]} 
                          id={"itmimg-"+img_path} onMouseOver = {this.mouseOver}  />
                     </div>   
        )
      }
      if (!this.state.IsEditClicked) {
        indents.push(<div className ="desc"> 
                          {user_item[itemId].description}
                     </div>
        )
      }
      indents.push(<div>
                   <button className="btn ed" type="button"
                           onClick={this.handleEdit} id ={itemId} > 
                           Edit Item</button>
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
    return itemdiv;
  },

  geteditform: function(){
    return (<div className = "edit-form" >
            <UpdateUserItem updateuseritem = {this.UpdateUserItem}
                            IsEditClicked = {this.state.IsEditClicked}
                            itemtoupdate = {this.state.itemtoupdate} 
                            itemUpdated = {this.props.itemUpdated}
                            resetEditClick = {this.resetEditClick} />
            </div>
    )
  },

  useritems: function() {
    var useritemlist =  this.props.items != "" ? this.prepareHtml() : ""
    return useritemlist;
  },

  render: function() {
    return (<div>
              {this.useritems()}        
            </div>
    );
  }
});
export default UserItems;
