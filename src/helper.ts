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
    data create <data from STDIN>    Read data from STDIN and store it to the Ethereum blockchain chosen by the API Key - testnet or mainnet
    data detail <chain> <id>    https://docs.tatum.io/reference#getlog

## Bitcoin blockchain operations, API key is required
    bitcoin block current    https://docs.tatum.io/reference#btcgetblockchaininfo
    bitcoin block hash <height>     https://docs.tatum.io/reference#btcgetblockhash
    bitcoin block detail <hashOrHeight>     https://docs.tatum.io/reference#btcgetblock
    bitcoin transaction detail <hash>   https://docs.tatum.io/reference#btcgetrawtransaction
    bitcoin transaction address <address> <pageSize> <offset>   https://docs.tatum.io/reference#btcgettxbyaddress
    bitcoin transaction utxo <hash> <i>     https://docs.tatum.io/reference#btcgetutxo
    bitcoin transaction broadcast <data>    https://docs.tatum.io/reference#btcbroadcast
    bitcoin transaction create <testnet> <JSON stringified request body>    https://docs.tatum.io/reference#btctransferblockchain

## Ethereum blockchain operations, API key is required
    ethereum block current  https://docs.tatum.io/reference#ethgetcurrentblock
    ethereum block detail <hashOrHeight>    https://docs.tatum.io/reference#ethgetblock
    ethereum account balance ethereum <address>     https://docs.tatum.io/reference#ethgetbalance
    ethereum account balance erc20 <address> <contractAddress>  https://docs.tatum.io/reference#etherc20getbalance
    ethereum transaction detail <hash>  https://docs.tatum.io/reference#ethgettransaction
    ethereum transaction count <address>    https://docs.tatum.io/reference#ethgettransactioncount
    ethereum transaction address <address> <pageSize> <offset>  https://docs.tatum.io/reference#ethgettransactionbyaddress
    ethereum transaction broadcast <data>   https://docs.tatum.io/reference#ethbroadcast
    ethereum transaction create ethereum <testnet> <JSON stringified request body>  https://docs.tatum.io/reference#ethblockchaintransfer
    ethereum transaction create erc20 <testnet> <JSON stringified request body>     https://docs.tatum.io/reference#ethblockchaintransfererc20
    ethereum transaction deploy erc20 <testnet> <JSON stringified request body>     https://docs.tatum.io/reference#ethdeployerc20blockchain

## Litecoin blockchain operations, API key is required
    litecoin block current  https://docs.tatum.io/reference#ltcgetblockchaininfo
    litecoin block hash <height>    https://docs.tatum.io/reference#ltcgetblockhash
    litecoin block detail <hashOrHeight>    https://docs.tatum.io/reference#ltcgetblock
    litecoin transaction detail <hash>  https://docs.tatum.io/reference#ltcgetrawtransaction
    litecoin transaction address <address> <pageSize> <offset>  https://docs.tatum.io/reference#ltcgettxbyaddress
    litecoin transaction utxo <hash> <i>    https://docs.tatum.io/reference#ltcgetutxo
    litecoin transaction broadcast <data>   https://docs.tatum.io/reference#ltcbroadcast
    litecoin transaction create <testnet> <JSON stringified request body>   https://docs.tatum.io/reference#ltctransferblockchain

## Bitcoin Cash blockchain operations, API key is required
    bcash block current     https://docs.tatum.io/reference#bchgetblockchaininfo
    bcash block hash <height>   https://docs.tatum.io/reference#bchgetblockhash
    bcash block detail <hashOrHeight>   https://docs.tatum.io/reference#bchgetblock
    bcash transaction detail <hash>     https://docs.tatum.io/reference#bchgetrawtransaction
    bcash transaction address <address> <pageSize> <offset>     https://docs.tatum.io/reference#bchgettxbyaddress
    bcash transaction broadcast <data>  https://docs.tatum.io/reference#bchbroadcast
    bcash transaction create <testnet> <JSON stringified request body>  https://docs.tatum.io/reference#bchtransferblockchain

## XRP blockchain operations, API key is required
    xrp ledger current  https://docs.tatum.io/reference#xrpgetlastclosedledger
    xrp ledger detail <sequence>    https://docs.tatum.io/reference#xrpgetledger
    xrp fee     https://docs.tatum.io/reference#xrpgetfee
    xrp account detail <address>    https://docs.tatum.io/reference#xrpgetaccountinfo
    xrp account balance <address>   https://docs.tatum.io/reference#xrpgetaccountbalance
    xrp transaction detail <hash>   https://docs.tatum.io/reference#xrpgettransaction
    xrp transaction address <address> <min> <marker>    https://docs.tatum.io/reference#xrpgetaccounttx
    xrp transaction broadcast <data>    https://docs.tatum.io/reference#xrpbroadcast
    xrp transaction create <JSON stringified request body>  https://docs.tatum.io/reference#xrptransferblockchain

## Stellar XLM blockchain operations, API key is required
    stellar ledger current  https://docs.tatum.io/reference#xlmgetlastclosedledger
    stellar ledger detail <sequence>    https://docs.tatum.io/reference#xlmgetledger
    stellar fee     https://docs.tatum.io/reference#xlmgetfee
    stellar account detail <address>    https://docs.tatum.io/reference#xlmgetaccountinfo
    stellar transaction detail <hash>   https://docs.tatum.io/reference#xlmgettransaction
    stellar transaction ledger <sequence>   https://docs.tatum.io/reference#xlmgetledgertx
    stellar transaction address <address>   https://docs.tatum.io/reference#xlmgetaccounttx
    stellar transaction broadcast <data>    https://docs.tatum.io/reference#xlmbroadcast
    stellar transaction create <testnet> <JSON stringified request body>    https://docs.tatum.io/reference#xlmtransferblockchain

