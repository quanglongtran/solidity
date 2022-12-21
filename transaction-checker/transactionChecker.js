const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('wss://ropsten.infura.io/ws/v3/f87b8291702b4eadbf47b7a2a12c23d3'))
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        console.log('Searching block:', number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.account == tx.to.toLowerCase) {
                    console.log('Transaction found on block:', number);
                    console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()})
                }
            }
        }
    }
}

let txChecker = new TransactionChecker('c6913abe67f32ba5c4229ec2a392cf8b78fb96fd429f2f7f201cb93aebfc1b5f', '0xce948EDb589F6ae22A2010687783Dd7483436E36');
txChecker.checkBlock()