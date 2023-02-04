// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile.js");

let accounts;
let inbox; 
let INITIAL_MESSAGE = 'Hi there!';

beforeEach(async ()=>{
    //get a list of all accounts
   accounts = await web3.eth.getAccounts();  

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
    .deploy({data:evm.bytecode.object, arguments:['Hi there!']})
    .send({from: accounts[0], gas:'1000000'})
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);
    });

    it('has a default message',async ()=>{
        // simple function calling takes place here 
        // call() is used for simple calling of function
         const message = await inbox.methods.message().call();
         assert.equal(message,INITIAL_MESSAGE);
    });

    it('can change the message', async()=>{

        // transaction hash is returned here so no need to assign any variable to the await
        // send() function is used for transaction
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
});
