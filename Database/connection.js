const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/gaber'; // Your MongoDB URI
const client = new MongoClient(uri); 

const Connection = async () =>{
    await mongoose.connect('mongodb://localhost:27017/gaber');
    console.log("DB UP and Running");
}
// async function dropDatabase() {
//     try {
//         await client.connect();
//         const database = client.db('gaber'); // Replace 'your_database_name' with your actual database name
//         await database.dropDatabase();
//         console.log('Database dropped successfully');
//     } finally {
//         await client.close();
//     }
// }
// dropDatabase()

module.exports = Connection ;