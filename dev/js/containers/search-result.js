import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Router, Route, Link, NavLink, browserHistory, IndexRoute  } from 'react-router'

import SearchList from "../actions/get-user-search-result"

var SearchResult = React.createClass({ 

 suggestionList: function(){
    console.log("-------------------------1-------------------------")
    console.log(suggestions)
    console.log("------------------------2-----------------")
	  this.props.list.map(function(item){
        return ((<li key = {item.id}> {topic.title}</li>)


	  })
  },

 render: function(){
   return (
        <div>heheheheheeh {this.suggestionList()} </div>
   )
 }

})

function mapStateToProps(state) {

	
    return {
        list: state.searchResult
    };
}



export default connect(mapStateToProps)(SearchResult) ;