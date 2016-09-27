import React from "react";
import axios from "axios"

var ShowItem = React.createClass({

 getInitialState: function() {
    return { 
      itemToDisplay:""
    };
  },

 componentDidMount: function() {
    var self = this;
    axios.get("http://localhost:4000/items/"+this.props.params.itemid+".json")
      .then(function (response) {   
          self.setState({
              itemToDisplay: response.data.item
          });
      })
  },

  displayItem: function(){
  	console.log(this.state.itemToDisplay.image)
  	var images = this.state.itemToDisplay.image
  	 var item = this.state.itemToDisplay
    /*this.state.itemToDisplay.map(function(item){
     console.log(item)
    })*/
    var imageArr = []
      for(var img in images){
        imageArr.push(<img src={"http://localhost:4000"+images[img]} />)
        console.log(img)
      }
      return(
    <div className= "item-desc"> 
     <div> 
      {item.title}
      </div>
      <div> {item.description}</div>
      <div className="item-img"> {imageArr}</div>
    </div>
   )
  },

render: function(){
	 
	return(<div>hieee {this.displayItem()}</div>)
}

})

export default ShowItem