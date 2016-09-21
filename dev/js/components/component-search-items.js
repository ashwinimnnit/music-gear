import React from "react";	
require('../../scss/style.scss');
import axios from "axios"

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
       list.push(<li className ="sugg-list">{suggestions[item]}</li> )
     }
  return(
   		<ul className ="search-list">
    	  {list}
   		</ul>
  ) 
 
},

search: function(e){
    var url = "http://localhost:4000/search.json"
	console.log(e.target.value)
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
    return(
		<div>
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

	if (this.state.searchResultArrived){
		console.log("yyyyyyyyyyyyyyyyyyyyy")
	  return(
	  	<div>
        {this.searchBox()}
        {this.suggestionList()}
        </div>
	  )
	}

	else{
	 return(
	 	<div>
        {this.searchBox()}
        </div>
	 )
	}	
}

})

export default SearchItems
