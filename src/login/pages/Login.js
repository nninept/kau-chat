import {useState} from "react";
import ErrorMessage from '../components/Error/ErrorMessage'
import "./Login.css"
const electron = window.require('electron')

function isSessionOn(){
  let sessStorage = localStorage.getItem("loginInfo")
  let loginInfo = JSON.parse(sessStorage)
  return loginInfo
}
function Login(props) {
  const history = props.history;
  const loginInfo = isSessionOn()
  if(loginInfo) electron.ipcRenderer.invoke('login', loginInfo).then(res => history.push('/home'))

  const [enteredId, setEnteredId] = useState('')
  const [enteredPwd, setEnteredPwd] = useState('')
  const [errorState, setErrorState] = useState(false)

  const addIdHandler = (event)=>{
    setEnteredId(event.target.value)
  }

  const addPwdHandler = (event)=>{
    setEnteredPwd(event.target.value)
  }

  const addSubmitHandler = async (event) => {
    event.preventDefault();

    
    let isLoginSuccess = await electron.ipcRenderer.invoke('login', {id:enteredId, pwd:enteredPwd})
    window.localStorage.setItem("loginInfo", JSON.stringify({id:enteredId, pwd:enteredPwd}))
    if(isLoginSuccess) history.push('/home')
    else setErrorState(!isLoginSuccess)
  }

  return (
    <div className="login-home">
    <h1 className="login-title"> KAU </h1>
    {errorState && <ErrorMessage />}
    <form id="login-form"  onSubmit={addSubmitHandler}>
        <input type="text" placeholder="학번" name="id" id='id' onChange={addIdHandler} required/>
        <br/>
        <input type="password" placeholder="비밀번호" name="pwd" id='pwd' onChange={addPwdHandler} required/>
        <br/>
        <input type="submit" value="Login" id="submit"/>
    </form>
  </div>
  );
}

export default Login;