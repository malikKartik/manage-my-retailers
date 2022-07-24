const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

const m = MongoMemoryServer.create();

module.exports.connect = async () =>{
    const mongod = await m;
    const uri = mongod.getUri();
    await mongoose.connect(uri)
}

module.exports.closeDatabase = async () => {
    const mongod = await m;
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}
