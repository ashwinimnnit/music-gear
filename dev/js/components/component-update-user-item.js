import React from "react";
import axios from "axios";
var fd = new FormData();

var UpdateUserItem = React.createClass({ 
  getInitialState: function() {
    return {
      isupdateclicked: false,
      image: []
    };
  },

  handleUpdate: function(){
    fd.append("item[title]" , document.getElementById("title").value)
    fd.append("item[description]", document.getElementById("description").value)
   	var self = this;
   	var url = "http://localhost:4000/user_profile/1/items/"+this.props.itemtoupdate.id+".json"
   	axios({
      method: 'put',
      url: url,
      processData: false,
      contentType: false,
      data:  fd,
   	}).then(function (response) { 
         self.props.onItemUpdation(response.data.msg.item)
       }).catch(function (error) {
     	    alert("some error occured");
          });;
  },	

  setImageparams: function(e){
    fd.append("image["+e.target.id+"]", 
 			   document.getElementById(e.target.id).files[0]);

  },

  imageUpdation: function(){
    var item = this.props.itemtoupdate
    var  arr = []
    for (var thumbId in item.thumbnail){
      arr.push(
       		   <div className ="wrap">
       		   <img src={"http://localhost:4000"+item.thumbnail[thumbId]} key= {"img"+thumbId} />
       		   <input type="file" id = {thumbId}
       			      name="item_image[]" accept="image/*" 
       			      as="file" onChange = {this.setImageparams}/></div> 
      )
    }
    return (<div className =	"container"> {arr}</div>)
  },


   editForm: function() {
    var item = this.props.itemtoupdate
    return(
    	   <form className = "update-form" id ="update-form"
                 accept = "image/gif,image/jpeg, image/png" 
                 encType = "multipart/form-data">

 	          <input type="text" placeholder="title..." id = "title"
 	                 name = "title" defaultValue ={item.title} /> 
 	        <div>
 	          <textarea type="text" placeholder="description" id = "description"
 	                    defaultValue = {item.description} 
 	                    name = "description"/>
 	        </div>
 	        <div>   
 	         {this.imageUpdation()}
 	        </div>
 	        <input type = "button" value = "Update"
 	               onClick ={this.handleUpdate} id = {item.id} />	       
 	       </form>
 	)
  },


  render: function() {
      return(this.editForm())
  }
})
export default UpdateUserItem;
