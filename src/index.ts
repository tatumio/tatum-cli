#!/usr/bin/env node
import 'reflect-metadata';
// tslint:disable-next-line:ordered-imports
import {
    activateAccount,
    activateCustomer,
    bcashBroadcast,
    bcashGetBlock,
    bcashGetBlockHash,
    bcashGetCurrentBlock,
    bcashGetTransaction,
    bcashGetTxForAccount,
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
    ethBroadcast,
    ethGetAccountBalance,
    ethGetAccountErc20Address,
    ethGetAccountTransactions,
    ethGetBlock,
    ethGetCurrentBlock,
    ethGetTransaction,
    ethGetTransactionsCount,
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
    getLogRecord,
    getTransactionsByAccount,
    getTransactionsByCustomer,
    getTransactionsByLedger,
    getTransactionsByReference,
    getVirtualCurrencyByName,
    ltcBroadcast,
    ltcGetBlock,
    ltcGetBlockHash,
    ltcGetCurrentBlock,
    ltcGetTransaction,
    ltcGetTxForAccount,
    ltcGetUTXO,
    mintVirtualCurrency,
    revokeVirtualCurrency,
    sendBitcoinCashTransaction,
    sendBitcoinTransaction,
    sendCustomErc20Transaction,
    sendDeployErc20Transaction,
    sendEthOrErc20Transaction,
    sendLitecoinTransaction,
    sendStoreDataTransaction, sendXlmTransaction,
    sendXrpTransaction,
    storeTransaction,
    unfreezeAccount,
    updateCustomer,
    updateVirtualCurrency, xlmBroadcast, xlmGetAccountInfo, xlmGetAccountTransactions,
    xlmGetCurrentLedger, xlmGetFee, xlmGetLedger, xlmGetLedgerTx, xlmGetTransaction,
    xrpBroadcast,
    xrpGetAccountBalance,
    xrpGetAccountInfo,
    xrpGetAccountTransactions,
    xrpGetCurrentLedger,
    xrpGetFee,
    xrpGetLedger,
    xrpGetTransaction
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
                                await deleteBlockedAmountForAccount(command[4]);
                            } else {
                                await deleteBlockedAmount(command[3]);
                            }
                            break;
                        case Command.FREEZE:
                            await freezeAccount(command[3]);
                            break;
                        case Command.UNFREEZE:
                            await unfreezeAccount(command[3]);
                            break;
                        case Command.ACTIVATE:
                            await activateAccount(command[3]);
                            break;
                        case Command.DEACTIVATE:
                            await deactivateAccount(command[3]);
                            break;
                    }
                    break;
                case Command.CUSTOMER:
                    switch (command[2].toLowerCase()) {
                        case Command.ENABLE:
                            await enableCustomer(command[3]);
                            break;
                        case Command.DISABLE:
                            await disableCustomer(command[3]);
                            break;
                        case Command.ACTIVATE:
                            await activateCustomer(command[3]);
                            break;
                        case Command.DEACTIVATE:
                            await deactivateCustomer(command[3]);
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
                            await updateVirtualCurrency(parse(command[3]));
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
            switch (command[1].toLowerCase()) {
                case Command.BLOCK:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await ethGetCurrentBlock());
                            break;
                        case Command.DETAIL:
                            print(await ethGetBlock(command[3]));
                            break;
                    }
                    break;
                case Command.ACCOUNT:
                    switch (command[3].toLowerCase()) {
                        case Command.ETHEREUM:
                            print(await ethGetAccountBalance(command[4]));
                            break;
                        case Command.ERC20:
                            print(await ethGetAccountErc20Address(command[4], command[5]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            switch (command[3].toLowerCase()) {
                                case Command.ETHEREUM:
                                    print(await sendEthOrErc20Transaction(command[4].toLowerCase() === 'testnet', parse(command[5])));
                                    break;
                                case Command.ERC20:
                                    print(await sendCustomErc20Transaction(command[4].toLowerCase() === 'testnet', parse(command[5])));
                                    break;
                            }
                            break;
                        case Command.ADDRESS:
                            print(await ethGetAccountTransactions(command[3], parseInt(command[4]), parseInt(command[5])));
                            break;
                        case Command.DEPLOY:
                            print(await sendDeployErc20Transaction(command[3].toLowerCase() === 'testnet', parse(command[4])));
                            break;
                        case Command.COUNT:
                            print(await ethGetTransactionsCount(command[3]));
                            break;
                        case Command.BROADCAST:
                            print(await ethBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await ethGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
            break;
        case Command.DATA:
            switch (command[1].toLowerCase()) {
                case Command.CREATE:
                    const data = parse(command[3]);
                    if (data.chain === Currency.ETH) {
                        print(await sendStoreDataTransaction(command[2].toLowerCase() === 'testnet', data));
                    }
                    break;
                case Command.DETAIL:
                    print(await getLogRecord(command[2].toUpperCase() as Currency, command[3]))
                    break;
            }
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
        case Command.XRP:
            switch (command[1].toLowerCase()) {
                case Command.LEDGER:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await xrpGetCurrentLedger());
                            break;
                        case Command.DETAIL:
                            print(await xrpGetLedger(parseInt(command[3])));
                            break;
                    }
                    break;
                case Command.ACCOUNT:
                    switch (command[2].toLowerCase()) {
                        case Command.BALANCE:
                            print(await xrpGetAccountBalance(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await xrpGetAccountInfo(command[3]));
                            break;
                    }
                    break;
                case Command.FEE:
                    print(await xrpGetFee());
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await sendXrpTransaction(parse(command[3])));
                            break;
                        case Command.ADDRESS:
                            print(await xrpGetAccountTransactions(command[3], parseInt(command[4]), command[5]));
                            break;
                        case Command.BROADCAST:
                            print(await xrpBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await xrpGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
            break;
        case Command.XLM:
            switch (command[1].toLowerCase()) {
                case Command.LEDGER:
                    switch (command[2].toLowerCase()) {
                        case Command.CURRENT:
                            print(await xlmGetCurrentLedger());
                            break;
                        case Command.DETAIL:
                            print(await xlmGetLedger(parseInt(command[3])));
                            break;
                    }
                    break;
                case Command.ACCOUNT:
                    switch (command[2].toLowerCase()) {
                        case Command.DETAIL:
                            print(await xlmGetAccountInfo(command[3]));
                            break;
                    }
                    break;
                case Command.FEE:
                    print(await xlmGetFee());
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await sendXlmTransaction(command[3].toLowerCase() === 'testnet', parse(command[4])));
                            break;
                        case Command.ADDRESS:
                            print(await xlmGetAccountTransactions(command[3]));
                            break;
                        case Command.LEDGER:
                            print(await xlmGetLedgerTx(parseInt(command[3])));
                            break;
                        case Command.BROADCAST:
                            print(await xlmBroadcast(command[3]));
                            break;
                        case Command.DETAIL:
                            print(await xlmGetTransaction(command[3]));
                            break;
                    }
                    break;
            }
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
