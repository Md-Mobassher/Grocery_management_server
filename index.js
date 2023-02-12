const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { connectToServer } = require("./utils/dbConnect");
const errorHandler = require("./middleware/errorHandler");
const inventoryRoutes = require("./routes/v1/inventory.routes")

const app = express();

// use middleware
app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}


connectToServer((err) => {
    if (!err) {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    } else {
      console.log(err);
    }
  });
  

  app.use("/api/v1/inventory" , inventoryRoutes)
  app.use("/inventory" , inventoryRoutes)
  
  app.get('/', (req, res) => {
    res.send("Server is running");
  })
  
  app.all("*", (req, res) => {
    res.send("NO route found.");
  });
  
  app.use(errorHandler);
  
  process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
      process.exit(1);
    });
  });


