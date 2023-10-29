App = {
  load: async () => {
    await App.loadAccount();
  },
  loadAccount: async () => {
    try {
      const accounts = await ethereum.request({ method: 
        'eth_requestAccounts' });
      App.account = accounts[0];
    } catch (ex) {
      console.log(ex);
    }
  },
}

$(window).load(() => App.load());