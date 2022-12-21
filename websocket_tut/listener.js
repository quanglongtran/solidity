require('dotenv').config();
const Web3 = require('web3');

const kyberAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "Dangky",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_vi",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "SM_ban_data",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arrHocvien",
		"outputs": [
			{
				"internalType": "string",
				"name": "_ID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_VI",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const kyberAddress = '0x51bD1898beb02E0C95502479c4fA5Cb6B81F56fC';
const daiAddress = '0xcE9b5AEe611544bb527958Ccc9Ca42061Eb9de56';
const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);

const kyber = new web3.eth.Contract(
    kyberAbi,
    kyberAddress
);
web3.eth.subscribe('newBlockHeaders').on('data', async block => {
    console.log(`New Block Header receiver # ${block.number}`);

    const kyberResults = await Promise.all([
        kyber.methods.getExpectedRate(daiAddress)
    ])
})