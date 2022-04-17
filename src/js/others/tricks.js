function infoToObj(title,desc,content,date){
    if(!date){
        let nwdate = new Date();
        date = nwdate.getDate()+"/"+(nwdate.getMonth()+1)+"/"+nwdate.getFullYear();
    }
    let obj = {
        title:title,
        description:desc,
        content:content,
        creationDate:date
    };
    return obj;
}

const getEasyKey1 = "emreemreemreemreemreemreemreemre";

const getEasyKey2 = "cancancancancancancancancancannn";


exports.infoToObj = infoToObj;
exports.getEasyKey1 = getEasyKey1;
exports.getEasyKey2 = getEasyKey2;