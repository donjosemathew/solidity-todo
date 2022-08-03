// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event AddTask(address recipient,uint taskid);
  event DeleteTask(uint taskid,bool isDeletd);
  struct Task{
    uint id;
    string tasktext;
    bool isDeleted;
  }
  Task[] private tasks;
  mapping(uint256 =>  address) taskToOwner;
  function addTask(string memory tasktext,bool isDeleted) external{
    uint taskid=tasks.length;
    tasks.push(Task(taskid,tasktext,isDeleted));
    taskToOwner[taskid]=msg.sender;
    emit AddTask(msg.sender, taskid);

  }
  function getMytasks() external view returns(Task[] memory){
    Task[] memory temporary =new Task[](tasks.length);
    uint counter=0;
    for(uint i=0;i<tasks.length;i++){
      if(taskToOwner[i]==msg.sender && tasks[i].isDeleted==false){
        temporary[counter]=tasks[i];
        counter++;//37 minutes
      }
    }
  }
}
