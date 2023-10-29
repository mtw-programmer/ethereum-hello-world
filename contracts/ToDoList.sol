pragma solidity ^0.5.0;

contract ToDoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string title;
    string content;
    bool completed = false;
  }

  mapping(uint => Task) public tasks;

  constructor () public {
    createTask('Task no. 1', 'Stop procrastinating ;)');
  }

  function createTask (string memory _title, string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _title, _content);
  }
}
