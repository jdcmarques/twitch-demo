import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { MainContainer } from "./Utils/ImportsContainer";
class App extends Component {
  render() {
    return (
      <Route path="/" component={MainContainer}></Route>
    );
  }
}

export default App;
