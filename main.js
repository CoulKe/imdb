const { BrowserWindow, app, Menu } = require("electron");

let mainWindow;

let template = [
  {
    label: "Home",
    click() {
      mainWindow.loadFile(`${__dirname}/index.html`);
    },
  },
  {
    label: "Help",
    click() {
      mainWindow.loadFile(`${__dirname}/help.html`);
    },
  },
];

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Movie Info",
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile(`${__dirname}/index.html`);
  mainWindow.setIcon('./assets/win/icon.ico')
  // mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
