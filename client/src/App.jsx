import { useContext, useEffect, useState } from "react";
import Main from "./components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./context/user/userContext";
import todosContext from "./context/todos/todoContext";
function App() {
  const [theme, setTheme] = useState();

  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const { user, myProfileRequest } = useContext(userContext);
  const { getToDos } = useContext(todosContext);

  useEffect(() => {
    myProfileRequest();
  }, []);

  useEffect(() => {
    if (user) {
      getToDos();
      setShowForm(!showForm);
    }
  }, [user]);

  return (
    <>
      <ToastContainer />
      <Main
        theme={theme}
        showForm={showForm}
        setShowForm={setShowForm}
        setTheme={setTheme}
      />
    </>
  );
}

export default App;
