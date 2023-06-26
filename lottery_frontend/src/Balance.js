import React, { useState } from 'react';
import Accordion from './Accordion';
import { initializeWeb3Instance } from './Web3Instance';

const Balance = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address
      const amount = event.target.elements.amount.value;
      const unit = event.target.elements.unit.value;

      let weiAmount;
      if (unit === 'ether') {
        weiAmount = web3.utils.toWei(amount.toString(), 'ether');
      } else if (unit === 'finney') {
        weiAmount = web3.utils.toWei(amount.toString(), 'finney');
      } else {
        weiAmount = web3.utils.toWei(amount.toString(), 'wei');
      }

      // Call the depositEther function of your contract
      await contractInstance.methods.depositEther().send({
        from: sender,
        value: weiAmount,
      });

      alert('Ether deposited successfully!');
    } catch (error) {
      alert(`Failed to deposit Ether: ${error.message}`);
    }
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address
      const amount = event.target.elements.amount.value;
      const unit = event.target.elements.unit.value;

      let weiAmount;
      if (unit === 'ether') {
        weiAmount = web3.utils.toWei(amount.toString(), 'ether');
      } else if (unit === 'finney') {
        weiAmount = web3.utils.toWei(amount.toString(), 'finney');
      } else {
        weiAmount = web3.utils.toWei(amount.toString(), 'wei');
      }

      // Call the withdrawEther function of your contract
      await contractInstance.methods.withdrawEther(weiAmount).send({
        from: sender,
      });

      alert('Ether withdrawn successfully!');
    } catch (error) {
      alert(`Failed to withdraw Ether: ${error.message}`);
    }
  };

  const handleCollectPrize = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address
      const lotteryNo = event.target.elements.lotteryNo.value;
      const ticketNo = event.target.elements.ticketNo.value;

      // Call the collectTicketPrize function of your contract
      await contractInstance.methods.collectTicketPrize(lotteryNo, ticketNo).send({
        from: sender,
      });

      alert('Ticket prize collected successfully!');
    } catch (error) {
      let errorMessage = error.message;
      if (error.reason) {
        // If the error object contains a revert reason
        errorMessage = error.reason;
      }
      alert(`Failed to collect ticket prize: ${errorMessage}`);
    }
  };

  return (
    <div>
      <h1>Buy a new ticket or take a refund for your ticket</h1>
      <Accordion title="Deposit Ether">
        <form onSubmit={handleDeposit}>
          <input style={{ margin: '20px', width: '200px' }} type="text" name="amount" placeholder="Amount" />
          <select style={{ margin: '20px', width: '200px' }} name="unit">
            <option value="ether">Ether</option>
            <option value="finney">Finney</option>
            <option value="wei">Wei</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Withdraw Ether">
        <form onSubmit={handleWithdraw}>
          <input style={{ margin: '20px', width: '200px' }} type="text" name="amount" placeholder="Amount" />
          <select style={{ margin: '20px', width: '200px' }} name="unit">
            <option value="ether">Ether</option>
            <option value="finney">Finney</option>
            <option value="wei">Wei</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Collect Ticket Prize">
        <form onSubmit={handleCollectPrize}>
          <input style={{ margin: '20px', width: '200px' }} type="text" name="lotteryNo" placeholder="Lottery no" />
          <input style={{ margin: '20px', width: '200px' }} type="text" name="ticketNo" placeholder="Ticket no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
    </div>
  );
};

export default Balance;
