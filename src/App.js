import React, { Component } from "react";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
require('dotenv').config()



class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </>
    );
  }
}
export default App;
