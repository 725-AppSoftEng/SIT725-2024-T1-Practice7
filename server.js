const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = "mongodb+srv://manasakavali2001:Snooby@adddatabase.wti0wmc.mongodb.net/?retryWrites=true&w=majority&appName=AddDatabase";
const port = process.env.PORT || 3000;
let collection;

const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Listen only on http server
http.listen(port, () => {
  console.log(`Server and Socket.io running on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('client is connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000)
});

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    if (!collection) {
      throw new Error('Collection is not initialized');
    }
    const catData = req.body;
    await collection.insertOne(catData);
    console.log("Cat post successful");
    res.send("Cat post successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

