// web3Instance.js
import Web3 from 'web3';
import contractAbi from './contractAbi';

// Create a function to initialize the Web3 and contract instances for a specific user
export function initializeWeb3Instance() {
  const web3 = new Web3(window.ethereum);
  // original
  const contractAddress = '0xb986ac206A5E627eA9608a4b2286d3DF21693845'; //contract address
  const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
  return {web3, contractInstance };
}

