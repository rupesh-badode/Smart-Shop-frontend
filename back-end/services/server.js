var cors = require('cors');
var connectDB  =  require('../model/db');
var express = require('express');
const { ObjectId } = require("mongodb");


var app =  express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("Welcome to the Server");
});

app.get('/products',(req,res)=>{
    connectDB().then((database)=>{
     database.collection("products").find({}).toArray()
        .then(data=>{
            res.send(data);
        }).catch((err)=>{
            res.status(500).send("Error fetching products: " + err.message);
        });
    }).catch((err)=>{
        res.status(500).send("Error fetching DBMS: " + err.message);
    });
});


app.get('/products/:id', (req, res) => {
  const id = req.params.id;

  // Check for valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID");
  }

  connectDB()
    .then((database) => {
      database.collection("products").findOne({ _id: new ObjectId(id) })
        .then((data) => {
          if (!data) {
            return res.status(404).send("Product not found");
          }
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send("Error fetching product: " + err.message);
        });
    })
    .catch((err) => {
      res.status(500).send("Error connecting to DB: " + err.message);
    });
});



app.post('/newcustomer',(req,res)=>{
    connectDB().then((database)=>{
        var user = {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password
        }
        database.collection("customers").insertOne(user).then(result=>{
            console.log("Record Inserted");                                   
            res.send("/customer")
        })
    })
});

app.post('/newseller',(req,res)=>{
    connectDB().then((database)=>{
        var user = {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password
        }
        database.collection("sellers").insertOne(user).then(result=>{
            console.log("Record Inserted");                                   
            res.send("/seller")
        })
    })
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    try {
        const db = await connectDB();
        // Step 1: Check in customers collection
        const customer = await db.collection("customers").findOne({ email });
        if (customer) {
            if (customer.password === password) {
                return res.status(200).json({
                    message: "Login successful as customer",
                    role: "customer",
                    user: customer
                });
            } else {
                return res.status(401).send("Incorrect password for customer");
            }
        }
        // Step 2: Check in sellers collection
        const seller = await db.collection("sellers").findOne({ email });
        if (seller) {
            if (seller.password === password) {
                return res.status(200).json({
                    message: "Login successful as seller",
                    role: "seller",
                    user: seller
                });
            } else {
                return res.status(401).send("Incorrect password for seller");
            }
        }

        // Not found in both collections
        return res.status(404).send("User not found");

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Server error");
    }
});



app.post('/addproduct',(req,res)=>{
    connectDB().then((database)=>{
        var product = {
            "title":req.body.title,
            "price":req.body.price,
            "image":req.body.image,
            "category":req.body.category,
            "description":req.body.description
        }
        database.collection("products").insertOne(product).then(result=>{
            console.log("Product Inserted");                                   
            res.send("/dashboard")
        })
    })
});


app.put('/products/:id', (req, res) => {
  connectDB().then((database) => {
    database.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },  // ✅ Convert string ID to ObjectId
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
          description: req.body.description
        }
      }
    )
    .then(result => {
      console.log("Update result:", result);
      if (result.modifiedCount > 0) {
        res.send("/dashboard");
      } else {
        res.send("No product updated. Maybe same data or wrong ID?");
      }
    })
    .catch(err => {
      res.status(500).send("Error updating product: " + err.message);
    });
  }).catch(err => {
    res.status(500).send("Error fetching DBMS: " + err.message);
  });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id; // not _id
  connectDB()
    .then((database) => {
      database
        .collection("products")
        .deleteOne({ _id: new ObjectId(productId) }) // ✅ match MongoDB _id properly
        .then((result) => {
          if (result.deletedCount === 0) {
            res.status(404).send("Product not found");
          } else {
            console.log("Product Deleted");
            res.send({ success: true, message: "Product deleted successfully" });
          }
        })
        .catch((err) => {
          res.status(500).send("Error deleting product: " + err.message);
        });
    })
    .catch((err) => {
      res.status(500).send("Error connecting to DB: " + err.message);
    });
});


app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});



app.listen(3300);
console.log("Server is running on http://localhost:3300");



