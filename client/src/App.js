import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Join, Chat } from "./components";

import "./App.css";

function App() {
  return (
    <div className="layout">
      <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </BrowserRouter>
    </div>
  );
}
export default App;
