const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://manasakavali2001:Snooby@adddatabase.wti0wmc.mongodb.net/?retryWrites=true&w=majority&appName=AddDatabase";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();

module.exports = client;