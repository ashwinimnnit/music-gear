import React from "react";
import SearchApiCall from "../actions/get-user-search-result";
import DisplayItemAction from "../actions/display-item";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from 'react-select';
import axios from "axios"


var UserSearch = React.createClass({

  getInitialState: function(){
    return {
    showItemDetailFlag: false
  }
  },

  searchBox: function(){
     return (
       <div>
        <Select.Async onChange = {this.handleOnChange}
                      name="form-field-name"
                      loadOptions = {this.getoptions} />
        <img src ="http://localhost:3000/images/search1.png" 
             className="search-img"/></div>
      )
  },
   
   fetchingData: function (value) {
    var url = "http://localhost:4000/search.json"
    return(axios({
        method: 'post',
        url: url,
        data:  {query: value  }
      }))
  },

  getoptions: function(value) {
    var self = this
    return this.fetchingData(value)
      .then( function (response) {
      return {options: self.searchSuggestion(response.data.result)}    
    })
  },

  searchSuggestion: function(data){
     var array = []
     var self = this
     data.map(function (item) {
       var hash = {}
       hash['value'] = item.id
       hash['label'] = item.title
       array.push(hash)
    })
    return array
  },

  displayItem: function(){
    console.log("****", this.props.itemToDisplay)
    var images = this.props.itemToDisplay.payload.image
    var item = this.props.itemToDisplay.payload
    var imageArr = []
      for(var img in images){
        imageArr.push(<img key= {images[img]} className = "item-img" src={"http://localhost:4000"+images[img]} className="item-images" />)
      }
      return(
     <div className= "item-desc"> 
     <h2> 
      {item.title}
      </h2>
      <div> {item.description}</div>
      <div className="divitem-img"> {imageArr}</div>
      <div className ="raise-btn"> Send Rent Request</div>
    </div>
   )
 },

  handleOnChange: function (value) {
    this.setState({itemId: value.value})
    window.history.pushState("", "", "/item/"+value.value+"");
    var self = this;
    axios.get("http://localhost:4000/items/"+value.value+".json")
      .then(function (response) {
        self.props.displayItemAction(response.data.item)
         self.setState({showItemDetailFlag: true})
      })
   },

   render: function(){
    console.log("search -box render")
    if (this.state.showItemDetailFlag){
      return (
        <div>
          {this.searchBox()}
          <div className = "item-desc-wrapper">
           {this.displayItem()}
           </div>
        </div>
        )
    }
    else {
      return (
        <div>
          {this.searchBox()}
        </div>
      )
    }
  }
})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({displayItemAction: DisplayItemAction}, dispatch) 
}

function mapStateToProps (state){
  console.log("mapto sate prp-----", state.displayItem)
    return {
        list: state.searchResult,
        itemToDisplay: state.displayItem
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(UserSearch)
