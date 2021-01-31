import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store'
import './index.css';
import { userAdded, userLogin } from './actions/actions'
import App from './pages/App/App';

store.dispatch(userAdded("User1"));
store.dispatch(userLogin(1));

// subscribe gives updates, getState gets 'new' status maintaining functions in reducer pure
const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
})

// when user "registers" we dispatch an action, 'store.js' will call reducer, give current state and action,
// based on type of action we will get the NEW state, being 'New User'
store.dispatch({
  type: actions.USER_ADDED,
  payload: {
    description:"User1"
  }
});

// prevents memory leaks
unsubscribe();
store.dispatch({
  type: actions.USER_REMOVED,
  payload:{
    id: 1
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

