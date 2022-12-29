const Web3 = require("web3").default

const wsUrl = "wss://rinkeby.infura.io/ws/v3/"
const httpUrl = "https://rinkeby.infura.io/v3/"

class EthereumTransationManager {
    constructor(){
        this.shopAddress = ""
        this.infraProjectId
        this.web3WebSocketClient = undefined
        this.web3HttpProvider = undefined
        this.subscription = undefined
        this.isInitilized = false
    }

    init(address, projectId) {
        this.shopAddress = address.toLowerCase()
        this.infraProjectId = projectId
        this.web3WebSocketClient = new Web3(new Web3.providers.WebsocketProvider(wsUrl + this.infraProjectId))
        this.web3HttpProvider = new Web3(new Web3.providers.HttpProvider(httpUrl + this.infraProjectId))
        this.isInitilized = true
    }

    listenForPenddingTransactions(onErrListener, onDataListener) {
        this.subscription = this.web3WebSocketClient.eth.subscribe("pendingTransactions", (err, tx) => {
            setTimeout(() => {
                if(err){
                    onErrListener(err)
                }
            }, 1000 * 30)
        })

        this.subscription.on("data", (data)=>{
            setTimeout(()=>{
            if(data){
                onDataListener(data)
            }
        }, 1000 * 30)
    })
    }

    async checkForTransation(clientAddress, handeler) {
        if(!this.isInitilized)
            return

        this.listenForPenddingTransactions((err)=>{
            handeler(false)
        },
        async (data)=>{
            let txData = await this.web3HttpProvider.eth.getTransaction(data)
            if(this.shopAddress === txData.to.toLowerCase() && clientAddress === txData.from.toLowerCase()) {
                handeler(true)
            }
            else{
                handeler(false)
            }
        })
    }

    cancel() {
        this.subscription = undefined
    }

}

module.exports = EthereumTransationManager