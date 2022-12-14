import Navbar from "./Navbar";
import { IoMdAddCircle } from "react-icons/io";
import Task from "./Task";

const TodoList = ({ tasks, input, setinput, addTask, deleteTask }) => (
  <div className="w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll">
    <Navbar />
    <h2 className="text-4xl bolder text-white pb-8">What&apos;s up, Kevin!</h2>
    <div className="py-3 text-[#7d99e9]">TODAY&apos;S TASKS</div>
    <form className="flex items-center justify-center">
      <input
        value={input}
        onChange={(e) => setinput(e.target.value)}
        className="rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]"
        placeholder="Add a task for today..."
        // take input from the form here
      />
      <IoMdAddCircle
        onClick={addTask}
        // Add an onClick method
        className="text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]"
      />
    </form>
    <ul>
      {console.log(tasks)}
      {tasks.map((item, index) => (
        <Task
          key={item.id}
          index={index}
          onClick={deleteTask(item.id)}
          tasktext={item.tasktext}
        />
      ))}
    </ul>
  </div>
);

export default TodoList;
