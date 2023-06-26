import React from 'react';
import './Home.css';
import HomeStatistics from './HomeStatistics';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Home page!</h1>
      <h2 className="home-description">Observe the general statistics about the lottery from this page.</h2>
      <h2 className="home-description">For buying a new ticket or managing your balance, please use the navigation bar!</h2>
      <HomeStatistics />
    </div>
  );
};

export default Home;
