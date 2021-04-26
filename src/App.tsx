import React, { useEffect } from 'react';
import Header from './components/layouts/Header';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from "./routes";
import { useGithubContext } from './context/GithubProvider';
import DataLoader from './components/DataLoader';

function App() {
  const { fetchData, fetchingData } = useGithubContext();

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      {fetchingData && <DataLoader isUpdating={false}/>}
      <div className="container">
        <div className="context-wrapper">
          <Routes />
        </div>
      </div>
    </Router>
  );
}

export default App;
