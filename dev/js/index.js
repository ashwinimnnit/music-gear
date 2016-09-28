/*import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import UserProfile from "./components/component-user-profile"
import ItemDetails from "./components/component-item-details"
import SearchItems from "./components/component-search-items"


import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

// thunk middleware allowes us to dispatch async actions
/*const store = createStore(
      (state = {}) => state,
      applyMiddleware(thunk)
	);
*/
/*ReactDOM.render ((
  <div >
   <UserProfile/>
  </div>, document.getElementById('root')
));*/


/*ReactDOM.render((
  <Router history={browserHistory}>
    <Route>
    <Route path="/" component={UserProfile}/>
      <Route path="/item/:item_id" component={ItemDetails}/>
      </Route>
  </Router>
), document.getElementById('root'))*/
/*
ReactDOM.render((
  <Router>
    <Route path="/" component={UserProfile}>
      <Route path="/search" component={SearchItems}>
      <Route path="item" component={ItemDetails}/>
      </Route>
    </Route>
  </Router>
),document.getElementById('root'))*/






import React from 'react'
import { render } from 'react-dom'
import UserProfile from "./components/component-user-profile"
import MyItems from "./components/component-myItems"
import SearchUi from "./components/component-search-items"
import AddUserItem from "./components/component-add-user-item"
import ShowItem from "./components/component-show-item"
import { Router, Route, Link , browserLocation, browserHistory} from 'react-router'


render((
  <Router history={browserHistory}>
    <Route path="/" component={UserProfile} >
      <Route path="/myitems" component={MyItems} />
       <Route path="/additem" component={AddUserItem} /> 
         <Route component={SearchUi}>
           <Route path="/item/:itemid" component={ShowItem} />
        </Route>
    </Route>
  </Router>
), document.getElementById('root'))