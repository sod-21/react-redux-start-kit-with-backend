import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "idempotent-babel-polyfill"
import './styles/style.css';
import store from './stores';
import App from "./Component/App";


const MyApp = () => (
    <Provider store={store}>
		  <App></App>
    </Provider>
)

ReactDOM.render(MyApp(), document.getElementById("app"))
