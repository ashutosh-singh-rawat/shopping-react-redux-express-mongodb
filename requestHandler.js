"use strict"
import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {createStore} from 'redux';

import reducers from './src/reducers';
import routes from './src/routes';

function handleRender(req, res){
  axios.get('http://localhost:3001/books')
    .then(function(response){
      // var myHtml = JSON.stringify(response.data);
      // res.render('index', {myHtml});

      //SETP 1: CREATE A REDUX STORE ON THE SERVER
      var initial_state_data = {books: {books: response.data}};
      const store = createStore(reducers, initial_state_data);
      //SETP 2: GET INITIAL STATE FROM THE STORE
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g, '<\\!--');
      //SETP 3: IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTS AND DEFINED WHAT TO DO WITH THEM
      const Routes = {
        routes: routes,
        location: req.url
      }
      match(Routes, function(err, redirect, props) {
        if(err){
          res.status(500).send("Error fulfilling the request");
        }else if(redirect){
          res.status(302, redirect.pathname + redirect.search)
        }else if(props){
          const reactComponent  = renderToString(
            <Provider store={store}>
              <RouterContext {...props}/>
            </Provider>
          )
          res.status(200).render('index', {reactComponent, initialState});
        }else{
          res.status(404).send('Not Found');
        }
      })
    })
    .catch(function(err){
      console.log('#initial Server-Side rendering error', err);
    })

}

module.exports = handleRender;
