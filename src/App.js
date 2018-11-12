import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { MainContainer } from "./Utils/ImportsContainer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Route path="/" component={MainContainer}></Route>
      </div>
      
    );
  }
}

export default App;
