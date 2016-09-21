var UserItem = React.createClass({

  getInitialState: function() {
    return {
      name: ''
    };
  },

   customcomponentDidMount: function() {
    this.serverRequest = $.get("/user/"+this.props.props_user+"/items", function (data) {
      this.setState({
        name: data.item
      });
    }.bind(this));
  },
 

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  /*componentWillUpdate: function() {
  }*/

  render: function() {
    return (
      <div>
        <div className='btn'onClick={()=>{this.customcomponentDidMount()}} > My Items</div>
        <UseritemListing name={[this.state.name]}/>
      </div>
    );
  }
});


