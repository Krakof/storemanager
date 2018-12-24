import React, { Component } from "react";
import "./App.scss";
import StoreContainer from "./components/store/StoreContainer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      storeList: []
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Store manager</h1>
        <StoreContainer />
      </div>
    );
  }
}

export default App;
