
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import UserProfile from "./components/component-user-profile"
import MyItems from "./components/component-myItems"
import Search from "./components/component-search-items"
import AddUserItem from "./components/component-add-user-item"
import RecommendedItems from "./containers/container-recomended-items"
import ShowItem from "./components/component-show-item"
import Layout from "./components/component-layout"
import { Router, Route, Link , browserLocation, browserHistory} from 'react-router'
import Admin from "./components/component-admin"
import ManageRecommendedItems from "./components/manage-recommended-items"
import {createStore, applyMiddleware} from "redux" 
import allReducers from "./reducers/store"
import thunk from 'redux-thunk';

const store = createStore(allReducers,
   applyMiddleware(thunk)

  )


render((
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route  component={Layout} >
    <Route path="/item/:itemid" component={Search} />
        <Route path="/admin" component={Admin} >
        <Route path ="/admin/manage-recomeded-items"
         component={ManageRecommendedItems}/>
        </Route>
        <Route path="/" component={UserProfile} >  
            <Route path="/myitems" component={MyItems} />
            <Route path="/additem" component={AddUserItem} />
        </Route>
    </Route>
  </Router>
  </Provider>
), document.getElementById('root'))
