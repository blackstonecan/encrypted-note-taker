const path = require("path");
const {encrypt,decrypt, decryptNode,encryptNode} = require("../others/cryptology");
const fs = require("fs");
const {infoToObj} = require("../others/tricks");
const Store = require("electron-store");

const dbPath = (path.join(__dirname,"db.json"));
const store = new Store();

function writeJSON(db){
    let save = {
        nodes:[],
        nextID:db.nextID
    };
    db.nodes.forEach(x => {
        if(x != null) save.nodes.push(x);
    });
    store.set('db', JSON.stringify(save));
    //fs.writeFileSync(dbPath,JSON.stringify(save));
}

function readJSON(){
    let content = store.get("db");
    if(content == undefined){
        content = {nodes:[],nextID:0}
    }else content = JSON.parse(content);
    //let content = JSON.parse(fs.readFileSync(dbPath,"utf-8"));
    return (content);
}

function addNode(key,title,desc,content,date){
    let data = readJSON();
    let node = {
        id:Number(data.nextID),
        key:encrypt(key,key),
        node:encryptNode(key,(infoToObj(title,desc,content,date)))
    }
    data.nodes.push(node);
    data.nextID = node.id+1;
    writeJSON(data);
}   

function getMyNodes(key){
    let list = readJSON().nodes;
    list = list.filter(x => decrypt(key,x.key) == key);
    list.map(x=>{
        x.key = key;
        x.node = decryptNode(key,x.node);
    });
    return list;
}

function getNode(key,id){
    let data = readJSON().nodes.filter(x=>x.id == id && decrypt(key,x.key) == key);
    if(data.length == 0) return null
    data = data[0];
    data.key = key;
    data.node = decryptNode(key,data.node);
    return data;
}

function updateNode(key,id,node,newKey){
    let db = readJSON();
    let list = db.nodes;
    let i = 0;
    while(i < list.length){
        if(list[i].id == id){
            if(newKey){
                list[i].key = encrypt(newKey,newKey);
                list[i].node = encryptNode(newKey,node);
            }else list[i].node = encryptNode(key,node);
            break;
        }
        i++;
    }
    db.nodes = list;
    writeJSON(db);
}

function deleteNode(key,id){
    let data = readJSON().nodes.filter(x=>x.id == id && decrypt(key,x.key) == key);
    if(data.length == 0) return "Hatalı bilgi geldi.";
    data = data[0];
    let db = readJSON();
    let list = db.nodes;
    let i = 0;
    while(i < list.length){
        if(list[i].id == data.id){
            break;
        }
        i++;
    }
    delete db.nodes[i];
    writeJSON(db);
}

exports.addNode = addNode;
exports.getNode = getNode;
exports.getMyNodes = getMyNodes;
exports.updateNode = updateNode;
exports.deleteNode = deleteNode;

