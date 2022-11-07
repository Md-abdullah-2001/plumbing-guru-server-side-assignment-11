const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// MIDDLE WARES
app.use(cors());
app.use(express.json());

// root API
app.get("/", (req, res) => {
  res.send("Assignment-11 Server is Running");
});

const uri = `mongodb+srv://{process.env.DB_USER}:{PROCESS.ENV.DB_PASSWORD}@cluster0.mbnoo25.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.listen(port, () => {
  console.log(`Assignment server is running on ${port}`);
});
