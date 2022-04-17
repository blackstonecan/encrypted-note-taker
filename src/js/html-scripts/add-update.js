try {

    const {ipcRenderer} = require("electron");

    const btnSave = document.querySelector("#btnSave");
    const inputTitle = document.querySelector("#inputTitle");
    const inputDescription = document.querySelector("#inputDescription");
    const inputContent = document.querySelector("#inputContent");
    const inputDate = document.querySelector("#inputDate");

    ipcRenderer.on("key:addNode",(e)=>{
        btnSave.textContent = "Ekle";

        btnSave.addEventListener("click",(e)=>{

            if(!inputControl(inputTitle,"başlık")) return;
            if(!inputControl(inputDescription,"açıklama")) return;
            if(!inputControl(inputContent,"içerik")) return;

            let node = {
                title:inputTitle.value.trim(),
                description:inputDescription.value.trim(),
                content:inputContent.value.trim()
            }

            ipcRenderer.send("key:addNodeData",JSON.stringify(node));
            e.preventDefault();
        });

    });

    ipcRenderer.on("key:editNode",(e,data)=>{
        btnSave.textContent = "Güncelle";

        data = JSON.parse(data);
        inputTitle.value = data.node.title;
        inputDescription.value = data.node.description;
        inputContent.value = data.node.content;
        let date = data.node.creationDate.split("/");
        inputDate.value = date[2]+"-"+(date[1].toString().length ==1?("0"+date[1].toString()):date[1])+"-"+(date[0].toString().length ==1?("0"+date[0].toString()):date[0]);

        btnSave.addEventListener("click",(e)=>{

            if(!inputControl(inputTitle,"başlık")) return;
            if(!inputControl(inputDescription,"açıklama")) return;
            if(!inputControl(inputContent,"içerik")) return;

            data.node = {
                title:inputTitle.value.trim(),
                description:inputDescription.value.trim(),
                content:inputContent.value.trim(),
                creationDate:data.node.creationDate
            }

            ipcRenderer.send("key:editNodeData",JSON.stringify(data));
            e.preventDefault();
        });

    });


    function inputControl(input,name){
        if(input.value.trim() == ""){
            alert(`Lütfen bir ${name} giriniz.`);
            input.value = "";
            input.focus();
            return false;
        }return true;
    }


} catch (e) {
    alert(e);
}