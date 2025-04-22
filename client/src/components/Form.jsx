import { useContext } from "react";
import userContext from "../context/user/UserContext";
import InputTag from "./InputTag";

/* eslint-disable react/prop-types */
function Form({ page, data, setData }) {
  const changeHandler = (e) => {
    setData({
      ...data, // Spread the existing data state to retain other fields
      [e.target.name]: e.target.value, // Update the specific field with the new value
    });
  };

  const { user, loginUserRequest, registerUserRequest, resetPasswordRequest } =
    useContext(userContext);

  const submitHandler = () => {
    if (page === "Register") {
      registerUserRequest(data);
    } else if (page === "Login") {
      loginUserRequest(data);
    }
  };

  const resetPasswordHandler = () => {
    resetPasswordRequest(data);
  };

  return (
    <div className="font-josefin-sans flex min-w-[250px] items-baseline justify-center rounded-lg border bg-light-gray-50 font-medium  dark:bg-dark-gray-50">
      <div className="form-card w-full space-y-5  py-8 text-light-gray-300 dark:text-dark-gray-400">
        <h1 className="title text-center text-2xl font-semibold">
          {page} Page
        </h1>
        <div className="inputs box-border  space-y-5">
          <div
            className={`authorization-page  space-y-5 ${
              user ? "hidden" : "block"
            }`}>
            {page === "Register" ? (
              <InputTag
                type="name"
                name="name"
                value={data.name}
                changeHandler={changeHandler}
                placeholder="Enter Name"
              />
            ) : (
              ""
            )}

            <InputTag
              type={"email"}
              placeholder={"Enter Email"}
              name={"email"}
              value={data.email}
              changeHandler={changeHandler}
            />
            <InputTag
              type="password"
              name="password"
              value={data.password}
              changeHandler={changeHandler}
              placeholder="Enter Password"
            />
            <button
              onClick={submitHandler}
              className="mx-[5%] my-3 w-[90%] rounded-md bg-[#f5f5f5] p-3 text-xl hover:bg-[#faeeee] dark:bg-[#1e1f29] hover:dark:bg-[#202130]">
              Submit
            </button>
          </div>

          <div
            className={`resetPassword space-y-5 ${user ? "block" : "hidden"}`}>
            <InputTag
              type="password"
              name="oldPassword"
              value={data.oldPassword}
              changeHandler={changeHandler}
              placeholder="Enter Old Password"
            />
            <InputTag
              type="password"
              name="newPassword"
              value={data.newPassword}
              changeHandler={changeHandler}
              placeholder="Enter New Password"
            />
            <button
              onClick={resetPasswordHandler}
              className="mx-[5%] my-3 w-[90%] rounded-md bg-[#f5f5f5] p-3 text-xl hover:bg-[#faeeee] dark:bg-[#1e1f29] hover:dark:bg-[#202130]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
