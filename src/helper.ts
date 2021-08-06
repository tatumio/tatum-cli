export const helpMessage = `

Usage:  tatum command ...list of parameters [--apiKey]

Tatum CLI - Command Line Interface to communicate with blockchains.
Every JSON request body must be stringified  (https://onlinetexttools.com/json-stringify-text), must not contain spaces and should be enclosed in double quotes / apostrophes, based on the OS.
Example command:    tatum data create true "{\"data\":\"test data\",\"chain\":\"ETH\"}"

Commands

## blockchain wallet operations, only run locally
    wallet create <chain> <testnet> [mnemonic]      Generate wallet for a specific blockchain.
    wallet privatekey create <chain> <mnemonic> <i> <testnet>   Generate private key for given derivation index from mnemonic.
    wallet address create <chain> <xpub> <i> <testnet>  Generate address for given derivation index from xpub.

## store and obtain data from blockchain, API key is required
    data create <chain> [from] [to] <data from STDIN>    Read data from STDIN and store it to the blockchain:
                                                            1. Ethereum blockchain chosen by the API Key - testnet or mainnet
                                                            2. Quorum - from and to addresses must be present in the command
    data detail <chain> <id>    https://tatum.io/apidoc#operation/GetLog

## Bitcoin blockchain operations, API key is required
    bitcoin block current    https://tatum.io/apidoc#operation/BtcGetBlockChainInfo
    bitcoin block hash <height>     https://tatum.io/apidoc#operation/BtcGetBlockHash
    bitcoin block detail <hashOrHeight>     https://tatum.io/apidoc#operation/BtcGetBlock
    bitcoin transaction detail <hash>   https://tatum.io/apidoc#operation/BtcGetRawTransaction
    bitcoin transaction address <address> <pageSize> <offset>   https://tatum.io/apidoc#operation/BtcGetTxByAddress
    bitcoin transaction utxo <hash> <i>     https://tatum.io/apidoc#operation/BtcGetUTXO
    bitcoin transaction broadcast <data>    https://tatum.io/apidoc#operation/BtcBroadcast
    bitcoin transaction create <testnet> <JSON stringified request body>    https://tatum.io/apidoc#operation/BtcTransferBlockchain

## Ethereum blockchain operations, API key is required
    ethereum block current  https://tatum.io/apidoc#operation/EthGetCurrentBlock
    ethereum block detail <hashOrHeight>    https://tatum.io/apidoc#operation/EthGetBlock
    ethereum account balance ethereum <address>     https://tatum.io/apidoc#operation/EthGetBalance
    ethereum account balance erc20 <address> <contractAddress>  https://tatum.io/apidoc#operation/EthErc20GetBalance
    ethereum transaction detail <hash>  https://tatum.io/apidoc#operation/EthGetTransaction
    ethereum transaction count <address>    https://tatum.io/apidoc#operation/EthGetTransactionCount
    ethereum transaction address <address> <pageSize> <offset>  https://tatum.io/apidoc#operation/EthGetTransactionByAddress
    ethereum transaction broadcast <data>   https://tatum.io/apidoc#operation/EthBroadcast
    ethereum transaction create ethereum <testnet> <JSON stringified request body>  https://tatum.io/apidoc#operation/EthBlockchainTransfer
    ethereum transaction create erc20 <testnet> <JSON stringified request body>     https://tatum.io/apidoc#operation/EthBlockchainTransferErc20
    ethereum transaction deploy erc20 <testnet> <JSON stringified request body>     https://tatum.io/apidoc#operation/EthDeployErc20Blockchain

## BSC blockchain operations, API key is required
    bsc block current  https://tatum.io/apidoc#operation/BscGetCurrentBlock
    bsc block detail <hashOrHeight>    https://tatum.io/apidoc#operation/BscGetBlock
    bsc account balance bsc <address>     https://tatum.io/apidoc#operation/BscGetBalance
    bsc account balance bep20 <address> <contractAddress>  https://tatum.io/apidoc#operation/BscBep20GetBalance
    bsc transaction detail <hash>  https://tatum.io/apidoc#operation/BscGetTransaction
    bsc transaction count <address>    https://tatum.io/apidoc#operation/BscGetTransactionCount
    bsc transaction broadcast <data>   https://tatum.io/apidoc#operation/BscBroadcast
    bsc transaction create bsc <testnet> <JSON stringified request body>  https://tatum.io/apidoc#operation/BscBlockchainTransfer
    bsc transaction create bep20 <testnet> <JSON stringified request body>     https://tatum.io/apidoc#operation/BscBlockchainTransferBep20
    bsc transaction deploy <JSON stringified request body>     https://tatum.io/apidoc#operation/BscDeployBep20Blockchain

## Polygon/Matic blockchain operations, API key is required
    matic block current  https://tatum.io/apidoc#operation/PolygonGetCurrentBlock
    matic block detail <hashOrHeight>    https://tatum.io/apidoc#operation/PolygonGetBlock
    matic account <address>  https://tatum.io/apidoc#operation/PolygonGetBalance
    matic transaction detail <hash>  https://tatum.io/apidoc#operation/PolygonGetTransaction
    matic transaction count <address>    https://tatum.io/apidoc#operation/PolygonGetTransactionCount
    matic transaction broadcast <data>   https://tatum.io/apidoc#operation/PolygonBroadcast
    matic transaction create <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/PolygonBlockchainTransfer
    matic transaction deploy <JSON stringified request body>    https://tatum.io/apidoc#operation/PolygonBlockchainTransfer

## NFT blockchain operations, API key is required
    nft get address <chain> <contractaddress> <address>
    nft get contractaddress <chain> <txid>
    nft get uri <chain> <contractaddress> <tokenid>
    nft get royalty <chain> <contractaddress> <tokenid>
    nft transaction deploy <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftDeployErc721
    nft transaction mint <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftMintErc721
    nft transaction mintbatch <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftMintMultipleErc721
    nft transaction burn <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftBurnErc721
    nft transaction transfer <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftTransferErc721
    nft transaction update <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/NftUpdateCashbackErc721
    
## MultiToken blockchain operations, API key is required
    multitoken get balance <chain> <contractaddress> <address>  https://tatum.io/apidoc#operation/MultiTokenGetBalance
    multitoken get balancebatch <chain> <contractaddress> <address> https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch
    multitoken get contractaddress <chain> <txid> https://tatum.io/apidoc#operation/MultiTokenGetContractAddress
    multitoken get transaction <chain> <txid> https://tatum.io/apidoc#operation/MultiTokenGetTransaction
    multitoken get metadata <chain> <contractaddress> <tokenid> https://tatum.io/apidoc#operation/MultiTokenGetMetadata
    multitoken transaction deploy <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/DeployMultiToken
    multitoken transaction mint <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/MintMultiToken
    multitoken transaction mintmultiple <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/MintMultiTokenBatch
    multitoken transaction burn <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/BurnMultiToken
    multitoken transaction burnmultiple <testnet> <JSON stringified request body>https://tatum.io/apidoc#operation/BurnMultiTokenBatch
    multitoken transaction transfer <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/TransferMultiToken
    multitoken transaction transfermultiple <testnet> <JSON stringified request body> https://tatum.io/apidoc#operation/TransferMultiTokenBatch

## Litecoin blockchain operations, API key is required
    litecoin block current  https://tatum.io/apidoc#operation/LtcGetBlockChainInfo
    litecoin block hash <height>    https://tatum.io/apidoc#operation/LtcGetBlockHash
    litecoin block detail <hashOrHeight>    https://tatum.io/apidoc#operation/LtcGetBlock
    litecoin transaction detail <hash>  https://tatum.io/apidoc#operation/LtcGetRawTransaction
    litecoin transaction address <address> <pageSize> <offset>  https://tatum.io/apidoc#operation/LtcGetTxByAddress
    litecoin transaction utxo <hash> <i>    https://tatum.io/apidoc#operation/LtcGetUTXO
    litecoin transaction broadcast <data>   https://tatum.io/apidoc#operation/LtcBroadcast
    litecoin transaction create <testnet> <JSON stringified request body>   https://tatum.io/apidoc#operation/LtcTransferBlockchain

## Bitcoin Cash blockchain operations, API key is required
    bcash block current     https://tatum.io/apidoc#operation/BchGetBlockChainInfo
    bcash block hash <height>   https://tatum.io/apidoc#operation/BchGetBlockHash
    bcash block detail <hashOrHeight>   https://tatum.io/apidoc#operation/BchGetBlock
    bcash transaction detail <hash>     https://tatum.io/apidoc#operation/BchGetRawTransaction
    bcash transaction address <address> <pageSize> <offset>     https://tatum.io/apidoc#operation/BchGetTxByAddress
    bcash transaction broadcast <data>  https://tatum.io/apidoc#operation/BchBroadcast
    bcash transaction create <testnet> <JSON stringified request body>  https://tatum.io/apidoc#operation/BchTransferBlockchain

## XRP blockchain operations, API key is required
    xrp ledger current  https://tatum.io/apidoc#operation/XrpGetLastClosedLedger
    xrp ledger detail <sequence>    https://tatum.io/apidoc#operation/XrpGetLedger
    xrp fee     https://tatum.io/apidoc#operation/XrpGetFee
    xrp account detail <address>    https://tatum.io/apidoc#operation/XrpGetAccountInfo
    xrp account balance <address>   https://tatum.io/apidoc#operation/XrpGetAccountBalance
    xrp transaction detail <hash>   https://tatum.io/apidoc#operation/XrpGetTransaction
    xrp transaction address <address> <min> <marker>    https://tatum.io/apidoc#operation/XrpGetAccountTx
    xrp transaction broadcast <data>    https://tatum.io/apidoc#operation/XrpBroadcast
    xrp transaction create <JSON stringified request body>  https://tatum.io/apidoc#operation/XrpTransferBlockchain

## Stellar XLM blockchain operations, API key is required
    stellar ledger current  https://tatum.io/apidoc#operation/XlmGetLastClosedLedger
    stellar ledger detail <sequence>    https://tatum.io/apidoc#operation/XlmGetLedger
    stellar fee     https://tatum.io/apidoc#operation/XlmGetFee
    stellar account detail <address>    https://tatum.io/apidoc#operation/XlmGetAccountInfo
    stellar transaction detail <hash>   https://tatum.io/apidoc#operation/XlmGetTransaction
    stellar transaction ledger <sequence>   https://tatum.io/apidoc#operation/XlmGetLedgerTx
    stellar transaction address <address>   https://tatum.io/apidoc#operation/XlmGetAccountTx
    stellar transaction broadcast <data>    https://tatum.io/apidoc#operation/XlmBroadcast
    stellar transaction create <testnet> <JSON stringified request body>    https://tatum.io/apidoc#operation/XlmTransferBlockchain

## Account operations within Tatum Private Ledger, API key is necessary
    ledger account create <JSON stringified request body>   https://tatum.io/apidoc#operation/createAccount
    ledger account detail <id>  https://tatum.io/apidoc#operation/getAccountByAccountId
    ledger account list <pageSize> <offset>     https://tatum.io/apidoc#operation/getAllAccounts
    ledger account list customer <id> <pageSize> <offset>   https://tatum.io/apidoc#operation/getAccountsByCustomerId
    ledger account balance <id>     https://tatum.io/apidoc#operation/getAccountByAccountId
    ledger account block <id> <JSON stringified request body>   https://tatum.io/apidoc#operation/blockAmount
    ledger account block list <id> <pageSize> <offset>  https://tatum.io/apidoc#operation/getBlockAmount
    ledger account unblock <id>     https://tatum.io/apidoc#operation/deleteBlockAmount
    ledger account unblock account <id>     https://tatum.io/apidoc#operation/deleteAllBlockAmount
    ledger account freeze <id>  https://tatum.io/apidoc#operation/freezeAccount
    ledger account unfreeze <id>    https://tatum.io/apidoc#operation/unfreezeAccount
    ledger account activate <id>    https://tatum.io/apidoc#operation/activateAccount
    ledger account deactivate <id>  https://tatum.io/apidoc#operation/deactivateAccount

## Customer operations within Tatum Private Ledger, API key is necessary
    ledger customer update <id> <JSON stringified request body>     https://tatum.io/apidoc#operation/updateCustomer
    ledger customer detail <id>     https://tatum.io/apidoc#operation/getCustomerByExternalId
    ledger customer list <pageSize> <offset>    https://tatum.io/apidoc#operation/findAllCustomers
    ledger customer enable <id>     https://tatum.io/apidoc#operation/enableCustomer
    ledger customer disable <id>    https://tatum.io/apidoc#operation/disableCustomer
    ledger customer activate <id>   https://tatum.io/apidoc#operation/activateCustomer
    ledger customer deactivate <id>     https://tatum.io/apidoc#operation/deactivateCustomer

## Transaction operations within Tatum Private Ledger, API key is necessary
    ledger transaction create <JSON stringified request body>   https://tatum.io/apidoc#operation/sendTransaction
    ledger transaction detail <id>  https://tatum.io/apidoc#operation/getTransactionsByReference
    ledger transaction list ledger <pageSize> <offset> <JSON stringified request body>  https://tatum.io/apidoc#operation/getTransactions
    ledger transaction list account <pageSize> <offset> <JSON stringified request body>     https://tatum.io/apidoc#operation/getTransactionsByAccountId
    ledger transaction list customer <pageSize> <offset> <JSON stringified request body>    https://tatum.io/apidoc#operation/getTransactionsByCustomerId

## Virtual currency operations within Tatum Private Ledger, API key is necessary
    ledger vc create <JSON stringified request body>    https://tatum.io/apidoc#operation/createCurrency
    ledger vc detail <name>     https://tatum.io/apidoc#operation/getCurrency
    ledger vc update <JSON stringified request body>    https://tatum.io/apidoc#operation/updateCurrency
    ledger vc mint <JSON stringified request body>  https://tatum.io/apidoc#operation/mintCurrency
    ledger vc revoke <JSON stringified request body>    https://tatum.io/apidoc#operation/revokeCurrency

## Offchain operations, API key is necessary
    offchain account address create <id>    https://tatum.io/apidoc#operation/generateDepositAddress
    offchain account address list <id>  https://tatum.io/apidoc#operation/getAllDepositAddresses
    offchain account address exist <address> <currency> [--index,i]     https://tatum.io/apidoc#operation/addressExists
    offchain account address delete <id> <address>  https://tatum.io/apidoc#operation/removeAddress
    offchain account address assign <id> <address>  https://tatum.io/apidoc#operation/assignAddress

    offchain withdrawal create <JSON stringified request body>  https://tatum.io/apidoc#operation/storeWithdrawal
    offchain withdrawal complete <id> <txId>    https://tatum.io/apidoc#operation/completeWithdrawal
    offchain withdrawal cancel <id> <revert>    https://tatum.io/apidoc#operation/cancelInProgressWithdrawal
    offchain withdrawal broadcast <JSON stringified request body>   https://tatum.io/apidoc#operation/broadcastBlockchainTransaction

    offchain transaction bitcoin create <testnet> <JSON stringified request body>   https://tatum.io/apidoc#operation/BtcTransfer
    offchain transaction litecoin create <testnet> <JSON stringified request body>  https://tatum.io/apidoc#operation/BchTransfer
    offchain transaction bcash create <testnet> <JSON stringified request body>     https://tatum.io/apidoc#operation/LtcTransfer
    offchain transaction ethereum create <testnet> <JSON stringified request body>  https://tatum.io/apidoc#operation/EthTransfer
    offchain transaction ethereum erc20 create <testnet> <JSON stringified request body>    https://tatum.io/apidoc#operation/EthTransferErc20
    offchain transaction xrp create <testnet> <JSON stringified request body>   https://tatum.io/apidoc#operation/XrpTransfer
    offchain transaction stellar create <testnet> <JSON stringified request body>   https://tatum.io/apidoc#operation/XlmTransfer

Options
    --api-key, -a           Tatum API Key to communicate with Tatum API. Necessary only for API requests to the Tatum.
    --x-quorum-endpoint, -q URL of the Quorum network
    --index, -i             Optional index for off-chain account address methods.
    --version, -v           Version of the CLI tool.

`;

export const print = (data: any) => console.log(JSON.stringify(data, null, 2));

export const parse = (data: string) => data.startsWith('\'') && data.endsWith('\'') ? JSON.parse(data.slice(1, -1).replace(/\\/g, '')) : JSON.parse(data.replace(/\\/g, ''));
