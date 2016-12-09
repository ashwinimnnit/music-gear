import React from "react";
import axios from "axios"

var DisplayMappedItems = React.createClass({

  getInitialState: function() {
    return { 
      stickers:""
    };
  },

  parentStickerGenerator: function(e){
    var allSticker = this.props.parentstickers
   	var array =[]
   	if (allSticker.length > 0) {
   	  allSticker.map(function(value){
        array.push(
          <div key = {value.value} className ="stickers">
          <img src="https://blooming-thicket-10058.herokuapp.com/src/images/cross-x.png" className="delete-btn"/>
          <span > {value.name}</span>
          <input type = "hidden" name = "parent_item[]" value = {value.value}/>
          </div>
        )
   	  })
    return(array)
    }
  },

  recommendedStickerGenerator: function(){
    var allSticker = this.props.recommendeditems
   	var array =[]
   	if (allSticker.length > 0) {
   		allSticker.map(function(value){
          array.push(
            <div key = {value.value} className ="childstickers">
            <img src="https://blooming-thicket-10058.herokuapp.com/src/images/cross-x.png" className="delete-btn"/>
            <span > {value.name}</span>
            <input type = "hidden" name = "recommended_item[]" value = {value.value}/>
            </div>
          )

   		})
    return(array)
    }
  },

  submitForm: function(e){
    var formdata = new FormData(document.getElementById('admin-map-items'))
    var url = "http://localhost:4000/apis/admin/map_recommended_items.json"
    var self = this
    axios({
      method: 'post',
      url: url,
      processData: false,
      contentType: false,
      data:  formdata,
    }).then(function (response) {
    	self.props.clearView()
        alert("item mapped")
       })
      .catch(function (error) {
         alert(error);
      })
  },

  form: function(){
    return(
      <div className="item-recommendedItems" >
        <form id = "admin-map-items">
          <div className="parent-itm"> {this.parentStickerGenerator()}</div>
          <hr/>  
          <div className="recommemded-itms"> {this.recommendedStickerGenerator()}</div>
          <input type="button" value="Submit" className="adminbtn" onClick ={this.submitForm} />
        </form>
      </div>
    )
  },

  render: function(){
    return(
      <div>{this.form()}
      </div>
    )
  }
})
export default DisplayMappedItems;
