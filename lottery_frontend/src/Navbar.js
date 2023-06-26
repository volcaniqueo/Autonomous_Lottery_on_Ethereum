import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeWeb3Instance } from './Web3Instance';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
  };

  const navItemStyle = {
    marginRight: '10px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    padding: '5px',
  };

  const navLinkHoverStyle = {
    color: '#007bff',
  };

  const connectStyle = {
    marginLeft: 'auto',
  };

  const [isMetamaskConnected, setMetamaskConnected] = useState(false);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');

  const handleMetamaskConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const { web3, contractInstance } = initializeWeb3Instance();
        setWeb3Instance(web3);
        setMetamaskConnected(true);
        alert('Metamask connected successfully!');
      } catch (error) {
        alert(`Failed to connect to Metamask: ${error.message}`);
      }
    } else {
      alert('Metamask is not available.');
    }
  };

  const handleMetamaskDisconnect = () => {
    setWeb3Instance(null);
    setMetamaskConnected(false);
    setAccountAddress('');
    alert('Metamask disconnected successfully!');
  };

  useEffect(() => {
    const getAccountAddress = async () => {
      if (web3Instance) {
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }
      }
    };

    getAccountAddress();
  }, [web3Instance]);

  return (
    <nav style={navStyle}>
      <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={navItemStyle}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/tickets" style={navLinkStyle}>
            My Tickets
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/statistics" style={navLinkStyle}>
            Statistics
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/balance" style={navLinkStyle}>
            Balance
          </Link>
        </li>
        <li style={{ ...navItemStyle, ...connectStyle }}>
          {isMetamaskConnected ? (
            <>
              <span>Metamask Connected: {accountAddress}</span>
              <button onClick={handleMetamaskDisconnect} style={navLinkStyle}>
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={handleMetamaskConnect} style={navLinkStyle}>
              Connect to Metamask
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
