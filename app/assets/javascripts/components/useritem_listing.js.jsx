var UseritemListing = React.createClass({
  render: function () {
   var divStyle = { marginLeft: 106,position: 'relative'}
   var itemdiv = []
    user_item = this.props.name[0]
    for( var key in user_item) {
      var indents = [];
      indents.push(<div>{user_item[key].name}</div>)
      indents.push(<div style={divStyle}>{user_item[key].description}</div>)
      item_images = user_item[key].images

      for(var img_path in item_images) {
        indents.push(<img  src={item_images[img_path]} id={img_path}/>)
      }

      indents.push(<div><button className="btn ed" type="button"> Edit </button><hr/><br/></div>)
      itemdiv.push(<div> {indents}</div>)
    }
   return (
    <div>
     {itemdiv}
    </div>
   )
  },
 
});
