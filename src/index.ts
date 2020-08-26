#!/usr/bin/env node
import 'reflect-metadata';
// tslint:disable-next-line:ordered-imports
import {
    activateAccount,
    activateCustomer, bcashBroadcast, bcashGetBlock, bcashGetBlockHash, bcashGetCurrentBlock, bcashGetTransaction, bcashGetTxForAccount,
    blockAmount,
    btcBroadcast,
    btcGetBlock,
    btcGetBlockHash,
    btcGetCurrentBlock,
    btcGetTransaction,
    btcGetTxForAccount,
    btcGetUTXO,
    createAccount,
    createVirtualCurrency,
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
    getCustomer,
    getTransactionsByAccount,
    getTransactionsByCustomer,
    getTransactionsByLedger,
    getTransactionsByReference,
    getVirtualCurrencyByName, ltcBroadcast,
    ltcGetBlock,
    ltcGetBlockHash,
    ltcGetCurrentBlock, ltcGetTransaction,
    ltcGetTxForAccount,
    ltcGetUTXO,
    mintVirtualCurrency,
    revokeVirtualCurrency, sendBitcoinCashTransaction, sendBitcoinTransaction, sendLitecoinTransaction,
    storeTransaction,
    unfreezeAccount,
    updateCustomer,
    updateVirtualCurrency
} from '@tatumio/tatum';
import meow from 'meow';
import {Command} from './command';
import {helpMessage, parse, print} from './helper';

const {input: command, flags} = meow(helpMessage, {
    flags: {
        'api-key': {
            type: 'string',
            alias: 'a'
        }
    }
});

const startup = async () => {
    if (command.length === 0) {
        console.log(helpMessage);
        return;
    }
    if (flags.apiKey) {
        process.env.TATUM_API_KEY = flags.apiKey as string;
    }
    switch (command[0].toLowerCase()) {
        // local commands for operations with wallets
        case Command.WALLET:
            if (command[1].toLowerCase() === Command.CREATE) {
                print(await generateWallet(command[2].toUpperCase() as Currency, command[3].toLowerCase() === 'testnet', command.length === 5 ? command[4] : undefined));
            } else if (command[1].toLowerCase() === Command.PRIVATE_KEY) {
                print(await generatePrivateKeyFromMnemonic(command[3].toUpperCase() as Currency, command[6].toLowerCase() === 'testnet', command[4], parseInt(command[5])));
            } else if (command[1].toLowerCase() === Command.ADDRESS) {
                print(await generateAddressFromXPub(command[3].toUpperCase() as Currency, command[6].toLowerCase() === 'testnet', command[4], parseInt(command[5])));
            }
            break;
        // commands that require API Key
        case Command.LEDGER:
            switch (command[1].toLowerCase()) {
                case Command.ACCOUNT:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await createAccount(parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getAccountById(command[3]));
                            break;
                        case Command.LIST:
                            if (command[3].toLowerCase() === Command.CUSTOMER) {
                                print(await getAccountsByCustomerId(command[4], parseInt(command[5]), parseInt(command[6])));
                            } else {
                                print(await getAllAccounts(parseInt(command[3]), parseInt(command[4])));
                            }
                            break;
                        case Command.BALANCE:
                            print(await getAccountBalance(command[3]));
                            break;
                        case Command.BLOCK:
                            if (command[3].toLowerCase() === Command.LIST) {
                                print(await getBlockedAmountsByAccountId(command[4], parseInt(command[5]), parseInt(command[6])));
                            } else {
                                print(await blockAmount(command[3], parse(command[4])));
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
                            print(await updateCustomer(command[3], parse(command[4])));
                            break;
                        case Command.DETAIL:
                            print(await getCustomer(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await storeTransaction(parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getTransactionsByReference(command[3]));
                            break;
                        case Command.LIST:
                            switch (command[3].toLowerCase()) {
                                case Command.LEDGER:
                                    print(await getTransactionsByLedger(parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.ACCOUNT:
                                    print(await getTransactionsByAccount(parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.CUSTOMER:
                                    print(await getTransactionsByCustomer(parse(command[6]), parseInt(command[4]), parseInt(command[5])));
                                    break;
                            }
                            break;
                    }
                    break;
                case Command.VC:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await createVirtualCurrency(parse(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await getVirtualCurrencyByName(command[3]));
                            break;
                        case Command.UPDATE:
                            print(await updateVirtualCurrency(parse(command[3])));
                            break;
                        case Command.MINT:
                            print(await mintVirtualCurrency(parse(command[3])));
                            break;
                        case Command.REVOKE:
                            print(await revokeVirtualCurrency(parse(command[3])));
                            break;
                    }
                    break;
            }
            break;
        case Command.OFFCHAIN:
            break;
        case Command.BITCOIN:
            switch (command[1].toLowerCase()) {
                case Command.BLOCK:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await btcGetCurrentBlock());
                            break;
                        case Command.HASH:
                            print(await btcGetBlockHash(parseInt(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await btcGetBlock(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await sendBitcoinTransaction(command[3].toLowerCase() === 'testnet', parse(command[4])));
                            break;
                        case Command.ADDRESS:
                            print(await btcGetTxForAccount(command[3], parseInt(command[4]), parseInt(command[5])));
                            break;
                        case Command.UTXO:
                            print(await btcGetUTXO(command[3], parseInt(command[4])));
                            break;
                        case Command.BROADCAST:
                            print(await btcBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await btcGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
            break;
        case Command.LITECOIN:
            switch (command[1].toLowerCase()) {
                case Command.BLOCK:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await ltcGetCurrentBlock());
                            break;
                        case Command.HASH:
                            print(await ltcGetBlockHash(parseInt(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await ltcGetBlock(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await sendLitecoinTransaction(command[3].toLowerCase() === 'testnet', parse(command[4])));
                            break;
                        case Command.ADDRESS:
                            print(await ltcGetTxForAccount(command[3], parseInt(command[4]), parseInt(command[5])));
                            break;
                        case Command.UTXO:
                            print(await ltcGetUTXO(command[3], parseInt(command[4])));
                            break;
                        case Command.BROADCAST:
                            print(await ltcBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await ltcGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
            break;
        case Command.ETHEREUM:
            break;
        case Command.BCH:
            switch (command[1].toLowerCase()) {
                case Command.BLOCK:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await bcashGetCurrentBlock());
                            break;
                        case Command.HASH:
                            print(await bcashGetBlockHash(parseInt(command[3])));
                            break;
                        case Command.DETAIL:
                            print(await bcashGetBlock(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await sendBitcoinCashTransaction(command[3].toLowerCase() === 'testnet', parse(command[4])));
                            break;
                        case Command.ADDRESS:
                            print(await bcashGetTxForAccount(command[3], parseInt(command[4])));
                            break;
                        case Command.BROADCAST:
                            print(await bcashBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await bcashGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
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

startup().catch(e => {
    if (e.response) {
        console.error(JSON.stringify(e.response.data, null, 2));
    } else {
        console.error(e);
    }
});
