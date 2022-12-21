require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/96de6c584e8744e2b7a5e3a6895fdf20',
      accounts: [ 'c6913abe67f32ba5c4229ec2a392cf8b78fb96fd429f2f7f201cb93aebfc1b5f' ]
    }
  }
}