import React from "react";
import axios from "axios"

var AdminSearch = React.createClass({
 
   getInitialState: function() {
      return { 
      searchresult: "",
      issuggestionArrived: false
     } 
   },

  searchBox: function(){
    return(
      <div className="admin-srch">
        <input type="text"  placeholder="search recommemded items" onChange = {this.search}/>
      </div>
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
         self.setState({
         	             searchresult: response.data.result,
                         issuggestionArrived: true
         })
   	   })
   },


   stickersGenerator: function(e){
    this.props.recommendedItemStickers(e) 
    
   },

   listingSuggestion: function(){
    var data = this.state.searchresult
     var array = []
     for(var i in data){
       array.push(
        <li key = {data[i].id} >
        <input type="checkbox" name = {data[i].title}
               value= {data[i].id} onClick={this.stickersGenerator}/>
         {data[i].title}</li>
       	)

     }
     if (array.length > 0){
       return (<div className="ld-i"><ul>{array}</ul></div>)
     }
   },


 render: function(){
 	if(this.state.issuggestionArrived && this.state.searchresult != null){
 	return (
      <div >
        {this.searchBox()}
        {this.listingSuggestion()}
      </div>
    )
    }
    else{
     return (
      <div> 
        {this.searchBox()}
      </div>
    )

    }
 }

})

export default AdminSearch

	