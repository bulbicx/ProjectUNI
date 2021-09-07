import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import ScrollToTop from './ScrollToTop'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { history } from './redux/helpers/history'

const store = ConfigureStore()

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
)

// If you want the app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
