import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';
const createHistory = createBrowserHistory;
const storeEnhancers = [reduxReactRouter({createHistory})];


let combinedCreateStore = compose(...storeEnhancers)(createStore);

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(combinedCreateStore)

const combinedReducer = combineReducers(Object.assign({
  router: routerStateReducer
}, reducers))

export default function configureStore(initialState) {


  const store = createStoreWithMiddleware(combinedReducer, initialState);



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
