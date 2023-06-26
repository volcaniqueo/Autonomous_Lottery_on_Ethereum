var contractAbi = [
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
		"inputs": [],
		"name": "depositEther",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
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
		"type": "function"
	}
];
module.exports = contractAbi;