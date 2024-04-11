const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = "mongodb+srv://manasakavali2001:Snooby@adddatabase.wti0wmc.mongodb.net/?retryWrites=true&w=majority&appName=AddDatabase";
const port = process.env.PORT || 3000;
let collection;

app.use(express.static(__dirname)); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db().collection('Cat');
    console.log("Database connection established");
    
    // Once the connection is established, start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (ex) {
    console.error(ex);
  }
}

runDBConnection();

// Define route handlers after the database connection is established
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

app.get('/api/cats', async (req, res) => {
  try {
    // Ensure that the collection is defined before querying it
    if (!collection) {
      throw new Error('Collection is not initialized');
    }

    const cats = await collection.find({}).toArray();
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/api/cats', async (req, res) => {
  try {
    // Ensure that the collection is defined before inserting data into it
    if (!collection) {
      throw new Error('Collection is not initialized');
    }

    const catData = req.body;
    await collection.insertOne(catData); 
    console.log("Dog post successful");
    res.send("Dog post successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
