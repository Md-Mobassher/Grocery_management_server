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
        const inventoryCollection = client.db('grocaGrocery').collection('inventory');
        const orderCollection = client.db('grocaGrocery').collection('order');

        // get all inventory
        app.get('/inventory', async(req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        // get single inventory
        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory);
        })

        // POST inventory
        app.post('/inventory', async(req, res) => {
            const newInventory = req.body;
            const result = await inventoryCollection.insertOne(newInventory);
            console.log(result);
            res.send(result);
        })

        // DELETE inventory
        app.delete('/inventory/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await inventoryCollection.deleteOne(query);
            if (result.deletedCount === 1) {
                res.send("Successfully deleted one document.");
              } else {
                res.send("No documents matched. Deleted 0 documents.");
              }           
        })

        


        // Order collection api

        app.get('/order', async(req,res) => {
            const query = {};
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
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


