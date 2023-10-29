pragma solidity ^0.5.0;

contract ToDoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string title;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated (
    uint id,
    string title,
    string content,
    bool completed
  );

  constructor () public {
    createTask('Default Title', 'Stop procrastinating ;)');
  }

  function createTask (string memory _title, string memory _content) public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _title, _content, false);
    emit TaskCreated(taskCount, _title, _content, false);
  }
}
