import React, { useState } from 'react';
import Accordion from './Accordion';
import { initializeWeb3Instance } from './Web3Instance';

const Tickets = () => {
  const handleBuyTicket = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const hashedRandomNumber = event.target.elements.hashedRandomNumber.value;
      const ticketTypeValue = event.target.elements.ticketType.value;
      let ticketType;
      if (ticketTypeValue === 'full') {
        ticketType = 1;
      } else if (ticketTypeValue === 'half') {
        ticketType = 2;
      } else if (ticketTypeValue === 'quarter') {
        ticketType = 4;
      }
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address

      // Call the buyTicket function of your contract
      const ticketNo = await contractInstance.methods.buyTicket(hashedRandomNumber, ticketType).send({from: sender, gas: 1500000});
      alert(`Ticket bought successfully. Your ticket number is ${JSON.parse(JSON.stringify(ticketNo)).events.ticketPurchased.returnValues._ticket_no}`);
    } catch (error) {
      alert(`Failed to buy ticket: ${error.message}`);
    }
  };

  const handleRefundTicket = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const ticketNo = event.target.elements.ticketNo.value;
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address

      // Call the refundTicket function of your contract
      await contractInstance.methods.collectTicketRefund(ticketNo).send({from: sender, gas: 500000});

      alert('Ticket refunded successfully');
    } catch (error) {
      alert(`Failed to refund ticket: ${error.message}`);
    }
  };

  const handleRevealRandomNumber = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const ticketNo = event.target.elements.ticketNo.value;
      const randomNumber = event.target.elements.randomNumber.value;
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address

      // Call the revealRandomNumber function of your contract
      await contractInstance.methods.revealRndNumber(ticketNo, randomNumber).send({from: sender, gas: 500000})

      alert('Random number revealed successfully');
    } catch (error) {
      alert(`Failed to reveal random number: ${error.message}`);
    }
  };

  const handleGetLastOwnedTicket = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const lotteryNo = event.target.elements.lotteryNo.value;
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address
      // Call the getLastOwnedTicket function of your contract
      const { ticket_no, status } = await contractInstance.methods.getLastOwnedTicket(lotteryNo).call({from: sender});
      let message;
      if (status == 0){
        message = "Your ticket is not revealed yet or you have refunded your ticket.";
      }else if(status == 1){
        message = "You did not collect any prize for this ticket.";
      } else{
        message = "Prize is collected.";
      }
      alert(`Last Owned Ticket No: ${ticket_no}\nStatus: ${message}`);
    } catch (error) {
      alert(`Failed to get last owned ticket: ${error.message}`);
    }
  };
  const handleGetIthOwnedTicket = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const i = event.target.elements.i.value;
      const lotteryNo = event.target.elements.lotteryNo.value;
      const accounts = await web3.eth.requestAccounts();
      const sender = accounts[0]; // Get the sender's account address
      // Call the getIthOwnedTicketNo function of your contract
      const { ticket_no, status } = await contractInstance.methods.getIthOwnedTicketNo(i, lotteryNo).call({from: sender});
      let message;
      if (status == 0){
        message = "Your ticket is not revealed yet or you have refunded your ticket.";
      }else if(status == 1){
        message = "You did not collect any prize for this ticket.";
      } else{
        message = "Prize is collected.";
      }
      alert(`Ith Owned Ticket No: ${ticket_no}\nStatus: ${message}`);
    } catch (error) {
      alert(`Failed to get ith owned ticket: ${error.message}`);
    }
  };
  
  const handleCheckTicketWon = async (event) => {
    event.preventDefault();
    try {
      const { web3, contractInstance } = initializeWeb3Instance();
      const lotteryNo = event.target.elements.lotteryNo.value;
      const ticketNo = event.target.elements.ticketNo.value;

      // Call the checkTicketWon function of your contract
      const ticketWon = await contractInstance.methods.checkIfTicketWon(lotteryNo, ticketNo).call();

      alert(`Ticket ${ticketNo} has won ${ticketWon} ETH.`);
    } catch (error) {
      alert(`Failed to check ticket: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Buy a new ticket or take a refund for your ticket</h1>
      <Accordion title="Buy a new ticket">
        <form onSubmit={handleBuyTicket}>
          <input style={{ margin: "20px", width: "200px" }} type="text" name="hashedRandomNumber" placeholder="Hashed Random number" />
          <select style={{ margin: "20px" }} name="ticketType" placeholder='ticket type'>
            <option value="full">Full ticket</option>
            <option value="half">Half Ticket</option>
            <option value="quarter">Quarter ticket</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Take refund from your ticket">
        <form onSubmit={handleRefundTicket}>
          <input style={{ margin: "20px", width: "200px" }} type="text" name="ticketNo" placeholder="Ticket no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Reveal random number">
        <form onSubmit={handleRevealRandomNumber}>
          <input style={{ margin: "20px", width: "200px" }} type="number" name="ticketNo" placeholder="Ticket no" />
          <input style={{ margin: "20px", width: "200px" }} type="text" name="randomNumber" placeholder="Random number" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Get your last owned ticket">
        <form onSubmit={handleGetLastOwnedTicket}>
          <input style={{ margin: "20px", width: "200px" }} type="number" name="lotteryNo" placeholder="Lottery no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Get your ith owned ticket">
        <form onSubmit={handleGetIthOwnedTicket}>
          <input style={{ margin: "20px", width: "200px" }} type="number" name="i" placeholder="i" />
          <input style={{ margin: "20px", width: "200px" }} type="number" name="lotteryNo" placeholder="Lottery no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
      <Accordion title="Check if your ticket won">
        <form onSubmit={handleCheckTicketWon}>
          <input style={{ margin: "20px", width: "200px" }} type="text" name="lotteryNo" placeholder="Lottery no" />
          <input style={{ margin: "20px", width: "200px" }} type="text" name="ticketNo" placeholder="Ticket no" />
          <button type="submit">Submit</button>
        </form>
      </Accordion>
    </div>
  );
};

export default Tickets;
