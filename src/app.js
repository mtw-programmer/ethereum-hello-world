App = {
  account: '',
  contracts: {},
  load: () => {
    App.loadAccount();
    App.loadContract();
  },
  loadAccount: async () => {
    try {
      const accounts = await ethereum.request({ method: 
        'eth_requestAccounts' });
      App.account = accounts[0];
      $('#account').html(App.account);
    } catch (ex) {
      console.log(ex);
    }
  },
  loadContract: async () => {
    const toDoList = await $.getJSON('ToDoList.json');
    App.contracts.toDoList = TruffleContract(toDoList);
    App.contracts.toDoList.setProvider(ethereum);
    App.toDoList = await App.contracts.toDoList.deployed();
  },
}

$(window).load(() => App.load());