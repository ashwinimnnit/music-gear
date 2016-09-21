var UsernewAddress = React.createClass({
  render: function (){
    return(
    <div className= "address">
        House no:<input type="text" name="address[house_num]" / ><br/>
        Street:<input type="text" name="address[street]"/ ><br/>
        City:<input type="text" name="address[city]" /><br/>
        Phone number:<input type="text" name="address[phone_num]" /><br/>
      </div>
    )
 
  }

})
