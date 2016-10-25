import React from "react";
import axios from "axios";
import SearchApiCall from "../actions/get-user-search-result";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Router, Route, Link, NavLink, browserHistory, IndexRoute  } from 'react-router'
import DisplayItemAction from "../actions/display-item"

var UserSearchResult = React.createClass({ 

  searchBox: function(){
     return(<div className="divsearchbar">
            <input type ="text" className ="search-btn"
            onChange = {this.props.searchApiCall} 
            placeholder ="what are you looking for" />
            <img src ="http://localhost:3000/images/search1.png"
                 className="search-img"/>
             {this.spinningBar()}          
            </div>
     )
  },

  spinningBar: function(){
    if (this.props.list.isFetching ){
      return(<img src="http://localhost:3000/images/spinner.gif"
                  className="search-img spinner-img"/>)
    }
    else {
      return(<div></div>)
    }
  },
 
  suggestionList: function(){
    var self = this
    var suggestionList = this.props.list.payload
    var list = []
     if (suggestionList == null){
        return(null)
      }
     else if (suggestionList.length > 0 ){
       suggestionList.map(function(item){
       list.push(<li key={item.id} className ="sugg-list"
        onClick={self.getItemonclick.bind(self, item)}>
       <Link to={"/item/"+item.id} >
          {item.title}</Link></li>)
       })
       return (<ul className ="search-list"> {list}</ul>)
     }
  },
  
  getItemonclick: function(item){
    var self = this;
    axios.get("http://localhost:4000/items/"+item.id+".json")
      .then(function (response) { 
        self.props.displayItemAction(response.data.item)
      })
  },

  render: function(){
   return (
      <div>
      {this.searchBox()} {this.suggestionList()} 
      </div>
   	)
  }

})

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    searchApiCall: SearchApiCall,
    displayItemAction: DisplayItemAction

  }, dispatch) 
}

function mapStateToProps (state){
    return {
        list: state.searchResult
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(UserSearchResult)