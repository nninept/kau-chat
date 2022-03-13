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
let mainWindow, subWindow, lmsWindow, vodWindow;

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
      partition:"persist:sessInfo",
    },
    nativeWindowOpen : false
  });

  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    mainWindow.webContents.openDevTools();
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
    url:"/login/index.php",
    maxRedirects:0,
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
  let lmsCookie = await mainWindow.webContents.session.cookies.get({ url: 'http://lms.kau.ac.kr', name : "MoodleSession"})
  let pageData = await axios.get(arg, {headers: {
    Cookie : `${lmsCookie[0].name}=${lmsCookie[0].value}`
  }});
  // console.log(pageData.header,pageData.config)
  return pageData.data
})

ipcMain.handle('open-vod', async (event, arg) => {
  if(!vodWindow){
    vodWindow = new BrowserWindow({
      frame:false,
      webPreferences: {
        nodeIntegration: true,
        partition:"persist:sessInfo"
      }
    })
    await vodWindow.loadURL(arg)
    vodWindow.webContents.openDevTools()
    vodWindow.on('close', async () => {
      vodWindow.destroy()
    });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input
    vodWindow.on('closed', () => {
      vodWindow = undefined;
    });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input
  } else {
    vodWindow.focus()
  }
  await vodWindow.webContents.executeJavaScript(`
        document.querySelector("#vod_header").style="-webkit-app-region:drag;"
        document.querySelector("#vod_header > div").style="-webkit-app-region:none"
        document.querySelector("#vod_header > .vod_help").remove()
        const video = document.querySelector("video")
        let playRate = document.createElement("div")
        playRate.innerHTML = "<a id='playRateDown'>-</a> x<span id='getPlayRate'>1.0</span> <a id='playRateUp'>+</a>"
        playRate.classList.add("jw-icon")
        playRate.classList.add("jw-icon-inline")
        playRate.classList.add("jw-button-color")
        playRate.classList.add("jw-reset")
        document.querySelector("#vod_player > div.jw-controls.jw-reset > div.jw-controlbar.jw-background-color.jw-reset > div.jw-group.jw-controlbar-left-group.jw-reset").append(playRate)
        playRate.style = "padding:auto 0; border-left : gray 2px solid; font-size:14px; font-weight:1000"
        document.getElementById("playRateUp").onclick = (e)=>{
          if(video.playbackRate+0.25 <= 4){
            video.playbackRate += 0.25
            document.getElementById("getPlayRate").innerText = video.playbackRate.toFixed(2)
          }
        }

        document.getElementById("playRateDown").onclick = (e)=>{
          if(video.playbackRate-0.25 >= 0.25){
            video.playbackRate -= 0.25
            document.getElementById("getPlayRate").innerText = video.playbackRate.toFixed(2)
          }
        }
        
        `)
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

ipcMain.handle('open-password-search', async (e, arg) => {
  subWindow = new BrowserWindow({parent:mainWindow, modal:true})
  await subWindow.loadURL('http://nportal.kau.ac.kr/webcrea/GB03/mdi/search_password.html')
  subWindow.webContents.openDevTools()
  subWindow.on('closed', () => {
    subWindow = undefined;
  });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input
})

ipcMain.handle('open-lms', async (e, arg) => {
  if(!lmsWindow){
    lmsWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        partition:"persist:sessInfo"
      }
    })
    await lmsWindow.loadURL('http://lms.kau.ac.kr')
    lmsWindow.on('closed', () => {
      lmsWindow = undefined;
    });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input
  } else {
    lmsWindow.focus()
  }
})

ipcMain.handle("download", async (e,arg)=>{
  let lmsCookie = await mainWindow.webContents.session.cookies.get({ url: 'http://lms.kau.ac.kr', name : "MoodleSession"})
  let response = await axios({
    method: 'GET',
    headers: {
      Cookie : `${lmsCookie[0].name}=${lmsCookie[0].value}`
    },
    url:arg,
    // responseType :'blob',
    maxRedirects:0,
    withCredentials:true,
    validateStatus: function (status) {
      return status >= 200 && status <= 303
    }
  })
  mainWindow.webContents.downloadURL(response.headers.location)

})