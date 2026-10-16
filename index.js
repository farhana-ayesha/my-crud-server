import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config' 

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2csq6q5.mongodb.net/`);

export async function connectToMongoDB(){
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
  }
   catch (err) {
    console.dir(err);
  }
}

   const connectedClient = await connectToMongoDB();
   const db = connectedClient.db('myCrudServer');
   const users = db.collection('users');


app.get('/', (req, res) => {
  res.send('My CRUD Server is running!');
});

app.get('/users',async (req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers);
});

app.listen(port, () => {
  console.log(`My CRUD Server is running on port ${port}`);
});