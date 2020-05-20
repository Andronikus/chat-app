import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Join, Chat } from "./pages";
import UserProvider from "./providers";

import "./App.css";

function App() {
  return (
    <div className="layout">
      <BrowserRouter>
        <UserProvider>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
