import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Tickets from './Tickets';
import Statistics from './Statistics';
import Balance from './Balance';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/balance" element={<Balance />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
