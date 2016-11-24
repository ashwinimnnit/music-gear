import React from "react";
import SearchApiCall from "../actions/get-user-search-result";
import DisplayItemAction from "../actions/display-item";
import RecommendedItems from "./container-recomended-items"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from 'react-select';
import axios from "axios"
import { Router, Route, Link } from 'react-router'
import ShowItemDetails from "./container-show-item"
import RecommendedItemAction from "../actions/recommended-item-action"


var UserSearch = React.createClass({

  getInitialState: function(){
    return {
      itemId: this.props.itemId
    }
  },

  searchBox: function(){
     return (
       <div>
        <Select.Async onChange = {this.handleOnChange}
                      name="form-field-name"
                      loadOptions = {this.getoptions} />
        <img src ="https://blooming-thicket-10058.herokuapp.com/src/images/search1.png" 
             className="search-img"/></div>
      )
  },
   
   fetchingData: function (value) {
    var url = "https://rentmymusic.herokuapp.com/search.json"
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

  handleOnChange: function (value) {
   var self = this
   window.history.pushState("", "", "/item/"+value.value+"");
   this.setState({itemId: value.value})
    axios.get("https://rentmymusic.herokuapp.com/items/"+value.value+".json")
      .then(function (response) {
         self.props.displayItemAction(response.data.item)
         self.props.recommendedItemAction(value.value)
      })
   },

   render: function(){
      return (
        <div>
          {this.searchBox()}
          <div className= "item-desc-wrapper">
          < ShowItemDetails itemId= {this.state.itemId} />
          </div>
        </div>
      )
  }
})

function matchDispatchToProps(dispatch) {

  return bindActionCreators({ displayItemAction: DisplayItemAction,
                              recommendedItemAction: RecommendedItemAction},
                              dispatch
                            ) 
}

function mapStateToProps (state){
    return {
        list: state.searchResult,
        itemToDisplay: state.displayItem
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(UserSearch)
