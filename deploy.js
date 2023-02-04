// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { evm,abi } = require('./compile');

const provider = new HDWalletProvider(
    'write cross indoor limb wheat load need boil scrap conduct trap absent',
    'https://goerli.infura.io/v3/5b56526908a549219c5c4639608feef7'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account',accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments:['Hi There!']})
    .send({from: accounts[0], gas:'1000000'});
    
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();