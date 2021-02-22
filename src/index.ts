#!/usr/bin/env node
import readline from 'readline';
// tslint:disable-next-line:ordered-imports
import {TATUM_API_URL} from '@tatumio/tatum/dist/src/constants';
// tslint:disable-next-line:ordered-imports
import {
    activateAccount,
    activateCustomer, assignDepositAddress,
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
    btcGetUTXO, checkAddressExists,
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
    generateAddressFromXPub, generateDepositAddress,
    generatePrivateKeyFromMnemonic,
    generateWallet,
    getAccountBalance,
    getAccountById,
    getAccountsByCustomerId,
    getAllAccounts,
    getAllCustomers,
    getBlockedAmountsByAccountId,
    getCustomer, getDepositAddressesForAccount,
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
    mintVirtualCurrency, offchainBroadcast, offchainCancelWithdrawal, offchainCompleteWithdrawal, offchainStoreWithdrawal, removeDepositAddress,
    revokeVirtualCurrency, sendBitcoinCashOffchainTransaction,
    sendBitcoinCashTransaction, sendBitcoinOffchainTransaction,
    sendBitcoinTransaction,
    sendCustomErc20Transaction,
    sendDeployErc20Transaction, sendEthErc20OffchainTransaction, sendEthOffchainTransaction,
    sendEthOrErc20Transaction, sendLitecoinOffchainTransaction,
    sendLitecoinTransaction,
    sendStoreDataTransaction, sendXlmOffchainTransaction, sendXlmTransaction, sendXrpOffchainTransaction,
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
import axios from 'axios';
import meow from 'meow';
import {Command} from './command';
import {helpMessage, parse, print} from './helper';

const {input: command, flags} = meow(helpMessage, {
    flags: {
        'api-key': {
            type: 'string',
            alias: 'a'
        },
        'x-quorum-endpoint': {
            type: 'string',
            alias: 'q'
        },
        index: {
            type: 'number',
            alias: 'i'
        },
        version: {
            alias: 'v'
        }
    }
});

const startup = async () => {
    if (command.length === 0) {
        console.log(helpMessage);
        return;
    }
    if (flags.version) {
        console.log(require('package.json').version);
        return;
    }
    if (flags.apiKey) {
        process.env.TATUM_API_KEY = flags.apiKey as string;
    } else if (command[0].toLowerCase() !== Command.WALLET) {
        console.error('API key not provided. You can obtain one at https://tatum.io.');
        process.exit(-1);
        return;
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
                            print(await createAccount(parse(command.slice(3).join(' '))));
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
                                print(await blockAmount(command[3], parse(command.slice(4).join(' '))));
                            }
                            break;
                        case Command.UNBLOCK:
                            if (command[3].toLowerCase() === Command.ACCOUNT) {
                                await deleteBlockedAmountForAccount(command[4]);
                                print({status: 'OK'});
                            } else {
                                await deleteBlockedAmount(command[3]);
                                print({status: 'OK'});
                            }
                            break;
                        case Command.FREEZE:
                            await freezeAccount(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.UNFREEZE:
                            await unfreezeAccount(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.ACTIVATE:
                            await activateAccount(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.DEACTIVATE:
                            await deactivateAccount(command[3]);
                            print({status: 'OK'});
                            break;
                    }
                    break;
                case Command.CUSTOMER:
                    switch (command[2].toLowerCase()) {
                        case Command.ENABLE:
                            await enableCustomer(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.DISABLE:
                            await disableCustomer(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.ACTIVATE:
                            await activateCustomer(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.DEACTIVATE:
                            await deactivateCustomer(command[3]);
                            print({status: 'OK'});
                            break;
                        case Command.LIST:
                            print(await getAllCustomers(parseInt(command[3]), parseInt(command[4])));
                            break;
                        case Command.UPDATE:
                            print(await updateCustomer(command[3], parse(command.slice(4).join(' '))));
                            break;
                        case Command.DETAIL:
                            print(await getCustomer(command[3]));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await storeTransaction(parse(command.slice(3).join(' '))));
                            break;
                        case Command.DETAIL:
                            print(await getTransactionsByReference(command[3]));
                            break;
                        case Command.LIST:
                            switch (command[3].toLowerCase()) {
                                case Command.LEDGER:
                                    print(await getTransactionsByLedger(parse(command.slice(6).join(' ')), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.ACCOUNT:
                                    print(await getTransactionsByAccount(parse(command.slice(6).join(' ')), parseInt(command[4]), parseInt(command[5])));
                                    break;
                                case Command.CUSTOMER:
                                    print(await getTransactionsByCustomer(parse(command.slice(6).join(' ')), parseInt(command[4]), parseInt(command[5])));
                                    break;
                            }
                            break;
                    }
                    break;
                case Command.VC:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await createVirtualCurrency(parse(command.slice(3).join(' '))));
                            break;
                        case Command.DETAIL:
                            print(await getVirtualCurrencyByName(command[3]));
                            break;
                        case Command.UPDATE:
                            await updateVirtualCurrency(parse(command.slice(3).join(' ')));
                            print({status: 'OK'});
                            break;
                        case Command.MINT:
                            print(await mintVirtualCurrency(parse(command.slice(3).join(' '))));
                            break;
                        case Command.REVOKE:
                            print(await revokeVirtualCurrency(parse(command.slice(3).join(' '))));
                            break;
                    }
                    break;
            }
            break;
        case Command.OFFCHAIN:
            switch (command[1].toLowerCase()) {
                case Command.ACCOUNT:
                    switch (command[3].toLowerCase()) {
                        case Command.CREATE:
                            print(await generateDepositAddress(command[4], flags.index));
                            break;
                        case Command.ASSIGN:
                            print(await assignDepositAddress(command[4], command[5]));
                            break;
                        case Command.LIST:
                            print(await getDepositAddressesForAccount(command[4]));
                            break;
                        case Command.EXIST:
                            print(await checkAddressExists(command[4], command[5], flags.index));
                            break;
                        case Command.DELETE:
                            await removeDepositAddress(command[4], command[5]);
                            print({status: 'OK'});
                            break;
                    }
                    break;
                case Command.WITHDRAWAL:
                    switch (command[2].toLowerCase()) {
                        case Command.CREATE:
                            print(await offchainStoreWithdrawal(parse(command.slice(3).join(' '))));
                            break;
                        case Command.COMPLETE:
                            await offchainCompleteWithdrawal(command[3], command[4]);
                            print({status: 'OK'});
                            break;
                        case Command.CANCEL:
                            await offchainCancelWithdrawal(command[3], command[4].toLowerCase() === 'true');
                            print({status: 'OK'});
                            break;
                        case Command.BROADCAST:
                            print(await offchainBroadcast(parse(command.slice(3).join(' '))));
                            break;
                    }
                    break;
                case Command.TRANSACTION:
                    switch (command[2].toLowerCase()) {
                        case Command.BITCOIN:
                            print(await sendBitcoinOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                            break;
                        case Command.LITECOIN:
                            print(await sendLitecoinOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                            break;
                        case Command.BCH:
                            print(await sendBitcoinCashOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                            break;
                        case Command.XRP:
                            print(await sendXrpOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                            break;
                        case Command.XLM:
                            print(await sendXlmOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                            break;
                        case Command.ETHEREUM:
                            switch (command[3].toLowerCase()) {
                                case Command.ERC20:
                                    print(await sendEthErc20OffchainTransaction(command[5].toLowerCase() === 'testnet', parse(command.slice(6).join(' '))));
                                    break;
                                case Command.CREATE:
                                    print(await sendEthOffchainTransaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                                    break;
                            }
                            break;
                    }
                    break;
            }
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
                            print(await sendBitcoinTransaction(command[3].toLowerCase() === 'testnet', parse(command.slice(4).join(' '))));
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
                            print(await sendLitecoinTransaction(command[3].toLowerCase() === 'testnet', parse(command.slice(4).join(' '))));
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
                                    print(await sendEthOrErc20Transaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                                    break;
                                case Command.ERC20:
                                    print(await sendCustomErc20Transaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
                                    break;
                            }
                            break;
                        case Command.ADDRESS:
                            print(await ethGetAccountTransactions(command[3], parseInt(command[4]), parseInt(command[5])));
                            break;
                        case Command.DEPLOY:
                            print(await sendDeployErc20Transaction(command[4].toLowerCase() === 'testnet', parse(command.slice(5).join(' '))));
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
                    process.stdin.pipe(require('split')()).on('data', async (line: string) => {
                        if (line.trim().length === 0) {
                            return;
                        }
                        try {
                            switch (command[2].toUpperCase()) {
                                case Currency.QUORUM:
                                    print((await axios.post(TATUM_API_URL + '/v3/record', {
                                        data: line.trim(),
                                        chain: Currency.QUORUM,
                                        from: command[3],
                                        to: command[4],
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'x-api-key': process.env.TATUM_API_KEY,
                                            'x-quorum-endpoint': flags.xQuorumEndpoint,
                                        }
                                    })).data);
                                    break;
                                case Currency.ETH:
                                    print((await axios.post(TATUM_API_URL + '/v3/record', {data: line.trim(), chain: Currency.ETH}, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'x-api-key': process.env.TATUM_API_KEY,
                                        }
                                    })).data);
                                    break;
                            }
                        } catch (e) {
                            print(e.response ? e.response.data : e);
                        }
                    });
                    break;
                case Command.DETAIL:
                    print(await getLogRecord(command[2].toUpperCase() as Currency, command[3]));
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
                            print(await sendBitcoinCashTransaction(command[3].toLowerCase() === 'testnet', parse(command.slice(4).join(' '))));
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
                            print(await sendXrpTransaction(parse(command.slice(3).join(' '))));
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
                            print(await sendXlmTransaction(command[3].toLowerCase() === 'testnet', parse(command.slice(4).join(' '))));
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
    process.exit(-1);
});
