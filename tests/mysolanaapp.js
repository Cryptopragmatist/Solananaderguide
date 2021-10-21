const anchor = require('@project-serum/anchor');

describe('mysolanaapp', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Mysolanaapp;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});


// two things are needed to call a solana program using anchor
/* Provider - The Provider is an abstraction of a connection to the Solana network, 
typically consisting of a Connection, Wallet, and a preflight commitment */
/* provider is added for us by anchor based on the environment but the client,
 devs will need to construct the provider using suer solana wallet*/

/* program - is the abstraction that combine provider, idl, 
and programId that allows to call RPC method to the program */

