import React, { useEffect, useState } from 'react';
import config from '../../config';

const Stats = ({ gameName }) => {
  const [stats, setStats] = useState(0);

  const getServerStats = () => {
    const requestOptions = { method: 'GET' };
    
    fetch(`${config.apiUrl}/serverstats?gameUsers=true`, requestOptions)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      resJson["activeRooms"].forEach(gameStatObj =>  {
        if (gameStatObj._id === gameName) {
          setStats(gameStatObj.total);
          return;
        }
      });
    });
  }

  useEffect(() => {
    const interval = setInterval(getServerStats, 1000);

    // cleanup
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="stats" style={{color: "green", marginBottom: "50px", marginTop: "-10px"}}>
      {`There are ${stats} other users playing ${gameName} right now`}
    </div>
  );
};

export default Stats;
