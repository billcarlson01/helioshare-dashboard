import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import carportImage from '../assets/unr-solar-hub.jpg';

const Dashboard = ({ userId }) => {
  const [stats, setStats] = useState({
    kwh: 0,
    dividends: 0,
    co2Saved: 0,
    carsShaded: 0,
    points: 0,
    communityGoal: { raised: 0, target: 0 },
    tokens: 0,
  });

  useEffect(() => {
    //axios.get(`http://localhost:3000/dashboard/${userId}`)
    //axios.get(`https://helioshare-env.eba-myem6xn6.us-east-2.elasticbeanstalk.com/dashboard/${userId}`)
    axios.get(`http://helioshare-env.eba-myem6xn6.us-east-2.elasticbeanstalk.com/dashboard/${userId}`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const tycoonProgress = (stats.points / 1000) * 100;
  const communityProgress = (stats.communityGoal.raised / stats.communityGoal.target) * 100;

  return (
    <div className="dashboard">
      <header>
        <h1>HelioShare Dashboard</h1>
      </header>
      <section className="carport-section">
        <div className="carport-image">
          <img src={carportImage} alt="UNR Solar Hub" />
          <div className="carport-label">UNR Solar Hub</div>
        </div>
        <div className="stats-box">
          <h2>Your `UNR50` at Work!</h2>
          <div className="stat"><span>⚡ kWh Produced:</span> {stats.kwh.toLocaleString()} this month</div>
          <div className="stat"><span>💰 Dividends:</span> ${stats.dividends.toFixed(2)} this month</div>
          <div className="stat"><span>🌍 CO2 Saved:</span> {stats.co2Saved.toFixed(1)} tons</div>
          <div className="stat"><span>🚗 Cars Shaded:</span> {stats.carsShaded}</div>
        </div>
      </section>
      <section className="gamification">
        <h3>Solar Tycoon Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${tycoonProgress}%` }}></div>
        </div>
        <p>Level 1: {stats.points.toLocaleString()}/1,000 Points</p>
      </section>
      <section className="community-goal">
        <h3>Community Goal: Fund the Swim Team</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${communityProgress}%` }}></div>
        </div>
        <p>${stats.communityGoal.raised.toLocaleString()} / ${stats.communityGoal.target.toLocaleString()}</p>
      </section>
      <section className="actions">
        <h3>Your Tokens: {stats.tokens.toLocaleString()} `UNR50`</h3>
        <button className="action-btn">Trade `UNR50`</button>
        <button className="action-btn">Gift `UNR50`</button>
      </section>
    </div>
  );
};

export default Dashboard;