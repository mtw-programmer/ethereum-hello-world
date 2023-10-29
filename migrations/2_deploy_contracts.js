const ToDoList = artifacts.require('./ToDoList.sol');

module.exports = (deployer) => {
  deployer.deploy(ToDoList);
};
