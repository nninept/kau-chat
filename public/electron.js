// public/electron.ts
const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const Browser = require('./browser')
const axios = require('axios')
let browser = new Browser()
// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
let mainWindow, subWindow;

async function getCookieWithLogin(arg){
  await browser.initBrowser()
  let isLoginSuccess = await browser.loginLmsPage(arg['id'], arg['pwd']);
  if (isLoginSuccess) {
    await browser.cookie.forEach(async (elem, idx) => {
    await mainWindow.webContents.session.cookies.set(elem).catch(err => {
      console.log(err)
    })    
  })
  if(!arg['isAutoLogin']) await mainWindow.webContents.executeJavaScript(`localStorage.setItem("loginInfo", JSON.stringify(${JSON.stringify(arg)}))`)
}
return isLoginSuccess
}

function createWindow() {
  mainWindow = new BrowserWindow({
    // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
    //alwaysOnTop: true,
    center: true,
    // fullscreen: true,
    width:800,
    height:600,
    resizable: true,
    frame:true,
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



ipcMain.handle('login', async (event, arg) => {
  let isLoginSuccess = getCookieWithLogin(arg)
return isLoginSuccess
})

ipcMain.handle('logout', async (e, arg) => {
  mainWindow.webContents.session.clearStorageData()
  browser.destroy()
  browser = new Browser()
  browser.initBrowser()
  mainWindow.loadFile('./views/html/login.html')
})

ipcMain.handle('get-lec-lists', async (e, arg) => {
  console.log('requst for lecture')
  let lmsCookie = browser.cookie.find((elem, idx, arr) => elem.name=='MoodleSession')
  let pageData = await axios.get('http://lms.kau.ac.kr/', {headers: {
    Cookie : `${lmsCookie.name}=${lmsCookie.value}`
  }});
  return pageData.data
})

ipcMain.handle('get-lec-page', async (e, arg) => {
  console.log('get-info')
  let lmsCookie = browser.cookie.find((elem, idx, arr) => elem.name=='MoodleSession')
  let pageData = await axios.get(arg, {headers: {
    Cookie : `${lmsCookie.name}=${lmsCookie.value}`
  }});
  return pageData.data
})

ipcMain.handle('open-npotal', async (e, arg) => {
  if(!subWindow){
    subWindow = new BrowserWindow()
    subWindow.loadURL('https://nportal.kau.ac.kr/webcrea/GB03/mdi/login.html')
    subWindow.webContents.openDevTools()
    subWindow.on('closed', () => {
      subWindow = undefined;
    });//#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input

    subWindow.webContents.executeJavaScript(`
    (async () => { 
      console.log("start")
      let id = await document.querySelector("#mainForm3 tbody tr:nth-child(1) td:nth-child(1) input")
      console.log(id)
      id.value = "2019125061"
      console.log(id)
      console.log(id.value)
      let pwd = await document.querySelector("#mainForm3 tbody tr:nth-child(3) input")
      pwd.value = "david990601*"
      let btn = document.querySelector('#mainForm3 tbody tr:nth-child(1) td:nth-child(3) input')
      btn.click()
    })() 
    `)
  } else {
    subWindow.focus()
  }
})


ipcMain.handle('test', async (e, arg) => {
  let isLoginSuccess = await browser.loginLmsPage(arg['id'], arg['pwd']);
  if (isLoginSuccess) {
    await mainWindow.webContents.executeJavaScript(`localStorage.setItem("loginInfo", JSON.stringify(${JSON.stringify(arg)}))`)
  }
  mainWindow.loadURL('https://lms.kau.ac.kr/login.php')
})