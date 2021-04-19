import React from 'react';
import Header from './components/layouts/Header';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from "./routes/Routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>

      <Routes />
    </Router>
  );
}

export default App;
