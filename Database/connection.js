const mongoose = require('mongoose');


const Connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/gaber").then(
        console.log("DB UP and Running")
    ).catch(err=>{console.log('faild connection => ' + err)})
    
}

module.exports = Connection ;