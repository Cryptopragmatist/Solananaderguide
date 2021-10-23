const assert = require("assert");
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('mysolanaapp', () => {

  const provider = anchor.Provider.env(); //create and set a Provider

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Mysolanaapp; //set the program to mysolanaapp

  it("Creates a counter", async () => {
    //Add test here
    
    const baseAccount = anchor.web3.Keypair.generate();
    //const tx = await program.rpc.initialize(); //calling the function
   // console.log("Your transaction signature", tx);
   await program.rpc.create({ // call the create function using the RPC method
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  
  });
  const account = await program.account.baseAccount.fetch(baseAccount.publicKey); //Fetch the account and check the value of count
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("Increments the counter", async () => {
    const baseAccount = _baseAccount;

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toString() == 1);
  });


});


// two things are needed to call a solana program using anchor
/* Provider - The Provider is an abstraction of a connection to the Solana network, 
typically consisting of a Connection, Wallet, and a preflight commitment */
/* provider is added for us by anchor based on the environment but the client,
 devs will need to construct the provider using suer solana wallet*/

/* program - is the abstraction that combine provider, idl, 
and programId that allows to call RPC method to the program */

