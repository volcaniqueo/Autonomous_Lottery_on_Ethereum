module.exports = async function(callback) {
var contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_ticket_no",
        "type": "uint256"
      }
    ],
    "name": "ticketPurchased",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "current_PurchaseLottery_no",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "current_RevealLottery_no",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lotteries",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalMoneyCollected",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "resultingRandomNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalTickets",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "depositEther",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amnt",
        "type": "uint256"
      }
    ],
    "name": "withdrawEther",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash_rnd_number",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "ticket_type",
        "type": "uint256"
      }
    ],
    "name": "buyTicket",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      }
    ],
    "name": "collectTicketRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rnd_number",
        "type": "uint256"
      }
    ],
    "name": "revealRndNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ticket_number",
        "type": "uint256"
      }
    ],
    "name": "checkIfTicketWon",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      }
    ],
    "name": "getLastOwnedTicket",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "status",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      }
    ],
    "name": "getIthOwnedTicketNo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "status",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      }
    ],
    "name": "collectTicketPrize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      }
    ],
    "name": "getIthWinningTicket",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ticket_no",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unixtimeinweek",
        "type": "uint256"
      }
    ],
    "name": "getLotteryNos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lottery_no1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lottery_no2",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "lottery_no",
        "type": "uint256"
      }
    ],
    "name": "getTotalLotteryMoneyCollected",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// DO NOT FORGET TO CHANGE THE CONTRACT ADDRESS WHENEVER YOU DEPLOY THE CONTRACT
var contractAddress = "0x89c51873f6C5c4dAD547E879Fc1BC3d4c1Ef8850";
const contract = new web3.eth.Contract(contractABI, contractAddress);


// Unlock all accounts in the blockchain
const accounts = await web3.eth.getAccounts();
for(let i = 0; i < accounts.length; i++){
  await web3.eth.personal.unlockAccount(accounts[i]);
}

// Test of depositEther function
for(let i = 0; i < accounts.length; i++){
  const txHash = await contract.methods.depositEther().send({from: accounts[i], value: web3.utils.toWei('2', 'ether')});
}

for(let i = 0; i < accounts.length; i++){
  let balance = await contract.methods.getBalance().call({from: accounts[i]});
  console.log('Adress: ', accounts[i], 'Balance: ', balance)
}

// Test of getLotteryNos function
var block = await web3.eth.getBlock("latest");
var time = block.timestamp;
currentLotteryNo = await contract.methods.getLotteryNos(time).call();
console.log('Result: lottery_no1:', currentLotteryNo[0], 'lottery_no2:', currentLotteryNo[1]);
currentLotteryNo = currentLotteryNo[0];

// Test of buyTicket function
roundTickets = [];
for(let i = 0; i < accounts.length; i++){
  for(let j = 0; j < 3; j++) {
    let randomInteger = Math.floor(Math.random() * 3) + 1;
    if (randomInteger == 3) {
      randomInteger = 4;
    }
    let random_hex = web3.utils.randomHex(4);
    let random_number = web3.utils.hexToNumberString(random_hex);
    let random_hash = web3.utils.soliditySha3(random_number);
    const txHash2 = await contract.methods.buyTicket(random_hash, randomInteger).send({from: accounts[i], gas: 500000});
    let latestBlock = await web3.eth.getBlockNumber();
    let events = await contract.getPastEvents('ticketPurchased', {
      fromBlock: latestBlock,
      toBlock: latestBlock
    });
    let lastEvent = events[0];
    let ticket_no = lastEvent.returnValues['_ticket_no']
    var ticket = {adress: accounts[i], random_number: random_number, ticket_no: ticket_no};
    roundTickets.push(ticket);
  }
}
console.log(roundTickets);

// Test of collectTicketRefund function
let randomInteger = Math.floor(Math.random(4) * roundTickets.length);
ticket = roundTickets[randomInteger];
const txHash = await contract.methods.collectTicketRefund(ticket.ticket_no).send({from: ticket.adress});
roundTickets.splice(randomInteger, 1);

// Test of getLastOwnedTicket and getIthOwnedTicketNo functions
for(let i = 0; i < accounts.length; i++){
  let result = await contract.methods.getLastOwnedTicket(currentLotteryNo).call({from: accounts[i]});
  console.log('Account: ', accounts[i], 'Lottery No: ', currentLotteryNo, 'Ticket No: ', result[0], 'Status: ', result[1]);
  let result2 = await contract.methods.getIthOwnedTicketNo(2, currentLotteryNo).call({from: accounts[i]});
  console.log('Account: ', accounts[i], 'Lottery No: ', currentLotteryNo, 'Ticket No: ', result2[0], 'Status: ', result2[1]);
}


