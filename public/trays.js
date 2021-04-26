const {ipcRenderer} = require('electron')

document.getElementById("close").addEventListener('click', ()=>{
    ipcRenderer.invoke('trays', "close")
})
document.getElementById("minimize").addEventListener('click', ()=>{
    ipcRenderer.invoke('trays', "minimize")
})
document.getElementById("maximize").addEventListener('click', ()=>{
    ipcRenderer.invoke('trays', "maximize")
})