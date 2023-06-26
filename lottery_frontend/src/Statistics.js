import React from 'react';
import Accordion from './Accordion';
import { initializeWeb3Instance } from './Web3Instance';

const Statistics = () => {
  const handleGetWinningTicket = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const ticketTypeValue = event.target.elements.ticketType.value;
      const lotteryNo = event.target.elements.lotteryNo.value;
      let ticketType
      if (ticketTypeValue === "first" ){
        ticketType = 1;
      } else if (ticketTypeValue === "second"){
        ticketType = 2;
      }
      else{
        ticketType = 3;
      }
      // Call the getWinningTicket function of your contract
      const winningTicket = await contractInstance.methods.getIthWinningTicket(ticketType, lotteryNo).call();

      alert(`Winning ticket: ${winningTicket}`);
    } catch (error) {
      alert(`Failed to get winning ticket: ${error.message}`);
    }
  };

  const handleGetLotteryNumbers = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const unixTime = event.target.elements.unixTime.value;

      // Call the getLotteryNumbers function of your contract
      const lotteryNumbers = await contractInstance.methods.getLotteryNos(unixTime).call();

      alert(`Purchase Lottery Number: ${lotteryNumbers[0]}\nReveal Lottery Number: ${lotteryNumbers[1]}`);
    } catch (error) {
      alert(`Failed to get lottery numbers: ${error.message}`);
    }
  };

  const handleGetTotalLotteryMoney = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const lotteryNo = event.target.elements.lotteryNo.value;

      // Call the getTotalLotteryMoney function of your contract
      const totalLotteryMoney = await contractInstance.methods.getTotalLotteryMoneyCollected(lotteryNo).call();

      alert(`Total lottery money collected: ${totalLotteryMoney / (10**18)} ETH`);
    } catch (error) {
      alert(`Failed to get total lottery money: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Buy a new ticket or take refund for your ticket</h1>
      <Accordion title="Get ith winning ticket">
        <form onSubmit={handleGetWinningTicket}>
          <select style={{ margin: "20px" }} name="ticketType">
            <option value="first">1st</option>
            <option value="second">2nd</option>
            <option value="third">3rd</option>
          </select>

          <input style={{ margin: "20px", width: "200px" }} type="number" name="lotteryNo" placeholder="Lottery no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Get Lottery numbers">
        <form onSubmit={handleGetLotteryNumbers}>
          <input style={{ margin: "20px", width: "200px" }} type="text" name="unixTime" placeholder="Unix time in week" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Get total lottery money collected">
        <form onSubmit={handleGetTotalLotteryMoney}>
          <input style={{ margin: "20px", width: "200px" }} type="number" name="lotteryNo" placeholder="Lottery no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
    </div>
  );
};

export default Statistics;
