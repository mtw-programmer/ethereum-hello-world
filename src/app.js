App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  loadAccount: async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      App.account = accounts[0];
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
  toggleCompleted: async (e) => {
    App.setLoading(true);
    const taskId = e.target.name;
    await App.toDoList.toggleCompleted(taskId, { from: App.account });
    window.location.reload();
  },
  render: async () => {
    if (App.loading) return;

    App.setLoading(true);

    $('#account').html(App.account);

    await App.renderTasks();

    App.setLoading(false);
  },
  createTask: async () => {
    App.setLoading(true);
    const content = $('#newTask').val();
    const taskCount = await App.toDoList.taskCount();
    await App.toDoList.createTask(`Task no. ${+taskCount + 1}`, content, { from: App.account });
    window.location.reload();
  },
  renderTasks: async () => {
    const taskCount = await App.toDoList.taskCount();
    const taskTemplate = $('.taskTemplate');

    for (let i = 1; i <= taskCount; i++) {
      const task = await App.toDoList.tasks(i);
      const id = task[0].toNumber();
      const title = task[1];
      const content = task[2];
      const completed = task[3];

      const newTaskTemplate = taskTemplate.clone();
      
      newTaskTemplate.find('.title').html(`<b>${title}: </b>`);
      newTaskTemplate.find('.content').html(content);
      newTaskTemplate.find('input')
        .prop('name', id)
        .prop('checked', completed)
        .on('click', App.toggleCompleted);

      if (completed)
        $('#completedTaskList').append(newTaskTemplate)
      else
        $('#taskList').append(newTaskTemplate);

      newTaskTemplate.show();
    }
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
  },
}

$(window).load(() => App.load());