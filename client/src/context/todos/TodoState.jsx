import { useState } from "react";
import TodosContext from "./todoContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */

const TodoProvider = ({ children }) => {
  // URL:
  let base = "https://todo-app-jhdp.onrender.com";
  let path = "/todos/";
  let url = new URL(path, base).href;

  const [list, setList] = useState([]);

  //  Chaing Todos ======>>>>>>> todos
  async function addTodos(title) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return toast("Login First");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.post(
        url + "addTodos",
        { title: title },
        { headers }
      );
      toast(response.data.msg);
      setList([response.data.todo, ...list]);
    } catch (error) {
      toast(error.response.data.msg);
    }
  }

  async function getToDos() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.get(url + "getAllTodos", { headers });
      setList(response.data.todo);
    } catch (error) {
      // toast(error.response.data.msg);
      console.error("Error :", error.response.data.msg);
    }
  }

  async function checkCompleted(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return toast("Login First");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.put(
        url + `isCompleted/${id}`,
        {},
        { headers }
      );
      const updateTodo = await response.data.todo;
      const newList = list.map((val) => {
        if (val._id.toString() !== updateTodo._id.toString()) return updateTodo;
        else return val;
      });
      setList(newList);
    } catch (error) {
      console.error("Error :", error.response.data.msg);
      toast(error.response.data.msg);
    }
  }

  async function deleteToDos(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.delete(url + "deleteTodo/" + id, {
        headers,
      });
      const newList = list.filter((val) => {
        return val._id.toString() !== id.toString();
      });
      setList(newList);
      toast(response.data.msg);
    } catch (error) {
      toast(error.response.data.msg);
    }
  }

  async function clearAllComplete() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.delete(url + "clearCompleted", { headers });
      toast(response.data.msg);
      setList(response.data.todo);
    } catch (error) {
      toast(error.response.data.msg);
      console.error("Error :", error.response.data.msg);
    }
  }

  return (
    <TodosContext.Provider
      value={{
        list,
        setList,
        addTodos,
        getToDos,
        checkCompleted,
        deleteToDos,
        clearAllComplete,
      }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoProvider;
