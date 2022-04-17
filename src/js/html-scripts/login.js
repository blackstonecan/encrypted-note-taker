const {ipcRenderer} = require("electron");

const pasw1 = document.querySelector("#txtPasw1");
const pasw2 = document.querySelector("#txtPasw2");
const pasw3 = document.querySelector("#txtPasw3");

document.querySelector("#btnDeneSansini").addEventListener("click",e=>{
    try {
            if(!(pasw1.value == "" || pasw2.value == "" || pasw3.value == "")){
                let pass = String(pasw1.value) + String(Number(pasw2.value)*Number(pasw3.value));
                pass = pass+pass.split('').reverse().join('');
                if(Buffer.byteLength(pass,"utf-8") == 32){
                    ipcRenderer.send("key:loginInput",pass);
                }
            }
            e.preventDefault();
        
    }catch (e) {
        alert(e);
    }
});
