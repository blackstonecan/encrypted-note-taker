const {addNode,updateNode,deleteNode} = require("./src/js/db/dbEvents");
const electron = require("electron");
const url = require("url");
const path = require("path");

const {app,BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
let key;
let openedWindows = [];

app.on("ready",()=>{
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show:false,
        minWidth:1000,
        minHeight:700
    });


    mainWindow.maximize();
    mainWindow.show();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "src/partials/login.html"),
        protocol: "file:",
        slashes: true
    }));
    Menu.setApplicationMenu(null);

    ////////////////////////////////////////// Uygulama Başladı


    // Ana Sayfaya Geçiş
    ipcMain.on("key:loginInput",(err, data)=>{
        key = data;
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "src/partials/main.html"),
            protocol: "file:",
            slashes: true
        }));
        mainWindow.webContents.on('did-finish-load', function () {
            mainWindow.webContents.send("key:nodeKey",data);
        });
    });


    // --- Node İşlemleri
    // AddNode
    ipcMain.on("key:addNode",(e)=>{

        if(openedWindows.indexOf("add") != -1) return;

        openedWindows.push("add");

        let addWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            width:800,
            height:570,
            maximizable:false,
            resizable:false
        });
    
        addWindow.loadURL(url.format({
            pathname:path.join(__dirname,"src/partials/add-update.html"),
            protocol:"file:",
            slashes:true
        }));

        addWindow.webContents.on('did-finish-load', function () {
            addWindow.webContents.send("key:addNode");
        });

        ipcMain.on("key:addNodeData",(e,node)=>{
            node = JSON.parse(node);
            addNode(key,node.title,node.description,node.content);
            mainWindow.webContents.send("key:refreshNodeResult");
            addWindow.close();
        });
    
        addWindow.on("close",()=>{
            openedWindows.splice(openedWindows.indexOf("add"),1);
            addWindow = null;
        });
    });

    //EditNode
    ipcMain.on("key:editNode",(e,data)=>{
        let dataJSON = JSON.parse(data);
        if(openedWindows.indexOf(dataJSON.id) != -1) return;
        openedWindows.push(dataJSON.id);

        let addWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            width:800,
            height:570,
            maximizable:false,
            resizable:false
        });
    
        addWindow.loadURL(url.format({
            pathname:path.join(__dirname,"src/partials/add-update.html"),
            protocol:"file:",
            slashes:true
        }));

        addWindow.webContents.on('did-finish-load', function () {
            addWindow.webContents.send("key:editNode",data);
        });

        ipcMain.on("key:editNodeData",(e,data)=>{
            data = JSON.parse(data);
            updateNode(data.key,data.id,data.node);
            mainWindow.webContents.send("key:refreshNodeResult");
            addWindow.close();
        });
    
        addWindow.on("close",()=>{
            openedWindows.splice(openedWindows.indexOf(dataJSON.id),1);
            addWindow = null;
        });
    });

    //DeleteNode
    ipcMain.on("key:deleteNode",(e,data)=>{
        data = JSON.parse(data);
        deleteNode(data.key,data.id);
        mainWindow.webContents.send("key:refreshNodeResult");
    });

    //ReadNode
    ipcMain.on("key:readNode",(e,data)=>{
        let dataJSON = JSON.parse(data);
        if(openedWindows.indexOf(dataJSON.id) != -1) return;
        openedWindows.push(dataJSON.id);

        let addWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            minWidth:800,
            minHeight:300,
            width:800,
            height:300
        });
    
        addWindow.loadURL(url.format({
            pathname:path.join(__dirname,"src/partials/read.html"),
            protocol:"file:",
            slashes:true
        }));

        addWindow.webContents.on('did-finish-load', function () {
            addWindow.webContents.send("key:readNode",data);
        });
    
        addWindow.on("close",()=>{
            openedWindows.splice(openedWindows.indexOf(dataJSON.id),1);
            addWindow = null;
        });
    });


    //Oturumdan Çık
    ipcMain.on("key:out",(e)=>{
        key = "";
        mainWindow.maximize();
    
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "src/partials/login.html"),
            protocol: "file:",
            slashes: true
        }));
    });


    ////////////////////////////////////////// Uygulama Bitti

    mainWindow.on("close",()=>{
        app.quit();
    });

});
