/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";
import bgMobileDark from "../assets/images/bg-mobile-dark.jpg";
import bgDesktopLight from "../assets/images/bg-desktop-light.jpg";
import bgMobileLight from "../assets/images/bg-mobile-light.jpg";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import Form from "./Form";
import Card from "./Card";
import userContext from "../context/user/userContext";
import todoContext from "../context/todos/todoContext";

const Main = ({ theme, setTheme, showForm, setShowForm }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    oldPassword: "",
    newPassword: "",
  });

  const [showList, setShowList] = useState([]);
  const [active, setActive] = useState("all");

  const [page, setPage] = useState("Login");
  const [profileShow, setProfileShow] = useState("hidden");

  const { user } = useContext(userContext);

  const { list } = useContext(todoContext);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    filterListHandler(active);
  }, [list]);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (theme === "dark" && window.innerWidth > 501) {
        setImageUrl(bgDesktopDark);
      } else if (theme === "dark" && window.innerWidth < 500) {
        setImageUrl(bgMobileDark);
      } else if (theme === "light" && window.innerWidth > 501) {
        setImageUrl(bgDesktopLight);
      } else if (theme === "light" && window.innerWidth < 500) {
        setImageUrl(bgMobileLight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filterListHandler = (filter) => {
    let filteredList = [];
    if (filter === "active" && list.length > 0) {
      filteredList = list.filter((item) => item.completed === false);
      setActive("active");
    } else if (filter === "completed" && list.length > 0) {
      filteredList = list.filter((item) => item.completed === true);
      setActive("completed");
    } else {
      filteredList = list;
      setActive("all");
    }
    setShowList(filteredList);
  };

  const changePageHandler = () => {
    if (user) {
      // show reset From page
      setProfileShow(profileShow === "hidden" ? "block" : "hidden");
      setShowForm(false);
    } else {
      setPage(page === "Register" ? "Login" : "Register");
      setData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  const resetPasswordHandler = async () => {
    setShowForm(true);
    setProfileShow(profileShow === "hidden" ? "block" : "hidden");
  };

  return (
    <>
      <div className="font-josefin-sans relative flex h-screen min-w-[250px] items-baseline justify-center overflow-auto bg-light-gray-50 pt-[160px] font-medium  dark:bg-dark-gray-50">
        <img
          src={imageUrl}
          alt="background"
          className={`absolute top-0 z-0 h-[350px] object-cover`}
        />
        <div className="card z-10 mb-5 w-4/5 space-y-6 sm:w-[500px] md:w-[600px]">
          <div className="title flex items-center justify-between p-3 text-white">
            <h1 className="space-x-3 text-2xl font-semibold">
              <span>T</span>
              <span>O</span>
              <span>D</span>
              <span>O</span>
            </h1>
            <div className="btn relative flex items-center justify-center space-x-6">
              <button className="" onClick={toggleTheme}>
                <img src={theme === "dark" ? sun : moon} alt="mode" />
              </button>

              <button
                onClick={() => {
                  changePageHandler();
                }}>
                {user ? "Profile" : page === "Register" ? "Login" : "Register"}
              </button>
              <div
                className={`profile-detail ${profileShow} absolute right-3 top-8 rounded-lg bg-white p-5 text-dark-gray-100 shadow-2xl dark:bg-dark-gray-100 dark:text-light-gray-200`}>
                <ul className="space-y-3">
                  <li>Name : {user?.name}</li>
                  <li className="block truncate">Email : {user?.email}</li>
                  <li className=" rounded-md border py-1 text-center hover:bg-light-gray-50 dark:hover:bg-dark-gray-50">
                    <button onClick={resetPasswordHandler}>
                      Reset Password
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {!showForm ? (
            <Card
              list={list}
              showList={showList}
              filterListHandler={filterListHandler}
              active={active}
              user={user}
            />
          ) : (
            <Form page={page} data={data} setData={setData} />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
