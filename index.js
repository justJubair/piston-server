const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf0b3tt.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

    const productsCollection = client.db("pistonDB").collection("products");
    const brandsCollection = client.db("pistonDB").collection("brands");
    const cartCollection = client.db("pistonDB").collection("cart");

    // brands get endpoint
    app.get("/brands", async (req, res) => {
      const cursor = brandsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // brands post endpoint
    app.post("/brands", async (req, res) => {
      const brand = req.body;
      const result = await brandsCollection.insertOne(brand);
      res.send(result);
    });

    // get products endpoint
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get a single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    // products post endpoint
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    // MY CART RALATED ENDPOINT

    // get my mycart endpoint
    app.get("/cart", async (req, res) => {
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // // get a single product from my cart
    // app.get("/cart/:id", async (req, res) => {
    //   try {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await cartCollection.findOne(query);
    //     if (result) {
    //       res.send(result);
    //     } else {
    //       res.status(404).send("Item not found");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Internal Server Error");
    //   }
    // });

    // delete a product from mycart
    app.delete("/cart/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await cartCollection.deleteOne(query);
        if (result) {
          res.send(result);
        } else {
          res.status(404).send("Item not fount");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    // product added to my cart, post endpoint
    app.post("/cart", async (req, res) => {
      const product = req.body;
      const result = await cartCollection.insertOne(product);
      res.send(result);
    });

    // specific brand product get endpoint tesla
    app.get("/tesla", async (req, res) => {
      const cursor = productsCollection.find({ brand: "Tesla" });
      const result = await cursor.toArray();
      res.send(result);
    });

    // Mclaren
    app.get("/mclaren", async (req, res) => {
      const cursor = productsCollection.find({ brand: "McLaren" });
      const result = await cursor.toArray();
      res.send(result);
    });

    // mercedes benz
    app.get("/marcedes", async (req, res) => {
      const cursor = productsCollection.find({ brand: "Mercedes-Benz" });
      const result = await cursor.toArray();
      res.send(result);
    });
    // lamborghini
    app.get("/lamborghini", async (req, res) => {
      const cursor = productsCollection.find({ brand: "Lamborghini" });
      const result = await cursor.toArray();
      res.send(result);
    });

    // ferrari
    app.get("/ferrari", async (req, res) => {
      const cursor = productsCollection.find({ brand: "Ferrari" });
      const result = await cursor.toArray();
      res.send(result);
    });

    // bmw
    app.get("/bmw", async (req, res) => {
      const cursor = productsCollection.find({ brand: "BMW" });
      const result = await cursor.toArray();
      res.send(result);
    });

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
