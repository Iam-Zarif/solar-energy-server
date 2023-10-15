const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// MongoDB
const uri = `mongodb+srv://solar-energy:${process.env.DB_PASS}@solar-energy.bivybia.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const projectCollection = client.db("projects").collection("projectsCollection");
    const feedbackCollection = client.db("feedback").collection("feedbackCollection");
    const userInfoCollection = client.db("userInfo").collection("userInfoCollection");
    
    // Define routes here


    app.get("/projects", async (req, res) => {
      const projects = await projectCollection.find().toArray();
      return res.send(projects);
    });
    app.get("/projects/:id", async (req, res) =>{
const id =req.params.id;
const query = {_id : new ObjectId(id)};
const results = await projectCollection.findOne(query);
return res.send(results);
    })
    app.get("/feedback", async (req, res) =>{
      const feedbacks = await feedbackCollection.find().toArray();
      return res.send(feedbacks);
    })
    app.get("/userInfo", async (req, res) =>{
      const userInfo = await userInfoCollection.find().toArray();
      return res.send(userInfo);
    })
    app.get("/userInfoEmail", async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await userInfoCollection.find(query).toArray();
      res.send(result);
    });
    
    app.post("/feedback", async (req, res) =>{
const feedback = req.body;
console.log(feedback);
const result = feedbackCollection.insertOne(feedback);
return res.send(result);
    })
    app.post("/userInfo", async (req, res) =>{
const userInfo = req.body;
console.log(userInfo);
const result = userInfoCollection.insertOne(userInfo);
return res.send(result);
    })




    await client.connect(); // Connect to the MongoDB server
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close(); // Close the MongoDB client when done
  }
}

run().catch(console.error);
//
app.get("/", (req, res) => {
  res.send("My Solar is dancing");
});
app.listen(port, () => {
  console.log(`Toys are walking on port : ${port}`);
});
