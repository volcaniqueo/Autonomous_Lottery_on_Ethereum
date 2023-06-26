import React from 'react';
import './HomeStatistics.css';

const StatisticWidget = ({ title, description, number }) => {
  return (
    <div className="statistic-widget">
      <h2>{title}</h2>
      <p>{description}</p>
      <p class="number">{number}</p>
    </div>
  );
};

export default StatisticWidget;
