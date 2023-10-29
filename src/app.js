App = {
  loading: false,
  contracts: {},
  load: () => {
    App.loadAccount();
    App.loadContract();
    App.render();
  },
  loadAccount: async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
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
  render: () => {
    if (App.loading) return;

    App.setLoading(false);
  },
  setLoading: (bool) => {
    App.loading = bool;
    const loader = $('#loader');
    const content = $('#content');

    if (bool) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  }
}

$(window).load(() => App.load());