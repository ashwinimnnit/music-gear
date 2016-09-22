import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk";
import axios from "axios";
import UserProfile from "./components/component-user-profile"

// thunk middleware allowes us to dispatch async actions
/*const store = createStore(
      (state = {}) => state,
      applyMiddleware(thunk)
	);
*/
ReactDOM.render(<div > <UserProfile/></div>, document.getElementById('root'));
