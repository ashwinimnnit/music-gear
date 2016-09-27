import React from "react";	
require('../../scss/style.scss');
import axios from "axios"
import { Router, Route, Link, NavLink, browserHistory, IndexRoute  } from 'react-router'


var SearchItems = React.createClass({
  getInitialState: function(){
    return{
  	  searchResultArrived: false,
  	  searchResult: []
	}
  },

  suggestionList: function(){
    var suggestions = this.state.searchResult
	var list = []
    for(var item in suggestions){
      list.push(<li key ={item} className ="sugg-list" activeClassName="active">
      	        <Link to={"/item/"+suggestions[item].id} onlyActiveOnIndex={true}>
      	              {suggestions[item].title}
      	        </Link></li>
      )
    }
    return(<ul className ="search-list">
    	       {list}
   		   </ul>
    ) 
  },

  search: function(e){
    var url = "http://localhost:4000/search.json"
	var self = this
	axios({
      method: 'post',
      url: url,
      data:  {query: e.target.value  },
   	}).then(function (response) {
         self.setState({ searchResultArrived: true,
                         searchResult: response.data.result

         })
   	   })
  },

  searchBox: function(){
    return(<div>
             <input type ="text" 
       			    className ="search-btn"
       			    onChange = {this.search}
       			    placeholder ="what are you looking for" />
        	 <img src ="http://localhost:3000/images/search1.png"
        		  className="search-img"/>
            </div>
	)
  },

  render: function(){
  	console.log("------------SearchItems")
    if (this.state.searchResultArrived){
	  return(<div>
               {this.searchBox()}
               {this.suggestionList()}
             </div>
	  )
	}
	else {
	  return(<div>
               {this.searchBox()}
               {this.props.children}
             </div>
	  )
	}	
  }
})
export default SearchItems
