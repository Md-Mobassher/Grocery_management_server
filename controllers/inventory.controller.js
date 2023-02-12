const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllInventory = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const db = getDb();

    const query = {};
    const inventory = await db.collection("inventory").find(query).toArray();

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    next(error);
  }
};

// module.exports.saveATool = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const tool = req.body;

//     const result = await db.collection("tools").insertOne(tool);
//     console.log(result);

//     if (!result.insertedId) {
//       return res.status(400).send({ status: false, error: "Something went wrong!" });
//     }

//     res.send({ success: true, message: `Tool added with id: ${result.insertedId}` });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.getToolDetail = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const { id } = req.params;

//     if(!ObjectId.isValid(id)){
//       return res.status(400).json({ success: false, error: "Not a valid tool id."});
//     }

//     const tool = await db.collection("tools").findOne({_id: ObjectId(id)});

//     if(!tool){
//       return res.status(400).json({ success: false, error: "Couldn't find a tool with this id"});
//     }

//     res.status(200).json({ success: true, data: tool });
    
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.updateTool = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, error: "Not a valid tool id." });
//     }

//     const tool = await db.collection("tools").updateOne({ _id: ObjectId(id) }, { $set: req.body });

//     if (!tool.modifiedCount) {
//       return res.status(400).json({ success: false, error: "Couldn't update the tool" });
//     }

//     res.status(200).json({ success: true, message: "Successfully updated the tool" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.deleteTool = async (req, res, next) => {
//   try {
//     const db = getDb();
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, error: "Not a valid tool id." });
//     }

//     const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });

//     if (!tool.deletedCount) {
//       return res.status(400).json({ success: false, error: "Couldn't delete the tool" });
//     }

//     res.status(200).json({ success: true, message: "Successfully deleted the tool" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.test = async(req, res, next) => {
//   for (let i = 0; i < 100000; i++) {
//     const db = getDb();
//     db.collection("test").insertOne({name: `test ${i}`, age: i });
//   }
// };
// module.exports.testGet = async(req, res, next) => {
//   const db = getDb();

//   const result = await db.collection("test").find({ name: "test 99999" }).toArray();
//   res.json(result);
// };



// async function run() {
//     try{
//         await client.connect();
//         const inventoryCollection = client.db('grocaGrocery').collection('inventory');
//         const orderCollection = client.db('grocaGrocery').collection('order');
//         const deliverCollection = client.db('grocaGrocery').collection('deliver');

        
//         // AUTH
//         app.post('/login', async (req, res) => {
//             const user = req.body;
//             const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: '1d'
//             });
//             res.send({ accessToken });
//         })


//         // get all inventory
//         app.get('/inventory', async(req, res) => {
//             const query = {};
//             const cursor = inventoryCollection.find(query);
//             const inventories = await cursor.toArray();
//             res.send(inventories);
//         });

//         // get single inventory
//         app.get('/inventory/:id', async(req, res) =>{
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const inventory = await inventoryCollection.findOne(query);
//             res.send(inventory);
//         })

//         // POST inventory
//         app.post('/inventory', async(req, res) => {
//             const newInventory = req.body;
//             const result = await inventoryCollection.insertOne(newInventory);
//             console.log(result);
//             res.send(result);
//         })

//         // DELETE inventory
//         app.delete('/inventory/:id', async(req, res) => {
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const result = await inventoryCollection.deleteOne(query);
//             res.send(result)         
//         })

//         // update inventory
//         app.put('/inventory/:id', async(req, res) =>{
//             const id = req.params.id;
//             const updateQuantity = req.body;
//             const filter = {_id: ObjectId(id)};
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: {
//                     quantity: updateQuantity.quantity
//                 }
//             };
//             const result = await inventoryCollection.updateOne(filter, updateDoc, options);
//             res.send(result);

//         })



//         // Order collection api

//         // get order
//         app.get('/order', verifyJWT, async (req, res) => {
//             const decodedEmail = req.decoded.email;
//             const email = req.query.email;
//             if (email === decodedEmail) {
//                 const query = { email: email };
//                 const cursor = orderCollection.find(query);
//                 const orders = await cursor.toArray();
//                 res.send(orders);
//             }
//             else{
//                 res.status(403).send({message: 'forbidden access'})
//             }
//         })

//         // post order
//         app.post('/order', async (req, res) => {
//             const order = req.body;
//             const result = await orderCollection.insertOne(order);
//             res.send(result);
//         })

//         // DELETE order
//         app.delete('/order/:id', async(req, res) => {
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const result = await orderCollection.deleteOne(query);
//             res.send(result)         
//         })
        
        
//     }
//     finally{

//     }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//     res.send("Server is running");
// })

// app.listen(port, () => {
//     console.log('Lisetening to port', port)
// })

