const express = require("express");
const cors = require("cors");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ObjectID,
} = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MIDDLE WARES
app.use(cors());
app.use(express.json());

// root API
app.get("/", (req, res) => {
  res.send("Assignment-11 Server is Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mbnoo25.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client
      .db("plumbing-assignment")
      .collection("allServices");
    const reviewCollection = client
      .db("plumbing-assignment")
      .collection("reviews");

    // get home page API
    app.get("/homeservices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const HomeServices = await cursor.limit(3).toArray();
      res.send(HomeServices);
    });
    // get servicess page API
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    // post addservice form
    app.post("/services", async (req, res) => {
      const addservice = req.body;

      const cursor = await serviceCollection.insertOne(addservice);

      res.send(addservice);
    });
    // single service data details
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const serviceDetail = await serviceCollection.findOne(query);
      res.send(serviceDetail);
    });

    app.post("/reviews", async (req, res) => {
      const cursor = await reviewCollection.insertOne(review);

      res.send(review);
    });

    // query reviews by id
    app.get("/reviews", async (req, res) => {
      console.log(req.query.id);
      let query = {};

      if (req.query.id) {
        query = {
          id: req.query.id,
        };
      }
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    // get all reviews by user
    app.get("/reviews-email", async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = reviewCollection.find(query);
      const allReviews = await cursor.toArray();
      res.send(allReviews);
    });

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectID(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Assignment server is running on ${port}`);
});
