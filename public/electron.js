// public/electron.ts
const { app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const axios = require('axios')
const cheerio = require('cheerio');
const http = require("http")
const https = require("https")
const qs = require('qs')
// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
let mainWindow, subWindow, browser;

function createWindow() {
  mainWindow = new BrowserWindow({
    // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
    //alwaysOnTop: true,
    center: true,
    // fullscreen: true,
    width:800,
    height:600,
    minWidth : 760,
    minHeight : 450,
    resizable: true,
    frame:false,
    webPreferences: {
      // 2.
      // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
      // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
      // true 해야 합니다.
      nodeIntegration: true,
      partition:"persist:sessInfo"
    }
  });

  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  
  
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

  app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


ipcMain.handle("trays",(event,arg)=>{
  if(arg==="close") mainWindow.close();
  else if(arg==="maximize") mainWindow.maximize();
  else if(arg==="minimize") mainWindow.minimize();
})

ipcMain.handle('login-post', async (event, arg) => {
  const httpAgent = new http.Agent({ keepAlive: true});
  const httpsAgent = new https.Agent({ keepAlive: true });
  const instance = axios.create({
    baseURL: 'https://lms.kau.ac.kr/',
    withCredentials: true,
    httpAgent,
    httpsAgent,
    timeout: 5000
  })
  const data = {"username":arg["id"],"password":arg["pwd"]}
  const response = await instance({
    method: 'POST',
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    maxRedirects:0,
    url:"/login/index.php",
    withCredentials:true,
    validateStatus: function (status) {
      return status >= 200 && status <= 303
    }
  })

  const $ = cheerio.load(response.data);
  const redirect = $('a')[0].attribs.href
  const isLoginSuccess = (new URL(redirect)).searchParams.get('testsession')
  if(!isLoginSuccess)
    return false


  const cookie = response.headers['set-cookie'][1].split(";")[0].split('=')[1]

  mainWindow.webContents.session.cookies.set({
    name : 'MoodleSession',
    value : cookie,
    domain : 'lms.kau.ac.kr',
    path : '/',
    httpOnly : true,
    secure : false,
    url : 'http://lms.kau.ac.kr'
  })
  axios.get(redirect, {headers: {
    Cookie : `MoodleSession=${cookie}`
  }})
  return true
})


ipcMain.handle('get-lms', async (event, arg) => {
  
  let lmsCookie = mainWindow.webContents.session.cookies.get({ url: 'http://lms.kau.ac.kr' })
  let pageData = await axios.get(arg, {headers: {
    Cookie : `${lmsCookie.name}=${lmsCookie.value}`
  }});
  return pageData.data
})

ipcMain.handle('open-npotal', async (e, arg) => {
  if(!subWindow){
    subWindow = new BrowserWindow()
    await subWindow.loadURL('https://nportal.kau.ac.kr/webcrea/GB03/mdi/login.html')
    subWindow.webContents.openDevTools()
    subWindow.on('closed', () => {
      subWindow = undefined;
    });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input
  } else {
    subWindow.focus()
  }
})
