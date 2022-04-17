try {
    const tbody = document.querySelector("tbody");
    const {getMyNodes} = require("../js/db/dbEvents");
    const {ipcRenderer} = require("electron");
    const btnAddNode = document.querySelector("#btnAddNode");
    const btnOut = document.querySelector("#btnOut");

    ipcRenderer.on("key:nodeKey",(e, key)=>{
        writeTableNodes(key);

        tbody.addEventListener("click",(e)=>{
            let classList = String(e.target.classList).split(" ");
            if(classList.indexOf("fas") != -1 || classList.indexOf("far") != -1){
                let dataElement = e.target.parentElement.parentElement.parentElement;
                let data = dataElement.getAttribute("data");
                if(classList.indexOf("text-success") != -1){
                    ipcRenderer.send("key:readNode",data);
                }else if(classList.indexOf("text-warning") != -1){
                    ipcRenderer.send("key:editNode",data);
                }else if(classList.indexOf("text-danger") != -1){
                    if(!confirm("Bu notu silmek istediğinize emin misiniz?")) return;
                    ipcRenderer.send("key:deleteNode",data);
                }
            }
            e.preventDefault();
        });

        btnOut.addEventListener("click",(e)=>{
            ipcRenderer.send("key:out");
            e.preventDefault();
        })

        btnAddNode.addEventListener("click",(e)=>{
            ipcRenderer.send("key:addNode");
            e.preventDefault();
        });

        ipcRenderer.on("key:refreshNodeResult",(e)=>{
            writeTableNodes(key);
        });
    });


    // Functions

    function writeTableNodes(key){
        tbody.innerHTML = "";
        let myList = getMyNodes(key);
        for (let i = 0; i < myList.length; i++) {
            let row = myList[i];
            let node = row.node;
            let item = document.createElement("tr");
            item.setAttribute("data",JSON.stringify(row));
            item.innerHTML = `<th scope="row">${node.title}</th><td>${node.description}</td><td>${node.creationDate}</td><td class="iconList"></td>`;
            item.querySelector(".iconList").innerHTML = `<div style="100%;" class="d-flex justify-content-between"><i class="fas fa-search text-success"></i><i class="far fa-edit text-warning"></i><i class="fas fa-trash-alt text-danger"></i></div>`;
            tbody.appendChild(item);
        }
        if(myList.length == 0){
            let item = document.createElement("tr");
            item.innerHTML = '<th scope="row">Hiç notunuz bulunmamaktadır.</th><td></td><td></td><td></td>';
            tbody.appendChild(item);
        }
    }

} catch (e) {
    alert(e);
}

