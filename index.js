const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const tesla = require("./tesla.json")
const mclaren = require("./mclaren.json")
const lambo = require("./lambo.json")
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://piston:VDzwVeJJQqBOvZ4S@cluster0.hf0b3tt.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

  
    const productsCollection = client.db("pistonDB").collection("products");
    const brandsCollection = client.db("pistonDB").collection("brands")


    // brands get endpoint
    app.get("/brands", async(req, res)=>{
      const cursor = brandsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    // brands post endpoint
    app.post("/brands", async(req, res)=>{
      const brand = req.body;
      const result = await brandsCollection.insertOne(brand)
      res.send(result)
    })

    // products post endpoint
    app.post("/products", async(req, res)=>{
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })

    // specific brand product get endpoint tesla
    app.get("/tesla", (req, res)=>{
      res.send(tesla)
    })

    // Mclaren
    app.get("/mclaren", (req, res)=>{
      res.send(mclaren)
    })

    app.get("/lambo", (req, res)=>{
      res.send(lambo)
    })
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Piston server is running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// VDzwVeJJQqBOvZ4S
// piston
