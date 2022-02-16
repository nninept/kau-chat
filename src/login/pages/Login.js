import { useState, useEffect } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import "./Login.scss";
import axios from "axios";
import { ContactsOutlined } from "@material-ui/icons";
const electron = window.require("electron");

function isSessionOn() {
  let sessStorage = localStorage.getItem("loginInfo");
  let loginInfo = JSON.parse(sessStorage);
  return loginInfo;
}

function Login(props) {
  const history = props.history;
  useEffect(() => {
    const loginInfo = isSessionOn();
    if (loginInfo)
      electron.ipcRenderer
        .invoke("login-post", loginInfo)
        .then((res) => history.push("/home"));
  }, []);

  const [enteredId, setEnteredId] = useState("");
  const [enteredPwd, setEnteredPwd] = useState("");
  const [errorState, setErrorState] = useState(false);

  const addIdHandler = (event) => {
    setEnteredId(event.target.value);
  };

  const addPwdHandler = (event) => {
    setEnteredPwd(event.target.value);
  };

  const addSubmitHandler = async (event) => {
    event.preventDefault();
    const isLoginSuccess = await electron.ipcRenderer.invoke("login-post", {
      id: enteredId,
      pwd: enteredPwd,
    });
    console.log(isLoginSuccess);
    if (isLoginSuccess) {
      await window.localStorage.setItem(
        "loginInfo",
        JSON.stringify({ id: enteredId, pwd: enteredPwd })
      );
      await window.localStorage.setItem(
        "department-number",
        enteredId.substr(4, 3)
      );
      history.push("/home");
    } else setErrorState(!isLoginSuccess);
  };

  return (
    <div className="login-home">
      <h1 className="login-title"> KAU </h1>
      {errorState && <ErrorMessage />}
      <form id="login-form" onSubmit={addSubmitHandler}>
        <div className="txt_field">
          <input
            type="text"
            name="id"
            id="id"
            onChange={addIdHandler}
            required
          />
          <span></span>
          <label>studentID</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="pwd"
            id="pwd"
            onChange={addPwdHandler}
            required
          />
          <span></span>
          <label>password</label>
        </div>
        <input type="submit" value="Login" id="submit" />
        <a
          className="pass"
          href="http://nportal.kau.ac.kr/webcrea/GB03/mdi/search_password.html"
        >
          Forgot Password?
        </a>
      </form>
    </div>
  );
}

export default Login;
