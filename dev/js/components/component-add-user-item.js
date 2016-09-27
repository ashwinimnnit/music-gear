import React from "react"
import axios from "axios";
require('../../scss/style.scss');
var textType = ["text", "textarea"]

var AddUserItem = React.createClass({
  previewImage: function(e){
    console.log("image previe todo")
  },

  itemImages: function(){
	  var browseButton = []
	  for(var i=0 ; i<4; i++){
      browseButton.push(<div>
                          <input type="file" name="image[]" accept="image/*"
                                 as="file" onChange = {this.previewImage}/><img id ={i}/></div>)
	  }
	  return(<div className="add-itm-div">{browseButton}</div>)
  },

 

  // post user data
  postUserDeatils: function() {
    var url = "http://localhost:4000/user_profile/1/items.json";
    var formdata = new FormData();
    var inputs = document.getElementById("addItem-form");
    var self = this;
    for(var input in inputs) {
      if (inputs[input] ) {
        if (inputs[input].type == "file" && (typeof inputs[input].files[0] != "undefined")){
      			formdata.append(inputs[input].name, inputs[input].files[0])
      			
      	}
      	else if(textType.includes(inputs[input].type)) {      			
       	  formdata.append("item["+inputs[input].name+"]", inputs[input].value)
      	}
      }
    }
    axios({
      method: 'post',
      url: url,
      processData: false,
      contentType: false,
      data:  formdata,
    }).then(function (response) {
         if (response.data.item.status == 500){
   	   alert ("some error occured")
         }
   	 else if (response.data.item.status == 200){
   	  alert("item created")
         }
        {self.props.itemCreated}  
       })
  },

  addItemForm: function(){
    return(
            <form className = "add-itm-form" id ="addItem-form"
                   accept = "image/gif,image/jpeg, image/png" 
                   encType = "multipart/form-data">

             <input type="text" placeholder="title..." id = "title"
                    name = "title"  /> 
             <div className ="div-desc">
             <textarea type="text" placeholder="description" id = "description"
                       name = "description"/>
             </div>
             <div className="itm-image">
                  {this.itemImages()}
             </div>
             <input type = "button" value = "Add Item"
                    onClick ={() => this.postUserDeatils()} />        
            </form>
    )
  },

  render: function(){
    return(
       	    <div >{this.addItemForm()}</div>)
    }	
  })
 export default AddUserItem
