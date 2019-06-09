import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import FastClick from 'fastclick';

import store from './redux/store'

import Main from './containers/main/main';

FastClick.attach(document.body);

ReactDOM.render((
    <Provider store={store}>
        <Main />
    </Provider>
), document.getElementById("root"));