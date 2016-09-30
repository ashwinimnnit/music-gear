import React from "react";
import axios from "axios"
import UpdateUserItem from "./component-update-user-item"
var MyItems = React.createClass({

 getInitialState: function() {
    return {
      items: '',
      itemtoupdate: "",
      IsEditClicked: false,
      isItemUpdated: false
    };
  },

  onItemUpdation: function(updateItem){
  	var id = updateItem.id
  	var temp = this.state.items
  	temp[id] = updateItem
  	this.setState({items: temp,
    itemtoupdate: "",
    IsEditClicked: false
  	})
  },

 componentDidMount: function() {
    var self = this;
    axios.get("http://localhost:4000/user_profile/1/items.json")
      .then(function (response) {   
          self.setState({
              items: response.data.items
          });
      })
  },	

  handleEdit: function(e){
  	 var temp = this.state.items[e.target.id]
     this.setState({
       IsEditClicked: true,
       itemtoupdate: temp
     })
    
  },

   itemlisting: function() {
    var user_item = this.state.items
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
                     <img src={"http://localhost:4000"+item_images[img_path]} className="item-images"
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

  geteditform: function() {
    return (<div className = "edit-form" >
            <UpdateUserItem itemtoupdate = {this.state.itemtoupdate} 
                            onItemUpdation = {this.onItemUpdation}/>
            </div>
    )
},

  render: function(){
    return(
      <div className="item-list">{this.itemlisting()}</div>
    )
  }
})
export default MyItems