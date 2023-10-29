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
}
