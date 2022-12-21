const { ethereum } = window;
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
$(document).ready(function () {
    var currentAccount;
    const abi = [
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
    const addressSM = '0x0bee1D99C70E64C903c9C3F22fa38964179C737D';
    const web3 = new Web3(ethereum);

    var contractMM = new web3.eth.Contract(abi, addressSM)
    var web3Infura = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/dafaf07166a743c89af2d655df5b81dd'));
    var contractInfura = new web3Infura.eth.Contract(abi, addressSM);

    contractInfura.events.SM_ban_data({ filter: {}, fromBlock: 'latest' }, function (error, data) {
        if (data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'listen to successful event',
                text: 'event name: ' + data.event,
                showConfirmButton: false,
                timer: 3000
            })
        }
    })

    $('#btnDangKy').click(function (e) {
        $.post('./dangky', {
            Email: $('#txtHoten').val(),
            HoTen: $('#txtEmail').val(),
            SoDT: $('#txtSoDT').val(),
        }, function (data) {
            if (data.ketqua == 1 && currentAccount.length > 0) {
                contractMM.methods.Dangky(data.maloi._id).send({
                    from: currentAccount
                })
            } else {
                alert('loi')
            }
        })
    })

    console.log((ethereum) ? 'MetaMask is installed' : 'MetaMask is not installed')

    $('#connectMM').click(({ target }) => {
        connectMM().then(data => currentAccount = data[0])
    })
})

async function connectMM() {
    return await ethereum.request({ method: 'eth_requestAccounts' })
}