import { Alchemy, Network} from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App(hash) {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState({});
  const [transacHash, setTransacHash] = useState('');
  const [transacReciept, setTransacReciept] = useState(null);
  // const [blockTransact, setBlockTransact] = useState({});

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();

    async function getBlockInfo() {
    setBlockInfo(await alchemy.core.getBlock(blockNumber));
  }
  getBlockInfo(blockNumber);

    // async function getBlockTransact() {
    //   setBlockTransact(await alchemy.core.getBlockWithTransactions(blockNumber));
    // }
    // getBlockTransact();

    async function getTransacHash()
    {
      if (transacHash)
      {
      setTransacReciept(await alchemy.core.getTransactionReceipt(transacHash));
      }
    }
    getTransacHash();
  }, [blockNumber, transacHash]);
  const handleInputChange = (evt) => {
    setTransacHash(evt.target.value);
  }

  return <div className="App">
    <div><b>Block Number</b><br></br>{blockNumber}</div>
    <div><b>Block Hash</b><br></br>{blockInfo.hash}</div>
    <div><b>Gas Limit</b><br></br>{parseInt(blockInfo.gasLimit)} gas</div>
    <div><b>Gas Used</b><br></br>{parseInt(blockInfo.gasUsed)}</div>
    <div><b>Miner</b><br></br>{blockInfo.miner}</div>
    <div><b>Reciept</b><br></br><input placeholder='Enter the transaction hash' defaultValue={transacHash} onChange={handleInputChange}></input><br></br>{transacReciept.from}</div>
    </div>
}

export default App;
