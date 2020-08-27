export const helpMessage = `
    Usage
        $ tatum command ...list of parameters [--apiKey]

    Commands
      ## blockchain wallet operations, only run locally
         wallet create <chain> <testnet> [mnemonic]                  Generate wallet for a specific blockchain and echo it to the output.
         wallet privatekey create <chain> <mnemonic> <i> <testnet>   Obtain managed wallet from wallet store and generate private key for given derivation index.
         wallet address create <chain> <xpub> <i> <testnet>          Obtain managed wallet from wallet store and generate address for given derivation index.

      ## store and obtain data from blockchain, API key is required
         data create <testnet> <JSON request body, e.g. {\"a\":1}>                  https://tatum.io/apidoc.html#operation/StoreLog
         data detail <chain> <id>                                                   https://tatum.io/apidoc.html#operation/GetLog

      ## Bitcoin blockchain operations, API key is required
         bitcoin block current                                                       https://tatum.io/apidoc.html#operation/BtcGetBlockChainInfo
         bitcoin block hash <height>                                                 https://tatum.io/apidoc.html#operation/BtcGetBlockHash
         bitcoin block detail <hashOrHeight>                                         https://tatum.io/apidoc.html#operation/BtcGetBlock
         bitcoin transaction detail <hash>                                           https://tatum.io/apidoc.html#operation/BtcGetRawTransaction
         bitcoin transaction address <address> <pageSize> <offset>                   https://tatum.io/apidoc.html#operation/BtcGetTxByAddress
         bitcoin transaction utxo <hash> <i>                                         https://tatum.io/apidoc.html#operation/BtcGetUTXO
         bitcoin transaction broadcast <data>                                        https://tatum.io/apidoc.html#operation/BtcBroadcast
         bitcoin transaction create <testnet> <JSON request body, e.g. {\"a\":1}>    https://tatum.io/apidoc.html#operation/BtcTransferBlockchain

      ## Ethereum blockchain operations, API key is required
         ethereum block current                                                                 https://tatum.io/apidoc.html#operation/EthGetCurrentBlock
         ethereum block detail <hashOrHeight>                                                   https://tatum.io/apidoc.html#operation/EthGetBlock
         ethereum account balance ethereum <address>                                            https://tatum.io/apidoc.html#operation/EthGetBalance
         ethereum account balance erc20 <address> <contractAddress>                             https://tatum.io/apidoc.html#operation/EthErc20GetBalance
         ethereum transaction detail <hash>                                                     https://tatum.io/apidoc.html#operation/EthGetTransaction
         ethereum transaction count <address>                                                   https://tatum.io/apidoc.html#operation/EthGetTransactionCount
         ethereum transaction address <address> <pageSize> <offset>                             https://tatum.io/apidoc.html#operation/EthGetTransactionByAddress
         ethereum transaction broadcast <data>                                                  https://tatum.io/apidoc.html#operation/EthBroadcast
         ethereum transaction create ethereum <testnet> <JSON request body, e.g. {\"a\":1}>     https://tatum.io/apidoc.html#operation/EthBlockchainTransfer
         ethereum transaction create erc20 <testnet> <JSON request body, e.g. {\"a\":1}>        https://tatum.io/apidoc.html#operation/EthBlockchainTransferErc20
         ethereum transaction deploy erc20 <testnet> <JSON request body, e.g. {\"a\":1}>        https://tatum.io/apidoc.html#operation/EthDeployErc20Blockchain

      ## Litecoin blockchain operations, API key is required
         litecoin block current                                                      https://tatum.io/apidoc.html#operation/LtcGetBlockChainInfo
         litecoin block hash <height>                                                https://tatum.io/apidoc.html#operation/LtcGetBlockHash
         litecoin block detail <hashOrHeight>                                        https://tatum.io/apidoc.html#operation/LtcGetBlock
         litecoin transaction detail <hash>                                          https://tatum.io/apidoc.html#operation/LtcGetRawTransaction
         litecoin transaction address <address> <pageSize> <offset>                  https://tatum.io/apidoc.html#operation/LtcGetTxByAddress
         litecoin transaction utxo <hash> <i>                                        https://tatum.io/apidoc.html#operation/LtcGetUTXO
         litecoin transaction broadcast <data>                                       https://tatum.io/apidoc.html#operation/LtcBroadcast
         litecoin transaction create <testnet> <JSON request body, e.g. {\"a\":1}>   https://tatum.io/apidoc.html#operation/LtcTransferBlockchain

      ## Bitcoin Cash blockchain operations, API key is required
         bcash block current                                                     https://tatum.io/apidoc.html#operation/BchGetBlockChainInfo
         bcash block hash <height>                                               https://tatum.io/apidoc.html#operation/BchGetBlockHash
         bcash block detail <hashOrHeight>                                       https://tatum.io/apidoc.html#operation/BchGetBlock
         bcash transaction detail <hash>                                         https://tatum.io/apidoc.html#operation/BchGetRawTransaction
         bcash transaction address <address> <pageSize> <offset>                 https://tatum.io/apidoc.html#operation/BchGetTxByAddress
         bcash transaction broadcast <data>                                      https://tatum.io/apidoc.html#operation/BchBroadcast
         bcash transaction create <testnet> <JSON request body, e.g. {\"a\":1}>  https://tatum.io/apidoc.html#operation/BchTransferBlockchain

      ## XRP blockchain operations, API key is required
         xrp ledger current                                                     https://tatum.io/apidoc.html#operation/XrpGetLastClosedLedger
         xrp ledger detail <sequence>                                           https://tatum.io/apidoc.html#operation/XrpGetLedger
         xrp fee                                                                https://tatum.io/apidoc.html#operation/XrpGetFee
         xrp account detail <address>                                           https://tatum.io/apidoc.html#operation/XrpGetAccountInfo
         xrp account balance <address>                                          https://tatum.io/apidoc.html#operation/XrpGetAccountBalance
         xrp transaction detail <hash>                                          https://tatum.io/apidoc.html#operation/XrpGetTransaction
         xrp transaction address <address> <min> <marker>                       https://tatum.io/apidoc.html#operation/XrpGetAccountTx
         xrp transaction broadcast <data>                                       https://tatum.io/apidoc.html#operation/XrpBroadcast
         xrp transaction create <JSON request body, e.g. {\"a\":1}>             https://tatum.io/apidoc.html#operation/XrpTransferBlockchain

      ## Stellar XLM blockchain operations, API key is required
         stellar ledger current                                                     https://tatum.io/apidoc.html#operation/XlmGetLastClosedLedger
         stellar ledger detail <sequence>                                           https://tatum.io/apidoc.html#operation/XlmGetLedger
         stellar fee                                                                https://tatum.io/apidoc.html#operation/XlmGetFee
         stellar account detail <address>                                           https://tatum.io/apidoc.html#operation/XlmGetAccountInfo
         stellar transaction detail <hash>                                          https://tatum.io/apidoc.html#operation/XlmGetTransaction
         stellar transaction ledger <sequence>                                      https://tatum.io/apidoc.html#operation/XlmGetLedgerTx
         stellar transaction address <address>                                      https://tatum.io/apidoc.html#operation/XlmGetAccountTx
         stellar transaction broadcast <data>                                       https://tatum.io/apidoc.html#operation/XlmBroadcast
         stellar transaction create <testnet> <JSON request body, e.g. {\"a\":1}>   https://tatum.io/apidoc.html#operation/XlmTransferBlockchain

      ## Account operations within Tatum Private Ledger, API key is necessary
         ledger account create <JSON request body, e.g. {\"a\":1}>       https://tatum.io/apidoc.html#operation/createAccount
         ledger account detail <id>                                      https://tatum.io/apidoc.html#operation/getAccountByAccountId
         ledger account list <pageSize> <offset>                         https://tatum.io/apidoc.html#operation/getAllAccounts
         ledger account list customer <id> <pageSize> <offset>           https://tatum.io/apidoc.html#operation/getAccountsByCustomerId
         ledger account balance <id>                                     https://tatum.io/apidoc.html#operation/getAccountByAccountId
         ledger account block <id> <JSON request body, e.g. {\"a\":1}>   https://tatum.io/apidoc.html#operation/blockAmount
         ledger account block list <id> <pageSize> <offset>              https://tatum.io/apidoc.html#operation/getBlockAmount
         ledger account unblock <id>                                     https://tatum.io/apidoc.html#operation/deleteBlockAmount
         ledger account unblock account <id>                             https://tatum.io/apidoc.html#operation/deleteAllBlockAmount
         ledger account freeze <id>                                      https://tatum.io/apidoc.html#operation/freezeAccount
         ledger account unfreeze <id>                                    https://tatum.io/apidoc.html#operation/unfreezeAccount
         ledger account activate <id>                                    https://tatum.io/apidoc.html#operation/activateAccount
         ledger account deactivate <id>                                  https://tatum.io/apidoc.html#operation/deactivateAccount

      ## Customer operations within Tatum Private Ledger, API key is necessary
         ledger customer update <id> <JSON request body, e.g. {\"a\":1}>     https://tatum.io/apidoc.html#operation/updateCustomer
         ledger customer detail <id>                                         https://tatum.io/apidoc.html#operation/getCustomerByExternalId
         ledger customer list <pageSize> <offset>                            https://tatum.io/apidoc.html#operation/findAllCustomers
         ledger customer enable <id>                                         https://tatum.io/apidoc.html#operation/enableCustomer
         ledger customer disable <id>                                        https://tatum.io/apidoc.html#operation/disableCustomer
         ledger customer activate <id>                                       https://tatum.io/apidoc.html#operation/activateCustomer
         ledger customer deactivate <id>                                     https://tatum.io/apidoc.html#operation/deactivateCustomer

      ## Transaction operations within Tatum Private Ledger, API key is necessary
         ledger transaction create <JSON request body, e.g. {\"a\":1}>                               https://tatum.io/apidoc.html#operation/sendTransaction
         ledger transaction detail <id>                                                              https://tatum.io/apidoc.html#operation/getTransactionsByReference
         ledger transaction list ledger <pageSize> <offset> <JSON request body, e.g. {\"a\":1}>      https://tatum.io/apidoc.html#operation/getTransactions
         ledger transaction list account <pageSize> <offset> <JSON request body, e.g. {\"a\":1}>     https://tatum.io/apidoc.html#operation/getTransactionsByAccountId
         ledger transaction list customer <pageSize> <offset> <JSON request body, e.g. {\"a\":1}>    https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId

      ## Virtual currency operations within Tatum Private Ledger, API key is necessary
         ledger vc create <JSON request body, e.g. {\"a\":1}>    https://tatum.io/apidoc.html#operation/createCurrency
         ledger vc detail <name>                                 https://tatum.io/apidoc.html#operation/getCurrency
         ledger vc update <JSON request body, e.g. {\"a\":1}>    https://tatum.io/apidoc.html#operation/updateCurrency
         ledger vc mint <JSON request body, e.g. {\"a\":1}>      https://tatum.io/apidoc.html#operation/mintCurrency
         ledger vc revoke <JSON request body, e.g. {\"a\":1}>    https://tatum.io/apidoc.html#operation/revokeCurrency

    Options
         --api-key, -a                                   Tatum API Key to communicate with Tatum API. Necessary only for API requests to the Tatum.

`;

export const print = (data: any) => console.log(JSON.stringify(data, null, 2));

export const parse = (data: string) => data.startsWith('\'') && data.endsWith('\'') ? JSON.parse(data.slice(1, -1)) : JSON.parse(data);