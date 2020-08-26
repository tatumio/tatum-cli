export const helpMessage = `
    Usage
        $ tatum command

    Commands
      ## blockchain wallet operations, only run locally
        wallet create <chain> <testnet> [mnemonic]                  Generate wallet for a specific blockchain and echo it to the output.
        wallet privatekey create <chain> <mnemonic> <i> <testnet>   Obtain managed wallet from wallet store and generate private key for given derivation index.
        wallet address create <chain> <xpub> <i> <testnet>          Obtain managed wallet from wallet store and generate address for given derivation index.

      ## Bitcoin blockchain operations, API key is required
        bitcoin block current                                                       https://tatum.io/apidoc.html#operation/BtcGetBlockChainInfo
        bitcoin block hash <height>                                                 https://tatum.io/apidoc.html#operation/BtcGetBlockHash
        bitcoin block detail <hashOrHeight>                                         https://tatum.io/apidoc.html#operation/BtcGetBlock
        bitcoin transaction detail <hash>                                           https://tatum.io/apidoc.html#operation/BtcGetRawTransaction
        bitcoin transaction address <address> <pageSize> <offset>                   https://tatum.io/apidoc.html#operation/BtcGetTxByAddress
        bitcoin transaction utxo <hash> <i>                                         https://tatum.io/apidoc.html#operation/BtcGetUTXO
        bitcoin transaction broadcast <data>                                        https://tatum.io/apidoc.html#operation/BtcBroadcast
        bitcoin transaction create <testnet> 'JSON request body, e.g. '{"a":1}''    https://tatum.io/apidoc.html#operation/BtcTransferBlockchain

      ## Litecoin blockchain operations, API key is required
        litecoin block current                                                      https://tatum.io/apidoc.html#operation/LtcGetBlockChainInfo
        litecoin block hash <height>                                                https://tatum.io/apidoc.html#operation/LtcGetBlockHash
        litecoin block detail <hashOrHeight>                                        https://tatum.io/apidoc.html#operation/LtcGetBlock
        litecoin transaction detail <hash>                                          https://tatum.io/apidoc.html#operation/LtcGetRawTransaction
        litecoin transaction address <address> <pageSize> <offset>                  https://tatum.io/apidoc.html#operation/LtcGetTxByAddress
        litecoin transaction utxo <hash> <i>                                        https://tatum.io/apidoc.html#operation/LtcGetUTXO
        litecoin transaction broadcast <data>                                       https://tatum.io/apidoc.html#operation/LtcBroadcast
        litecoin transaction create <testnet> 'JSON request body, e.g. '{"a":1}''   https://tatum.io/apidoc.html#operation/LtcTransferBlockchain

      ## Bitcoin Cash blockchain operations, API key is required
        bcash block current                                                     https://tatum.io/apidoc.html#operation/BchGetBlockChainInfo
        bcash block hash <height>                                               https://tatum.io/apidoc.html#operation/BchGetBlockHash
        bcash block detail <hashOrHeight>                                       https://tatum.io/apidoc.html#operation/BchGetBlock
        bcash transaction detail <hash>                                         https://tatum.io/apidoc.html#operation/BchGetRawTransaction
        bcash transaction address <address> <pageSize> <offset>                 https://tatum.io/apidoc.html#operation/BchGetTxByAddress
        bcash transaction broadcast <data>                                      https://tatum.io/apidoc.html#operation/BchBroadcast
        bcash transaction create <testnet> 'JSON request body, e.g. '{"a":1}''  https://tatum.io/apidoc.html#operation/BchTransferBlockchain

      ## Account operations within Tatum Private Ledger, API key is necessary
        ledger account create 'JSON request body, e.g. '{"a":1}''       https://tatum.io/apidoc.html#operation/createAccount
        ledger account detail <id>                                      https://tatum.io/apidoc.html#operation/getAccountByAccountId
        ledger account list <pageSize> <offset>                         https://tatum.io/apidoc.html#operation/getAllAccounts
        ledger account list customer <id> <pageSize> <offset>           https://tatum.io/apidoc.html#operation/getAccountsByCustomerId
        ledger account balance <id>                                     https://tatum.io/apidoc.html#operation/getAccountByAccountId
        ledger account block <id> 'JSON request body, e.g. '{"a":1}''   https://tatum.io/apidoc.html#operation/blockAmount
        ledger account block list <id> <pageSize> <offset>              https://tatum.io/apidoc.html#operation/getBlockAmount
        ledger account unblock <id>                                     https://tatum.io/apidoc.html#operation/deleteBlockAmount
        ledger account unblock account <id>                             https://tatum.io/apidoc.html#operation/deleteAllBlockAmount
        ledger account freeze <id>                                      https://tatum.io/apidoc.html#operation/freezeAccount
        ledger account unfreeze <id>                                    https://tatum.io/apidoc.html#operation/unfreezeAccount
        ledger account activate <id>                                    https://tatum.io/apidoc.html#operation/activateAccount
        ledger account deactivate <id>                                  https://tatum.io/apidoc.html#operation/deactivateAccount

      ## Customer operations within Tatum Private Ledger, API key is necessary
        ledger customer update <id> 'JSON request body, e.g. '{"a":1}''     https://tatum.io/apidoc.html#operation/updateCustomer
        ledger customer detail <id>                                         https://tatum.io/apidoc.html#operation/getCustomerByExternalId
        ledger customer list <pageSize> <offset>                            https://tatum.io/apidoc.html#operation/findAllCustomers
        ledger customer enable <id>                                         https://tatum.io/apidoc.html#operation/enableCustomer
        ledger customer disable <id>                                        https://tatum.io/apidoc.html#operation/disableCustomer
        ledger customer activate <id>                                       https://tatum.io/apidoc.html#operation/activateCustomer
        ledger customer deactivate <id>                                     https://tatum.io/apidoc.html#operation/deactivateCustomer

      ## Transaction operations within Tatum Private Ledger, API key is necessary
        ledger transaction create 'JSON request body, e.g. '{"a":1}''                               https://tatum.io/apidoc.html#operation/sendTransaction
        ledger transaction detail <id>                                                              https://tatum.io/apidoc.html#operation/getTransactionsByReference
        ledger transaction list ledger <pageSize> <offset> 'JSON request body, e.g. '{"a":1}''      https://tatum.io/apidoc.html#operation/getTransactions
        ledger transaction list account <pageSize> <offset> 'JSON request body, e.g. '{"a":1}''     https://tatum.io/apidoc.html#operation/getTransactionsByAccountId
        ledger transaction list customer <pageSize> <offset> 'JSON request body, e.g. '{"a":1}''    https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId

      ## Virtual currency operations within Tatum Private Ledger, API key is necessary
        ledger vc create 'JSON request body, e.g. '{"a":1}''    https://tatum.io/apidoc.html#operation/createCurrency
        ledger vc detail <id>                                   https://tatum.io/apidoc.html#operation/getCurrency
        ledger vc update 'JSON request body, e.g. '{"a":1}''    https://tatum.io/apidoc.html#operation/updateCurrency
        ledger vc mint 'JSON request body, e.g. '{"a":1}''      https://tatum.io/apidoc.html#operation/mintCurrency
        ledger vc revoke 'JSON request body, e.g. '{"a":1}''    https://tatum.io/apidoc.html#operation/revokeCurrency

    Options
        --api-key, -a                                   Tatum API Key to communicate with Tatum API. Necessary only for API requests to the Tatum.

`;

export const print = (data: any) => console.log(JSON.stringify(data, null, 2));

export const parse = (data: string) => data.startsWith('\'') && data.endsWith('\'') ? JSON.parse(data.slice(1, -1)) : JSON.parse(data);