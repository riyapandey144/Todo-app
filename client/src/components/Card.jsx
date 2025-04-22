import { useContext, useState } from "react";
import ListItem from "./ListItem";
import todosContext from "../context/todos/todoContext";

/* eslint-disable react/prop-types */
function Card({ showList, list, filterListHandler, active }) {
  const [title, setTitle] = useState("");

  const { setList, addTodos, checkCompleted, deleteToDos, clearAllComplete } =
    useContext(todosContext);

  const checkHandler = async (e, index, id) => {
    const element = e.currentTarget;
    const paragraphElement = element.nextElementSibling;
    await checkCompleted(id);

    if (element.classList.contains("bg-blue-500")) {
      element.classList.remove("bg-blue-500");
      paragraphElement.classList.remove("line-through");
      paragraphElement.classList.remove("text-light-gray-300");
    } else {
      element.classList.add("bg-blue-500");
      paragraphElement.classList.add("line-through");
      paragraphElement.classList.add("text-light-gray-300");
    }
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    localStorage.setItem("list", JSON.stringify(updatedList));
    setList(updatedList);
    filterListHandler(active);
  };

  const addToListHandler = async () => {
    if (title.trim().length !== 0) {
      // Request To API:
      await addTodos(title);
      setTitle("");
    }
  };

  const removeItemHandler = async (id) => {
    await deleteToDos(id);
    filterListHandler(active);
  };

  const clearCompletedHandler = () => {
    clearAllComplete();
  };

  return (
    <div>
      <div className="input mb-5 flex bg-light-gray-50 text-lg text-light-gray-300 shadow-xl dark:bg-dark-gray-100 dark:text-dark-gray-300">
        <div className="item flex w-full items-center justify-center space-x-3 p-3">
          <h3 className="circle block rounded-full border border-gray-400 p-2"></h3>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addToListHandler();
              }
            }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Create a new todo..."
            className="w-full bg-light-gray-50 px-2 py-1 text-light-gray-300 focus:outline-none dark:bg-dark-gray-100 dark:text-dark-gray-300"
          />
        </div>
      </div>
      <div className=" list-container rounded-lg bg-light-gray-50 text-lg font-[400] text-light-gray-400 shadow-xl dark:bg-dark-gray-100 dark:text-dark-gray-300">
        {showList &&
          showList.length > 0 &&
          showList.map((item, index) => {
            return (
              <ListItem
                key={index}
                id={item._id}
                index={index}
                title={(item.title && item.title) || "default"}
                isCompleted={item.completed}
                checkHandler={checkHandler}
                removeItemHandler={removeItemHandler}
              />
            );
          })}

        <div className="details flex w-full flex-wrap justify-between p-3 font-[400] text-light-gray-300 dark:text-dark-gray-400">
          <p className="order-1 min-[500px]:basis-auto">
            {list &&
              list.length > 0 &&
              list.filter((ele) => ele.completed === false).length}{" "}
            items lefts
          </p>
          <ul className="order-3 hidden space-x-3 min-[500px]:order-2 min-[600px]:flex">
            <li
              onClick={() => {
                filterListHandler("all");
              }}
              className={`hover:cursor-pointer dark:hover:text-white ${
                active === "all" ? "text-blue-400" : ""
              }`}>
              All
            </li>
            <li
              onClick={() => {
                filterListHandler("active");
              }}
              className={`hover:cursor-pointer dark:hover:text-white ${
                active === "active" ? "text-blue-400" : ""
              }`}>
              Active
            </li>
            <li
              onClick={() => {
                filterListHandler("completed");
              }}
              className={`hover:cursor-pointer dark:hover:text-white ${
                active === "completed" ? "text-blue-400" : ""
              }`}>
              Complete
            </li>
          </ul>
          <p
            onClick={clearCompletedHandler}
            className="clear-completed order-2 hover:cursor-pointer dark:hover:text-white min-[500px]:order-3 min-[500px]:basis-auto">
            Clear Completed
          </p>
        </div>
      </div>
      {/* for mobile : filter seciton */}
      <ul className="order-3 my-5 flex justify-center space-x-5 rounded-lg bg-light-gray-50 py-3 text-light-gray-300 shadow-xl dark:bg-dark-gray-100 dark:text-dark-gray-400 min-[500px]:order-2 min-[600px]:hidden">
        <li
          onClick={() => {
            filterListHandler("all");
          }}
          className={`hover:cursor-pointer dark:hover:text-white ${
            active === "all" ? "text-blue-400" : ""
          }`}>
          All
        </li>
        <li
          onClick={() => {
            filterListHandler("active");
          }}
          className={`hover:cursor-pointer dark:hover:text-white ${
            active === "active" ? "text-blue-400" : ""
          }`}>
          Active
        </li>
        <li
          onClick={() => {
            filterListHandler("completed");
          }}
          className={`hover:cursor-pointer dark:hover:text-white ${
            active === "completed" ? "text-blue-400" : ""
          }`}>
          Complete
        </li>
      </ul>
    </div>
  );
}

export default Card;
