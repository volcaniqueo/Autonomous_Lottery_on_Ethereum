# Autonomous_Lottery_on_Ethereum
This was my term project for the course CMPE 483 (Blockchain Programming) at Bogazici University.

## Details
The details and the running mechanism of the lottery can be found in the project description. The implementation details can be found in the backend & frontend reports.

## To Run the Code

### Run and Test Backend in a Local Node 

**_Our code simulates two weeks period with manipulating time using the method evm_increaseTime. Geth client does not allow such manipulation, please do not use it for executing the script (test.js). Please use ganache instead._** 

First install truffle and ganache client with:

```brew install node``` **(if you have already installed node, skip this)** 

```npm install truffle -g```

```npm install ganache --global```

Now you have installed all the necessary environment to test the project on local node.

Now, open a terminal window and run the ganache client with:

```ganache``` **(If you want the customize the number of accounts use -a flag)**

Then open another terminal window and move into the backend directory:

```cd lottery_backend```

To compile the contract run:

```truffle compile```

To deploy the contract run:

```truffle migrate```

Now, open the truffle console with:

```truffle console```

You can now test the code. If you want to test with the provided script (test.js) run:

**IMPORTANT NOTE: Since the newly deployed contract has a new address, you must change the _contractAddress_ variable (line 365) in the test.js file**

```truffle exec test.js``` 

### Test Frontend with Metamask

_This tutorial assumes the usage of Bloxberg. Same procedure applies for others as well._

First, install Metamask: **(If you have installed Metamask, skip this)**

https://metamask.io/

Now, add the Bloxberg to the Metamask:

https://chainlist.org/

Get some test ethers from:

https://faucet.bloxberg.org/

Then, deploy the _lottery.sol_ file with remix:

https://remix-project.org/  **(Choose Bloxberg while deploying)**

Now, you have all necessary environment.

Navigate to the frontend directory with:

```cd lottery_frontend```

Install the required dependencies with:

```npm install```

Start the server:

```npm start```

The application should now be running on `http://localhost:3000`. Open this URL in your web browser.

## Notes About the Project

Since we started the backend part of the project right after we started to learn Solidity, the functions may be vulnerable to attacks and they are not using optimal gas. We then learned the gas optimality and attack types but we could not find any time to revise our implementation because of tight schedule.
