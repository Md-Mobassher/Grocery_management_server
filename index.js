const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// use middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dl65k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();
        const productCollection = client.db('grocaGrocery').collection('product');

        // get all products
        app.get('/product', async(req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            console.log(products);
            res.send(products);
        });

        // get single product
        app.get('/product/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await productCollection.findOne(query);
            res.send(product);
        })

        // POST Product
        app.get('/product', async(req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        // DELETE Product
        app.delete('/product', (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log('Lisetening to port', port)
})


