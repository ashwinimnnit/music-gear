import React from "react";
import axios from "axios";
import SearchApiCall from "../actions/get-user-search-result";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Router, Route, Link, NavLink, browserHistory, IndexRoute  } from 'react-router'

var UserSearchResult = React.createClass({ 

  search: function(e){
    var url = "http://localhost:4000/search.json"
	var self = this
	axios({
      method: 'post',
      url: url,
      data:  {query: e.target.value  },
   	}).then(function (response) {
          console.log(response.data)

       })
  },
   
 

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
    var suggestionList = this.props.list.payload
    var list = []
     if (suggestionList == null){
        return(null)
      }
     else if (suggestionList.length > 0 ){
       suggestionList.map(function(item){
       list.push(<li key={item.id} className ="sugg-list">
       <Link to={"/item/"+item.id}>
          {item.title}</Link></li>)
       })
       return (<ul className ="search-list"> {list}</ul>)
     }
  },


  render: function(){
   return (
      <div> {this.searchBox()} {this.suggestionList()} </div>
   	)
  }

})

function matchDispatchToProps(dispatch) {
  console.log("------------matchDispatchToProps---------------")
  return bindActionCreators({searchApiCall: SearchApiCall}, dispatch)
 
}

function mapStateToProps (state){
  console.log("mapstatetoprops---------------------------")
  console.log("current state is: ", state.searchResult)
    return {
        list: state.searchResult
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(UserSearchResult)