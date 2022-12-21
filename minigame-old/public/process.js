const { ethereum } = window;
// import truffleHdwalletProvider from 'https://cdn.skypack.dev/@truffle/hdwallet-provider';
const getWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
        const web3 = new Web3(ethereum)

        try {
            await ethereum.request({ method: "eth_requestAccounts" })
            resolve(web3)
        } catch (error) {
            reject(error)
        }
    })
}

const abi = [
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
const urlInfura = 'wss://mainnet.infura.io/ws/v3/dafaf07166a743c89af2d655df5b81dd';
var web3, currentAddress, currentWei, currentEth, contractMM, web3Infura, contractInfura, isConnectedWallet = false, addressTo, provider, signer, transactionsContract, myContract, myWeb3;
var contractAddress = '0xD1aDD41928635E64174ED5EBee7b2d9A97e473b9';
const options = {
    filter: {
        value: [],
    },
    fromBlock: 'latest'
};

$(document).ready(async () => {
    $('#connect_button').click(function (e) {
        getWeb3().then(async () => {
            await myWallet();
            displayWalletInfo(currentAddress, currentEth, 'Kết nối tới ví thành công.');
        })
    })

    ethereum.on('accountsChanged', async accounts => {
        await myWallet();
        displayWalletInfo(currentAddress, currentEth, 'Đổi tài khoản thành công.');
    })

    $('#form').on('submit', function (e) {
        e.preventDefault();
        send();
    })
})

const myWallet = async () => {
    web3 = await getWeb3();
    currentAddress = await web3.eth.requestAccounts();
    currentWei = await web3.eth.getBalance(currentAddress[0]);
    currentEth = Math.round(Web3.utils.fromWei(currentWei) * 1000) / 1000;
    contractMM = new web3.eth.Contract(abi, contractAddress);
    web3Infura = new Web3(new Web3.providers.WebsocketProvider(urlInfura));
    contractInfura = new web3Infura.eth.Contract(abi, contractAddress);
    contractInfura.events.SM_ban_data({ filter: {}, fromBlock: 'latest' }, function (error, data) {
        console.log('event')
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
    })

    return {
        currentAddress: currentAddress,
        currentWei: currentWei,
        currentEth: currentEth,
    };
}

const displayWalletInfo = (currentAddress, currentEth, title, time = 2000) => {
    $('#wallet_address').text(currentAddress)
    $('#wallet_balance').text(currentEth)
    $('#connect_button').attr('hidden', 'hidden');
    $('#wallet_info').removeAttr('hidden');

    if (title) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: time
        })
    }
}

function send() {
    if (!isConnectedWallet) {
        return Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Bạn chưa kết nối tới MetaMask',
            showConfirmButton: false,
            timer: 2000
        })
    }


    contractMM.methods.Dangky('sv' + Math.random()).send({
        from: currentAddress[0],
    }).then(data => console.log('confirmed'))
    // $.post('./dangky', {
    //     Email: $('#txtEmail').val(),
    //     HoTen: $('#txtHoTen').val(),
    //     SoDT: $('#txtSoDT').val()
    // }, function (data) {
    //     console.log(data)
    //     if (data.ketqua == 1) {
    //         contractMM.methods.Dangky(data.maloi._id).send({
    //             from: currentAddress[0],
    //         }).then(data => {
    //             console.log(data)
    //         }).catch(error => {
    //             console.log(error.message)
    //         });
    //     }
    // })
}