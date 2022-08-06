import WrongNetworkMessage from "../components/WrongNetworkMessage";
import ConnectWalletButton from "../components/ConnectWalletButton";
import TodoList from "../components/TodoList";
import { TaskContractAddress } from "../config";
import TaskAbi from "../../backend/build/contracts/TaskContract.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
/*
#Connect to ethers

*/
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctnetwork, setCorreectNetwork] = useState(false);
  const [isUserLoggedin, setUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    connectWallet();
    getAllTasks();
  }, []);
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Not connected to metaMask");
        return;
      }
      let chainid = await ethereum.request({ method: "eth_chainId" });
      const rinkebyChainId = "0x4";
      if (chainid !== rinkebyChainId) {
        alert("Not connected to rinkeby chainid");
        setCorreectNetwork(false);
        return;
      } else {
        setCorreectNetwork(true);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        let allTasks = await TaskContract.getMytasks();

        setTasks(allTasks);
      } else {
        alert("Etherium Not available");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    e.preventDefault();
    let task = {
      taskText: input,
      isDeleted: false,
    };
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        TaskContract.addTask(task.taskText, task.isDeleted).then((res) => {
          setTasks([...tasks, task]);
        });
        setinput();
      } else {
        alert("Etherium Not available");
      }
    } catch {}
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        await TaskContract.deleteTask(key, true);
        let allTasks = await TaskContract.getMytasks();

        setTasks(allTasks);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isUserLoggedin ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctnetwork ? (
        <TodoList
          deleteTask={deleteTask}
          tasks={tasks}
          input={input}
          setinput={setinput}
          addTask={addTask}
        />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
