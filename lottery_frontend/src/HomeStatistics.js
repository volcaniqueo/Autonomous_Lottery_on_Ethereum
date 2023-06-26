import React, { useEffect, useState } from 'react';
import './HomeStatistics.css';
import StatisticWidget from './StatisticWidget';
import { initializeWeb3Instance } from './Web3Instance';

const HomeStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const [totalMoneyCollected, setTotalMoneyCollected] = useState(0);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const { web3, contractInstance } = initializeWeb3Instance();

        // Get current lottery numbers
        const block = await web3.eth.getBlock('latest');
        const time = block.timestamp;
        const currentLotteryNos = await contractInstance.methods.getLotteryNos(time).call();
        setLotteryNumbers(currentLotteryNos);

        // Get total money collected
        const lotteryNo = currentLotteryNos[0];
        const totalLotteryMoney = await contractInstance.methods.getTotalLotteryMoneyCollected(lotteryNo).call();
        setTotalMoneyCollected(totalLotteryMoney/10**18);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  return (
    <div className="statistics-container">
      {loading ? (
        <p>Loading statistics...</p>
      ) : (
        <>
          <StatisticWidget
            title="Current Purchase Lottery No"
            description={`We are in the purchasing phase for lottery no ${lotteryNumbers[0]}`}
            number={lotteryNumbers[0]}
          />
          <StatisticWidget
            title="Current Reveal Lottery No"
            description={`We are in the reveal phase for lottery no ${lotteryNumbers[1]}`}
            number={lotteryNumbers[1]}
          />
          <StatisticWidget
            title="Total Money Collected"
            description={`For Lottery ${lotteryNumbers[0]}, ${totalMoneyCollected} ETH is collected`}
            number={totalMoneyCollected}
          />
        </>
      )}
    </div>
  );
};

export default HomeStatistics;
