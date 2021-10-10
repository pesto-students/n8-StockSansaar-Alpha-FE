import React from "react";
import routes from "./routes";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TopNav from "./components/organisms/Header";
require("dotenv").config();
function App() {
  return (
    <div className="App">
      <TopNav />
      <BrowserRouter>
        <Switch>
          {routes.map((route: any) => (
            <Route {...route}></Route>
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
