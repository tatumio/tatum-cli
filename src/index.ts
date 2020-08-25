#!/usr/bin/env node
import 'reflect-metadata';
// tslint:disable-next-line:ordered-imports
import {
    activateAccount,
    activateCustomer,
    blockAmount,
    createAccount, createVirtualCurrency,
    Currency,
    deactivateAccount,
    deactivateCustomer,
    deleteBlockedAmount,
    deleteBlockedAmountForAccount,
    disableCustomer,
    enableCustomer,
    freezeAccount,
    generateAddressFromXPub,
    generatePrivateKeyFromMnemonic,
    generateWallet,
    getAccountBalance,
    getAccountById,
    getAccountsByCustomerId,
    getAllAccounts,
    getAllCustomers,
    getBlockedAmountsByAccountId,
    getCustomer, getTransactionsByAccount, getTransactionsByCustomer,
    getTransactionsByLedger,
    getTransactionsByReference, getVirtualCurrencyByName, mintVirtualCurrency, revokeVirtualCurrency,
    storeTransaction,
    unfreezeAccount,
    updateCustomer, updateVirtualCurrency
} from '@tatumio/tatum';
import meow from 'meow';
import {Command} from './command';

const {input: command, flags} = meow(`
    Usage
        $ tatum command

    Commands
      ## blockchain wallet operations, only run locally
        wallet create <chain> <testnet> [mnemonic]                  Generate wallet for a specific blockchain and echo it to the output.
        wallet privatekey create <chain> <mnemonic> <i> <testnet>   Obtain managed wallet from wallet store and generate private key for given derivation index.
        wallet address create <chain> <xpub> <i> <testnet>          Obtain managed wallet from wallet store and generate address for given derivation index.

      ## Account operations within Tatum Private Ledger, API key is necessary
        ledger account create "JSON request body"                   https://tatum.io/apidoc.html#operation/createAccount
        ledger account detail <id>                                  https://tatum.io/apidoc.html#operation/getAccountByAccountId
        ledger account list <pageSize> <offset>                     https://tatum.io/apidoc.html#operation/getAllAccounts
        ledger account list customer <id> <pageSize> <offset>       https://tatum.io/apidoc.html#operation/getAccountsByCustomerId
        ledger account balance <id>                                 https://tatum.io/apidoc.html#operation/getAccountByAccountId
        ledger account block <id> "JSON request body"               https://tatum.io/apidoc.html#operation/blockAmount
        ledger account block list <id> <pageSize> <offset>          https://tatum.io/apidoc.html#operation/getBlockAmount
        ledger account unblock <id>                                 https://tatum.io/apidoc.html#operation/deleteBlockAmount
        ledger account unblock account <id>                         https://tatum.io/apidoc.html#operation/deleteAllBlockAmount
        ledger account freeze <id>                                  https://tatum.io/apidoc.html#operation/freezeAccount
        ledger account unfreeze <id>                                https://tatum.io/apidoc.html#operation/unfreezeAccount
        ledger account activate <id>                                https://tatum.io/apidoc.html#operation/activateAccount
        ledger account deactivate <id>                              https://tatum.io/apidoc.html#operation/deactivateAccount

      ## Customer operations within Tatum Private Ledger, API key is necessary
        ledger customer update <id> "JSON request body"             https://tatum.io/apidoc.html#operation/updateCustomer
        ledger customer detail <id>                                 https://tatum.io/apidoc.html#operation/getCustomerByExternalId
        ledger customer list <pageSize> <offset>                    https://tatum.io/apidoc.html#operation/findAllCustomers
        ledger customer enable <id>                                 https://tatum.io/apidoc.html#operation/enableCustomer
        ledger customer disable <id>                                https://tatum.io/apidoc.html#operation/disableCustomer
        ledger customer activate <id>                               https://tatum.io/apidoc.html#operation/activateCustomer
        ledger customer deactivate <id>                             https://tatum.io/apidoc.html#operation/deactivateCustomer

      ## Transaction operations within Tatum Private Ledger, API key is necessary
        ledger transaction create "JSON request body"                                   https://tatum.io/apidoc.html#operation/sendTransaction
        ledger transaction detail <id>                                                  https://tatum.io/apidoc.html#operation/getTransactionsByReference
        ledger transaction list ledger <pageSize> <offset> "JSON request body"          https://tatum.io/apidoc.html#operation/getTransactions
        ledger transaction list account <pageSize> <offset> "JSON request body"         https://tatum.io/apidoc.html#operation/getTransactionsByAccountId
        ledger transaction list customer <pageSize> <offset> "JSON request body"        https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId

      ## Virtual currency operations within Tatum Private Ledger, API key is necessary
        ledger vc create "JSON request body"            https://tatum.io/apidoc.html#operation/createCurrency
        ledger vc detail <id>                           https://tatum.io/apidoc.html#operation/getCurrency
        ledger vc update "JSON request body"            https://tatum.io/apidoc.html#operation/updateCurrency
        ledger vc mint "JSON request body"              https://tatum.io/apidoc.html#operation/mintCurrency
        ledger vc revoke "JSON request body"            https://tatum.io/apidoc.html#operation/revokeCurrency

    Options
        --api-key                         Tatum API Key to communicate with Tatum API. Necessary only for API requests to the Tatum.

`, {
    flags: {
        'api-key': {
            type: 'string',
        }
    }
});

