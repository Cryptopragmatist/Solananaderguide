use anchor_lang::prelude::*;

declare_id!("6KAAhZbFDFKLv9Nxwg1mHRRMcGZ62BXECh6bnqZdpT2N");

#[program]
pub mod mysolanaapp {
    use super::*;
   /* pub fn initialize(ctx: Context<Initialize>) -> ProgramResult { //initialize: when invoked exits the program successfully if arguments are met
        Ok(())
    } */
    /*two functions are the RPC request handlers that we will be able to call from a client
     application to interact with the program */

    pub fn create(ctx: Context<Create>) -> ProgramResult {  // to call this fn, you need complete the Create Context which is a struct
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
//pub struct Initialize {}

//Transaction instructions
pub struct Create<'info> { //the Create struct will need the following three parameters to execute
    //#[account(...)] attributes define constraints and instructions if not met, will not execute
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>, //any client with a proper base account can call the RPC methods
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub count: u64,
}