## Account operations within Tatum Private Ledger, API key is necessary
    ledger account create <JSON stringified request body>   https://docs.tatum.io/reference#createaccount
    ledger account detail <id>  https://docs.tatum.io/reference#getaccountbyaccountid
    ledger account list <pageSize> <offset>     https://docs.tatum.io/reference#getallaccounts
    ledger account list customer <id> <pageSize> <offset>   https://docs.tatum.io/reference#getaccountsbycustomerid
    ledger account balance <id>     https://docs.tatum.io/reference#getaccountbyaccountid
    ledger account block <id> <JSON stringified request body>   https://docs.tatum.io/reference#blockamount
    ledger account block list <id> <pageSize> <offset>  https://docs.tatum.io/reference#getblockamount
    ledger account unblock <id>     https://docs.tatum.io/reference#deleteblockamount
    ledger account unblock account <id>     https://docs.tatum.io/reference#deleteallblockamount
    ledger account freeze <id>  https://docs.tatum.io/reference#freezeaccount
    ledger account unfreeze <id>    https://docs.tatum.io/reference#unfreezeaccount
    ledger account activate <id>    https://docs.tatum.io/reference#activateaccount
    ledger account deactivate <id>  https://docs.tatum.io/reference#deactivateaccount

## Customer operations within Tatum Private Ledger, API key is necessary
    ledger customer update <id> <JSON stringified request body>     https://docs.tatum.io/reference#updatecustomer
    ledger customer detail <id>     https://docs.tatum.io/reference#getcustomerbyexternalid
    ledger customer list <pageSize> <offset>    https://docs.tatum.io/reference#findallcustomers
    ledger customer enable <id>     https://docs.tatum.io/reference#enablecustomer
    ledger customer disable <id>    https://docs.tatum.io/reference#disablecustomer
    ledger customer activate <id>   https://docs.tatum.io/reference#activatecustomer
    ledger customer deactivate <id>     https://docs.tatum.io/reference#deactivatecustomer

## Transaction operations within Tatum Private Ledger, API key is necessary
    ledger transaction create <JSON stringified request body>   https://docs.tatum.io/reference#sendtransaction
    ledger transaction detail <id>  https://docs.tatum.io/reference#gettransactionsbyreference
    ledger transaction list ledger <pageSize> <offset> <JSON stringified request body>  https://docs.tatum.io/reference#gettransactions
    ledger transaction list account <pageSize> <offset> <JSON stringified request body>     https://docs.tatum.io/reference#gettransactionsbyaccountid
    ledger transaction list customer <pageSize> <offset> <JSON stringified request body>    https://docs.tatum.io/reference#gettransactionsbycustomerid

## Virtual currency operations within Tatum Private Ledger, API key is necessary
    ledger vc create <JSON stringified request body>    https://docs.tatum.io/reference#createcurrency
    ledger vc detail <name>     https://docs.tatum.io/reference#getcurrency
    ledger vc update <JSON stringified request body>    https://docs.tatum.io/reference#updatecurrency
    ledger vc mint <JSON stringified request body>  https://docs.tatum.io/reference#mintcurrency
    ledger vc revoke <JSON stringified request body>    https://docs.tatum.io/reference#revokecurrency

## Offchain operations, API key is necessary
    offchain account address create <id>    https://docs.tatum.io/reference#generatedepositaddress
    offchain account address list <id>  https://docs.tatum.io/reference#getalldepositaddresses
    offchain account address exist <address> <currency> [--index,i]     https://docs.tatum.io/reference#addressexists
    offchain account address delete <id> <address>  https://docs.tatum.io/reference#removeaddress
    offchain account address assign <id> <address>  https://docs.tatum.io/reference#assignaddress

    offchain withdrawal create <JSON stringified request body>  https://docs.tatum.io/reference#storewithdrawal
    offchain withdrawal complete <id> <txId>    https://docs.tatum.io/reference#completewithdrawal
    offchain withdrawal cancel <id> <revert>    https://docs.tatum.io/reference#cancelinprogresswithdrawal
    offchain withdrawal broadcast <JSON stringified request body>   https://docs.tatum.io/reference#broadcastblockchaintransaction

    offchain transaction bitcoin create <testnet> <JSON stringified request body>   https://docs.tatum.io/reference#btctransfer
    offchain transaction litecoin create <testnet> <JSON stringified request body>  https://docs.tatum.io/reference#bchtransfer
    offchain transaction bcash create <testnet> <JSON stringified request body>     https://docs.tatum.io/reference#ltctransfer
    offchain transaction ethereum create <testnet> <JSON stringified request body>  https://docs.tatum.io/reference#ethtransfer
    offchain transaction ethereum erc20 create <testnet> <JSON stringified request body>    https://docs.tatum.io/reference#ethtransfererc20
    offchain transaction xrp create <testnet> <JSON stringified request body>   https://docs.tatum.io/reference#xrptransfer
    offchain transaction stellar create <testnet> <JSON stringified request body>   https://docs.tatum.io/reference#xlmtransfer

Options
    --api-key, -a     Tatum API Key to communicate with Tatum API. Necessary only for API requests to the Tatum.
    --index, -i       Optional index for off-chain account address methods.
    --version, -v     Version of the CLI tool.

`;

export const print = (data: any) => console.log(JSON.stringify(data, null, 2));

export const parse = (data: string) => data.startsWith('\'') && data.endsWith('\'') ? JSON.parse(data.slice(1, -1).replace(/\\/g, '')) : JSON.parse(data.replace(/\\/g, ''));