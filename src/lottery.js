import web3 from './web3';

// address of the contract that is on etherium rinkeby network
const address = '0x3b60163C989FaB569f8d87d3bC7265e1E49C8A7F';

const abi = [
  {
    constant: true,
    inputs: [],
    name: 'manager',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getPlayers',
    outputs: [{ name: '', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'enter',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'players',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
];
// window to the contract that exists on the block chain
export default new web3.eth.Contract(abi, address);