export const print = (data: any) => console.log(JSON.stringify(data, null, 2));

const startup = async () => {
    if (command.length === 0) {
        return;
    }
    if (flags.apiKey) {
        process.env.TATUM_API_KEY = flags.apiKey as string;
    }
    switch (command[0].toLowerCase()) {
        // local commands for operations with wallets
        case Command.WALLET:
            if (command[1].toLowerCase() === Command.CREATE) {
                print(await generateWallet(command[1] as Currency, command[2] === 'testnet', command.length === 4 ? command[3] : undefined));
            } else if (command[1].toLowerCase() === Command.PRIVATE_KEY) {
                print(await generatePrivateKeyFromMnemonic(command[3] as Currency, command[6] === 'testnet', command[4], parseInt(command[5])));
            } else if (command[1].toLowerCase() === Command.ADDRESS) {
                print(await generateAddressFromXPub(command[3] as Currency, command[6] === 'testnet', command[4], parseInt(command[5])));
            }
            break;
        // commands that require API Key
        case Command.LEDGER:
            switch (command[1].toLowerCase()) {
                case Command.ACCOUNT:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await createAccount(JSON.parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getAccountById(command[3]));
                            break;
                        case Command.LIST:
                            if (command[3].toLowerCase() === Command.CUSTOMER) {
                                print(await getAllAccounts(parseInt(command[4]), parseInt(command[5])));
                            } else {
                                print(await getAccountsByCustomerId(command[3], parseInt(command[4]), parseInt(command[5])));
                            }
                            break;
                        case Command.BALANCE:
                            print(await getAccountBalance(command[3]));
                            break;
                        case Command.BLOCK:
                            if (command[3].toLowerCase() === Command.LIST) {
                                print(await getBlockedAmountsByAccountId(command[4], parseInt(command[5]), parseInt(command[6])));
                            } else {
                                print(await blockAmount(command[3], JSON.parse(command[4])));
                            }
                            break;
                        case Command.UNBLOCK:
                            if (command[3].toLowerCase() === Command.ACCOUNT) {
                                print(await deleteBlockedAmountForAccount(command[4]));
                            } else {
                                print(await deleteBlockedAmount(command[3]));
                            }
                            break;
                        case Command.FREEZE:
                            print(await freezeAccount(command[3]));
                            break;
                        case Command.UNFREEZE:
                            print(await unfreezeAccount(command[3]));
                            break;
                        case Command.ACTIVATE:
                            print(await activateAccount(command[3]));
                            break;
                        case Command.DEACTIVATE:
                            print(await deactivateAccount(command[3]));
                            break;
                    }
                    break;
                case Command.CUSTOMER:
                    switch (command[2].toLowerCase()) {
                        case Command.ENABLE:
                            print(await enableCustomer(command[3]));
                            break;
                        case Command.DISABLE:
                            print(await disableCustomer(command[3]));
                            break;
                        case Command.ACTIVATE:
                            print(await activateCustomer(command[3]));
                            break;
                        case Command.DEACTIVATE:
                            print(await deactivateCustomer(command[3]));
                            break;
                        case Command.LIST:
                            print(await getAllCustomers(parseInt(command[3]), parseInt(command[4])));
                            break;
                        case Command.UPDATE:
                            print(await updateCustomer(command[3], JSON.parse(command[4])));
                            break;
                        case Command.DETAIL:
                            print(await getCustomer(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await storeTransaction(JSON.parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getTransactionsByReference(command[3]));
                            break;
                        case Command.LIST:
                            switch (command[3].toLowerCase()) {
                                case Command.LEDGER:
                                    print(await getTransactionsByLedger(JSON.parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.ACCOUNT:
                                    print(await getTransactionsByAccount(JSON.parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.CUSTOMER:
                                    print(await getTransactionsByCustomer(JSON.parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                            }
                            break;
                    }
                    break;
                case Command.VC:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await createVirtualCurrency(JSON.parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getVirtualCurrencyByName(command[3]));
                            break;
                        case Command.UPDATE:
                            print(await updateVirtualCurrency(JSON.parse(command[3])));
                            break;
                        case Command.MINT:
                            print(await mintVirtualCurrency(JSON.parse(command[3])));
                            break;
                        case Command.REVOKE:
                            print(await revokeVirtualCurrency(JSON.parse(command[3])));
                            break;
                    }
                    break;
            }
            break;
        case Command.OFFCHAIN:
            break;
        case Command.BITCOIN:
            break;
        case Command.LITECOIN:
            break;
        case Command.ETHEREUM:
            break;
        case Command.BCH:
            break;
        case Command.VECHAIN:
            break;
        case Command.BNB:
            break;
        case Command.XRP:
            break;
        case Command.XLM:
            break;
        case Command.NEO:
            break;
        default:
            console.error('Unsupported command. Use tatum --help for details.');
            process.exit(-1);
    }
};

startup();
