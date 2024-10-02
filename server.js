import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://advanturebdservice:A0kQ41GEHMw3EpGT@cluster0.zhsox.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
  console.log("MongoDB connected successfully!");

  const db = client.db("products");
  const productsCollection = db.collection("items");

  // POST route to add a new product
  app.post('/api/products', async (req, res) => {
    try {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