// Time is increased in order to test other functions. The direct usage of web3.currentProvider.send() does not provide callback() function for the promise, triggers a warning on the console.
// Thus, I created a new promise to also have the callback() function to avoid this warning.
const increaseTime = async (duration) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [duration],
        id: new Date().getTime(),
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  });
};

try {
  await increaseTime(604801);
  console.log('Time increased successfully.');
} catch (error) {
  console.error('Error occurred while increasing time:', error);
}

// Test of revealRndNumber function
for(let i = 0; i < roundTickets.length; i++) {
  let ticket = roundTickets[i];
  await contract.methods.revealRndNumber(ticket.ticket_no, ticket.random_number).send({from: ticket.adress, gas: 500000})
}

// Test of getLastOwnedTicket function. Observe the effect of revealRndNumber function
for(let i = 0; i < accounts.length; i++){
  let result = await contract.methods.getLastOwnedTicket(currentLotteryNo).call({from: accounts[i]});
  console.log('Account:', accounts[i], 'Lottery No:', currentLotteryNo, 'Ticket No:', result[0], 'Status:', result[1]);
}

try {
  await increaseTime(604801);
  console.log('Time increased successfully.');
} catch (error) {
  console.error('Error occurred while increasing time:', error);
}

// Test of totalLotteryMoneyCollected function
var totalMoney = await contract.methods.getTotalLotteryMoneyCollected(currentLotteryNo).call();
console.log('Total Lottery Money Collected:', totalMoney);

// buyTicket function is called because this call will trigger the determineWinners function for the first lottery
let random_hex = web3.utils.randomHex(4);
let random_number = web3.utils.hexToNumberString(random_hex);
let random_hash = web3.utils.soliditySha3(random_number);
const txHash2 = await contract.methods.buyTicket(random_hash, 1).send({from: accounts[0], gas: 1000000});

// Test of checkIfTicketWon function
roundWinners = []
for(let i = 0; i < roundTickets.length; i++) {
  let ticket = roundTickets[i];
  winAmount = await contract.methods.checkIfTicketWon(currentLotteryNo, ticket.ticket_no).call({from: ticket.adress})
    if (winAmount > 0) {
      console.log('Winner ticket number:', ticket.ticket_no, 'Prize:', winAmount);
      roundWinners.push(ticket)
    }
}

// Test of getIthWinningTicket function
for(let i = 1; i < 4; i++) {
  let result = await contract.methods.getIthWinningTicket(i, currentLotteryNo).call();
  console.log(i, 'th Winner:', result[0], 'Amount:', result[1]);
}

// Test of collectTicketPrize function. Observe the differences between getBalance calls
for(let i = 0; i < roundWinners.length; i++) {
  let ticket = roundWinners[i];
  beforeBalance = await contract.methods.getBalance().call({from: ticket.adress});
  console.log('Before Balance of Address:', ticket.adress, beforeBalance);
  const txHash = await contract.methods.collectTicketPrize(currentLotteryNo, ticket.ticket_no).send({from: ticket.adress});
  afterBalance = await contract.methods.getBalance().call({from: ticket.adress});
  console.log('After Balance of Address:', ticket.adress, afterBalance);
}

// Test of the withdrawEther function. Observe the differences between getBalance calls
for(let i = 0; i < accounts.length; i++) {
  beforeBalanceChain = await web3.eth.getBalance(accounts[i]);
  beforeBalanceContract = await contract.methods.getBalance().call({from: accounts[i]});
  console.log('Before Balance of Address:', accounts[i], 'In the Contract:', beforeBalanceContract, 'In the Chain:', beforeBalanceChain);
  const txHash = await contract.methods.withdrawEther(web3.utils.toWei('1', 'ether')).send({from: accounts[i]});
  afterBalanceChain = await web3.eth.getBalance(accounts[i]);
  afterBalanceContract = await contract.methods.getBalance().call({from: accounts[i]});
  console.log('After Balance of Address:', accounts[i], 'In the Contract:', afterBalanceContract, 'In the Chain:', afterBalanceChain);
}

callback();
}
