try {
    const {ipcRenderer} = require("electron");

    const txtTitle = document.querySelector("#title");
    const txtDescription = document.querySelector("#description");
    const txtContent = document.querySelector("#content");
    const txtDate = document.querySelector("#date");

    ipcRenderer.on("key:readNode",(e,data)=>{
        let node = JSON.parse(data).node;
        txtTitle.innerText = node.title;
        txtDescription.innerText = node.description;
        txtContent.innerText = node.content;
        txtDate.innerText = node.creationDate;
    });

} catch (e) {
    alert(e);
}