const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2000;

const { MongoClient, ServerApiVersion } = require("mongodb");

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
    const projectCollection = client
      .db("projects")
      .collection("projectsCollection");

    // Define routes here

    app.get("/projects", async (req, res) => {
      const projects = await projectCollection.find().toArray();
      return res.send(projects);
    });

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
